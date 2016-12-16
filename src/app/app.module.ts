import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BarchartComponent } from './barchart/barchart.component';
import { HomeComponent } from './home/home.component';
import { routing, appRoutingProviders } from './app.routes';
import { ChartDataService } from './chart-data.service';
import { ChartTestComponent } from './chart-test/chart-test.component';

@NgModule({
  declarations: [
    AppComponent,
    BarchartComponent,
    HomeComponent,
    ChartTestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders, ChartDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
