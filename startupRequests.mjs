import http from 'http';
import axios from 'axios';

const baseurl = 'http://localhost:3000';

const usuario = {
    usuario: 'empresa-master',
    senha: 'empresamaster.123'
};

const clientes = [
    {
        nome: 'João Silva',
        email: 'joao.silva@example.com'
    },
    {
        nome: 'Maria Rodrigues',
        email: 'maria.rodrigues@example.org'
    },
    {
        nome: 'Pedro Martins',
        email: 'pedro.martins@example.net'
    },
    {
        nome: 'Ana Gomes',
        email: 'ana.gomes@example.io'
    },
    {
        nome: 'João Costa',
        email: 'joao.costa@example.com.br'
    },
    {
        nome: 'Maria Lima',
        email: 'maria.lima@example.co.uk'
    },
    {
        nome: ' Pedro Sousa',
        email: 'pedro.sousa@example.fr'
    },
    {
        nome: 'Ana Silva',
        email: 'ana.silva@example.de'
    },
    {
        nome: 'João Martins',
        email: 'joao.martins@example.it'
    },
    {
        nome: 'Maria Costa',
        email: 'maria.costa@example.pl'
    }
];

const aplicativos = [
    {
        nome: 'Galaxy Explorer',
        custoMensal: 20.99,
    },
    {
        nome: 'Lumina - ApliCasa',
        custoMensal: 15.49,
    },
    {
        nome: 'Nexa - Desenvolvimento Web',
        custoMensal: 30.00,
    },
    {
        nome: 'Pulsebit - Aplicativo de Productividade',
        custoMensal: 10.99,
    },
    {
        nome: 'Apexion - ApliGaming',
        custoMensal: 25.50,
    }
];

const assinaturas = [
    {
        inicioVigencia: new Date('2022-01-15'),
        fimVigencia: new Date('2023-06-30'),
        aplicativo: 1,
        cliente: 1
    },
    {
        inicioVigencia: new Date('2020-07-20'),
        fimVigencia: new Date('2022-01-15'),
        aplicativo: 2,
        cliente: 3
    },
    {
        inicioVigencia: new Date('2019-03-25'),
        fimVigencia: new Date('2021-06-30'),
        aplicativo: 3,
        cliente: 2
    },
    {
        inicioVigencia: new Date('2018-09-10'),
        fimVigencia: new Date('2020-07-20'),
        aplicativo: 4,
        cliente: 4
    },
    {
        inicioVigencia: new Date('2017-05-15'),
        fimVigencia: new Date('2019-03-25'),
        aplicativo: 5,
        cliente: 5
    }
];

// Realizando as requisições para a API

axios.defaults.httpAgent = new http.Agent({keepAlive: false})

try {
    for (let cli of clientes) {
        console.log("[REG] => ", cli);
        let res = await axios.post(baseurl + "/servcad/clientes/registrar", cli);
        console.log("[RESPOSTA] => ", res.headers['content-type'], res.config.data);
    }
} catch (error) {
    console.error("[ERRO] na adição de CLIENTES na API. ", error);
    process.exit(1);
}

try {
    for (let app of aplicativos) {
        console.log("[REG] => ", app);
        let res = await axios.post(baseurl + "/servcad/aplicativos/registrar", app);
        console.log("[RESPOSTA] => ", res.headers['content-type'], res.config.data);
    }
} catch (error) {
    console.error("[ERRO] na adição de APLICATIVOS na API. ", error);
    process.exit(1);
}

try {
    for (let ass of assinaturas) {
        ass.fimVigencia = ass.fimVigencia.toJSON().slice(0, 19).replace('T', ' ');
        ass.inicioVigencia = ass.inicioVigencia.toJSON().slice(0, 19).replace('T', ' ');
        console.log("[REG] => ", ass);
        let res = await axios.post(baseurl + "/servcad/assinaturas", ass);
        console.log("[RESPOSTA] => ", res.headers['content-type'], res.config.data);
    }
} catch (error) {
    console.error("[ERRO] na adição de ASSINATURAS na API. ", error);
    process.exit(1);
}

console.log("PRONTO...");
process.exit(0);