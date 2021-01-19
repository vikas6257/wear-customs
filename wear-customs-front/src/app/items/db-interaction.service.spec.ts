import { TestBed } from '@angular/core/testing';

import { DbInteractionService } from './db-interaction.service';

describe('DbInteractionService', () => {
  let service: DbInteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbInteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
