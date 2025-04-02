// File: src/app/missiondetails/missiondetails.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SpacexApiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missiondetails',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissionDetailsComponent implements OnInit {
  mission: Mission | undefined;

  constructor(
    private route: ActivatedRoute,
    private spacexService: SpacexApiService
  ) { }

  ngOnInit(): void {
    const flightNumber = this.route.snapshot.paramMap.get('flight_number');
    if (flightNumber) {
      this.spacexService.getLaunches().subscribe(data => {
        this.mission = data.find(m => m.flight_number === +flightNumber);
      });
    }
  }
}
