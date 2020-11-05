import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosComprarComponent } from './vuelos-comprar.component';

describe('VuelosComprarComponent', () => {
  let component: VuelosComprarComponent;
  let fixture: ComponentFixture<VuelosComprarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VuelosComprarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VuelosComprarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
