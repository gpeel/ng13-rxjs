import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {finalize, Observable, Subject, tap} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from './state';

@Injectable({
  providedIn: 'root'
})
export class StatesHttp {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<State[]> {
    return this.httpClient.get<State[]>('http://localhost:3300/states');
  }

  findFirst(): Observable<State> {
    return this.httpClient.get<State[]>('http://localhost:3300/states')
      .pipe(
        map(s => s[0])
      );
  }

  findNeverEnding(): Observable<State> {
    const s = new Subject<State>();
    setTimeout(() => {s.next({name: 'pipo', id: 2, abbreviation: 'GG'});}, 1000);
    return s.pipe(
      tap(v => { console.log('Pseudo HTTP', v); }),
      finalize(() => { console.log('Finalize HTTP'); })
    );
  }

  findNeverEndingSecondData(): Observable<State> {
    const s = new Subject<State>();
    setTimeout(() => {s.next({name: 'pipo', id: 2, abbreviation: 'GG'});}, 1000);
    setTimeout(() => {s.next({name: 'pipo2', id: 3, abbreviation: 'ZZ'});}, 10000);
    return s.pipe(
      tap(v => { console.log('Pseudo HTTP', v); }),
      finalize(() => { console.log('Finalize HTTP'); })
    );
  }
}
