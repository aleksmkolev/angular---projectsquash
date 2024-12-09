import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCourtComponent } from './edit-court.component';

describe('EditCourtComponent', () => {
  let component: EditCourtComponent;
  let fixture: ComponentFixture<EditCourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCourtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
