import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LearningObject } from './learning-objects/learning-object.model';
import { KnowledgeComponent } from '../model/knowledge-component.model';
import { KnowledgeComponentService } from './knowledge-component.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'cc-knowledge-component',
  templateUrl: './knowledge-component.component.html',
  styleUrls: ['./knowledge-component.component.css'],
})
export class KnowledgeComponentComponent implements OnInit, OnDestroy {
  knowledgeComponent: KnowledgeComponent;
  learningObjects: LearningObject[];
  sidenavOpened = false;
  instructionalItemsShown = true;
  unitId: number;
  courseId: number;

  constructor(private route: ActivatedRoute, private knowledgeComponentService: KnowledgeComponentService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (this.knowledgeComponent)
        this.knowledgeComponentService
          .terminateSession(this.knowledgeComponent.id)
          .subscribe();
      this.knowledgeComponentService.launchSession(+params.kcId).subscribe(() => {
        this.getKnowledgeComponent(+params.kcId);
        this.unitId = +params.unitId;
        this.courseId = +params.courseId;
      });
    });
  }

  ngOnDestroy(): void {
    this.knowledgeComponentService
      .terminateSession(this.knowledgeComponent.id)
      .subscribe();
  }

  nextPage(page: string): void {
    if (page === 'AE') {
      this.onAssessmentItemClicked();
    } else if (page === 'IE') {
      this.onInstructionalItemsClicked();
    }
  }

  private getKnowledgeComponent(kcId: number): void {
    this.knowledgeComponentService.getKnowledgeComponent(kcId).subscribe((kc) => {
      this.knowledgeComponent = kc;
      this.onInstructionalItemsClicked();
    });
  }

  onInstructionalItemsClicked(): void {
    this.knowledgeComponentService
      .getInstructionalItems(this.knowledgeComponent.id)
      .subscribe((instructionalItems) => {
        this.instructionalItemsShown = true;
        this.learningObjects = instructionalItems;
        this.scrollToTop();
      });
  }

  onAssessmentItemClicked(): void {
    this.knowledgeComponentService
      .getSuitableAssessmentItem(this.knowledgeComponent.id)
      .subscribe((assessmentItem) => {
        this.instructionalItemsShown = false;
        this.learningObjects = [];
        this.learningObjects[0] = assessmentItem;
        this.scrollToTop();
      });
  }

  private scrollToTop() {
    document.querySelector('#router-outlet').scrollTop = 0;
  }
}
