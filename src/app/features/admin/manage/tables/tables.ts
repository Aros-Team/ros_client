import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { TableService } from '@app/core/services/tables/table-service';
import { MessageService } from 'primeng/api';
import { FormValidation } from '@app/shared/components/form/form-validation';

@Component({
  selector: 'app-tables',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    IftaLabelModule,
    FormValidation,
  ],
  templateUrl: './tables.html',
  styles: ``
})
export class Tables {
  private tableService = inject(TableService);
  private messageService = inject(MessageService);

  title = 'Gestión de Mesas';
  description = 'Configura el número total de mesas del restaurante';

  currentTableAmount = 0;

  tableForm: FormGroup = new FormGroup({
    total: new FormControl(0, [Validators.required, Validators.min(1)]),
  });

  constructor() {
    this.loadCurrentTableAmount();
  }

  loadCurrentTableAmount(): void {
    this.tableService.getTableAmount().subscribe({
      next: (response) => {
        this.currentTableAmount = response.amount;
      },
      error: (err) => {
        console.error('Error al obtener la cantidad de mesas:', err);
        this.currentTableAmount = 0;
      }
    });
  }

  saveTableCount(): void {
    if (this.tableForm.valid) {
      const total = this.tableForm.get('total')?.value;
      console.log('Enviando petición con total:', total);
      console.log('JSON que se enviará:', { total });

      this.tableService.createMultipleTables(total).subscribe({
        next: (response) => {
          console.log('Respuesta exitosa del servidor:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Operación exitosa',
            detail: `Se han agregado ${total} mesas exitosamente.`,
            life: 3000,
          });
          // Recargar la cantidad actual de mesas
          this.loadCurrentTableAmount();
        },
        error: (err) => {
          console.error('Error completo:', err);
          console.error('Status:', err.status);
          console.error('Mensaje:', err.message);
          console.error('Error del servidor:', err.error);

          let errorMessage = 'No se pudo guardar la cantidad de mesas.';
          if (err.status === 0) {
            errorMessage = 'No se puede conectar con el servidor. Verifica que la API esté corriendo en el puerto 8080.';
          } else if (err.error?.message) {
            errorMessage = err.error.message;
          }

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 5000,
          });
        }
      });
    } else {
      console.log('Formulario inválido:', this.tableForm.value);
    }
  }

  public isValidField(field: string): boolean {
    const fieldControl = this.tableForm.get(field);
    return !!(fieldControl?.invalid && fieldControl?.touched);
  }
}
