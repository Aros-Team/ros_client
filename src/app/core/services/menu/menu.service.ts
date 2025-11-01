import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MenuItem {
  id: string;
  label: string;
  description: string;
  icon?: string;
  routerLink?: string;
  command?: () => void;
  items?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItemsSubject = new BehaviorSubject<MenuItem[]>([]);
  private selectedMenuItemSubject = new BehaviorSubject<MenuItem | null>(null);

  menuItems$: Observable<MenuItem[]> = this.menuItemsSubject.asObservable();
  selectedMenuItem$: Observable<MenuItem | null> = this.selectedMenuItemSubject.asObservable();

  constructor() {
    this.setMenuItems([
      {
        id: 'dashboard',
        label: 'Dashboard',
        description: 'Vista general del restaurante',
        icon: 'pi pi-home',
        routerLink: '/admin'
      },
      {
        id: 'orders',
        label: 'Pedidos',
        description: 'Gestiona los pedidos del día',
        icon: 'pi pi-shopping-cart',
        routerLink: '/admin/orders'
      },
      {
        id: 'manage',
        label: 'Restaurante',
        description: 'Gestiona tu restaurante',
        icon: 'pi pi-shop',
        routerLink: '/admin/manage'
      },
      {
        id: 'analytics',
        label: 'Estadisticas',
        description: 'Analiza el rendimiento',
        icon: 'pi pi-chart-bar',
        routerLink: '/admin/analytics'
      },

    ]);
  }

  setMenuItems(items: MenuItem[]): void {
    this.menuItemsSubject.next(items);
  }

  addMenuItem(item: MenuItem): void {
    const currentItems = this.menuItemsSubject.value;
    this.menuItemsSubject.next([...currentItems, item]);
  }

  removeMenuItem(id: string): void {
    const currentItems = this.menuItemsSubject.value;
    const filteredItems = currentItems.filter(item => item.id !== id);
    this.menuItemsSubject.next(filteredItems);
  }

  selectMenuItem(item: MenuItem): void {
    this.selectedMenuItemSubject.next(item);
  }

  clearSelection(): void {
    this.selectedMenuItemSubject.next(null);
  }

  getMenuItems(): MenuItem[] {
    return this.menuItemsSubject.value;
  }

  getSelectedMenuItem(): MenuItem | null {
    return this.selectedMenuItemSubject.value;
  }
}
