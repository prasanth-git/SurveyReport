import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarSurveyConstants } from './questionnaires/carsurvey/carsurvey-constants';

import { Carsurvey } from './questionnaires/carsurvey/carsurvey.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessdataService {

  constructor(private http: HttpClient) {}

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
    if((clientData.carefuel!==undefined)) {
      archive.carefuel = archive.carefuel + 1;
    }
    if((clientData.firsttimers!==undefined)) archive.firsttimers = archive.firsttimers + 1;

    if((clientData.unlicensed!==undefined)) archive.unlicensed = archive.unlicensed + 1;
    if((clientData.carmake!==undefined)) {
        this.addDataToModel(clientData.carmake, archive);
    }
    if((clientData.carmodel!==undefined)){
      archive.carmodel =archive.carmodel.concat(clientData.carmodel );
    } 
    if((clientData.AvgCars!==undefined)) {
      archive.AvgCars =  (archive.AvgCars + clientData.AvgCars)/2;
    }
  // console.log(archive);
   this.pushToAWS(archive);
  
  }, 500);
  }

  private addDataToModel(carmake,archive:Carsurvey){

    var num : number;
     for (var i=0; i<carmake.length ; i++) {
        num = 0;
        var index = this.getIndex(carmake[i]);
        num = parseInt(archive.carmake[index]) +1
        archive.carmake[index] = num.toString();
     }
  }


  private getIndex(carmake) : number {
    switch(carmake){
      case CarSurveyConstants.BMW: return 0;
      case CarSurveyConstants.LAMBORGHINI: return 1;
      case CarSurveyConstants.FORD: return 2;
      case CarSurveyConstants.AUDI: return 3;
      case CarSurveyConstants.OTHERS: return 4;
    }
  }


public  getJSON(): Observable<any> {
    return this.http.get("./assets/data.json");
}

private pushToAWS(archive){
  // write the archive data to the api calls!
  let headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
   });

   //console.log(archive);
 //  let httpParams = UtilsService.buildQueryParams(archive);
   let options = { headers: headers };
//this.http.get('https://lprms608t1.execute-api.us-east-2.amazonaws.com/Prod/archive',options) .subscribe (data =>{});
 this.http.post(' https://lprms608t1.execute-api.us-east-2.amazonaws.com/Prod/store',archive,options).subscribe((data=>{ }));
}
}

