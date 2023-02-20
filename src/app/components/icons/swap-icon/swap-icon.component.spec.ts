import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapIconComponent } from './swap-icon.component';

describe('SwapIconComponent', () => {
  let component: SwapIconComponent;
  let fixture: ComponentFixture<SwapIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwapIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwapIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
