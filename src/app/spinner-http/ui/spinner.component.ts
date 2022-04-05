import {Component, OnInit} from '@angular/core';
import {OngoingHttpState} from '../behavior-subject/ongoing-http-state.service';


@Component({
  selector: 'spinner',
  template: `
    <div *ngIf="show">
      <div class="spinner-border text-primary" role="status">
      </div>
    </div>

  `
})
export class SpinnerComponent implements OnInit {
  show = false;

  constructor(private ongoingHttpRequestState: OngoingHttpState) { }

  ngOnInit(): void {
    this.ongoingHttpRequestState.getData$().subscribe(s => this.show = s);
  }
}
