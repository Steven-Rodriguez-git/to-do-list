import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface TodoTask {
  id: number;
  title: string;
  description?: string | null;
  isCompleted: boolean;
  dueDate?: string | null; // ISO
}

export interface Dashboard {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private base = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getTasks(
    status: 'all' | 'completed' | 'pending' = 'all'
  ): Observable<TodoTask[]> {
    const params = new HttpParams().set('status', status);
    return this.http.get<TodoTask[]>(`${this.base}/tasks`, { params });
  }

  getTask(id: number): Observable<TodoTask> {
    return this.http.get<TodoTask>(`${this.base}/tasks/${id}`);
  }

  createTask(dto: Partial<TodoTask>): Observable<TodoTask> {
    return this.http.post<TodoTask>(`${this.base}/tasks`, dto);
  }

  updateTask(id: number, dto: Partial<TodoTask>) {
    return this.http.put<void>(`${this.base}/tasks/${id}`, dto);
  }

  deleteTask(id: number) {
    return this.http.delete<void>(`${this.base}/tasks/${id}`);
  }

  getDashboard(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.base}/dashboard`);
  }
}
