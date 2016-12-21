import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModel, FormsModule } from '@angular/forms';

import { BarChartModule } from './bar-chart/index';

const COMPONENT_LIBARARY_MODULES = [
    BarChartModule
];

@NgModule({
    imports: [
        BarChartModule.forRoot()  
    ],
    exports: COMPONENT_LIBARARY_MODULES
})
export class ComponentLibraryRootModule { }


@NgModule({
    imports: COMPONENT_LIBARARY_MODULES,
    exports: COMPONENT_LIBARARY_MODULES
})
export class ComponentLibraryModule {
    static forRoot(): ModuleWithProviders {
        return {ngModule: ComponentLibraryRootModule};
    }
}