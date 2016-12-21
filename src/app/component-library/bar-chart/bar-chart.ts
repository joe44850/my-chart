import { Component, OnInit, OnChanges, NgModule, ModuleWithProviders, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BarChartOptionsService } from '../../services/bar-chart-options.service';
import { CommonModule }  from '@angular/common';
import { NgModel, FormsModule } from '@angular/forms';
import * as d3 from 'd3';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.html',
  styleUrls: ['./bar-chart.css']
})
export class BarChartComponent implements OnChanges {

  @Input() dataOptions : Array<any> = [];
  @Input() measureKey;
  @Input() labelKeys: Array<any> = [];
  @Input() data: Array<any> = [];
  @Output() onChange:EventEmitter<any> = new EventEmitter();  
  selectedOptions : Array<any> = [];
  cssClass = "";
  cssNames : Array<any> = [];
  displayOptions :Boolean = false;
   
  rows: Array<any> = [];
  cols: Array<any> = [];

  /* these items will go into the json options in the future*/
  @ViewChild('chartcontainer') private chartContainer: ElementRef;  
  private margin: any = { top: 20, bottom: 20, left: 40, right: 20};
  private chart: any;
  private width: number = 1000;
  private height: number = 600;
  private barHeight: number = 20;
  private x: any;
  private y: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private mydata: any;
  private myIDs:Array<any> = [];
  private element: any;
  private canvas: any;
  private canvasHeight: number;
  private barElement: any;
  private curRotation = 0;

  constructor() { }  

  ngOnChanges(changes:any) { 
    if(changes.dataOptions.currentValue!=""){      
      this.dataOptions = changes.dataOptions.currentValue;       
      this.updateOptions(0);  
      this.initBarChart(); 
      this.measureKey = changes.measureKey.currentValue;
      this.labelKeys = changes.labelKeys.currentValue;
    }
  }   

  public setCols(data: Array<any>){
    this.rows = data;
  }

  public setRows(data: Array<any>){
    this.cols = data;
  }

  public updateOptions(selectedIndex:number){     
     this.selectedOptions = this.dataOptions[selectedIndex];         
     this.cssClass = this.selectedOptions["cssClass"] || '';    
  }  

  private initBarChart(){
    this.mydata = this.data;
    this.barHeight = 25;
    this.element = this.chartContainer.nativeElement;
    this.canvasHeight = this.barHeight * this.mydata.length;
    this.initContainer();    
    this.initBars();
    this.appendContainer();
    this.animateContainer();
  }

  /* BAR CHART STUFF */
  private initContainer(){
    this.canvasHeight = this.data.length * this.barHeight;
    this.canvas = d3.select(this.element).append("svg")      
      .attr("height", this.canvasHeight)
      .attr("width", 0);
  }

  private initBars(){       
    let x = d3.scaleLinear()
               .domain([0, 4])
               .range([0, 1000]);    
    this.barElement = this.canvas
                    .selectAll("g")
                      .data(this.mydata)
                    .enter().append("g")
                      .attr("transform", function(d, i){
                        return "translate(0,"+i*25+")";
                      });
    this.barElement.append("rect")
      .attr("width", function(d){ return x(d["score"]);})
      .attr("fill", "steelblue")
      .attr("height", this.barHeight - 1);

    this.barElement.append("text")
      .attr("x", function(d){ return x(d["score"]) + 3;})
      .attr("y", this.barHeight /2 )
      .attr("dy", ".35em")
      .text(function(d){ return d["score"]; })
  }

  private appendContainer(){
    this.canvas.append("g");
  }

  private animateContainer(){
    this.canvas.transition()
      .attr("width", 1000)
      .delay(500)
      .duration(1000)
  }

  public updateChart(){
    
    let x = d3.scaleLinear()
               .domain([0, 4])
               .range([0, 1000]);
    
    var bars = this.barElement;
    var data = this.mydata;
    this.canvas.selectAll("rect")
      .each(function(d, i){
        let newscore = data[i]["score"];
        let self = d3.select(this);
        self.transition()
          .attr("width", function(){
            return x(newscore);
          })
          .duration(500)          
        i++;
      });
      
  }

  /* END OF BAR CHART STUFF */



}

@NgModule({
  imports: [CommonModule],
  exports: [BarChartComponent],
  declarations: [BarChartComponent]
})
export class BarChartModule{
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BarChartModule
    }
  }
}

