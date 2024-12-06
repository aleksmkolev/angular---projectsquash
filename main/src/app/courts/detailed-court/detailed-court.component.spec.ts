import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedCourtComponent } from './detailed-court.component';

describe('DetailedCourtComponent', () => {
  let component: DetailedCourtComponent;
  let fixture: ComponentFixture<DetailedCourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedCourtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedCourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
