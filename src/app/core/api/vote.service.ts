import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoteService {
  public apiUrl = environment.API_URL;
  // Quản lý cuộc bầu cử
  constructor(private http: HttpClient) { }

  createVote(body?: any): Observable<any> {
    return this.http.post(this.apiUrl + `/api/vote/create`, body);
  }
}
