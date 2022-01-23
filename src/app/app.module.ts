import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatStepperModule} from '@angular/material/stepper'
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarmodelComponent } from './carmodel/carmodel.component';
import { ExperienceComponent } from './experience/experience.component';
import { PersonalComponent } from './personal/personal.component';
import { CarSurveyQuestionnaireComponent } from './questionnaires/carsurvey/carsurvey-questionnaire.component';
import { ReportComponent } from './report/report.component';
import { TransportationComponent } from './transportation/transportation.component';
import { VehicletypeComponent } from './vehicletype/vehicletype.component';

@NgModule({
  declarations: [
    AppComponent,
    CarmodelComponent,
    CarSurveyQuestionnaireComponent,
    ExperienceComponent,
    PersonalComponent, 
    ReportComponent,
    TransportationComponent,
    VehicletypeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ChartsModule,
    FlexLayoutModule, 
    HttpClientModule,
    //Forms 
    FormsModule,
    ReactiveFormsModule,
    //Materials
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatMomentDateModule,
    MatStepperModule,
    MatTooltipModule,
  ],
  
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
