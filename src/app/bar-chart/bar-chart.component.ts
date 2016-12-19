import { Component, OnInit } from '@angular/core';
import { BarChartOptionsService } from '../services/bar-chart-options.service';
import { StudentDataService } from '../services/student-data.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css', '../../app/home/home.component.css']
})
export class BarChartComponent implements OnInit {

  dataOptions : Array<any> = [];  
  selectedOptions : Array<any> = [];
  cssClass = "";
  cssNames : Array<any> = [];
  studentData : Array<any> = [];

  constructor(private barChartOptions: BarChartOptionsService, private studentDataService: StudentDataService) { }  

  ngOnInit() {
    this.barChartOptions.getOptions().subscribe(
      json => {
        this.dataOptions = json["options-saved"];         
        this.dataOptions.forEach(value => this.cssNames.push(value.name));   
        this.updateOptions(0);  
        this.initBarChart();              
      }
    );
  }  

  public updateOptions(selectedIndex:number){
    console.log(this.dataOptions[selectedIndex]["cssClass"]);       
    this.selectedOptions = this.dataOptions[selectedIndex];    
    this.cssClass = this.selectedOptions["cssClass"];     
  }  

  private initBarChart(){
    this.studentDataService.getStudents().subscribe(
      json => {
        console.log(json);
        this.studentData = json["students"];
        this.createBarChart();
      }
    );
  }

  private createBarChart(){
    
    console.log("Student data!: "+this.studentData);
  }

}
