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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TaskService, TodoTask } from '../core/services/task.service';

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
        <!-- Filtro: mat-select dentro de mat-form-field -->
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

        <!-- Form crear -->
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
          <mat-checkbox
            [checked]="t.isCompleted"
            (change)="toggleComplete(t)"
          ></mat-checkbox>
          <span [class.done]="t.isCompleted">{{ t.title }}</span>
          <span class="spacer"></span>
          <button mat-icon-button color="warn" (click)="remove(t)">
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
      }
      .done {
        text-decoration: line-through;
        opacity: 0.7;
      }
      .w-100 {
        width: 100%;
      }
    `,
  ],
})
export class TasksPageComponent implements OnInit {
  tasks: TodoTask[] = [];
  status = signal<'all' | 'completed' | 'pending'>('all');
  loading = false;

  constructor(private api: TaskService, private snack: MatSnackBar) {}

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
        this.snack.open('Error cargando tareas', 'OK', { duration: 2000 });
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
        this.snack.open('Actualizada', 'OK', { duration: 1200 });
      },
      error: () =>
        this.snack.open('Error actualizando', 'OK', { duration: 2000 }),
    });
  }

  remove(t: TodoTask) {
    this.api.deleteTask(t.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((x) => x.id !== t.id);
        this.snack.open('Eliminada', 'OK', { duration: 1200 });
      },
      error: () =>
        this.snack.open('Error eliminando', 'OK', { duration: 2000 }),
    });
  }

  create(title: string) {
    if (!title?.trim()) return;
    const dto = { title, description: '', isCompleted: false, dueDate: null };
    this.api.createTask(dto).subscribe({
      next: (created) => {
        this.tasks = [created, ...this.tasks];
        this.snack.open('Creada', 'OK', { duration: 1200 });
      },
      error: () => this.snack.open('Error creando', 'OK', { duration: 2000 }),
    });
  }
}
