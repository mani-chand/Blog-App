import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewblogComponentComponent } from './newblog-component.component';

describe('NewblogComponentComponent', () => {
  let component: NewblogComponentComponent;
  let fixture: ComponentFixture<NewblogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewblogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewblogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
