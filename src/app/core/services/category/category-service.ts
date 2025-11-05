import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CategoryCreateRequest } from "@app/shared/models/dto/category/category-create-request";
import { CategorySimpleResponse } from "@app/shared/models/dto/category/category-simple-response";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);

  public getCategories(): Observable<CategorySimpleResponse[]> {
    return this.http.get<CategorySimpleResponse[]>('categories');
  }

  public createCategory(data: CategoryCreateRequest): Observable<object> {
    return this.http.post('categories', data);
  }

  public deleteCategory(id: number): Observable<Object> {
    return this.http.delete(`categories/${id}`);
  }
}
