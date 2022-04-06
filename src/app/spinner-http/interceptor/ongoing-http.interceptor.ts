import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {OngoingHttpStateStandaloneService} from '../behavior-subject/ongoing-http-state-standalone.service';


/**
 * Sometime Chrome Cancels a Request !
 * Or when you switchMap() RxJS does cancel the preceding Http request, and you don't have any response.
 * So this cancellation has to be captured to decrement the ongoing number of requests.
 * With Angular, HttClient DOES NOT return any event in that case
 * and you have a pending Request !
 * I used 2 tips (which I corrected and used together) from stackoverflow to make it work$.
 * https://stackoverflow.com/questions/50172055/angular-5-httpinterceptor-detect-cancelled-xhr
 * https://stackoverflow.com/questions/47218216/angular-how-to-know-if-request-has-been-cancelled-in-httpclient/49536421#49536421
 */
@Injectable({
  providedIn: 'root'
})
export class OngoingHttpInterceptor implements HttpInterceptor {

  ongoing = 0;

  constructor(private ongoingHttpRequestState: OngoingHttpStateStandaloneService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.ongoing++;
    if (this.ongoing === 1) {
      this.ongoingHttpRequestState.next(true);
    }

    return new Observable(observer => {
      let isCanceled = true;
      const sub = next.handle(req)
        .pipe(
          tap(
            (rsp: HttpEvent<any>) => {
              if (rsp.type === HttpEventType.Response) {
                isCanceled = false;
                this.decrement();
              }
            },
            (rspError: HttpErrorResponse) => {
              isCanceled = false;
              this.decrement();
              throwError(rspError); // re-throw same e
            },
          ),
        )
        .subscribe(observer);

      return () => {
        if (isCanceled) {
          this.decrement();
          sub.unsubscribe();
        }
      };
    });

  }

  private decrement() {
    this.ongoing--;
    if (this.ongoing === 0) {
      this.ongoingHttpRequestState.next(false); // no more Http Request going on
    }
  }

}



