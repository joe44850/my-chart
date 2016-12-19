import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChartTestComponent } from './chart-test/chart-test.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

const appRoutes: Routes = [
    {   path:'', component: HomeComponent },
    {   path:'chart-test', component: ChartTestComponent},
    {   path:'bar-chart', component:BarChartComponent},
    {   path: '**', redirectTo:'' }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);