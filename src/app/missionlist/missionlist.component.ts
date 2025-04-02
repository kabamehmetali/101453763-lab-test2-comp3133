// File: src/app/missionlist/missionlist.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SpacexApiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionListComponent implements OnInit {
  missions: Mission[] = [];
  searchYear: string = '';

  constructor(private spacexService: SpacexApiService) { }

  ngOnInit(): void {
    this.getMissions();
  }

  getMissions(): void {
    if (this.searchYear) {
      this.spacexService.getLaunchesByYear(this.searchYear).subscribe(data => {
        this.missions = data;
      });
    } else {
      this.spacexService.getLaunches().subscribe(data => {
        this.missions = data;
      });
    }
  }

  onSearch(): void {
    this.getMissions();
  }
}
