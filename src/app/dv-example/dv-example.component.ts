import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-dv-example',
  templateUrl: './dv-example.component.html',
  styleUrls: ['./dv-example.component.css', '../home/home.component.css']
})
export class DvExampleComponent implements OnInit {
  optionsSource = "/assets/data/dv-options.json";  
  fields: Array<any> = ["score"];
  fieldOptions: Array<any> = [];
  data: Array<any>;  
  dataOptions: Array<any>;
  uiOptions: Array<any>;
  optionsList: Array<any> = [];
  displayOptions = false;
  dataSource: string = "";
  showHide: string = "fadeout";

  constructor(private http: Http) { }

  /* for now we store options in a json file, later it will be in the db */
  ngOnInit() {
    let self = this;
    this.serviceOptions().subscribe(
      json => {
        self.optionsList = json;
      }
    );
  } 

  public showOptions(i:number){    
    if(i<0){
      this.displayOptions = false; 
      this.showHide = "fadeout";     
    }
    else{
      this.displayOptions = true;
      this.dataOptions = this.optionsList[i];  
      this.uiOptions = this.dataOptions["uiOptions"];       
      this.getData();                
    }

  }

  private getData(){    
    if(this.dataOptions['dataSource'] == this.dataSource){
      this.showHide = "myShow"; 
      return;
    }
    else{ this.dataSource = this.dataOptions['dataSource'];}
    this.serviceData(this.dataSource).subscribe(
      json => {
        this.data = json;
        
        this.showHide = "myShow";      
      }
    );
  }

  /* Data retrieval services */
  private serviceData(src):Observable<Object[]>{    
    
    return this.http.get(src)
    .map(res => this.extractData(res));
  }

  private serviceOptions():Observable<Object[]>{
    return this.http.get(this.optionsSource)
      .map(res => this.extractData(res));
  }

  private extractData(res: Response){
    return res.json() || {};
  }

}
