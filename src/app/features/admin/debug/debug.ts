import { Component, inject } from '@angular/core';
import { MenuService } from '@app/core/services/menu/menu.service';

@Component({
  selector: 'app-debug',
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold text-surface-900 dark:text-surface-0 mb-6">Debug - Sidebar Behavior</h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Screen Info -->
        <div class="bg-surface-0 dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-6">
          <h2 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-4">Información de Pantalla</h2>
          <div class="space-y-2">
            <p><strong>Ancho:</strong> {{ windowWidth }}px</p>
            <p><strong>Altura:</strong> {{ windowHeight }}px</p>
            <p><strong>Breakpoint:</strong> {{ breakpointInfo }}</p>
            <p><strong>Es Móvil:</strong> {{ isMobile ? 'Sí' : 'No' }}</p>
          </div>
        </div>

        <!-- Sidebar State -->
        <div class="bg-surface-0 dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-6">
          <h2 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-4">Estado del Sidebar</h2>
          <div class="space-y-2">
            <p><strong>Visible:</strong> {{ sidebarVisible ? 'Sí' : 'No' }}</p>
            <p><strong>Posición:</strong> Derecha</p>
            <p><strong>Overlay Activo:</strong> {{ overlayActive ? 'Sí' : 'No' }}</p>
          </div>
        </div>

        <!-- Menu Service Info -->
        <div class="bg-surface-0 dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-6">
          <h2 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-4">Servicio de Menú</h2>
          <div class="space-y-2">
            <p><strong>Items del Menú:</strong> {{ menuItemsCount }}</p>
            <p><strong>Selección Actual:</strong> {{ currentSelection || 'Ninguna' }}</p>
          </div>
        </div>

        <!-- Test Controls -->
        <div class="bg-surface-0 dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-6">
          <h2 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-4">Controles de Prueba</h2>
          <div class="space-y-2">
            <p class="text-sm text-surface-600 dark:text-surface-400">
              Usa el botón de menú en el header para probar el toggle del sidebar.
            </p>
            <p class="text-sm text-surface-600 dark:text-surface-400">
              Redimensiona la ventana para probar la responsividad.
            </p>
          </div>
        </div>
      </div>

      <!-- Responsive Behavior Info -->
      <div class="bg-surface-0 dark:bg-surface-800 rounded-lg shadow-sm border border-surface-200 dark:border-surface-700 p-6">
        <h2 class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-4">Comportamiento Responsivo Esperado</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 class="font-semibold text-surface-700 dark:text-surface-300 mb-2">Desktop (≥1024px)</h3>
            <ul class="list-disc list-inside text-surface-600 dark:text-surface-400 space-y-1">
              <li>Sidebar siempre visible a la derecha</li>
              <li>Sin overlay</li>
              <li>Contenido con margen derecho para el sidebar</li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-surface-700 dark:text-surface-300 mb-2">Mobile (&lt;1024px)</h3>
            <ul class="list-disc list-inside text-surface-600 dark:text-surface-400 space-y-1">
              <li>Sidebar oculto por defecto</li>
              <li>Overlay cuando está abierto</li>
              <li>Se abre con botón de menú</li>
              <li>Se cierra con botón X o click en overlay</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Current Issues -->
      <div class="bg-yellow-50 dark:bg-yellow-900 rounded-lg shadow-sm border border-yellow-200 dark:border-yellow-700 p-6 mt-6">
        <h2 class="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4">Problemas Conocidos</h2>
        <ul class="list-disc list-inside text-yellow-700 dark:text-yellow-300 space-y-2">
          <li>Sidebar no se oculta correctamente en móviles</li>
          <li>Elemento negro (overlay) aparece entre 1024-1080px</li>
          <li>Visibilidad inconsistente en diferentes breakpoints</li>
        </ul>
      </div>
    </div>
  `,
  styles: ``
})
export class Debug {
  private menuService = inject(MenuService);

  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  isMobile = window.innerWidth < 1024;
  sidebarVisible = !this.isMobile;
  overlayActive = false;

  get breakpointInfo(): string {
    const width = this.windowWidth;
    if (width < 640) return 'xs (<640px)';
    if (width < 768) return 'sm (640-767px)';
    if (width < 1024) return 'md (768-1023px)';
    if (width < 1280) return 'lg (1024-1279px)';
    return 'xl (≥1280px)';
  }

  get menuItemsCount(): number {
    return this.menuService.getMenuItems().length;
  }

  get currentSelection(): string {
    const selected = this.menuService.getSelectedMenuItem();
    return selected ? selected.label : '';
  }

  constructor() {
    // Listen for window resize
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      this.isMobile = window.innerWidth < 1024;
    });
  }
}
