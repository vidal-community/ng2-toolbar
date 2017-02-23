import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DiscoveryModule } from 'vidal-ng2-discovery';
import { SesameModule } from 'vidal-ng2-sesame';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
    imports: [FormsModule, CommonModule, SesameModule, DiscoveryModule],
    exports: [ToolbarComponent],
    declarations: [ToolbarComponent]
})
export class ToolbarModule {}
