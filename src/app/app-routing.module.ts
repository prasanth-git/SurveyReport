import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarSurveyQuestionnaireComponent } from './questionnaires/carsurvey/carsurvey-questionnaire.component';
import { ReportComponent } from './report/report.component';


const routes: Routes = [
  { path: '', component: CarSurveyQuestionnaireComponent },
  { path: 'findReport', component: ReportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
