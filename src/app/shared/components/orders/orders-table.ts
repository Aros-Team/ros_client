import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { OrderService } from '@app/core/services/orders/order-service';
import { OrderResponse } from '@app/shared/models/dto/orders/order-response.model';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './orders-table.html',
})
export class OrdersTable implements OnInit {
  orders: OrderResponse[] = [];
  loading = false;
  error: string | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  private fetchOrders(): void {
    this.loading = true;
    this.error = null;
    this.orderService.getOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.error = 'No se pudieron cargar los pedidos.';
        this.loading = false;
      },
    });
  }
}
