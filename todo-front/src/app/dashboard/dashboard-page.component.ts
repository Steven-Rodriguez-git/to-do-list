import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TaskService, Dashboard } from '../core/services/task.service';

@Component({
  standalone: true,
  selector: 'app-dashboard-page',
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card *ngIf="data">
      <h2>Dashboard</h2>
      <p>Total: {{ data.totalTasks }}</p>
      <p>Completadas: {{ data.completedTasks }}</p>
      <p>Pendientes: {{ data.pendingTasks }}</p>
    </mat-card>
  `,
})
export class DashboardPageComponent implements OnInit {
  data?: Dashboard;
  constructor(private api: TaskService) {}
  ngOnInit() {
    this.api.getDashboard().subscribe((d) => (this.data = d));
  }
}
