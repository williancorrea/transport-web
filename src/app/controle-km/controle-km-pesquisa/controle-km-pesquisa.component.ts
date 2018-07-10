import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {AuthService} from '../../security/auth.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {Title} from '@angular/platform-browser';
import {ToastyService} from 'ng2-toasty';
import {ControleKmService} from '../controle-km.service';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {ControleKmFiltro} from '../../core/model/ControleKmFiltro';

import * as moment from 'moment';
import {ItinerarioService} from '../../itinerario/itinerario.service';
import {PersonService} from '../../person/person.service';
import {VeiculoService} from '../../veiculo/veiculo.service';

@Component({
   selector: 'app-controle-km-pesquisa',
   templateUrl: './controle-km-pesquisa.component.html',
   styleUrls: ['./controle-km-pesquisa.component.css']
})
export class ControleKmPesquisaComponent implements OnInit {

   controleKmList = [];
   controleKmFiltro: ControleKmFiltro;
   controleKmSelecionado = null;
   mostarFiltros: boolean;
   mostrarTelaCarregando: boolean;
   totalRegistros = 0;

   veiculoList: any;
   itinerarioList: any;
   pessoaList: any;

   variaveisAmbiente: any;
   COLUNAS: any;

   /*
    * Binds com itens da pagina HTML
    */
   @ViewChild('dataTable') tabelaBind;
   @ViewChild('globalFilter') filtroGlobalBind;


   constructor(private router: Router,
               private traduzir: TranslateService,
               private maritalStatusService: ControleKmService,
               public auth: AuthService,
               private manipuladorErros: ErrorHandlerService,
               private toasty: ToastyService,
               private confirmacao: ConfirmationService,
               private veiculoService: VeiculoService,
               private itinerarioService: ItinerarioService,
               private pessoaService: PersonService,
               private titulo: Title) {
   }

   /**
    * Executar as informações assim que a página terminar de renderizar
    */
   ngOnInit() {
      this.mostarFiltros = false;
      this.controleKmFiltro = new ControleKmFiltro();

      this.variaveisAmbiente = environment;

      this.setMostrarTelaCarregando(true);
      this.traduzir.get('controleKm').subscribe(s => {
         this.titulo.setTitle(s['lista']);

         this.COLUNAS = [
            {field: 'key', header: '', hidden: true, class: ''},
            {field: 'dataHoraSaida', header: s['campos']['dataHoraSaida'], hidden: false, class: 'datatable-coluna_data', sort: true},
            {field: 'dataHoraChegada', header: s['campos']['dataHoraChegada'], hidden: false, class: 'datatable-coluna_data', sort: true},
            {field: 'kmSaida', header: s['campos']['kmSaida'], hidden: false, class: 'datatable-coluna_km', sort: true},
            {field: 'kmChegada', header: s['campos']['kmChegada'], hidden: false, class: 'datatable-coluna_km', sort: true},
            {field: 'kmTotal', header: s['campos']['kmTotal'], hidden: false, class: 'datatable-coluna_total', sort: false},
            {
               field: 'kmNaoInformado',
               header: s['campos']['kmNaoInformado2'],
               hidden: false,
               class: 'datatable-coluna_km_nao_informado',
               sort: false
            },
            // {field: 'veiculo.placa', header: s['campos']['veiculo'], hidden: false, class: ''}
            // {field: 'codigo', header: s['campos']['codigo'], hidden: false, class: 'datatable-collum-field-name'},
            // {field: 'pessoa', header: s['campos']['motorista'], hidden: false, class: ''},
            // {field: 'veiculo', header: s['campos']['veiculo'], hidden: false, class: ''},
            // {field: 'validoAte', header: s['campos']['validoAte'], hidden: false, class: 'datatable-collum-field-name'}
         ];
      });

      this.carregarVeiculos();
      this.carregarItinerarios();
      this.carregarMotoristas();
   }

   // TODO: VERIFICAR A PESQUISA POR PLACA E FROTA
   carregarVeiculos() {
      this.veiculoService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'frota'}, null)
         .then(veiculoList => {
            this.veiculoList = veiculoList.content.map(p => ({label: p.frota + ' - ' + p.placa, value: p.key}));
         })
         .catch(error => {
            this.manipuladorErros.handle(error);
         });
   }

   // TODO: VERIFICAR A PESQUISA POR NOME
   carregarItinerarios() {
      this.itinerarioService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'nome'}, null)
         .then(veiculoList => {
            this.itinerarioList = veiculoList.content.map(p => ({label: p.nome, value: p.key}));
         })
         .catch(error => {
            this.manipuladorErros.handle(error);
         });
   }

   // TODO: BUSCAR SOMENTE OS MOTORISTAS E COLABORADORES
   carregarMotoristas() {
      this.pessoaService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'nome'}, null)
         .then(veiculoList => {
            this.pessoaList = veiculoList.content.map(p => ({label: p.nome, value: p.key}));
         })
         .catch(error => {
            this.manipuladorErros.handle(error);
         });
   }


   formatarData(data) {
      return moment(data).utc().format('DD/MM/YYYY');
   }

   /**
    * Apresenta ou esconde a tela de carregando
    *
    * @param carregando
    */
   setMostrarTelaCarregando(carregando) {
      this.mostrarTelaCarregando = carregando;
   }

   /**
    * Mostra mais filtros com campos individuais
    *
    * @param {boolean} value
    */
   mostrarCamposFiltros(value: boolean) {
      this.mostarFiltros = value;
      this.controleKmFiltro = new ControleKmFiltro();
      if (this.filtroGlobalBind) {
         this.filtroGlobalBind.nativeElement.value = '';
      }

   }

   /**
    * Filtrar por campos individuais
    *
    * @param dataTable
    */
   filterFields(dataTable) {
      this.setFilterDataTable(null, dataTable);
   }

   /**
    * Carregamento preguicoso de acordo com as informações passadas nos filtro
    *
    * @param {LazyLoadEvent} lazyLoad
    */
   loadBank(lazyLoad: LazyLoadEvent) {
      this.setMostrarTelaCarregando(true);
      this.controleKmSelecionado = null;
      this.maritalStatusService.findAll(lazyLoad, this.controleKmFiltro).then(result => {
         this.totalRegistros = result.totalElements;
         this.controleKmList = result.content;
         this.setMostrarTelaCarregando(false);
      })
         .catch(error => {
            this.manipuladorErros.handle(error);
         });
   }

   /**
    * Recarrega todos os registros da tabelaBind
    *
    * @param filtro
    * @param dataTable
    */
   buscarTodos(filtro, dataTable) {
      this.setMostrarTelaCarregando(true);
      if (filtro) {
         filtro.value = '';
      }

      this.tabelaBind.first = 0;

      this.mostrarCamposFiltros(false);
      this.setFilterDataTable(filtro, dataTable);
   }

   /**
    * Atribui valores e filtros a Tabela
    *
    * @param filter
    * @param dataTable
    */
   setFilterDataTable(filter, dataTable) {
      this.loadBank(
         {
            filters: dataTable.filters,
            first: 0,
            globalFilter: filter && filter.value ? filter.value : '',
            multiSortMeta: dataTable.multiSortMeta,
            rows: dataTable.rows,
            sortField: dataTable.sortField,
            sortOrder: dataTable.sortOrder
         }
      );
   }

   /**
    * Redireciona para a tela de edicao de dados
    */
   edit() {
      this.router.navigateByUrl(`controleKm/${this.controleKmSelecionado.key}`);
   }

   /**
    * Abre um popup para confirmar a exclusão de um registro
    *
    * @constructor
    */
   confirmarExclusao() {
      this.traduzir.get('actions').subscribe(s => {
         this.confirmacao.confirm({
            message: s['confirm-deletion'],
            accept: () => {
               this.excluir();
            }
         });
      });
   }

   /**
    * Deleta o registro selecionado
    */
   excluir() {
      this.setMostrarTelaCarregando(true);
      this.traduzir.get('controleKm').subscribe(s => {
         this.maritalStatusService.delete(this.controleKmSelecionado.key)
            .then(() => {
               this.tabelaBind.first = 0;
               this.buscarTodos(this.filtroGlobalBind.nativeElement, this.tabelaBind);
               this.setMostrarTelaCarregando(false);
               this.toasty.success(s['acoes']['deletar_sucesso']);
            })
            .catch(
               error => {
                  this.setMostrarTelaCarregando(false);
                  this.manipuladorErros.handle(error);
               }
            );
      });
   }

}
