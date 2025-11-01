import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.html',
  styles: ``
})
export class Orders {
  title = 'Gestión de Pedidos';
  description = 'Aquí puedes gestionar todos los pedidos del restaurante';
}
