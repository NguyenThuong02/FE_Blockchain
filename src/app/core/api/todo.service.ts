import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StorageService } from '../services/storage.service';
import {
  changeParentToDoModel,
  changeUnitidToDoModel,
  createToDoModel,
  getListToDoModel,
  updateToDoModel,
} from '../model/toDo.model';

@Injectable({
  providedIn: 'root',
})
export class ToDOService {
  isUserLoggedIn!: boolean;
  public apiUrl = environment.API_URL;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storageService: StorageService,
  ) {}

  getListToDo(body: getListToDoModel): Observable<any> {
    return this.http.post(this.apiUrl + '/api/todo/list', body);
  }

  createToDo(body: createToDoModel): Observable<any> {
    return this.http.post(this.apiUrl + '/api/todo/create', body);
  }

  updateToDo(body: updateToDoModel): Observable<any> {
    return this.http.put(this.apiUrl + '/api/todo/update', body);
  }

  viewHistory(body: any): Observable<any> {
    return this.http.post(this.apiUrl + '/api/todo/edit-history', body);
  }

  deleteToDo(id: string): Observable<any> {
    return this.http.delete(this.apiUrl + '/api/todo/delete', {
      body: {
        id,
      },
    });
  }

  getToDoDetail(id: string): Observable<any> {
    return this.http.get(this.apiUrl + `/api/todo/detail?rq=${id}`);
  }
  changeParentToDo(body: changeParentToDoModel): Observable<any> {
    return this.http.patch(this.apiUrl + '/api/todo/change_parent', body);
  }
  changeUnitId(body: changeUnitidToDoModel): Observable<any> {
    return this.http.patch(this.apiUrl + '/api/todo/change-unit-id', body);
  }
}
