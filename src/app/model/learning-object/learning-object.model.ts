import { Type } from '@angular/core';
import { LearningObjectComponent } from '../../modules/content/learning-objects/learning-object-component';

export abstract class LearningObject {
  id: number;
  learningObjectSummaryId: number;

  constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.learningObjectSummaryId = obj.learningObjectSummaryId;
    }
  }

  abstract getComponent(): Type<LearningObjectComponent>;

}
