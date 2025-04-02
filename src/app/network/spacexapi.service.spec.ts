// File: src/app/network/spacexapi.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SpacexApiService } from './spacexapi.service';
import { Mission } from '../models/mission';

describe('SpacexApiService', () => {
  let service: SpacexApiService;
  let httpMock: HttpTestingController;
  const dummyMissions: Mission[] = [
    {
      flight_number: 1,
      mission_name: 'Test Mission',
      launch_year: '2020',
      details: 'Test details',
      links: {
        mission_patch_small: 'https://example.com/patch.png',
        article_link: 'https://example.com/article',
        wikipedia: 'https://example.com/wiki',
        video_link: 'https://example.com/video'
      },
      rocket: {
        rocket_name: 'Falcon 1',
        rocket_type: 'Merlin'
      }
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpacexApiService]
    });
    service = TestBed.inject(SpacexApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve launches', () => {
    service.getLaunches().subscribe(missions => {
      expect(missions.length).toBe(1);
      expect(missions).toEqual(dummyMissions);
    });

    const req = httpMock.expectOne('https://api.spacexdata.com/v3/launches');
    expect(req.request.method).toBe('GET');
    req.flush(dummyMissions);
  });
});
