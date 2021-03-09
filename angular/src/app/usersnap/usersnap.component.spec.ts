import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersnapComponent } from './usersnap.component';

describe('UsersnapComponent', () => {
  let component: UsersnapComponent;
  let fixture: ComponentFixture<UsersnapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersnapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersnapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
