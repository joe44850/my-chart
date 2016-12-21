import { Component, OnInit } from '@angular/core';
import { BarChartOptionsService } from '../services/bar-chart-options.service';
import { Observable } from 'rxjs/observable';
import { ChartDataService } from '../services/chart-data.service';

@Component({
  selector: 'app-barchart-example',
  templateUrl: './barchart-example.component.html',
  styleUrls: ['./barchart-example.component.css', '../home/home.component.css']
})
export class BarchartExampleComponent implements OnInit {

  mydata: Array<any> = [];
  filteredData: Array<any> = [];
  currentRotation: number = 1;
  measureKey = "";
  labelKeys: Array<any> = [];

  constructor(
      private barChartOptionsService: BarChartOptionsService,
      private chartDataService: ChartDataService
      ) { }
  options: Array<any> = [];

  ngOnInit() {
    this.getOptions();
    this.initData();
  }

  getOptions(){
    return this.barChartOptionsService.getOptions().subscribe(
      json => {
        this.options = json["options-saved"];               
      }
    );
  }

  private initData(){
    this.chartDataService.getStudents().subscribe(
      json => {
        this.mydata = json;
        this.filterData(1); 
        this.measureKey = "score";
        this.labelKeys = ["firstname", "lastname", "year"];            
      }
    );
  }

  public setData(data: Array<any>){
    this.mydata = data;
  }

  public filterData(rotation: number){
    
    for(let i=0; i<this.mydata.length; i++){      
      if(this.mydata[i].rotation == rotation){ this.filteredData.push(this.mydata[i]);}
    }    
  }

  

}
