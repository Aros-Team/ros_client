import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage',
  imports: [CommonModule, RouterModule],
  templateUrl: './manage.html',
  styles: ``
})
export class Manage {
  activeSection = 'staff';

  sections = [
    { id: 'staff', label: 'Trabajadores', icon: 'pi pi-users' },
    { id: 'tables', label: 'Mesas', icon: 'pi pi-table' },
    { id: 'categories', label: 'Categorías', icon: 'pi pi-folder' },
    { id: 'areas', label: 'Áreas', icon: 'pi pi-tag' }
  ];
}
