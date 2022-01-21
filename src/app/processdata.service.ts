import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import {writeJsonFile} from 'write-json-file';
import { saveAs } from 'file-saver';

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

  setTimeout(async function () {

    
  
    if((clientData.FWD!==undefined)) archive.FWD = archive.FWD + 1;
    if((clientData.IDK!==undefined)) archive.IDK = archive.IDK + 1;
    if((clientData.adolescents!==undefined)) archive.adolescents = archive.adolescents + 1;
    if((clientData.carefuel!==undefined)) archive.carefuel = archive.carefuel + 1;
    if((clientData.firsttimers!==undefined)) archive.firsttimers = archive.firsttimers + 1;
    if((clientData.targetables!==undefined)) archive.targetables = archive.targetables + 1;
    if((clientData.unlicensed!==undefined)) archive.unlicensed = archive.unlicensed + 1;
    if((clientData.carmake!==undefined)) archive.carmake.push(clientData.carmake as never);
    if((clientData.carmake!==undefined)) archive.carmodel.push(clientData.carmodel as never);
    if((clientData.AvgCars!==undefined)) {
      archive.AvgCars =  (archive.AvgCars + clientData.AvgCars)/2;
    }

    // write the archive data to array
   // await writeJsonFile('data.json', archive);
   const blob = new Blob([JSON.stringify(archive)], {type : 'application/json'});
saveAs(blob, './assets/abc.json');
  }, 500);
  }


private getJSON(): Observable<any> {
    return this.http.get("./assets/data.json");
}

 
}


