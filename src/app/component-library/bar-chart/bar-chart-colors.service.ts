import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class BarChartColorsService {

  constructor(private http: Http){}

    private dataSource = "colors.json";

    getColors():Observable<Object[]>{
      return this.http.get(this.dataSource)
      .map(response => this.extractData(response));
    }

    private extractData(res:Response){
      return res.json() || {};
    }
  
}

