import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { stringify } from 'querystring';
import { ProcessdataService } from 'src/app/processdata.service';
import { Carsurvey } from './carsurvey.model';

@Component({
  selector: 'app-carsurvey-questionnaire',
  templateUrl: './carsurvey-questionnaire.component.html',
  styleUrls: ['./carsurvey-questionnaire.component.css']
})
export class CarSurveyQuestionnaireComponent {

  BMW ="bmw";
  MODEL_ERROR_MSG = "Wrong BMW Type!  ";
  REGEX = /\d+/g;
  SURVEY_ENDED= "Thanks for your time, Survey is ended!";
  SURVEY_ENDED_EXP = "We are targeting more experienced clients, thank you for your interest ";
  TOOL_TIP_MSG = "Format should be (3 Numbers and Starts with \"M\" [or] Ends with \"d\" or \"i\") [or] (Starts with \"X\" or \"Z\" and 1 number)";

  msg = this.SURVEY_ENDED; //default message
  isFirstTimers = false;
  isAdoloscent = true;
  isEnded = false;
  isCarModelDone = false;
   report: Carsurvey;
  numberOfCars : number;
  errorCount = 0;

  constructor(
    private processdataService : ProcessdataService 
) { this.report =new Carsurvey();}

  public openNextStep() : void {
    this.isCarModelDone = true;
  }

  public onSubmit(form: NgForm): void { return;}

  public isEndedBeforeFirstTimers() : boolean {
         return (!this.isEnded && this.isFirstTimers)?  true : false;
  }

  public validatePattern(form:NgForm,stepper:MatStepper) : void {
  var typemodel = form.value.vehicletypemodel;
  this.errorCount = 0;
  const mapped = Object.keys(typemodel).map(key => ({type: key, value: typemodel[key]}));
  this.report.carmake = [];
  this.report.carmodel = [];

  for(var i = 0 ; i<mapped.length; i=i+2){

    var cartype  = mapped[i].value as never ;
    var carmodel = mapped[i+1].value as never;

    if(mapped[i].value === this.BMW){
      var car_type = (mapped[i+1].value).toLowerCase();

      if(car_type.startsWith("m")|| car_type.startsWith("d",car_type.length-1)||
                     car_type.startsWith("i",car_type.length-1)){
            if(car_type.match(this.REGEX)===null || 
                (car_type.match(this.REGEX)!==null && car_type.match(this.REGEX)[0].length !==3)) {
              this.errorCount++;
            } else {
              this.report.carmake.push(cartype);
              this.report.carmodel.push(carmodel);
            }
      } 
      else if(car_type.startsWith("x") || car_type.startsWith("z")){
        if(car_type.match(this.REGEX)===null || 
               (car_type.match(this.REGEX)!==null && car_type.match(this.REGEX)[0].length !==1)) {
         this.errorCount++;
         }  else {
          this.report.carmake.push(cartype);
          this.report.carmodel.push(carmodel);
        }
      }
      else {
        this.errorCount++;
      }
    }
    else {
      this.report.carmake.push(cartype);
      this.report.carmodel.push(carmodel);
    }
  }
  if(this.errorCount === 0) {

    stepper.next();
  }
  }

  onClick(form: NgForm): void {
   this.processdataService.processJson(this.report);
  }

  public onStepChange(event: any, form :NgForm): void { 

    if(form.value.personal !== undefined) {
    if(form.value.personal.age < 18) {
       this.isEnded = true;
       this.isAdoloscent = false;
       this.report.adolescents = 100; 

    }
    else if((form.value.personal.age >  17) && ( form.value.personal.age < 26 )) {
      this.report.firsttimers = 1;
      this.isFirstTimers = true;
    }
  }
    if(form.value.transportation!== undefined && form.value.transportation.preference == "no" ) {
      this.report.unlicensed = 1;
        this.isEnded = true;
    }
    if(form.value.experience !== undefined && form.value.experience.exp == "yes") {
        this.isEnded = true;
        this.msg = this.SURVEY_ENDED_EXP;
    }
    if(form.value.vehicletype !== undefined) {
      this.report.targetables = 1;
      this.numberOfCars = (form.value.vehicletype.noCars);
      this.report.AvgCars = form.value.vehicletype.noCars;
      
      if(form.value.vehicletype.drivetrain === "fwd") {
        this.report.FWD = 1;
      }
      else if(form.value.vehicletype.drivetrain === "noidea"){
        this.report.IDK = 1;
      }
    }

    
  }
}