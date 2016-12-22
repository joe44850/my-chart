import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing, appRoutingProviders } from './app.routes';
import { ChartDataService } from './services/chart-data.service';
import { ChartTestComponent } from './chart-test/chart-test.component';
import { ChartOptions } from './chart-test/chart-options.service';
import { BarChartOptionsService } from './services/bar-chart-options.service';
import { StudentDataService } from './services/student-data.service';
import { ComponentLibraryModule } from './component-library/component-library.module';
import { BarchartExampleComponent } from './barchart-example/barchart-example.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChartTestComponent,
    BarchartExampleComponent    
  ],
  imports: [
    ComponentLibraryModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    appRoutingProviders, 
    ChartDataService, 
    ChartOptions, 
    BarChartOptionsService,
    StudentDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
