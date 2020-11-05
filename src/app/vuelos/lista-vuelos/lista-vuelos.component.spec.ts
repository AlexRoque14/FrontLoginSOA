import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVuelosComponent } from './lista-vuelos.component';

describe('ListaVuelosComponent', () => {
  let component: ListaVuelosComponent;
  let fixture: ComponentFixture<ListaVuelosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaVuelosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
