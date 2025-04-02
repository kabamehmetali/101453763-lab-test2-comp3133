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
  selectedYear: string = '';
  selectedLaunchSuccess: string = '';
  selectedLandingSuccess: string = '';
  // New property for mission status filter ("successful" or "failed")
  selectedStatus: string = '';
  searchTerm: string = '';
  availableYears: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];

  constructor(private spacexService: SpacexApiService) { }

  ngOnInit(): void {
    this.getMissions();
  }

  getMissions(): void {
    const filters: { [key: string]: any } = {
      launch_year: this.selectedYear,
      launch_success: this.selectedLaunchSuccess,
      land_success: this.selectedLandingSuccess
    };
    this.spacexService.getFilteredLaunches(filters).subscribe(data => {
      let filteredData = data;
      // Apply search filter if provided
      if (this.searchTerm.trim() !== '') {
        const term = this.searchTerm.trim().toLowerCase();
        filteredData = filteredData.filter(mission =>
          mission.mission_name.toLowerCase().includes(term) ||
          mission.launch_year.includes(term)
        );
      }
      // Apply mission status filter if selected (using helper method)
      if (this.selectedStatus) {
        filteredData = filteredData.filter(mission =>
          this.selectedStatus === 'successful'
            ? !this.isMissionFailed(mission)
            : this.isMissionFailed(mission)
        );
      }
      this.missions = filteredData;
    });
  }

  filterByYear(year: string): void {
    this.selectedYear = year;
    this.getMissions();
  }

  filterByLaunchSuccess(value: string): void {
    this.selectedLaunchSuccess = value;
    this.getMissions();
  }

  filterByLandingSuccess(value: string): void {
    this.selectedLandingSuccess = value;
    this.getMissions();
  }

  filterByStatus(status: string): void {
    this.selectedStatus = status;
    this.getMissions();
  }

  clearFilters(): void {
    this.selectedYear = '';
    this.selectedLaunchSuccess = '';
    this.selectedLandingSuccess = '';
    this.selectedStatus = '';
    this.searchTerm = '';
    this.getMissions();
  }

  // Determines overall mission status based on API data.
  // A mission is considered failed if launch_success is explicitly false.
  isMissionFailed(mission: Mission): boolean {
    return mission.launch_success === false;
  }
}
