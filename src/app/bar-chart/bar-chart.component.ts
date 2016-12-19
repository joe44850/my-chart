import { Component, OnInit } from '@angular/core';
import { BarChartOptionsService } from '../services/bar-chart-options.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css', '../../app/home/home.component.css']
})
export class BarChartComponent implements OnInit {

  dataOptions : Array<any> = [];

  constructor(private barChartOptions: BarChartOptionsService) { }  

  ngOnInit() {
    this.barChartOptions.getOptions().subscribe(
      json => this.initOptions(json)
    );
  }

  private initOptions(data){
    this.dataOptions = data;
    console.log(this.dataOptions);
  }

}
