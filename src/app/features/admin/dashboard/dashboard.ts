import { Component, inject } from '@angular/core';
import { MenuService, MenuItem } from '@app/core/services/menu/menu.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports: [ButtonModule],
  styles: ``
})
export class Dashboard {
  private menuService = inject(MenuService);

  addDynamicItem(): void {
    const newItem: MenuItem = {
      id: 'dynamic-' + Date.now(),
      label: 'Item Dinámico',
      description: 'Item dinámico agregado',
      icon: 'pi pi-star',
      routerLink: '/dynamic',
      command: () => {
        console.log('Dynamic item clicked');
      }
    };
    this.menuService.addMenuItem(newItem);
  }

  removeReports(): void {
    this.menuService.removeMenuItem('reports');
  }

  getCurrentSelection(): string {
    const selectedItem = this.menuService.getSelectedMenuItem();
    return selectedItem ? selectedItem.label : 'No selection';
  }

  clearSelection(): void {
    this.menuService.clearSelection();
  }
}
