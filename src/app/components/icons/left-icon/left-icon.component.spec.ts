import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftIconComponent } from './left-icon.component';

describe('LeftIconComponent', () => {
  let component: LeftIconComponent;
  let fixture: ComponentFixture<LeftIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeftIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
