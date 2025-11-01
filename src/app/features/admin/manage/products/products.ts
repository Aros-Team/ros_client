import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule],
  templateUrl: './products.html',
  styles: ``
})
export class Products {
  title = 'Carta de Productos';
  description = 'Gestión completa de todos los productos del restaurante';
}
