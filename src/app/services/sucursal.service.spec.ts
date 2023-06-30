/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SucursalService } from './sucursal.service';

describe('Service: Sucursal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SucursalService]
    });
  });

  it('should ...', inject([SucursalService], (service: SucursalService) => {
    expect(service).toBeTruthy();
  }));
});
