import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KcmProgressComponent } from './kcm-progress/kcm-progress.component';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MaterialModule } from 'src/app/infrastructure/material.module';
import {AssessmentsTableComponent} from './kcm-progress/learner-progress/assessments-table/assessments-table.component';
import {LearnerProgressComponent} from './kcm-progress/learner-progress/learner-progress.component';

@NgModule({
  declarations: [
    KcmProgressComponent,
    AssessmentsTableComponent,
    LearnerProgressComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxChartsModule,
    MatExpansionModule,
  ],
})
export class GroupMonitoringModule {}
