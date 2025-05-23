import { TestBed } from '@angular/core/testing';

import { TestWebSocketService } from './test-web-socket.service';

describe('TestWebSocketService', () => {
  let service: TestWebSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestWebSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
