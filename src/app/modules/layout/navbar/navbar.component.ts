import {Component, Input, OnInit} from '@angular/core';
import {UnitService} from '../../domain/unit/unit.service';
import {Unit} from '../../domain/unit/unit.model';
import {KnowledgeComponent} from '../../domain/knowledge-component/model/knowledge-component.model';
import {Learner} from '../../learner/learner.model';
import {LearnerService} from '../../learner/learner.service';
import {Router} from '@angular/router';

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

  constructor(private unitService: UnitService, private learnerService: LearnerService, private router: Router) {
  }

  ngOnInit(): void {
    this.unitService.getUnits().subscribe(units => this.units = units);
    this.learnerService.learner$.subscribe(learner => this.learner = learner);
  }

  onUnitSelected(unit): void {
    this.unitService.getUnit(unit.id, this.learner.id).subscribe(fullUnit => {
      this.knowledgeComponents = fullUnit.knowledgeComponents;
      this.selectedUnit = fullUnit;
      this.selectedKC = null;
      this.router.navigate(['unit/' + fullUnit.id], {state: {unit: fullUnit}});
    });
  }

  onKCSelected(kc): void {
    this.selectedKC = kc;
    this.router.navigate(['kc/' + kc.id]);
  }

  onLogout(): void {
    this.learnerService.logout();
    this.resetNavBar();
  }

  resetNavBar(): void {
    this.selectedUnit = null;
    this.selectedKC = null;
  }
}
