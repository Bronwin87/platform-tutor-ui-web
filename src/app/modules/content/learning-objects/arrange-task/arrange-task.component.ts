import {Component, OnInit} from '@angular/core';
import {LearningObjectComponent} from '../learning-object-component';
import {ArrangeTask} from './model/arrange-task.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ArrangeTaskService} from './arrange-task.service';
import {Container} from './model/container.model';
import {Element} from './model/element.model';
import {ActivatedRoute} from '@angular/router';
import {shuffleArray} from '../../../../shared/helpers/arrays';
import {ArrangeTaskContainerSubmission} from './model/arrange-task-container-submission.model';
import {ArrangeTaskFeedback} from './model/arrange-task-feedback.model';

@Component({
  selector: 'cc-arrange-task',
  templateUrl: './arrange-task.component.html',
  styleUrls: ['./arrange-task.component.css']
})
export class ArrangeTaskComponent implements OnInit, LearningObjectComponent {

  learningObject: ArrangeTask;
  state: Container[];
  feedbackMap: Map<number, ArrangeTaskFeedback>;
  answered = false;

  constructor(private arrangeTaskService: ArrangeTaskService, private route: ActivatedRoute) {
    this.feedbackMap = new Map();
  }

  ngOnInit(): void {
    this.resetState();
  }

  get nodeId(): number {
    return +this.route.snapshot.paramMap.get('nodeId');
  }

  private isElementCorrect(elementId: number, containerId: number): boolean {
    return this.feedbackMap
      .get(containerId).correctElements
      .map(element => element.id).includes(elementId);
  }

  getMissingElements(containerId: number): Element[] {
    const elementIds = this.state.find(container => container.id === containerId)
      .elements.map(element => element.id);
    const missingElements = [];
    this.feedbackMap.get(containerId).correctElements.forEach(element => {
      if (!elementIds.includes(element.id)) {
        missingElements.push(element);
      }
    });
    return missingElements;
  }

  resetState(): void {
    this.state = [];
    this.learningObject.containers.forEach(container => {
      container.elements = [];
      this.state.push(container);
    });
    this.state[0].elements = shuffleArray([...this.learningObject.unarrangedElements]);
    this.answered = false;
  }

  drop(event: CdkDragDrop<Element[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onSubmit(): void {
    this.arrangeTaskService.submitTask(this.nodeId, this.learningObject.id, this.createArrangeTaskContainerSubmissionList())
      .subscribe(data => {
        console.log(data.submissionWasCorrect);
      });
    this.answered = true;
  }

  createArrangeTaskContainerSubmissionList(): ArrangeTaskContainerSubmission[] {
    const arrangeTaskContainerSubmissionList = [];
    const elements: number[] = [];

    this.state.forEach((container, key) => {
      const arrangeTaskContainerSubmission = new ArrangeTaskContainerSubmission(container.id);
      container.elements.forEach((element, keyEl) => {
        elements.push(element.id);
        arrangeTaskContainerSubmission.elementIds = elements;
      });
      arrangeTaskContainerSubmissionList.push(arrangeTaskContainerSubmission);
    });

    return arrangeTaskContainerSubmissionList;
  }
}
