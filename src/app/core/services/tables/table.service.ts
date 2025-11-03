import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Table {
  name: string;
  isTaken: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private mockTables: Table[] = [
    {
      name: 'Mesa 1',
      isTaken: true
    },
    {
      name: 'Mesa 2',
      isTaken: true
    },
    {
      name: 'Mesa 3',
      isTaken: true
    },
    {
      name: 'Mesa 4',
      isTaken: true
    },
    {
      name: 'Mesa 5',
      isTaken: false
    },
    {
      name: 'Mesa 6',
      isTaken: false
    },
    {
      name: 'Mesa 7',
      isTaken: true
    },
    {
      name: 'Mesa 8',
      isTaken: false
    },
    {
      name: 'Mesa 9',
      isTaken: true
    },
    {
      name: 'Mesa 10',
      isTaken: false
    }
  ];



  getTables(): Observable<Table[]> {
    // Simulate API call delay
    return of(this.mockTables);
  }

  getTableByName(name: string): Observable<Table | undefined> {
    const table = this.mockTables.find(t => t.name === name);
    return of(table);
  }

  getOccupiedTables(): Observable<Table[]> {
    const occupiedTables = this.mockTables.filter(t => t.isTaken);
    return of(occupiedTables);
  }

  getAvailableTables(): Observable<Table[]> {
    const availableTables = this.mockTables.filter(t => !t.isTaken);
    return of(availableTables);
  }

  getOccupiedTablesCount(): Observable<number> {
    const occupiedCount = this.mockTables.filter(t => t.isTaken).length;
    return of(occupiedCount);
  }

  getAvailableTablesCount(): Observable<number> {
    const availableCount = this.mockTables.filter(t => !t.isTaken).length;
    return of(availableCount);
  }

  updateTableStatus(tableName: string, isTaken: boolean): Observable<boolean> {
    const tableIndex = this.mockTables.findIndex(t => t.name === tableName);
    if (tableIndex !== -1) {
      this.mockTables[tableIndex].isTaken = isTaken;
      return of(true);
    }
    return of(false);
  }

  // Method to simulate real API calls (to be implemented with actual HTTP calls)
  // private get<T>(url: string): Observable<T> {
  //   return this.http.get<T>(url);
  // }

  // private post<T>(url: string, data: any): Observable<T> {
  //   return this.http.post<T>(url, data);
  // }

  // private put<T>(url: string, data: any): Observable<T> {
  //   return this.http.put<T>(url, data);
  // }
}
