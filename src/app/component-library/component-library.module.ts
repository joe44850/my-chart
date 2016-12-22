import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel, FormsModule } from '@angular/forms';

import { BarChartModule } from './bar-chart/index';
import { DataVisualizationModule } from './data-visualization/index';

const COMPONENT_LIBARARY_MODULES = [
    BarChartModule,
    DataVisualizationModule
];

@NgModule({
    imports: [
        BarChartModule.forRoot(),
        DataVisualizationModule.forRoot() 
    ],
    exports: COMPONENT_LIBARARY_MODULES
})
export class ComponentLibraryRootModule { }


@NgModule({
    imports: COMPONENT_LIBARARY_MODULES,
    exports: COMPONENT_LIBARARY_MODULES,
    declarations: [DataVisualizationModule]
})
export class ComponentLibraryModule {
    static forRoot(): ModuleWithProviders {
        return {ngModule: ComponentLibraryRootModule};
    }
}