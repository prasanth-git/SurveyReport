import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { MatDatepickerModule} from '@angular/material/datepicker'
import { MatStepperModule} from '@angular/material/stepper'
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';

import { ContactComponent } from './components/contact/contact.component';
import { CarSurveyQuestionnaireComponent } from './questionnaires/carsurvey/carsurvey-questionnaire.component';
import { TransportationComponent } from './transportation/transportation.component';
import { ExperienceComponent } from './experience/experience.component';
import { VehicletypeComponent } from './vehicletype/vehicletype.component';
import { CarmodelComponent } from './carmodel/carmodel.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,  
    CarSurveyQuestionnaireComponent,
    TransportationComponent,
    ExperienceComponent,
    VehicletypeComponent,
    CarmodelComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule, 
    MatInputModule, 
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule ,
    
  ],
  
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
