import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Order {
  id: number;
  status: string;
  date: string;
  table: string;
  totalPrice: number;
}

export interface OrderDetail {
  id: number;
  orderId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private mockOrders: Order[] = [
    {
      id: 1,
      status: 'completed',
      date: '2024-01-15T12:30:00',
      table: 'Mesa 1',
      totalPrice: 45.50
    },
    {
      id: 2,
      status: 'preparing',
      date: '2024-01-15T13:15:00',
      table: 'Mesa 3',
      totalPrice: 32.75
    },
    {
      id: 3,
      status: 'completed',
      date: '2024-01-15T11:45:00',
      table: 'Mesa 2',
      totalPrice: 28.90
    },
    {
      id: 4,
      status: 'preparing',
      date: '2024-01-15T14:20:00',
      table: 'Mesa 5',
      totalPrice: 67.25
    },
    {
      id: 5,
      status: 'pending',
      date: '2024-01-15T14:45:00',
      table: 'Mesa 4',
      totalPrice: 19.50
    }
  ];

  private mockOrderDetails: OrderDetail[] = [
    {
      id: 1,
      orderId: 1,
      productName: 'Menu del Día',
      quantity: 2,
      unitPrice: 15.00,
      totalPrice: 30.00
    },
    {
      id: 2,
      orderId: 1,
      productName: 'Coca Cola',
      quantity: 2,
      unitPrice: 2.50,
      totalPrice: 5.00
    },
    {
      id: 3,
      orderId: 1,
      productName: 'Café',
      quantity: 2,
      unitPrice: 2.75,
      totalPrice: 5.50
    },
    {
      id: 4,
      orderId: 2,
      productName: 'Menu del Día',
      quantity: 1,
      unitPrice: 15.00,
      totalPrice: 15.00
    },
    {
      id: 5,
      orderId: 2,
      productName: 'Agua Mineral',
      quantity: 2,
      unitPrice: 1.50,
      totalPrice: 3.00
    },
    {
      id: 6,
      orderId: 2,
      productName: 'Postre Chocolate',
      quantity: 1,
      unitPrice: 4.75,
      totalPrice: 4.75
    },
    {
      id: 7,
      orderId: 2,
      productName: 'Café',
      quantity: 2,
      unitPrice: 2.75,
      totalPrice: 5.50
    },
    {
      id: 8,
      orderId: 3,
      productName: 'Menu del Día',
      quantity: 1,
      unitPrice: 15.00,
      totalPrice: 15.00
    },
    {
      id: 9,
      orderId: 3,
      productName: 'Cerveza',
      quantity: 2,
      unitPrice: 3.50,
      totalPrice: 7.00
    },
    {
      id: 10,
      orderId: 3,
      productName: 'Postre Fruta',
      quantity: 1,
      unitPrice: 3.90,
      totalPrice: 3.90
    }
  ];



  getOrders(): Observable<Order[]> {
    // Simulate API call delay
    return of(this.mockOrders);
  }

  getOrderById(id: number): Observable<Order | undefined> {
    const order = this.mockOrders.find(o => o.id === id);
    return of(order);
  }

  getOrderDetails(orderId: number): Observable<OrderDetail[]> {
    const details = this.mockOrderDetails.filter(d => d.orderId === orderId);
    return of(details);
  }

  getOrdersByStatus(status: string): Observable<Order[]> {
    const orders = this.mockOrders.filter(o => o.status === status);
    return of(orders);
  }

  getTodayOrders(): Observable<Order[]> {
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = this.mockOrders.filter(o => o.date.startsWith(today));
    return of(todayOrders);
  }

  getCompletedOrdersCount(): Observable<number> {
    const completedOrders = this.mockOrders.filter(o => o.status === 'completed');
    return of(completedOrders.length);
  }

  getPreparingOrdersCount(): Observable<number> {
    const preparingOrders = this.mockOrders.filter(o => o.status === 'preparing');
    return of(preparingOrders.length);
  }

  getTotalSales(): Observable<number> {
    const completedOrders = this.mockOrders.filter(o => o.status === 'completed');
    const total = completedOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    return of(total);
  }

  // Method to simulate real API calls (to be implemented with actual HTTP calls)
  // private get<T>(url: string): Observable<T> {
  //   return this.http.get<T>(url);
  // }

  // private post<T>(url: string, data: any): Observable<T> {
  //   return this.http.post<T>(url, data);
  // }
}
