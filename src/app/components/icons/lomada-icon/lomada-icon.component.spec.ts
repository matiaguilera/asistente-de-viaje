import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LomadaIconComponent } from './lomada-icon.component';

describe('LomadaIconComponent', () => {
  let component: LomadaIconComponent;
  let fixture: ComponentFixture<LomadaIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LomadaIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LomadaIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
