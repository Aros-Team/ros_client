import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.html',
  styles: ``
})
export class Menu {
  title = 'Menús del Día';
  description = 'Historial y gestión de menús promocionales por día';
}
