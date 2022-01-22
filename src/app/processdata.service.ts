import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    if((clientData.IDK!==undefined)) archive.IDK = archive.IDK + 1;
    if((clientData.adolescents!==undefined)){
      archive.adolescents = archive.adolescents + 1;
    }
    if((clientData.carefuel!==undefined)) archive.carefuel = archive.carefuel + 1;
    if((clientData.firsttimers!==undefined)) archive.firsttimers = archive.firsttimers + 1;
    if((clientData.targetables!==undefined)) archive.targetables = archive.targetables + 1;
    if((clientData.unlicensed!==undefined)) archive.unlicensed = archive.unlicensed + 1;
    if((clientData.carmake!==undefined)) {
       var arr:never[]= archive.carmake.concat(clientData.carmake as never);
       archive.carmake = this.getUniqueValues(arr);

    }
    if((clientData.carmake!==undefined)){
      var arr: never[] =archive.carmodel.concat(clientData.carmodel as never);
      archive.carmodel = this.getUniqueValues(arr);
    } 
    if((clientData.AvgCars!==undefined)) {
      archive.AvgCars =  (archive.AvgCars + clientData.AvgCars)/2;
    }

    // write the archive data to the api calls!
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
     });

     console.log(archive);
   //  let httpParams = UtilsService.buildQueryParams(archive);
     let options = { headers: headers };
  //this.http.get('https://lprms608t1.execute-api.us-east-2.amazonaws.com/Prod/archive',options) .subscribe (data =>{});
  
  
   this.http.post(' https://lprms608t1.execute-api.us-east-2.amazonaws.com/Prod/store',archive,options).subscribe((data=>{ }));

  }, 500);
  }


private getJSON(): Observable<any> {
    return this.http.get("./assets/data.json");
}

private getUniqueValues(arr : never []) : []{
  var tmp : []=[];
    for(var i = 0; i < arr.length; i++){
   
        if(tmp.indexOf(arr[i]) == -1){
           tmp.push(arr[i]);
        }
    }
    return tmp;
}
}


// export class UtilsService {
//   static buildQueryParams(source: Object): HttpParams {
//       let target: HttpParams = new HttpParams();
//       Object.keys(source).forEach((key: string) => {
//           const value: string | number | boolean | Date = source[key];
//           if ((typeof value !== 'undefined') && (value !== null)) {
//               target = target.append(key, value.toString());
//           }
//       });
//       console.log(target);
//       return target;
//   }
// }