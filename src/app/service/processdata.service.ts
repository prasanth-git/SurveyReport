import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Carsurvey } from '../questionnaires/carsurvey/carsurvey.model';
import { CarSurveyConstants } from '../questionnaires/carsurvey/carsurvey-constants';

@Injectable({
  providedIn: 'root'
})
export class ProcessdataService {

  constructor(private http: HttpClient) {}

  public  getJSON(): Observable<any> {
    return this.http.get(CarSurveyConstants.DATA_PATH);
}

  public processJson(clientData: Carsurvey) :void {
    var  archive : Carsurvey;
    this.getJSON().subscribe(data => {
      archive = data;
  });

  setTimeout(  () =>{
    if((clientData.FWD!==undefined)) archive.FWD = archive.FWD + 1;
    if((clientData.RWD!==undefined)) archive.RWD = archive.RWD + 1;
    if((clientData.IDK!==undefined)) archive.IDK = archive.IDK + 1;
    if((clientData.targetables!==undefined)) {
      archive.targetables = archive.targetables + 1;
    }
    if((clientData.adolescents!==undefined)){
      archive.adolescents = archive.adolescents + 1;
    }
    if((clientData.careFuel!==undefined)) {
      archive.careFuel = archive.careFuel + 1;
    }
    if((clientData.firstTimers!==undefined)) archive.firstTimers = archive.firstTimers + 1;

    if((clientData.unlicensed!==undefined)) archive.unlicensed = archive.unlicensed + 1;
    if((clientData.carMake!==undefined)) {
        this.addDataToModel(clientData.carMake, archive);
    }
    if((clientData.carModel!==undefined)){
      archive.carModel =archive.carModel.concat(clientData.carModel );
    } 
    if((clientData.avgCars!==undefined)) {
      archive.avgCars =  (archive.avgCars + clientData.avgCars)/2;
    }
   this.pushToAWS(archive);
  }, 5000);
  }

  private addDataToModel(carmake:string[], archive:Carsurvey): void {
  
    var num : number;
     for (var i=0; i<carmake.length ; i++) {
        num = 0;
        var index = this.getIndex(carmake[i]);
        num = parseInt(archive.carMake[index]) +1
        archive.carMake[index] = num.toString();
     }

  }

  private getIndex(carmake:string) : number {
    switch(carmake){
      case CarSurveyConstants.BMW: return 0;
      case CarSurveyConstants.LAMBORGHINI: return 1;
      case CarSurveyConstants.FORD: return 2;
      case CarSurveyConstants.AUDI: return 3;
      case CarSurveyConstants.OTHERS: return 4;
    }
  }

private pushToAWS(archive:Carsurvey):void {
  // write the archive data to the api calls!
  let headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
   });
   let options = { headers: headers };
 this.http.post(' https://7gh619mog3.execute-api.us-east-2.amazonaws.com/Prod/store',archive,options).subscribe((data=>{ }));
}
}

