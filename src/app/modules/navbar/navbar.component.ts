import {Component, Input, OnInit} from '@angular/core';
import {UnitService} from '../domain/unit/unit.service';
import {Unit} from '../domain/unit/model/unit.model';
import {KnowledgeComponent} from '../domain/knowledge-component/model/knowledge-component.model';
import {Learner} from '../learner/learner.model';
import {LearnerService} from '../learner/learner.service';

@Component({
  selector: 'cc-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  units: Unit[];
  knowledgeComponents: KnowledgeComponent[];
  learner: Learner;
  selectedUnit: Unit;
  selectedKC: KnowledgeComponent;
  @Input() isDarkTheme: boolean;

  constructor(private unitService: UnitService, private learnerService: LearnerService) {
  }

  ngOnInit(): void {
    this.unitService.getUnits().subscribe(units => this.units = units);
    this.learnerService.learner$.subscribe(learner => this.learner = learner);
  }

  onUnitSelected(unit): void {
    this.knowledgeComponents = unit.knowledgeComponents;
    this.selectedUnit = unit;
    this.selectedKC = null;
  }

  onKCSelected(kc): void {
    this.selectedKC = kc;
  }

  onLogout(): void {
    this.learnerService.logout();
  }

  resetNavBar(): void {
    this.selectedUnit = null;
  }
}
