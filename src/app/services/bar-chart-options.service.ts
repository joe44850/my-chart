import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BarChartOptionsService {

  constructor(private http:Http) { }

  dataSource = "/assets/data/options-saved.json"

  setDataSource(dataSource?){
    this.dataSource = dataSource || this.dataSource;
  }

  getOptions():Observable<any>{
    return this.http.get(this.dataSource)
      .map(response => this.extractData(response));
  }

  private extractData(res: Response){
    return res.json() || {};
  }

}
