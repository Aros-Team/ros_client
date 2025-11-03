import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CategorySimpleResponse } from "@app/shared/models/dto/category/category-simple-response";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  /**
   *
   */
  constructor(private http: HttpClient) {
  }
  
  public getCategories(): Observable<CategorySimpleResponse[]> {
    return this.http.get<CategorySimpleResponse[]>('http://localhost:8080/api/categories');
  }
}