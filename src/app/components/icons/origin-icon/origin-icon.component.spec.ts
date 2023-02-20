import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginIconComponent } from './origin-icon.component';

describe('OriginIconComponent', () => {
  let component: OriginIconComponent;
  let fixture: ComponentFixture<OriginIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OriginIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OriginIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
