## Stackoverflow example

https://stackoverflow.com/questions/57082131/rxjs-chained-sharereplay-doesnt-multicast-properly

NOT modified

````
apiData = this.api.get(url).pipe(
  tap(() => console.log('Data Fetched')),
  shareReplay(1)
);

work = this.apiData.pipe(
  tap(() => console.log('Building Controls')),
  tap((data) => this.buildControls(data)),
  shareReplay(1)
);

dataBasedOncontrols = this.work.pipe(
  tap(() => console.log('Computed Data')),
  switchMap(() => this.controlDataStream())
);
````

## Original Comments **modified** for better understanding

In versions >= 6.4.0 (and 5.4.0)
There are two things which could cause a resubscription.

1) If the source observable throws an error then that error will be propagated to all current subscribers (GAUTHIER :
   which will then become "dead" and unsubscribed as well as all the chain of operators, all unsubs ins cascade, and
   when unsub occurs the shareReplay cache is cleared). Any future subscription to the shared observable will trigger a
   resubscription to the source.

2) If refCount: true is passed in the configuration when calling shareReplay (i.e. shareReplay({bufferSize: 1, refCount:
   true})) AND the source observable has not completed (G. meaning here apiData$) AND there are no current active
   subscriptions to the shared observable. Any future subscription will trigger a resubscription to the source.

This could happen pretty easily if, for example, you are using a first or takeUntil on one of your subscribers. The
first subscriber finishes before the second subscriber subscribes.
