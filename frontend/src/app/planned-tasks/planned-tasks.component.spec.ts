import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedTasksComponent } from './planned-tasks.component';

describe('PlannedTasksComponent', () => {
  let component: PlannedTasksComponent;
  let fixture: ComponentFixture<PlannedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlannedTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
