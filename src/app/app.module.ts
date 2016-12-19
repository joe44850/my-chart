import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing, appRoutingProviders } from './app.routes';
import { ChartDataService } from './chart-data.service';
import { ChartTestComponent } from './chart-test/chart-test.component';
import { ChartOptions } from './chart-test/chart-options.service';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BarChartOptionsService } from './services/bar-chart-options.service';

@NgModule({
  declarations: [
    AppComponent,
    BarChartComponent,
    HomeComponent,
    ChartTestComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders, ChartDataService, ChartOptions, BarChartOptionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
