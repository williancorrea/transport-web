import {Title} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConfirmationService} from 'primeng/components/common/api';
import {ConfirmDialogModule} from 'primeng/components/confirmdialog/confirmdialog';
import {ToastyModule} from 'ng2-toasty';
import {JwtHelper} from 'angular2-jwt';

import {AuthService} from './../security/auth.service';
import {ErroManipuladorService} from './erro-manipulador.service';
import {AccessDeniedComponent} from './access-denied.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {BancoService} from '../cadastros/base/banco/banco.service';
import {TranslateModule} from 'ng2-translate';
import {ButtonModule} from 'primeng/button';
import {ProductUnitService} from '../product-unit/product-unit.service';
import {TypeRelationshipService} from '../type-relationship/type-relationship.service';
import {LevelOfEducationService} from '../level-of-education/level-of-education.service';
import {EstadoCivilService} from '../estado-civil/estado-civil.service';
import {PersonService} from '../person/person.service';
import {VeiculoService} from '../veiculo/veiculo.service';
import {ItinerarioService} from '../itinerario/itinerario.service';
import {ControleKmService} from '../controle-km/controle-km.service';
import {ClasseDespesaService} from '../cadastros/base/classe-despesa/classe-despesa.service';
import {CentroDeCustoService} from '../centro-de-custo/centro-de-custo.service';
import {BaseFormComponent} from '../transport-shared/base-form/base-form.component';
import {TipoPagamentoModule} from '../tipo-pagamento/tipo-pagamento.module';
import {TipoPagamentoService} from '../tipo-pagamento/tipo-pagamento.service';
import {ErroComponent} from './erro.component';


@NgModule({
   imports: [
      CommonModule,
      HttpModule,
      RouterModule,
      TranslateModule,
      ButtonModule,

      ConfirmDialogModule
   ],
   declarations: [
      PageNotFoundComponent,
      AccessDeniedComponent,
      ErroComponent
   ],
   exports: [
      ToastyModule,
      ConfirmDialogModule
   ],
   providers: [
      ErroManipuladorService,
      AuthService,

      BancoService,
      ProductUnitService,
      TypeRelationshipService,
      LevelOfEducationService,
      EstadoCivilService,
      PersonService,
      VeiculoService,
      ItinerarioService,
      ControleKmService,
      ClasseDespesaService,
      CentroDeCustoService,
      TipoPagamentoService,

      ConfirmationService,
      JwtHelper,
      Title,
      {provide: LOCALE_ID, useValue: 'pt-BR'}
   ]
})
export class CoreModule {
}
