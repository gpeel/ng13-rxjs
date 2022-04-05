import {Injectable} from '@angular/core';
import {AbstractBehaviorSubjectService} from './abstract-behavior-subject.service';


@Injectable({
  providedIn: 'root'
})
export class OngoingHttpState extends AbstractBehaviorSubjectService<boolean> {

  constructor() {
    super();
    super.createStore(false);
  }

}



