import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExcursionData } from '../models/excursions-data';


@Injectable({
  providedIn: 'root'
})

export class ExcursionDataFetcherService {
  private DATA_URL:string = 'http://localhost:3000/excursion-data'
  public excursionsData: Observable<ExcursionData[]>

  constructor(private httpClient: HttpClient) { 
    this.excursionsData = httpClient.get<ExcursionData[]>(this.DATA_URL)
  }
}
