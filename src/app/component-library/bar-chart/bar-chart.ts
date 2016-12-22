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
  @Input() rowLabel: string;
  @Output() onChange:EventEmitter<any> = new EventEmitter();  
  selectedOptions : Array<any> = [];
  cssClass = "";
  cssNames : Array<any> = [];
  displayOptions :Boolean = false;
  fullname: string = "Jim";
   
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
  private myIDs:Array<any> = [];
  private element: any;
  private canvas: any;
  private canvasHeight: number;
  private barElement: any;
  private dataSetIndex = 0;
  private isFirstChange = true;
  private measureText;

  constructor() { }  

  ngOnChanges(changes?:any) {    
    if(changes["dataOptions"]){ this.dataOptions = changes["dataOptions"].currentValue;}
    if(changes["measureKey"]){ this.measureKey = changes["measureKey"].currentValue;}
    if(changes["labelKeys"]){ this.labelKeys = changes["labelKeys"].currentValue;}
    if(changes["data"]){ this.data = changes["data"].currentValue;}   
    if(this.isFirstChange){ 
      this.updateOptions(0);
      this.initBarChart();
      this.isFirstChange = false;
    } 
    else{
      this.updateChart();
    }
  }   

  public setCols(data: Array<any>){
    this.cols = data;
  }

  public setRows(data: Array<any>){
    this.rows = data;
  }

  public updateOptions(selectedIndex:number){  
     this.dataSetIndex = selectedIndex;   
     this.selectedOptions = this.dataOptions[selectedIndex];         
     this.cssClass = this.selectedOptions["cssClass"] || '';    
  }  

  private initBarChart(){
    this.barHeight = 25;
    this.element = this.chartContainer.nativeElement;
    this.canvasHeight = this.barHeight * this.data.length;
    this.initContainer();    
    this.initBars();
    this.appendContainer();
    this.animateContainer();
    this.appendRowLabel();
  }

  /* BAR CHART STUFF */
  private initContainer(){
    this.canvasHeight = this.data.length * this.barHeight;
    this.canvas = d3.select(this.element).append("svg")      
      .attr("height", this.canvasHeight)
      .attr("width", 0);
  }

  private initBars(){       
    let _this = this;
    this.barElement = this.canvas
                    .selectAll("g")
                      .data(this.data)
                    .enter().append("g")
                      .attr("transform", function(d, i){
                        return "translate(0,"+i*25+")";
                      });
    this.barElement.append("rect")
      .attr("width", function(d){ return _this.scaleX(d[_this.measureKey]);})
      .attr("fill", "steelblue")
      .attr("height", this.barHeight - 1); 
    this.appendText(); 
  }

  private appendText(){
    var _this = this;
    var data = this.data;
    this.measureText = this.barElement.append("text")          
      .attr("x", function(d, i){ 
        return _this.scaleX(data[i][_this.measureKey]) + 3;
      })
      .attr("y", this.barHeight /2 )
      .attr("dy", ".35em")      
      .text(function(d, i){ return data[i][_this.measureKey]; })
  }

  private updateMeasureLabel(){
    var _this = this;
    var data = this.data;
    this.measureText      
      .transition()
      .duration(250)
      .style("opacity", 0)
      .attr("x", function(d, i){ 
        return _this.scaleX(data[i][_this.measureKey]) + 3;
      })      
      .transition()
      .duration(250)
      .style("opacity", 1)
      .text(function(d, i){ return data[i][_this.measureKey]; })
  }

  private appendRowLabel(){
    var _this = this;
    var data = this.data;
    this.barElement.append("text")          
      .attr("x", 10)
      .attr("y", this.barHeight /2 )
      .attr("dy", ".35em")      
      .text(function(d, i){ return data[i][_this.rowLabel]; })
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

  private scaleX(n){
    let x = d3.scaleLinear()
               .domain([0, 4])
               .range([0, 1000]);
    return x(n);
  }

  public updateChart(){     
    var _this = this;
    var data = this.data;
    this.canvas.selectAll("rect")
      .each(function(d, i){
        let newscore = data[i][_this.measureKey];
        let self = d3.select(this);
        self.transition()
          .attr("width", function(){
            return _this.scaleX(newscore);
          })
          .duration(500)          
        i++;
      });
    this.updateMeasureLabel();
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

