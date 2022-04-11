import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from './state';

@Injectable({
  providedIn: 'root'
})
export class StatesHttp {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<State[]> {
    return this.httpClient.get<State[]>('http://localhost:3300/states')
      .pipe(tap(v => console.log('findAll HTTP call response', v)));
  }

  findFirst(): Observable<State> {
    return this.httpClient.get<State[]>('http://localhost:3300/states')
      .pipe(
        map(s => s[0]),
        tap(v => { console.log('HTTP ¤¤¤¤¤', v); })
      );
  }

}
