import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrderResponse } from "@app/shared/models/dto/orders/order-response.model";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public getOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`http://localhost:8080/api/orders/all`);
  }
}
