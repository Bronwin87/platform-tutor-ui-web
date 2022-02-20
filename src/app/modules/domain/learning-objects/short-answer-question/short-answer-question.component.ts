import { Component } from '@angular/core';
import {LearningObjectComponent} from '../learning-object-component';
import {ShortAnswerQuestion} from './short-answer-question.model';
import {SaqEvaluation} from './saq-evaluation.model';
import {HttpClient} from '@angular/common/http';
import {LearnerService} from '../../../learner/learner.service';
import {environment} from '../../../../../environments/environment';
import {map} from 'rxjs/operators';

@Component({
  selector: 'cc-short-answer-question',
  templateUrl: './short-answer-question.component.html',
  styleUrls: ['./short-answer-question.component.scss']
})
export class ShortAnswerQuestionComponent implements LearningObjectComponent {
  learningObject: ShortAnswerQuestion;
  response: SaqEvaluation;
  answer: string;

  constructor(private http: HttpClient, private learnerService: LearnerService) {
  }

  onSubmit(): void {
    this.http.post(
      environment.apiHost + 'submissions/short-answer',
      {
        assessmentEventId: this.learningObject.id,
        learnerId: this.learnerService.learner$.value.id,
        answer: this.answer
      }).pipe(map(data => {
        return new SaqEvaluation(data);
    })).subscribe(evaluation => this.response = evaluation);
  }
}
