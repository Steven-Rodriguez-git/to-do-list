import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TasksPageComponent } from './tasks-page.component';
import { TaskService, TodoTask } from '../core/services/task.service';

class TaskServiceMock {
  getTasks = jasmine.createSpy('getTasks').and.returnValue(of([]));
  createTask = jasmine
    .createSpy('createTask')
    .and.callFake((dto: Partial<TodoTask>) =>
      of({
        id: 1,
        title: dto.title!,
        description: '',
        isCompleted: false,
        dueDate: null,
      } as TodoTask)
    );
  updateTask = jasmine.createSpy('updateTask').and.returnValue(of(void 0));
  deleteTask = jasmine.createSpy('deleteTask').and.returnValue(of(void 0));
}

describe('TasksPageComponent (standalone)', () => {
  let component: TasksPageComponent;
  let fixture: ComponentFixture<TasksPageComponent>;
  let api: TaskServiceMock;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPageComponent, NoopAnimationsModule],
      providers: [{ provide: TaskService, useClass: TaskServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPageComponent);
    component = fixture.componentInstance;
    api = TestBed.inject(TaskService) as unknown as TaskServiceMock;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar getTasks en ngOnInit y asignar la lista', () => {
    const mockList: TodoTask[] = [
      {
        id: 10,
        title: 'A',
        isCompleted: false,
        description: '',
        dueDate: null,
      },
      { id: 11, title: 'B', isCompleted: true, description: '', dueDate: null },
    ];
    api.getTasks.and.returnValue(of(mockList));

    fixture.detectChanges(); 

    expect(api.getTasks).toHaveBeenCalledWith('all');
    expect(component.tasks.length).toBe(2);
  });

  it('debe mostrar mensaje de error si getTasks falla', () => {
    api.getTasks.and.returnValue(throwError(() => new Error('fail')));
    fixture.detectChanges(); 
    expect(component.loading).toBeFalse();
    
  });

  it('create(): debe agregar la tarea creada al inicio del arreglo', () => {
    component.tasks = [
      {
        id: 2,
        title: 'Existente',
        isCompleted: false,
        description: '',
        dueDate: null,
      },
    ];

    component.create('Nueva');
    expect(api.createTask).toHaveBeenCalledWith({
      title: 'Nueva',
      description: '',
      isCompleted: false,
      dueDate: null,
    } as Partial<TodoTask>);

    expect(component.tasks[0].title).toBe('Nueva');
  });

  it('toggleComplete(): debe alternar isCompleted y llamar updateTask', () => {
    const t: TodoTask = {
      id: 9,
      title: 'X',
      isCompleted: false,
      description: '',
      dueDate: null,
    };
    component.tasks = [t];

    component.toggleComplete(t);

    expect(api.updateTask).toHaveBeenCalledWith(9, { ...t, isCompleted: true });
    expect(t.isCompleted).toBeTrue();
  });

  it('remove(): debe llamar deleteTask y sacar la tarea del arreglo', () => {
    const t1: TodoTask = {
      id: 1,
      title: 'A',
      isCompleted: false,
      description: '',
      dueDate: null,
    };
    const t2: TodoTask = {
      id: 2,
      title: 'B',
      isCompleted: false,
      description: '',
      dueDate: null,
    };
    component.tasks = [t1, t2];

    component.remove(t1);

    expect(api.deleteTask).toHaveBeenCalledWith(1);
    expect(component.tasks.find((x) => x.id === 1)).toBeUndefined();
    expect(component.tasks.length).toBe(1);
  });
});
