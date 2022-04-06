import {Component, OnInit} from '@angular/core';
import {OngoingHttpStateStandaloneService} from '../behavior-subject/ongoing-http-state-standalone.service';


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

  constructor(private ongoingHttpRequestState: OngoingHttpStateStandaloneService) { }

  ngOnInit(): void {
    this.ongoingHttpRequestState.getOngoing$().subscribe(s => this.show = s);
  }
}
