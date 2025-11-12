import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TaskService, TodoTask } from '../core/services/task.service';
import { NotificationService } from '../core/services/notification.service';

@Component({
  standalone: true,
  selector: 'app-tasks-page',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  template: `
    <mat-card>
      <div class="row">
        <mat-form-field appearance="outline">
          <mat-label>Filtrar</mat-label>
          <mat-select
            [ngModel]="status()"
            (ngModelChange)="status.set($event); load()"
          >
            <mat-option [value]="'all'">Todas</mat-option>
            <mat-option [value]="'completed'">Completadas</mat-option>
            <mat-option [value]="'pending'">Pendientes</mat-option>
          </mat-select>
        </mat-form-field>

        <span class="spacer"></span>

        <form
          (ngSubmit)="create(newTitle.value); newTitle.value = ''"
          class="row"
        >
          <mat-form-field appearance="outline" class="w-100">
            <mat-label>Nueva tarea</mat-label>
            <input matInput #newTitle />
          </mat-form-field>
          <button mat-raised-button color="primary">Agregar</button>
        </form>
      </div>

      <div *ngIf="loading">Cargando...</div>

      <ul *ngIf="!loading">
        <li *ngFor="let t of tasks; trackBy: trackById" class="item">
          <mat-checkbox [checked]="t.isCompleted" (change)="toggleComplete(t)">
          </mat-checkbox>

          <!-- Vista normal -->
          <ng-container *ngIf="editingId !== t.id; else editTpl">
            <span
              class="title"
              [class.done]="t.isCompleted"
              (dblclick)="startEdit(t)"
            >
              {{ t.title }}
            </span>
            <button mat-icon-button (click)="startEdit(t)" aria-label="Editar">
              <mat-icon>edit</mat-icon>
            </button>
          </ng-container>

          <!-- Modo edición -->
          <ng-template #editTpl>
          <input
  class="inline-input"
  [(ngModel)]="editTitle"
  autofocus
  (keydown.enter)="confirmEdit(t)"
  (keydown.escape)="cancelEdit()"
/>
            <button
              mat-icon-button
              color="primary"
              (click)="confirmEdit(t)"
              aria-label="Guardar"
            >
              <mat-icon>check</mat-icon>
            </button>
            <button
              mat-icon-button
              (click)="cancelEdit()"
              aria-label="Cancelar"
            >
              <mat-icon>close</mat-icon>
            </button>
          </ng-template>

          <span class="spacer"></span>
          <button
            mat-icon-button
            color="warn"
            (click)="remove(t)"
            aria-label="Eliminar"
          >
            <mat-icon>delete</mat-icon>
          </button>
        </li>
      </ul>
    </mat-card>
  `,
  styles: [
    `
      .row {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      }
      .spacer {
        flex: 1 1 auto;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 12px 0 0;
      }
      .item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 0;
        border-bottom: 1px solid #eee;
        flex-wrap: wrap;
      }
      .done {
        text-decoration: line-through;
        opacity: 0.7;
      }
      .w-100 {
        width: 100%;
      }
      .title {
        cursor: pointer;
        user-select: none;
      }
      .inline-input {
        font: inherit;
        padding: 6px 8px;
        width: 240px;
        border: 1px solid #ccc;
        border-radius: 6px;
        outline: none;
      }
      .inline-input:focus {
        border-color: #3f51b5;
      }
      mat-card {
        margin: 16px auto;
        max-width: 800px;
        display: block;
      }
    `,
  ],
})
export class TasksPageComponent implements OnInit {
  tasks: TodoTask[] = [];
  status = signal<'all' | 'completed' | 'pending'>('all');
  loading = false;

  editingId: number | null = null;
  editTitle = '';

  constructor(private api: TaskService, private notify: NotificationService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.api.getTasks(this.status()).subscribe({
      next: (list) => {
        this.tasks = list;
        this.loading = false;
      },
      error: () => {
        this.notify.error('Error cargando tareas');
        this.loading = false;
      },
    });
  }

  trackById = (_: number, t: TodoTask) => t.id;

  toggleComplete(t: TodoTask) {
    const updated = { ...t, isCompleted: !t.isCompleted };
    this.api.updateTask(t.id, updated).subscribe({
      next: () => {
        t.isCompleted = !t.isCompleted;
        this.notify.success('Tarea actualizada');
      },
      error: () => this.notify.error('Error actualizando tarea'),
    });
  }

  remove(t: TodoTask) {
    this.api.deleteTask(t.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((x) => x.id !== t.id);
        this.notify.success('Tarea eliminada');
      },
      error: () => this.notify.error('Error eliminando tarea'),
    });
  }

  create(title: string) {
    const clean = title?.trim();
    if (!clean) {
      this.notify.info('El título no puede estar vacío');
      return;
    }

    const dto = {
      title: clean,
      description: '',
      isCompleted: false,
      dueDate: null,
    };
    this.api.createTask(dto).subscribe({
      next: (created) => {
        this.tasks = [created, ...this.tasks];
        this.notify.success('Tarea creada');
      },
      error: () => this.notify.error('Error creando tarea'),
    });
  }

  startEdit(t: TodoTask) {
    this.editingId = t.id;
    this.editTitle = t.title;
  }

  cancelEdit() {
    this.editingId = null;
    this.editTitle = '';
  }

  confirmEdit(t: TodoTask) {
    const newTitle = this.editTitle.trim();
    if (!newTitle) {
      this.notify.info('El título no puede estar vacío');
      return;
    }
    if (newTitle === t.title) {
      this.cancelEdit();
      return;
    }

    this.api.updateTask(t.id, { ...t, title: newTitle }).subscribe({
      next: () => {
        t.title = newTitle;
        this.cancelEdit();
        this.notify.success('Título actualizado');
      },
      error: () => this.notify.error('Error actualizando título'),
    });
  }
}
