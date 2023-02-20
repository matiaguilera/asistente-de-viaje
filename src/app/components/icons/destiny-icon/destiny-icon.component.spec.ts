import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinyIconComponent } from './destiny-icon.component';

describe('DestinyIconComponent', () => {
  let component: DestinyIconComponent;
  let fixture: ComponentFixture<DestinyIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestinyIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DestinyIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
