import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { OrderService, Order, OrderDetail } from '@app/core/services/orders/order.service';
import { TableService } from '@app/core/services/tables/table.service';
import { DayMenuService, DayMenu } from '@app/core/services/menu/day-menu.service';
import { OrderDetailDialogComponent } from '@components/order-detail-dialog/order-detail-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    BadgeModule,
    CardModule,
    OrderDetailDialogComponent
  ],

})
export class Dashboard implements OnInit {
  private orderService = inject(OrderService);
  private tableService = inject(TableService);
  private dayMenuService = inject(DayMenuService);

  orders = signal<Order[]>([]);
  orderDetails = signal<OrderDetail[]>([]);
  dayMenu = signal<DayMenu | null>(null);
  completedOrdersCount = signal(0);
  preparingOrdersCount = signal(0);
  occupiedTablesCount = signal(0);
  totalSales = signal(0);
  currentDate = signal('');
  currentTime = signal('');

  // Dialog state
  showOrderDetail = signal(false);
  selectedOrder = signal<Order | null>(null);

  ngOnInit() {
    this.loadDashboardData();
    this.loadDayMenu();
    this.updateDateTime();
    // Update time every minute
    setInterval(() => this.updateDateTime(), 60000);
  }

  private loadDashboardData() {
    // Load orders
    this.orderService.getTodayOrders().subscribe(orders => {
      this.orders.set(orders);
    });

    // Load statistics
    this.orderService.getCompletedOrdersCount().subscribe(count => {
      this.completedOrdersCount.set(count);
    });

    this.orderService.getPreparingOrdersCount().subscribe(count => {
      this.preparingOrdersCount.set(count);
    });

    this.tableService.getOccupiedTablesCount().subscribe(count => {
      this.occupiedTablesCount.set(count);
    });

    this.orderService.getTotalSales().subscribe(total => {
      this.totalSales.set(total);
    });
  }

  private updateDateTime() {
    const now = new Date();

    // Format date in Spanish
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    this.currentDate.set(now.toLocaleDateString('es-ES', dateOptions));

    // Format time
    this.currentTime.set(now.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    }));
  }

  private loadDayMenu() {
    // Load day menu
    this.dayMenuService.getActiveDayMenu().subscribe(menu => {
      this.dayMenu.set(menu);
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-surface-100 text-surface-800 dark:bg-surface-800 dark:text-surface-300';
      case 'preparing':
        return 'bg-surface-100 text-surface-800 dark:bg-surface-800 dark:text-surface-300';
      default:
        return 'bg-surface-100 text-surface-800 dark:bg-surface-800 dark:text-surface-300';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'preparing':
        return 'En preparación';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  }

  viewOrderDetails(order: Order) {
    this.selectedOrder.set(order);
    this.orderService.getOrderDetails(order.id).subscribe(details => {
      this.orderDetails.set(details);
      this.showOrderDetail.set(true);
    });
  }

  closeOrderDetail() {
    this.showOrderDetail.set(false);
    this.selectedOrder.set(null);
    this.orderDetails.set([]);
  }
}
