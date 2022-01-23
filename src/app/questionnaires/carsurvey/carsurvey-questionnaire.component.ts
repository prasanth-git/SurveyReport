import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

import { ProcessdataService } from '../../service/processdata.service';
import { Carsurvey } from './carsurvey.model';
import {CarSurveyConstants} from './carsurvey-constants';

@Component({
  selector: 'app-carsurvey-questionnaire',
  templateUrl: './carsurvey-questionnaire.component.html',
  styleUrls: ['./carsurvey-questionnaire.component.css']
})
export class CarSurveyQuestionnaireComponent {

  TOOL_TIP_MSG: string= CarSurveyConstants.TOOL_TIP_MSG;
  MODEL_ERROR_MSG: string = CarSurveyConstants.MODEL_ERROR_MSG;
  msg :string = CarSurveyConstants.SURVEY_ENDED; //default message
  isFirstTimers: boolean = false;
  isAdoloscent: boolean = true;
  isEnded: boolean = false;
  isCarModelDone: boolean = false;
  report: Carsurvey;
  numberOfCars : number;
  errorCount:number = 0;
  count: number = 0;
  
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
  this.report.carMake = [];
  this.report.carModel = [];

  for(var i = 0 ; i<mapped.length; i=i+2){
  
    var cartype  = mapped[i].value as never ;
    var carmodel = (mapped[i+1].value).toUpperCase() as never;

    if(mapped[i].value === CarSurveyConstants.BMW){
      var car_type = (mapped[i+1].value).toLowerCase();

      if(car_type.startsWith("m")|| car_type.startsWith("d",car_type.length-1)||
                     car_type.startsWith("i",car_type.length-1)){
            if(car_type.match(CarSurveyConstants.REGEX)===null || 
                (car_type.match(CarSurveyConstants.REGEX)!==null && car_type.match(CarSurveyConstants.REGEX)[0].length !==3)) {
              this.errorCount++;
            } else {
              this.report.carMake.push(cartype);
              this.report.carModel.push(carmodel);
            }
      } 
      else if(car_type.startsWith("x") || car_type.startsWith("z")){
        if(car_type.match(CarSurveyConstants.REGEX)===null || 
               (car_type.match(CarSurveyConstants.REGEX)!==null && car_type.match(CarSurveyConstants.REGEX)[0].length !==1)) {
         this.errorCount++;
         }  else {
          this.report.carMake.push(cartype);
          this.report.carModel.push(carmodel);
        }
      }
      else {
        this.errorCount++;
      }
    }
    else {
      this.report.carMake.push(cartype);
      this.report.carModel.push(carmodel);
    }
  }
  if(this.errorCount === 0) {

    stepper.next();
  }
  }

  onClick(form: NgForm): void {
  form.resetForm();
  this.count++;
  if(this.count==1) 
      this.processdataService.processJson(this.report);
  }

  public onStepChange(event: any, form :NgForm): void { 

    if(form.value.personal !== undefined) {
    if(form.value.personal.age < 18) {
       this.isEnded = true;
       this.isAdoloscent = false;
       this.report.adolescents = 1; 

    }
    else if((form.value.personal.age >  17) && ( form.value.personal.age < 26 )) {
      this.isFirstTimers = true;
    }
  }
    if(form.value.transportation!== undefined){
     if( form.value.transportation.preference == "no" ) {
      this.report.unlicensed = 1;
        this.isEnded = true;
    } 
  }
    if(form.value.experience !== undefined) {

      if (form.value.experience.exp.length!=0){
          this.report.firstTimers = 1
      }
    if(form.value.experience.exp == "yes") {
        this.isEnded = true;
        this.msg = CarSurveyConstants.SURVEY_ENDED_EXP;
    }
  }


    if(form.value.vehicletype !== undefined) {

      if(form.value.vehicletype.noCars.length !==0){
        this.report.targetables = 1;
        this.report.avgCars = form.value.vehicletype.noCars;
      }
        
      
      this.numberOfCars = (form.value.vehicletype.noCars);
      
      
      if(form.value.vehicletype.drivetrain === "fwd") {
        this.report.FWD = 1;
      }
      else if(form.value.vehicletype.drivetrain === "noidea") {
        this.report.IDK = 1;
      }
      else if(form.value.vehicletype.drivetrain === "rwd") {
        this.report.RWD = 1;
      }
    }
  }
}