// File: src/app/network/spacexapi.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class SpacexApiService {
  private baseUrl = 'https://api.spacexdata.com/v3';

  constructor(private http: HttpClient) { }

  // Retrieves all launches from SpaceX API
  getLaunches(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${this.baseUrl}/launches`);
  }

  // Retrieves launches based on provided filters
  getFilteredLaunches(filters: { [key: string]: any }): Observable<Mission[]> {
    const queryParams = Object.entries(filters)
      .filter(([key, value]) => value !== null && value !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    const url = `${this.baseUrl}/launches${queryParams ? '?' + queryParams : ''}`;
    return this.http.get<Mission[]>(url);
  }
}
