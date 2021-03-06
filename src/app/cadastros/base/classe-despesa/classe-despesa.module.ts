import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClasseDespesaNovoComponent} from './classe-despesa-novo/classe-despesa-novo.component';
import {ClasseDespesaPesquisarComponent} from './classe-despesa-pesquisar/classe-despesa-pesquisar.component';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {TransportSharedModule} from '../../../transport-shared/transport-share.module';
import {CoreModule} from '../../../core/core.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingModule} from 'ngx-loading';
import {
   ButtonModule,
   CheckboxModule,
   DataTableModule,
   DropdownModule,
   InputTextModule,
   MessageModule,
   PanelModule,
   ProgressBarModule,
   SharedModule,
   TooltipModule
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';

@NgModule({
   imports: [
      CommonModule,

      TranslateModule,
      TransportSharedModule,
      CoreModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      LoadingModule,

      DataTableModule,
      SharedModule,
      TableModule,
      InputTextModule,
      ButtonModule,
      DropdownModule,
      MessageModule,
      ButtonModule,
      PanelModule,
      TooltipModule,
      ProgressBarModule,
      CheckboxModule
   ],
   declarations: [
      ClasseDespesaNovoComponent,
      ClasseDespesaPesquisarComponent
   ],
   exports: [],
   providers: [
      TranslateService
   ]
})
export class ClasseDespesaModule {
}
