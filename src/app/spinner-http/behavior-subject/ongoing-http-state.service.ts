import {Injectable} from '@angular/core';
import {AbstractBehaviorSubjectService} from '../../_utils-behavior-subject/abstract-behavior-subject.service';

const INITIAL_ONGOING_VALUE = false;

@Injectable({
  providedIn: 'root'
})
export class OngoingHttpState extends AbstractBehaviorSubjectService<boolean> {

  constructor() {
    super();
    super.createStore(INITIAL_ONGOING_VALUE);
  }

}



