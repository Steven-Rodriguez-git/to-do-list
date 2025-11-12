import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { environment } from '../../../environments/environment';

describe('TaskService', () => {
  let service: TaskService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });
    service = TestBed.inject(TaskService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should GET tasks', () => {
    const mockTasks = [{ id: 1, title: 'Task 1', isCompleted: false }];
    service.getTasks('all').subscribe((res) => {
      expect(res).toEqual(mockTasks);
    });
    const req = http.expectOne(`${environment.apiBaseUrl}/tasks?status=all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });
});
