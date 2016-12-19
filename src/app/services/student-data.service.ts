import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentDataService {

  constructor(private http: Http) { }
  url: string = "/assets/data/students1.json";

  getStudents(url?:string):Observable<Object[]>{
    this.url = url || this.url;
    return this.http.get(this.url).map(
      response => this.extractData(response)
    );
  }

  private extractData(res: Response){
    return res.json() || {};
  }

}
