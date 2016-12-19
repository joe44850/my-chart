import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ChartOptions {

  private dataSource = "/assets/data/options-saved.json";

  constructor(private http:Http){

  }

  setDataSource(source?:string){
    this.dataSource = (source) ? source : this.dataSource;
  }

  getOptions():Observable<any>{
    return this.http.get(this.dataSource)
              .map(response => response.json());
  }

}