import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule],
  templateUrl: './analytics.html',
  styles: ``
})
export class Analytics {
  title = 'Estadísticas';
  description = 'Visualiza las estadísticas de tu restaurante';
}
