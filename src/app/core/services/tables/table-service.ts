import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private http = inject(HttpClient);

  public createMultipleTables(total: number): Observable<object> {
    return this.http.post('http://localhost:8080/api/tables/create-multiple', { count:total });
  }

  public getTableAmount(): Observable<{ amount: number }> {
    return this.http.get<{ amount: number }>('http://localhost:8080/api/tables/get-amount');
  }
}
