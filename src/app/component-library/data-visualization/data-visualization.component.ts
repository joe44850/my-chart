import { Component, OnInit, NgModule, ModuleWithProviders, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IDataVisualizationConfig } from './idata-visualization-config';

@Component({
  selector: 'app-data-visualization',
  templateUrl: './data-visualization.component.html',
  styleUrls: ['./data-visualization.component.css']
})
export class DataVisualizationComponent implements OnInit, IDataVisualizationConfig, OnChanges {

  @Input() dataSource: string = "";
  @Input() optionsSource: string = "";
  @Input() measureField = "";
  @Input() labelField = "";
  @Input() fields: Array<any> = [];
  @Input() fieldFilters: Array<any> = [];
  @Input() data: Array<any> = [];
  @Input() displayFieldOptions: Array<any> = [];
  @Input() dataOptions: Array<any> = [];
  @Input() uiOptions: Array<any> = [];
  @Input() dataLoading: boolean = false;

  constructor() { }

  ngOnInit() {
    console.log("Init: "+this.uiOptions);
  }

  ngOnChanges(changes?:any){
    console.log("Changes: "+changes);
    if(changes["uiOptions"]){ 
      this.uiOptions = changes["uiOptions"].currentValue;
      console.log(this.uiOptions);
    }
  }

} //end class

/* modulize stuff */
@NgModule({
  imports: [ CommonModule ],
  exports: [ DataVisualizationComponent ],
  declarations: [ DataVisualizationComponent ]
})
export class DataVisualizationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: DataVisualizationModule
    }
  }
}
