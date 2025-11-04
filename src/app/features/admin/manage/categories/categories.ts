import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CategoryService } from '@app/core/services/category/category-service';
import { FormValidation } from '@app/shared/components/form/form-validation';
import { CategorySimpleResponse } from '@app/shared/models/dto/category/category-simple-response';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    IftaLabelModule,
    InputTextModule,
    ButtonModule,
    FormValidation,
  ],
  templateUrl: './categories.html',
  styles: ``
})
export class Categories implements OnInit {
  title = 'Categorías';
  description = 'Gestiona las categorías de productos del restaurante';

  formBuilder = inject(FormBuilder);
  private categoryService = inject(CategoryService);

  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
  });

  saved = false;
  errorMsg: string | null = null;
  categories: CategorySimpleResponse[] = [];

  ngOnInit(): void {
    this.refresh();
  }

  saveCategory(): void {
    this.saved = false;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.categoryService.createCategory({ name: this.form.get('name')?.value }).subscribe({
      next: () => {
        this.errorMsg = null;
        this.saved = true;
        this.form.reset();
        this.refresh();
      },
      error: () => {
        this.saved = false;
        this.errorMsg = 'No se pudo guardar la categoría';
      },
    });
  }

  private refresh(): void {
    this.categoryService.getCategories().subscribe((res) => (this.categories = res));
  }
}
