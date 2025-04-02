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
  // Additional filter properties
  selectedYear: string = '';
  selectedLaunchSuccess: string = '';
  selectedLandingSuccess: string = '';

  // Optional: List of years to display as filter buttons (customize as needed)
  availableYears: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];

  constructor(private spacexService: SpacexApiService) { }

  ngOnInit(): void {
    this.getMissions();
  }

  // Load missions based on filters; if no filter is set, load all missions.
  getMissions(): void {
    // Build filters object
    const filters: { [key: string]: any } = {
      launch_year: this.selectedYear,
      launch_success: this.selectedLaunchSuccess,
      land_success: this.selectedLandingSuccess
    };
    // If no filters are set, you may choose to call getLaunches() instead.
    this.spacexService.getFilteredLaunches(filters).subscribe(data => {
      this.missions = data;
    });
  }

  // Called when a filter button is clicked to set the year filter
  filterByYear(year: string): void {
    this.selectedYear = year;
    this.getMissions();
  }

  // Called when a filter button for launch success is clicked
  filterByLaunchSuccess(value: string): void {
    this.selectedLaunchSuccess = value;
    this.getMissions();
  }

  // Called when a filter button for landing success is clicked
  filterByLandingSuccess(value: string): void {
    this.selectedLandingSuccess = value;
    this.getMissions();
  }

  // Clear all filters
  clearFilters(): void {
    this.selectedYear = '';
    this.selectedLaunchSuccess = '';
    this.selectedLandingSuccess = '';
    this.getMissions();
  }
}
