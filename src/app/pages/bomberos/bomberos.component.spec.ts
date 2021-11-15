import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BomberosComponent } from './bomberos.component';

describe('BomberosComponent', () => {
  let component: BomberosComponent;
  let fixture: ComponentFixture<BomberosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BomberosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BomberosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
