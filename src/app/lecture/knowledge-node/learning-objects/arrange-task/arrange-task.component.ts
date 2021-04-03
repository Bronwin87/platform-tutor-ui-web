import { Component, OnInit } from '@angular/core';
import { LearningObjectComponent } from '../learning-object-component';
import { ArrangeTask } from './model/arrange-task.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ArrangeTaskService } from './service/arrange-task.service';
import { Container } from './model/container.model';
import { Element } from './model/element.model';

@Component({
  selector: 'cc-arrange-task',
  templateUrl: './arrange-task.component.html',
  styleUrls: ['./arrange-task.component.css']
})
export class ArrangeTaskComponent implements OnInit, LearningObjectComponent {

  learningObject: ArrangeTask;
  state: Container[];
  answered = false;

  constructor(private arrangeTaskService: ArrangeTaskService) {
  }

  ngOnInit(): void {
    this.resetState();
  }

  resetState(): void {
    this.state = [];
    this.learningObject.containers.forEach(container => {
      container.elements = [];
      this.state.push(container);
    });
    this.state[0].elements = [...this.learningObject.unarrangedElements];
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
    this.arrangeTaskService.submitTask(this.learningObject.id, this.state).subscribe(data => {
      // TODO: Do something with the response data
      this.answered = true;
    });
  }

}
