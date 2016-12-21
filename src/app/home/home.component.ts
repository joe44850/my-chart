import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ChartDataService } from '../services/chart-data.service';
import { ChartTestComponent } from '../chart-test/chart-test.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  private chartData: Array<any>;
  rotation: number = 1;
  errorMessage: string;

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit() {
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    /*
    setTimeout(() => {
      this.generateData();

      // change the data periodically
      setInterval(() => this.generateData(), 5000);
    }, 1000);
    */
    //this.generateChartData();
  }

  generateChartData(){
    this.chartData = [];
    this.chartDataService.getStudents().subscribe(
      student => this.populateStudentObject(student),
      error => this.errorMessage = <any>error     
    );
  }

  setRotation(){
    this.rotation++;
    if(this.rotation > 4){ this.rotation =  1;}    
  }

  populateStudentObject(student_array){
    this.chartData = [];
    let cur_rotation = this.rotation;
    let last_rotation = this.rotation;
    for(let i=0;i<student_array.length;i++){ 
      if(student_array[i]['rotation'] != this.rotation) continue;
      cur_rotation = student_array[i]['rotation'];
      if(cur_rotation != last_rotation){ break; } 
      this.chartData.push([
        `${student_array[i]['firstname']}\n\r ${student_array[i]['lastname']}`,
        student_array[i]['score']
      ]);
      last_rotation = cur_rotation;
    }
  }

  generateData(d) {
    this.chartData = [];
    for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
      this.chartData.push([
        `fee ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    }
  }
}
