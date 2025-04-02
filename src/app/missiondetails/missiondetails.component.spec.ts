// File: src/app/missiondetails/missiondetails.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MissionDetailsComponent } from './missiondetails.component';
import { ActivatedRoute } from '@angular/router';
import { SpacexApiService } from '../network/spacexapi.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Mission } from '../models/mission';

describe('MissionDetailsComponent', () => {
  let component: MissionDetailsComponent;
  let fixture: ComponentFixture<MissionDetailsComponent>;
  
  // Create a dummy mission for testing
  const dummyMission: Mission = {
    flight_number: 1,
    mission_name: 'Test Mission',
    launch_year: '2020',
    details: 'Test details for the mission.',
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissionDetailsComponent ],
      imports: [
        RouterTestingModule,
        MatCardModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        },
        {
          provide: SpacexApiService,
          useValue: { getLaunches: () => of([dummyMission]) }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and display mission details', () => {
    expect(component).toBeTruthy();
    expect(component.mission?.mission_name).toBe('Test Mission');
  });
});
