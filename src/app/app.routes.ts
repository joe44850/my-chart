import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChartTestComponent } from './chart-test/chart-test.component';
import { BarchartExampleComponent } from './barchart-example/barchart-example.component';
import { DvExampleComponent } from './dv-example/dv-example.component';

const appRoutes: Routes = [
    {   path:'', component: HomeComponent },
    {   path:'dv-example', component: DvExampleComponent },
    {   path:'chart-test', component: ChartTestComponent},
    {   path: 'barchart-example', component: BarchartExampleComponent },
    {   path: '**', redirectTo:'' }
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);