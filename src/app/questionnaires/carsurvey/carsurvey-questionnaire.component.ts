import { Component, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { CarmodelComponent } from 'src/app/carmodel/carmodel.component';

@Component({
  selector: 'app-carsurvey-questionnaire',
  templateUrl: './carsurvey-questionnaire.component.html',
  styleUrls: ['./carsurvey-questionnaire.component.css']
})
export class CarSurveyQuestionnaireComponent {

 // @ViewChild("carmodelComponent") carmodelComponent: CarmodelComponent;

  SURVEY_ENDED= "Thanks for your time, Survey is ended!";
  SURVEY_ENDED_EXP = "We are targeting more experienced clients, thank you for your interest ";

  msg = this.SURVEY_ENDED; //default message
  isFirstTimers = false;
  isAdoloscent = true;
  isEnded = false;
  isCarModelDone = false;
  numberOfCars;
  isWrongModel = false;
  errorCount = 0;



  openNextStep(){
    this.isCarModelDone = true;
  }

  onSubmit(form: NgForm): void {
    const json = JSON.stringify(form.value);
    console.log("prints.."+json);
    return;
  }

  isEndedBeforeFirstTimers() {
         return (!this.isEnded && this.isFirstTimers)?  true : false;
  }

  validatePattern(form:NgForm){
  //consider first value as model followed by type
  var typemodel = form.value.vehicletypemodel;

  console.log(typemodel); //{ 1Model: "bmw", 1Type: "a", 2Model: "bmw", 2Type: "b" }
  const mapped = Object.keys(typemodel).map(key => ({type: key, value: typemodel[key]}));

  for(var i = 0 ; i<mapped.length; i=i+2){

    if(mapped[i].value === "bmw"){
      var car_type = (mapped[i+1].value).toLowerCase();

      var regex = /\d+/g;

      if(car_type.startsWith("m")|| car_type.startsWith("d",car_type.length-1)||
                     car_type.startsWith("i",car_type.length-1)){

                      console.log(car_type)
            if(car_type.match(regex!==null) && car_type.match(regex)[0].length !==3) {
              this.errorCount++;
            }
      } 
      else if(car_type.startsWith("x") || car_type.startsWith("z")){
        console.log(car_type)
        if(car_type.match(regex!==null) && car_type.match(regex)[0].length !==1) {
         this.errorCount++;
         }
      }
      else {
        this.errorCount++;
      }
    }
  }

  if(!this.isWrongModel) this.isEnded = false;
  else this.isEnded = true;
  }

  onClick(form: NgForm): void {
    const json = JSON.stringify(form.value);
    console.log("prints"+json);
  }

  public onStepChange(event: any, stepper:MatStepper,form :NgForm): void { 

    if(form.value.personal !== undefined) {

    if(form.value.personal.age < 18) {

       this.isEnded = true;
       this.isAdoloscent = false;

        //save the data here
        const json = JSON.stringify(form.value);
    }


    if((form.value.personal.age >  17) && ( form.value.personal.age < 26 )) {
      this.isFirstTimers = true;
    }
  }

    if(form.value.transportation!== undefined) {

      if(form.value.transportation.preference == "no") {
        
        this.isEnded = true;
      }
    }

    if(form.value.experience !== undefined) {
       if(form.value.experience.exp == "yes"){
        this.isEnded = true;
        this.msg = this.SURVEY_ENDED_EXP;
        //save the data here
        const json = JSON.stringify(form.value);
       }
    }

    if(form.value.vehicletype !== undefined) {
     // console.log(form.value);
      this.numberOfCars = (form.value.vehicletype.noCars);
    }

  }
}
