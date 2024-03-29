import {defer, finalize, Observable} from 'rxjs';

/**
 * https://rxjs.dev/api/index/function/defer
 * defer():
 * Creates an Observable that, on subscribe,
 * calls an Observable factory to make an Observable for EACH NEW OBSERVER.
 */

/**
 * https://rxjs.dev/api/operators/finalize
 * finalize() operator
 * will call a specified function when the source terminates on complete or error.
 * The specified function will also
 * be called when the subscriber explicitly unsubscribes.
 */
/**
 * a custom operator that will count number of subscribers;;
 * Use :
 * const source$ = new Subject();
 * const result$ = source$.pipe(
 *   refCountLogger( n => console.log('Subscribers updated: ', n) )
 * );
 */
export function refCountLogger(onCountUpdate: (counter: number) => void = noop) {
  return function refCountLoggerFunction(source$: Observable<any>) {
    let counter: number = 0;

    return defer(() => {
      counter++;
      onCountUpdate(counter);
      return source$;
    })
      .pipe(
        finalize(() => {
          counter--;
          onCountUpdate(counter);
        })
      );
  };
}

// just a stub for `onCountUpdate`
function noop() {}
