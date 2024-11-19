import { Test } from '@nestjs/testing';
import { AppModule } from './adaptInterface/Controllers/app.module';
import { ServicoVendas } from './domain/services/ServicoVendas';
import { OrcamentoModel } from './domain/entities/Assinatura.model';
import { IProdutoModelRepository } from './domain/repositories/IClientesModel.repository';
import { ServicoEstoque } from './domain/services/ServicoEstoque';
import { ProdutosDisponiveis_UC } from './aplication/ProdutosDisponiveis';
import { CriaOrcamento_UC } from './aplication/CriaOrcamento';
import { EfetivaOrcamento_UC } from './aplication/EfetivaOrcamento';

const request = require('supertest');

describe('AppController (e2e)', () => {
  let app;
  let novoOrcamentoDTO;
  let produtosDisponiveisUC;
  let emEstoque;
  let criaOrcamentoUC;
  let efetivaOrcamentoUC;

  beforeAll(async () => {
    emEstoque = [{codigo: 1, qtdadeDisponivel: 2},{codigo: 2, qtdadeDisponivel: 2}];
    novoOrcamentoDTO = {id:100,custo:2000,imposto:400,desconto:200,valorPago:2200};

    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],      
    })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    produtosDisponiveisUC = app.get(ProdutosDisponiveis_UC);
    criaOrcamentoUC = app.get(CriaOrcamento_UC);
    efetivaOrcamentoUC = app.get(EfetivaOrcamento_UC);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Sistema de vendas');
  });

  it('/ (POST)',()=>{
    jest.spyOn(criaOrcamentoUC, 'run')
    .mockImplementation(() => novoOrcamentoDTO);
    return request(app.getHttpServer())
      .post('/produtos/criaOrcamento')
      .expect(201)
      .expect(JSON.stringify(novoOrcamentoDTO));
  })

  it('/ (GET)',()=>{
    jest.spyOn(efetivaOrcamentoUC, 'run')
    .mockImplementation(() => true);
    return request(app.getHttpServer())
      .get('/produtos/efetivaOrcamento/100')
      .expect(200)
      .expect('true');
  })

  it('/ (GET)',()=>{
    jest.spyOn(produtosDisponiveisUC, 'run')
    .mockImplementation(() => emEstoque);
    return request(app.getHttpServer())
      .get('/produtos/produtosDisponiveis')
      .expect(200)
      .expect(JSON.stringify(emEstoque));
  })
});
