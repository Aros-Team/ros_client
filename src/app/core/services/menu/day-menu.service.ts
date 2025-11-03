import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface PreparationArea {
  id: number;
  name: string;
  products: string[];
}

export interface Category {
  id: number;
  name: string;
  products: string[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  preparationArea: PreparationArea;
  preparationTime: number;
  active: boolean;
  categories: Category[];
  quantity: number;
  observations: string;
}

export interface SubProduct {
  id: number;
  daymenu: string;
  category: Category;
  products: Product[];
  position: number;
}

export interface DayMenu {
  id: number;
  name: string;
  description: string;
  price: number;
  preparationArea: PreparationArea;
  preparationTime: number;
  active: boolean;
  categories: Category[];
  quantity: number;
  observations: string;
  creation: string;
  subProducts: SubProduct[];
}

@Injectable({
  providedIn: 'root'
})
export class DayMenuService {
  private mockDayMenu: DayMenu = {
    id: 1,
    name: 'Menú del Día',
    description: 'Menú especial del día preparado por nuestro chef',
    price: 25.00,
    preparationArea: {
      id: 1,
      name: 'Cocina Principal',
      products: ['Lomo Saltado', 'Arroz Blanco', 'Ensalada César']
    },
    preparationTime: 20,
    active: true,
    categories: [
      {
        id: 1,
        name: 'Platos Principales',
        products: ['Lomo Saltado', 'Arroz Blanco']
      }
    ],
    quantity: 0,
    observations: 'Incluye entrada, plato principal, postre y bebida',
    creation: '2025-11-03',
    subProducts: [
      {
        id: 1,
        daymenu: 'Menú del Día',
        category: {
          id: 2,
          name: 'Entradas',
          products: ['Ensalada César']
        },
        products: [
          {
            id: 1,
            name: 'Ensalada César',
            description: 'Ensalada fresca con pollo, crutones y aderezo césar',
            price: 8.00,
            preparationArea: {
              id: 2,
              name: 'Barra de Ensaladas',
              products: ['Ensalada César']
            },
            preparationTime: 5,
            active: true,
            categories: [
              {
                id: 2,
                name: 'Entradas',
                products: ['Ensalada César']
              }
            ],
            quantity: 0,
            observations: ''
          }
        ],
        position: 1
      },
      {
        id: 2,
        daymenu: 'Menú del Día',
        category: {
          id: 1,
          name: 'Platos Principales',
          products: ['Lomo Saltado', 'Arroz Blanco']
        },
        products: [
          {
            id: 2,
            name: 'Lomo Saltado',
            description: 'Lomo de res salteado con cebolla, tomate y papas fritas',
            price: 18.00,
            preparationArea: {
              id: 1,
              name: 'Cocina Principal',
              products: ['Lomo Saltado']
            },
            preparationTime: 15,
            active: true,
            categories: [
              {
                id: 1,
                name: 'Platos Principales',
                products: ['Lomo Saltado']
              }
            ],
            quantity: 0,
            observations: ''
          },
          {
            id: 3,
            name: 'Arroz Blanco',
            description: 'Arroz blanco cocido al vapor',
            price: 3.00,
            preparationArea: {
              id: 1,
              name: 'Cocina Principal',
              products: ['Arroz Blanco']
            },
            preparationTime: 10,
            active: true,
            categories: [
              {
                id: 3,
                name: 'Guarniciones',
                products: ['Arroz Blanco']
              }
            ],
            quantity: 0,
            observations: ''
          }
        ],
        position: 2
      },
      {
        id: 3,
        daymenu: 'Menú del Día',
        category: {
          id: 4,
          name: 'Postres',
          products: ['Postre del Día']
        },
        products: [
          {
            id: 4,
            name: 'Postre del Día',
            description: 'Postre especial del chef',
            price: 5.00,
            preparationArea: {
              id: 3,
              name: 'Pastelería',
              products: ['Postre del Día']
            },
            preparationTime: 2,
            active: true,
            categories: [
              {
                id: 4,
                name: 'Postres',
                products: ['Postre del Día']
              }
            ],
            quantity: 0,
            observations: ''
          }
        ],
        position: 3
      },
      {
        id: 4,
        daymenu: 'Menú del Día',
        category: {
          id: 5,
          name: 'Bebidas',
          products: ['Refresco']
        },
        products: [
          {
            id: 5,
            name: 'Refresco',
            description: 'Refresco de 500ml',
            price: 2.50,
            preparationArea: {
              id: 4,
              name: 'Bar',
              products: ['Refresco']
            },
            preparationTime: 1,
            active: true,
            categories: [
              {
                id: 5,
                name: 'Bebidas',
                products: ['Refresco']
              }
            ],
            quantity: 0,
            observations: ''
          }
        ],
        position: 4
      }
    ]
  };



  getDayMenu(): Observable<DayMenu> {
    // Simulate API call delay
    return of(this.mockDayMenu);
  }

  getActiveDayMenu(): Observable<DayMenu> {
    return of(this.mockDayMenu);
  }

  // Method to simulate real API calls (to be implemented with actual HTTP calls)
  // private get<T>(url: string): Observable<T> {
  //   return this.http.get<T>('/api/daymenu');
  // }

  // private post<T>(url: string, data: any): Observable<T> {
  //   return this.http.post<T>('/api/daymenu', data);
  // }
}
