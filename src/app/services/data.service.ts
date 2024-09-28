import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { config } from '@environments/config';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiBaseUrl = config.baseUrl;
  private apiKey = config.apiKey;
  private header = {
    headers: {
      apiKey: this.apiKey,
    },
  };
  constructor(private http: HttpClient) {}

  //feed verisini api'dan gerekli parametreler ile çeken fonksiyon
  getFeed({
    limit,
    skip,
    latitude,
    longitude,
  }: {
    limit: number;
    skip: number;
    latitude: number;
    longitude: number;
  }): Observable<any> {
    const body = { limit, skip, latitude, longitude };
    const response = this.http
      .post<any>(`${this.apiBaseUrl}/getFeed`, body, this.header)
      .pipe(map((responseData) => responseData.response));
    return response;
  }
  //store-info verisini api'dan gerekli parametreler ile çeken fonksiyon
  getStoreInfo({ id }: { id: string }): Observable<any> {
    const body = { id };
    const response = this.http
      .post<any>(`${this.apiBaseUrl}/storeInfo`, body, this.header)
      .pipe(map((responseData) => responseData.response));
    return response;
  }
}
