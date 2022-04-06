import {BehaviorSubject, Observable} from 'rxjs';
import {first} from 'rxjs/operators';

export abstract class AbstractBehaviorSubjectService<T> {

  private data$!: BehaviorSubject<T>;
  private initData!: T;

  createStore(initData: any) {
    this.initData = initData;
    this.data$ = new BehaviorSubject(initData);
  }

  /**
   * client is interested by flow of data async
   */
  getData$() {
    return this.data$.asObservable();
  }

  /**
   * client is only interested by first result async
   */
  getData$One(): Observable<T> {
    return this.getData$().pipe(first());
  }

  /**
   * client is only interested by first result, in sync
   */
  getDataValue(): T {
    return this.data$.value;
  }

  /**
   * reset to FIRST value of BehaviorSubject
   */
  reset() {
    this.data$.next(this.initData);
  }

  protected next(data: T) {
    console.log(`${this.constructor.name} next()`, data);
    this.data$.next(data);
  }

}
