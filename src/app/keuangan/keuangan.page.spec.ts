import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { KeuanganPage } from './keuangan.page';

describe('KeuanganPage', () => {
  let component: KeuanganPage;
  let fixture: ComponentFixture<KeuanganPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(KeuanganPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
