import { TestBed } from '@angular/core/testing';

import { AdminAgGridService } from './admin-ag-grid.service';

describe('AdminAgGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminAgGridService = TestBed.get(AdminAgGridService);
    expect(service).toBeTruthy();
  });
});
