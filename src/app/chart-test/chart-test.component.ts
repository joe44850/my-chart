import { Component, OnInit, ViewEncapsulation, Input, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-chart-test',
  templateUrl: './chart-test.component.html',
  styleUrls: ['./chart-test.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChartTestComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
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

  ngOnInit() { 
    this.initD3Test(this.getData());    
  }

  setData(){
    if(this.data != null){       
      this.mydata = this.data;
      return;
    }    
    this.mydata = [
      {"id": 10, "name" : "Joe", "scores":[88, 92, 90, 75]},
      {"id": 20, "name" : "Alex", "scores":[68, 72, 91, 66]},
      {"id": 30, "name" : "Rober", "scores":[78, 84, 87, 84]},
      {"id": 40, "name" : "Felix", "scores":[94, 90, 93, 89]},
      {"id": 50, "name" : "Angus", "scores":[47, 72, 80, 65]},
      {"id": 60, "name" : "Michael", "scores":[81, 84, 74, 80]},
      {"id": 70, "name" : "Kathy", "scores":[90, 94, 88, 81]},
      {"id": 80, "name" : "Roland", "scores":[82, 82, 96, 98]},
      {"id": 90, "name" : "Margo", "scores":[95, 97, 100, 87]},
      {"id": 91, "name" : "Zelda", "scores":[78, 80, 77, 71]}
    ];           
  }  

  getData(){ 
    if(!this.mydata){ 
      this.setData();
      this.setIDs();
    }    
    return this.mydata;
  }

  public updateRotation(val){
    if(val == this.curRotation){ return; }
    let x = d3.scaleLinear()
               .domain([0, this.mydata.length])
               .range([0, 100]);

    this.curRotation = val;
    var bars = this.barElement;
    var data = this.mydata;
    this.canvas.selectAll("rect")
      .each(function(d, i){
        let newscore = data[i].scores[val];
        let self = d3.select(this);
        self.transition()
          .attr("width", function(){
            return x(newscore);
          })
          .duration(500)          
        i++;
      });
      
  }

  initD3Test(data:Array<any>){
    this.barHeight = 25;
    this.element = this.chartContainer.nativeElement;
    this.canvasHeight = this.barHeight * this.mydata.length;
    this.initContainer();    
    this.initBars();
    this.appendContainer();
    this.animateContainer();
  }

  setIDs(){    
    for(let i=0; i<this.mydata.length;i++){      
        this.myIDs[i] = this.mydata[i]['id'];
        this.canvasHeight += this.barHeight;
    }    
  } 

  private initContainer(){
    this.canvas = d3.select(this.element).append("svg")      
      .attr("height", this.canvasHeight)
      .attr("width", 0);
  }

  private initBars(){
    var n = this.curRotation;    
    let x = d3.scaleLinear()
               .domain([0, this.mydata.length])
               .range([0, 100]);    
    this.barElement = this.canvas
                    .selectAll("g")
                      .data(this.mydata)
                    .enter().append("g")
                      .attr("transform", function(d, i){
                        return "translate(0,"+i*25+")";
                      });
    this.barElement.append("rect")
      .attr("width", function(d){ return x(d.scores[n]);})
      .attr("fill", "steelblue")
      .attr("height", this.barHeight - 1);

    this.barElement.append("text")
      .attr("x", function(d){ return x(d.scores[n]) + 3;})
      .attr("y", this.barHeight /2 )
      .attr("dy", ".35em")
      .text(function(d){ return d.scores[n]; })
    
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
  
}
