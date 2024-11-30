import { Test } from '@nestjs/testing';
import { AppController, GeneralController } from './app.controller';
import { IProdutoModelRepository } from '../../domain/repositories/IClientesModel.repository';
import { ServicoVendas } from '../../domain/services/ServicoVendas';
import { OrcamentoModel } from '../../domain/entities/Assinatura.model';
import { OrcamentoRepositoryORM } from '../Persistence/Repositories/ClientesORM.repository';
import { ServicoEstoque } from '../../domain/services/ServicoEstoque';
import { ImpostoEstadual2023 } from '../../domain/services/Impostos';
import { PromoFactory } from '../../domain/services/Promocoes';
import { OrcamentoRepositoryDummy } from '../Persistence/Repositories/OrcamentoDummy.repository';
import { IItemDeEstoqueModelRepository } from '../../domain/repositories/IAplicativosModel.repository';
import { ProdutosDisponiveis_UC } from '../../aplication/ProdutosDisponiveis';
import { CriaOrcamento_UC } from '../../aplication/CriaOrcamento';
import { EfetivaOrcamento_UC } from '../../aplication/EfetivaOrcamento';
import { AlteraPromo_UC } from '../../aplication/AlteraPromo_UC';

describe('GeneralController', () => {
  let generalController;
  let produtoRepository;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [GeneralController],
      providers: [IProdutoModelRepository],
    }).compile();

    generalController = app.get(GeneralController);
    produtoRepository = app.get(IProdutoModelRepository);
  });

  describe('root', () => {
    it('should return "Sistema de vendas"',  async () => {
      let rObs = await generalController.getTitulo(); 
      expect(rObs).toBe('Sistema de vendas');
    });
  });

  describe('produtoTest/:codigo', () => {
    let rEsp = {
      "codigo": 1,
      "descricao": "Fritadeira",
      "preco": "300"
    };

    it('deve retornar a Torradeira',  async () => {
      // Define o mock
      let spy = jest.spyOn(produtoRepository, 'consultaPorCodigo').mockImplementation(() => rEsp);
      let rObs = await generalController.getProdutoPorCodigoParaTeste(1); 
      expect(spy).toHaveBeenCalled();
      expect(rObs).toEqual(rEsp);
    });
  });
});

describe('Testa integração com os casos de uso', () => {
  let controller;
  let servicoVendas;
  let novoOrcamento;
  let novoOrcamentoDTO;

  beforeEach(async () => {

    const app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [ServicoVendas, OrcamentoRepositoryDummy,
                  ServicoEstoque, ImpostoEstadual2023,
                  PromoFactory,IProdutoModelRepository,
                  IItemDeEstoqueModelRepository,ProdutosDisponiveis_UC,
                  CriaOrcamento_UC,EfetivaOrcamento_UC, AlteraPromo_UC ],
    }).compile();

    controller = app.get(AppController);
    servicoVendas = app.get(ServicoVendas);

    novoOrcamento = new OrcamentoModel(100,null,2000,400,200,2200,false);
    novoOrcamentoDTO = {id:100,custo:2000,imposto:400,desconto:200,valorPago:2200};
  });

  describe('criaOrcamento', () => {
    it('Deve retornar o orçamento criado',  async () => {
      let spyServVendas = jest.spyOn(servicoVendas, 'criaOrcamento')
           .mockImplementation(() => novoOrcamento);
      let rObs = await controller.criaOrcamento(null); 
      expect(spyServVendas).toHaveBeenCalled();
      expect(rObs).toEqual(novoOrcamentoDTO);
    });
  });

  describe('efetivaOrcamento', () => {
    it('Deve efetivar o orçamento indicado',  async () => {
      let spyServVendas = jest.spyOn(servicoVendas, 'efetivaOrcamento')
           .mockImplementation(() => true);
      let rObs = await controller.efetivaOrcamento(100); 
      expect(spyServVendas).toHaveBeenCalled();
      expect(rObs).toBeTruthy();
    });
  });
});
