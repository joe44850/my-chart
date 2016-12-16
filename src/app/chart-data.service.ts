import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ChartDataService {

  constructor(private http: Http) { }

  private dataSource = "/assets/data/students1.json";

  getStudents(): Observable<any>{
    return this.http.get(this.dataSource)
               .map(this.extractData)
               .catch(this.errorHandler);
  }

  private extractData(res: Response){
    let body = res.json();   
    return body.students || {};
  }

  private errorHandler(error: Response | any){
    let errMsg: string;
    if(error instanceof Response){
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
