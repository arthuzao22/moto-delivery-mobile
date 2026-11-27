// GERADO por `npm run gerar:api` a partir de moto-delivery-api/contrato/openapi.json. Não edite.
export interface paths {
    "/saude": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Health check: responde 500 com status degradado se o banco estiver fora */
        get: operations["saude.verificar"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Login do painel: grava os cookies sid (HttpOnly) e csrf */
        post: operations["auth.loginWeb"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/app/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Login do app do motoboy: JWT de 15 min + refresh de 30 dias */
        post: operations["auth.loginApp"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/app/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Troca o refresh por um par novo; reuso de refresh antigo revoga a família */
        post: operations["auth.renovar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Usuário, organização ativa com permissões e vínculos */
        get: operations["auth.eu"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Revoga a sessão atual (cookie ou Bearer) */
        post: operations["auth.sair"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/trocar-organizacao": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Muda a organização ativa da sessão para outra em que o usuário tem vínculo */
        post: operations["auth.trocarOrganizacao"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/senha/esqueci": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Envia o link de redefinição (resposta igual exista o e-mail ou não) */
        post: operations["auth.solicitarRedefinicao"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/senha/redefinir": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Troca a senha com o token do link e revoga todas as sessões */
        post: operations["auth.redefinirSenha"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/convite/aceitar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cria a senha do convidado e ativa os vínculos dele */
        post: operations["auth.aceitarConvite"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/cep/{cep}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Endereço do CEP para preencher o formulário. 404 cep_nao_encontrado se não existe; 503 cep_indisponivel se os provedores não responderem */
        get: operations["cep.consultar"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/equipe": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Membros da equipe da organização ativa (sem os motoboys) */
        get: operations["equipe.listar"];
        put?: never;
        /** Convida por e-mail: conta nova fica convidado até aceitar; quem já tem senha entra ativo */
        post: operations["equipe.convidar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/equipe/{vinculoId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Altera papel, permissões ou status; suspender derruba as sessões na organização */
        patch: operations["equipe.alterar"];
        trace?: never;
    };
    "/organizacao": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Dados cadastrais da organização ativa */
        get: operations["organizacao.obter"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Edita nome, razão social, contato e endereço (tipo, documento e status são da plataforma) */
        patch: operations["organizacao.atualizar"];
        trace?: never;
    };
    "/organizacao/configuracoes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Configurações operacionais (oferta, fechamento, raio do cheguei, retenção de GPS) */
        get: operations["organizacao.obterConfiguracoes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Altera as configurações operacionais (só empresa de motofrete: 422 so_empresa_motofrete) */
        patch: operations["organizacao.atualizarConfiguracoes"];
        trace?: never;
    };
    "/organizacao/frota-propria": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** A frota própria do restaurante: a empresa interna e a parceria com ela (nulas se nunca ativou) */
        get: operations["organizacao.frotaPropria"];
        put?: never;
        /** Ativa a frota própria: cria a empresa interna (quem ativa vira admin_empresa nela, enquanto for admin do restaurante) e a parceria já ativa; repetir só cria o que falta (vínculo que já existe não muda; parceria suspensa se reativa em /parcerias/{id}/reativar). Só o admin do restaurante (403 so_admin_restaurante); 422 so_restaurante, restaurante_inativo, frota_propria_suspensa */
        post: operations["organizacao.ativarFrotaPropria"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/organizacoes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Todas as organizações, das mais recentes para as mais antigas */
        get: operations["plataforma.organizacoes.listar"];
        put?: never;
        /** Cadastra uma empresa ou restaurante já aprovado e convida o primeiro admin */
        post: operations["plataforma.organizacoes.criar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/organizacoes/{id}/aprovar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Aprova uma organização pendente */
        post: operations["plataforma.organizacoes.aprovar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/organizacoes/{id}/rejeitar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Rejeita uma organização pendente (exige motivo) */
        post: operations["plataforma.organizacoes.rejeitar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/organizacoes/{id}/suspender": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Suspende uma organização ativa: ninguém dela acessa (exige motivo) */
        post: operations["plataforma.organizacoes.suspender"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/organizacoes/{id}/reativar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Reativa uma organização suspensa */
        post: operations["plataforma.organizacoes.reativar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/auditoria": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Trilha de auditoria, do mais recente para o mais antigo */
        get: operations["plataforma.auditoria.listar"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/organizacoes/{id}/assinatura": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Condições de cobrança da organização: a vigente hoje e todas as versões */
        get: operations["plataforma.assinatura.obter"];
        /** Define a cobrança a partir de `vigenteDe` (padrão: hoje): por entrega, mensal, híbrida ou com mínimo. Mesmo início troca a versão; depois encerra a anterior na véspera; mês já faturado dá 409 */
        put: operations["plataforma.assinatura.definir"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/organizacoes/{id}/assinatura/encerrar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Para de cobrar depois de `ate` (inclusive; padrão: hoje) */
        post: operations["plataforma.assinatura.encerrar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/organizacoes/{id}/consumo": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Prévia do mês (padrão: o corrente) com as entregas até agora; null sem assinatura no mês */
        get: operations["plataforma.assinatura.consumo"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/faturas": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Faturas da plataforma (`?status=vencida`: quem está devendo), até 200 */
        get: operations["plataforma.faturas.listar"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/faturas/gerar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Gera as faturas de um mês encerrado (o job faz o mês anterior todo dia); ignora já faturada, sem assinatura e zerada */
        post: operations["plataforma.faturas.gerar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/faturas/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Uma fatura com o retrato do cálculo */
        get: operations["plataforma.faturas.obter"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/faturas/{id}/pagar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Baixa manual do pagamento (emitida ou vencida) */
        post: operations["plataforma.faturas.pagar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/faturas/{id}/cancelar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cancela antes do pagamento, com motivo; libera gerar o mês de novo */
        post: operations["plataforma.faturas.cancelar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/organizacao/assinatura": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** O que a organização paga à plataforma: assinatura vigente, prévia do mês, últimas faturas e o aviso de fatura vencida ou em aberto */
        get: operations["organizacao.assinatura"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/parcerias": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Parcerias da organização ativa (dos dois lados), com as ações permitidas */
        get: operations["parcerias.listar"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/parcerias/restaurantes-busca": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Restaurantes ativos pelo nome (até 20), para pedir parceria */
        get: operations["parcerias.buscarRestaurantes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/parcerias/solicitar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** A empresa pede parceria a um restaurante (fica pendente até ele aceitar) */
        post: operations["parcerias.solicitar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/parcerias/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Uma parceria da organização ativa */
        get: operations["parcerias.obter"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/parcerias/{id}/politicas": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** A empresa ajusta as políticas (ausência, dinheiro, comprovante, fatura) */
        patch: operations["parcerias.atualizarPoliticas"];
        trace?: never;
    };
    "/parcerias/{id}/aceitar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** O restaurante aceita o pedido pendente */
        post: operations["parcerias.aceitar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/parcerias/{id}/recusar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** O restaurante recusa o pedido pendente */
        post: operations["parcerias.recusar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/parcerias/{id}/suspender": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Qualquer lado suspende a parceria ativa (exige motivo) */
        post: operations["parcerias.suspender"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/parcerias/{id}/reativar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Qualquer lado reativa a parceria suspensa */
        post: operations["parcerias.reativar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/parcerias/{id}/encerrar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Qualquer lado encerra a parceria (exige motivo) */
        post: operations["parcerias.encerrar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/parcerias": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cria a parceria já ativa entre um restaurante e uma empresa */
        post: operations["plataforma.parcerias.criar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/localizacao": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Lote de até 100 pontos, só com turno aberto (422 turno_fechado); precisão pior que 100 m é descartada */
        post: operations["localizacao.registrarLote"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/motoboys/mapa": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Última posição dos motoboys em turno, para o mapa da central */
        get: operations["localizacao.ultimasPosicoes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/motoboys": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Motoboys da empresa, com filtros (status, nome, grupo) */
        get: operations["motoboys.listar"];
        put?: never;
        /** Cadastra o motoboy (pendente de documentos) e manda o convite para o app */
        post: operations["motoboys.cadastrar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/motoboys/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Um motoboy da empresa */
        get: operations["motoboys.obter"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** Corrige telefone, apelido, vínculo ou chave Pix (null apaga) */
        patch: operations["motoboys.atualizar"];
        trace?: never;
    };
    "/motoboys/{id}/ativar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Ativa o cadastro (de pendente, bloqueado ou inativo); inativo recupera o acesso ao app */
        post: operations["motoboys.ativar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/motoboys/{id}/bloquear": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Bloqueia (exige motivo): continua no app, mas não recebe ofertas */
        post: operations["motoboys.bloquear"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/motoboys/{id}/inativar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Inativa: perde o acesso ao app na hora */
        post: operations["motoboys.inativar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/grupos-motoboys": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Grupos de motoboys da empresa, com os membros */
        get: operations["grupos.listar"];
        put?: never;
        /** Cria um grupo (nome único na empresa) */
        post: operations["grupos.criar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/grupos-motoboys/{id}/membros": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** A lista enviada passa a ser a lista inteira de membros */
        put: operations["grupos.definirMembros"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/motoboys/{id}/documentos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Documentos do motoboy, dos mais recentes para os mais antigos */
        get: operations["documentos.listar"];
        put?: never;
        /** Registra um documento (fica pendente até ser validado) */
        post: operations["documentos.registrar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/documentos/{id}/aprovar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Aprova: recusa vencido e, na CNH, sem categoria A ou com menos de 2 anos */
        post: operations["documentos.aprovar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/documentos/{id}/rejeitar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Rejeita (exige motivo) */
        post: operations["documentos.rejeitar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/motoboys/{id}/veiculos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Veículos do motoboy */
        get: operations["veiculos.listar"];
        put?: never;
        /** Cadastra um veículo (placa única entre os ativos da empresa) */
        post: operations["veiculos.cadastrar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/veiculos/{id}/desativar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Desativa o veículo e libera a placa */
        post: operations["veiculos.desativar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/entregas": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Entregas da organização ativa, com as ações permitidas */
        get: operations["entregas.listar"];
        put?: never;
        /** A central lança uma entrega de um restaurante parceiro */
        post: operations["entregas.criar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/entregas/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Detalhe da entrega com o histórico */
        get: operations["entregas.obter"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/entregas/{id}/cancelar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cancela (exige motivo). Antes da coleta vira cancelada; depois, retornando */
        post: operations["entregas.cancelar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/entregas/{id}/aguardar-mais": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Estende a espera pelo cliente (também depois de esgotada) */
        post: operations["entregas.estenderEspera"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/entregas/{id}/novo-destino": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Novo endereço (e telefone): o motoboy segue para lá */
        post: operations["entregas.alterarDestino"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/entregas/{id}/autorizar-retorno": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** O pedido volta ao restaurante */
        post: operations["entregas.autorizarRetorno"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/entregas/{id}/codigo-devolucao": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Gera o código de seis dígitos que o restaurante dita ao motoboy (mostrado uma vez) */
        post: operations["entregas.gerarCodigoDevolucao"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/entregas/{id}/confirmar-devolucao": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** O restaurante confirma no painel: devolvida. A rota fecha se não restar parada */
        post: operations["entregas.confirmarDevolucao"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/entregas/{id}/reentrega": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Nova tentativa de uma entrega devolvida (copia os dados; destino e telefone podem mudar) */
        post: operations["entregas.criarReentrega"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rotas": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Rotas da empresa, com paradas e ações permitidas */
        get: operations["rotas.listar"];
        put?: never;
        /** Cria uma rota com entregas de um mesmo restaurante */
        post: operations["rotas.criar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rotas/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Detalhe da rota */
        get: operations["rotas.obter"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rotas/{id}/trajeto": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Trajeto da rota: GPS percorrido (até 1.500 pontos), distância, tempo do aceite ao fim e o planejado */
        get: operations["rotas.trajeto"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rotas/{id}/entregas": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Inclui uma entrega da fila (rota em montagem ou pronta) */
        post: operations["rotas.incluirEntrega"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rotas/{id}/entregas/{entregaId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** Devolve a entrega para a fila */
        delete: operations["rotas.retirarEntrega"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rotas/{id}/marcar-pronta": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Conclui a montagem (exige ao menos uma entrega) */
        post: operations["rotas.marcarPronta"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rotas/{id}/codigo-coleta": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Gera o código de coleta (6 dígitos, mostrado uma vez); o motoboy só coleta com ele */
        post: operations["rotas.gerarCodigoColeta"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rotas/{id}/cancelar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Desfaz a rota antes da coleta (exige motivo); as entregas voltam para a fila */
        post: operations["rotas.cancelar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rotas/{id}/transferir": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Passa a rota em andamento para outro motoboy disponível (as entregas mantêm o status) */
        post: operations["rotas.transferir"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/distribuicao/motoboys": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Motoboys disponíveis (turno aberto, sem rota) da empresa da parceria */
        get: operations["distribuicao.motoboysDisponiveis"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/distribuicao/mapa": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Mapa do restaurante: pedidos em aberto (com destino) e motoboys das rotas em andamento desses pedidos, com a última posição */
        get: operations["distribuicao.mapa"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/distribuicao/atribuir": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Um ou mais pedidos para um motoboy: vira uma rota ofertada a ele, que aceita no app */
        post: operations["distribuicao.atribuir"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/distribuicao/rotas/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** A rota dos pedidos do restaurante: status da oferta, motoboy que está com ela e as últimas recusas e expirações */
        get: operations["distribuicao.obterRota"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/distribuicao/rotas/{id}/trajeto": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Trajeto da rota dos pedidos do restaurante: GPS percorrido, distância, tempo e o planejado */
        get: operations["distribuicao.trajeto"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/distribuicao/rotas/{id}/ofertar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Depois de recusa ou expiração, oferta a rota a outro motoboy */
        post: operations["distribuicao.reofertar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/distribuicao/rotas/{id}/codigo-coleta": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** O restaurante exige código para entregar os pedidos da rota (mostrado uma vez) */
        post: operations["distribuicao.gerarCodigoColeta"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/distribuicao/rotas/{id}/desfazer": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Desfaz a rota antes da coleta: os pedidos voltam a aguardar motoboy */
        post: operations["distribuicao.desfazer"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/distribuicao/rotas/{id}/transferir": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** O motoboy não pode seguir: passa a rota dos pedidos do restaurante para outro motoboy */
        post: operations["distribuicao.transferir"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/rotas/{id}/cheguei-coleta": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Motoboy chegou ao restaurante (posição vai para o histórico) */
        post: operations["rotas.chegarColeta"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/rotas/{id}/coletar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Coleta as entregas da lista; as que não vierem voltam para a fila. Sai para a primeira parada */
        post: operations["rotas.coletar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/rotas/{id}/ordem": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Nova ordem das paradas pendentes (todas); a primeira passa a ser a atual */
        post: operations["rotas.reordenar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/entregas/{id}/iniciar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Começa uma parada coletada (só uma em atendimento por vez) */
        post: operations["entregas.iniciarParada"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/entregas/{id}/cheguei": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cheguei no destino; com posição, recusa longe do destino (422 longe_do_destino) */
        post: operations["entregas.chegarDestino"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/entregas/{id}/ausente": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cliente ausente: começa a espera com o tempo da parceria */
        post: operations["entregas.marcarAusente"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/entregas/{id}/contato": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Registra uma tentativa de contato com o cliente */
        post: operations["entregas.registrarContato"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/entregas/{id}/comprovantes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Registra o comprovante na porta (foto, assinatura, fachada, terceiro: arquivoId confirmado; código do cliente: codigo) */
        post: operations["comprovantes.registrar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/entregas/{id}/entregar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Conclui a entrega (exige recebimento e comprovante quando houver). A última fecha a rota */
        post: operations["entregas.concluir"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/entregas/{id}/recusada-pelo-cliente": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cliente recusou o pedido ou o pagamento: volta ao restaurante e abre ocorrência */
        post: operations["entregas.iniciarRetorno"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/entregas/{id}/devolver": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Devolução com o código que o restaurante gerou no painel. 422 codigo_devolucao_invalido traz detalhes.tentativasRestantes; na 5ª tentativa errada o código é descartado, abre ocorrência e responde 422 codigo_devolucao_bloqueado (até o restaurante gerar outro); 422 codigo_devolucao_nao_gerado sem código */
        post: operations["entregas.confirmarDevolucaoPorCodigo"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/entregas/{id}/recebimentos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Registra o que o cliente pagou (misto em várias partes). Diferente do previsto: divergente e ocorrência */
        post: operations["recebimentos.registrar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/entregas/{id}/recebimentos/corrigir": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Corrige o recebimento já registrado enquanto a parada está na porta (até 2 vezes): estorna o anterior, grava o novo e abre uma ocorrência recebimento_divergente com o antes e o depois para a central conferir (as abertas continuam abertas). 422 recebimento_nao_registrado; 422 limite_de_correcoes na 3ª; 409 parada_concluida se o Entregar ou outra correção chegou antes */
        post: operations["recebimentos.corrigir"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ocorrencias": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Ocorrências da empresa, das mais recentes para as mais antigas */
        get: operations["ocorrencias.listar"];
        put?: never;
        /** A central abre uma ocorrência sobre entrega, rota ou motoboy */
        post: operations["ocorrencias.abrir"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/ocorrencias/{id}/resolver": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Resolve com a descrição do que foi feito (409 se não estiver aberta) */
        post: operations["ocorrencias.resolver"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/ocorrencias": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** O motoboy avisa a central (pane, trânsito, atraso no restaurante...) sem mudar o status */
        post: operations["ocorrencias.abrirNoApp"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/planos-valor": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Planos da empresa, com a versão publicada e o rascunho */
        get: operations["planos.listar"];
        put?: never;
        /** Cria o plano com a versão 1 em rascunho */
        post: operations["planos.criar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/planos-valor/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Plano com as versões */
        get: operations["planos.obter"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/planos-valor/{id}/versoes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Novo rascunho copiando a versão mais recente (409 se já houver rascunho) */
        post: operations["planos.novaVersao"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/planos-valor/versoes/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Versão com os componentes */
        get: operations["planos.obterVersao"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/planos-valor/versoes/{id}/componentes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Troca os componentes do rascunho, validando os parâmetros de cada tipo */
        put: operations["planos.salvarComponentes"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/planos-valor/versoes/{id}/publicar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Publica o rascunho (a publicada anterior vira arquivada) */
        post: operations["planos.publicar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/planos-valor/{id}/atribuicoes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Quem usa o plano e desde quando */
        get: operations["planos.listarAtribuicoes"];
        put?: never;
        /** Atribui a motoboy, grupo, parceria ou empresa; encerra a atribuição em aberto do mesmo alvo */
        post: operations["planos.atribuir"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/condicoes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Condições da empresa (as 100 mais recentes; `ativas=true` só as ligadas) */
        get: operations["condicoes.listar"];
        put?: never;
        /** Liga uma condição agora (409 se a do mesmo tipo já estiver ligada) */
        post: operations["condicoes.ativar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/condicoes/{id}/encerrar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Desliga a condição agora */
        post: operations["condicoes.encerrar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/extrato": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Remuneração do motoboy no período (padrão: últimos 7 dias; até 62), com total por dia e memória de cálculo */
        get: operations["lancamentos.extrato"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/lancamentos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Lançamentos da empresa por competência (padrão: últimos 30 dias; até 62; no máximo 500) */
        get: operations["lancamentos.listar"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/lancamentos/ajuste": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Ajuste manual do motoboy (crédito ou débito) com motivo; entra no próximo fechamento. Competência até o último dia do mês seguinte (422 competencia_fora_do_limite) */
        post: operations["lancamentos.ajustar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/lancamentos/{id}/estornar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Estorno: lançamento novo de valor oposto; o original não muda (um estorno por lançamento). Original em aberto: mesma competência; já fechado ou faturado: hoje */
        post: operations["lancamentos.estornar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/caixa": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Turno aberto (ou o último): dinheiro em mãos por restaurante, recebimentos e acertos */
        get: operations["caixa.doTurno"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/caixa/acertos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Acertos de caixa da empresa (até 200, mais recentes) */
        get: operations["caixa.listarAcertos"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/caixa/acertos-do-restaurante": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Acertos destinados ao restaurante (política direto_restaurante) */
        get: operations["caixa.acertosDoRestaurante"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/caixa/acertos/{id}/conferir": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Confere o que o motoboy entregou à central; diferença vira divergência e, se pedido, desconto do motoboy. Acerto do restaurante: 403 acerto_do_restaurante */
        post: operations["caixa.conferir"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/caixa/acertos/{id}/descontar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Lança a falta (diferença negativa) de um acerto do restaurante com divergência como desconto do motoboy. 422 sem_falta; 409 desconto_ja_lancado */
        post: operations["caixa.descontar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/caixa/acertos/{id}/confirmar-restaurante": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** O restaurante confirma quanto recebeu do motoboy */
        post: operations["caixa.confirmarPeloRestaurante"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/fechamentos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Fechamentos da empresa (até 200) */
        get: operations["fechamentos.listar"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/fechamentos/gerar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Gera o fechamento do período por motoboy (componentes de período e lançamentos abertos até o fim). Fim depois de hoje: 422 periodo_no_futuro */
        post: operations["fechamentos.gerar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/fechamentos/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Fechamento com os lançamentos e a memória de cada um */
        get: operations["fechamentos.obter"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/fechamentos/{id}/conferir": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Aberto → em conferência */
        post: operations["fechamentos.conferir"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/fechamentos/{id}/aprovar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Em conferência → aprovado (os lançamentos ficam travados) */
        post: operations["fechamentos.aprovar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/fechamentos/{id}/cancelar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cancela antes do pagamento; os lançamentos por evento voltam a ficar abertos */
        post: operations["fechamentos.cancelar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/fechamentos/{id}/pagar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Aprovado → pago, com a forma de pagamento */
        post: operations["fechamentos.pagar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/fechamentos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Fechamentos do motoboy (sem os cancelados) */
        get: operations["fechamentos.doMotoboy"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/faturas": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Faturas (empresa: as emitidas; restaurante: as dele já enviadas, sem ações); até 200 */
        get: operations["faturas.listar"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/faturas/gerar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Gera a fatura do período por parceria (mensalidade, cobrança aberta até o fim, dinheiro retido). Fim depois de hoje: 422 periodo_no_futuro */
        post: operations["faturas.gerar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/faturas/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Fatura com os lançamentos e a memória de cada um */
        get: operations["faturas.obter"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/faturas/{id}/fechar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Aberta → fechada (os lançamentos travam) */
        post: operations["faturas.fechar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/faturas/{id}/enviar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Fechada → enviada; vencimento = hoje + dias da parceria; o restaurante passa a ver */
        post: operations["faturas.enviar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/faturas/{id}/pagar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Enviada ou vencida → paga (registro manual) */
        post: operations["faturas.pagar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/faturas/{id}/cancelar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Cancela antes do pagamento; a cobrança por evento volta a ficar aberta */
        post: operations["faturas.cancelar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/faturas/{id}/nota-fiscal": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Registra (ou substitui) a nota da fatura: número, data, código, link e PDF/XML já enviados por /arquivos (categoria nota_fiscal). Fatura cancelada dá 422 */
        put: operations["faturas.notaFiscal.registrar"];
        post?: never;
        /** Tira a nota da fatura (os arquivos continuam guardados) */
        delete: operations["faturas.notaFiscal.remover"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/faturas/{id}/nota-fiscal": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** Registra (ou substitui) a nota da fatura da plataforma; os arquivos vêm de .../nota-fiscal/arquivos */
        put: operations["plataforma.faturas.notaFiscal.registrar"];
        post?: never;
        /** Tira a nota da fatura da plataforma */
        delete: operations["plataforma.faturas.notaFiscal.remover"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/faturas/{id}/nota-fiscal/arquivos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** PDF ou XML da nota (até 5 MB): registra no tenant da organização e devolve a URL de envio (10 min) */
        post: operations["plataforma.faturas.notaFiscal.urlEnvio"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/faturas/{id}/nota-fiscal/arquivos/{arquivoId}/confirmar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Confere no storage que o arquivo chegou como pedido e confirma */
        post: operations["plataforma.faturas.notaFiscal.confirmar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/faturas/{id}/nota-fiscal/arquivos/{arquivoId}/url": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** URL de leitura de 5 min do PDF ou XML da nota */
        get: operations["plataforma.faturas.notaFiscal.urlLeitura"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/dashboard/empresa": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Entregas do dia e em andamento, motoboys online, valores lançados hoje, caixa e financeiro pendentes */
        get: operations["dashboard.empresa"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/suporte/{id}/entregas": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Entregas recentes da empresa ou do restaurante, sem dados do cliente (audita o acesso) */
        get: operations["plataforma.suporte.entregas"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/plataforma/suporte/{id}/motoboys": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Motoboys da empresa, sem CPF nem telefone (audita o acesso) */
        get: operations["plataforma.suporte.motoboys"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/arquivos/upload-url": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Registra o arquivo e devolve a URL de envio direto ao storage (10 min, tipo e tamanho travados) */
        post: operations["arquivos.urlEnvio"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/arquivos/{id}/confirmar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Confere no storage que o arquivo chegou como pedido e confirma */
        post: operations["arquivos.confirmar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/arquivos/{id}/url": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** URL de leitura de 5 min (bucket privado), para quem pode ver o arquivo */
        get: operations["arquivos.urlLeitura"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/arquivos/upload-url": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Registra o arquivo e devolve a URL de envio direto ao storage (10 min, tipo e tamanho travados) */
        post: operations["arquivos.app.urlEnvio"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/arquivos/{id}/confirmar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Confere no storage que o arquivo chegou como pedido e confirma */
        post: operations["arquivos.app.confirmar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/arquivos/{id}/url": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** URL de leitura de 5 min (bucket privado), para quem pode ver o arquivo */
        get: operations["arquivos.app.urlLeitura"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/turnos/abrir": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Abre o turno do motoboy do token, que fica disponível */
        post: operations["turnos.abrir"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/turnos/fechar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Fecha o turno (recusa com rota em andamento) */
        post: operations["turnos.fechar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/disponibilidade": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Alterna entre disponível e pausa (exige turno aberto) */
        post: operations["motoboys.alterarDisponibilidade"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/turnos/{id}/encerrar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** A central encerra um turno esquecido (recusa com rota em andamento) */
        post: operations["turnos.encerrarForcado"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rotas/{id}/ofertar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Oferta a rota pronta a um motoboy (manual) ou a vários (broadcast) */
        post: operations["ofertas.ofertarRota"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rotas/{id}/retirar-oferta": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Retira as ofertas abertas; a rota volta para pronta */
        post: operations["ofertas.retirar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/ofertas": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Ofertas abertas do motoboy do token */
        get: operations["ofertas.abertasDoMotoboy"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/ofertas/{id}/visualizar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Registra que o motoboy abriu a oferta */
        post: operations["ofertas.visualizar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/ofertas/{id}/aceitar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Aceita a oferta; em disputa, quem perde recebe 409 oferta_indisponivel */
        post: operations["ofertas.aceitar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/ofertas/{id}/recusar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Recusa a oferta (motivo opcional) */
        post: operations["ofertas.recusar"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/inicio": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Turno, ofertas abertas e rota ativa do motoboy do token */
        get: operations["appMotoboy.inicio"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/entregas": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Entregas que o motoboy do token terminou no período (padrão: hoje; até 31 dias), com resumo e ganho de cada uma */
        get: operations["appMotoboy.historico"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/dispositivo": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Registra o token de push do aparelho (chame a cada abertura do app) */
        post: operations["notificacoes.registrarDispositivo"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/app/dispositivo/desativar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Desativa o token de push deste aparelho (chame ao sair, antes do /auth/logout) */
        post: operations["notificacoes.desativarDispositivo"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Erro: {
            erro: {
                /** @description Estável, em snake_case: decida a mensagem por ele */
                codigo: string;
                mensagem: string;
                detalhes: {
                    [key: string]: unknown;
                };
                requestId: string;
            };
        };
        Def0_schema0: string | number | boolean | null | components["schemas"]["Def0_schema0"][] | {
            [key: string]: components["schemas"]["Def0_schema0"];
        };
        Def1_schema1: string | number | boolean | null | components["schemas"]["Def1_schema1"][] | {
            [key: string]: components["schemas"]["Def1_schema1"];
        };
        Def2_schema0: string | number | boolean | null | components["schemas"]["Def2_schema0"][] | {
            [key: string]: components["schemas"]["Def2_schema0"];
        };
        Def3_schema1: string | number | boolean | null | components["schemas"]["Def3_schema1"][] | {
            [key: string]: components["schemas"]["Def3_schema1"];
        };
        Def4_schema0: string | number | boolean | null | components["schemas"]["Def4_schema0"][] | {
            [key: string]: components["schemas"]["Def4_schema0"];
        };
        Def5_schema1: string | number | boolean | null | components["schemas"]["Def5_schema1"][] | {
            [key: string]: components["schemas"]["Def5_schema1"];
        };
        Def6_schema0: string | number | boolean | null | components["schemas"]["Def6_schema0"][] | {
            [key: string]: components["schemas"]["Def6_schema0"];
        };
        Def7_schema0: string | number | boolean | null | components["schemas"]["Def7_schema0"][] | {
            [key: string]: components["schemas"]["Def7_schema0"];
        };
        Def8_schema1: string | number | boolean | null | components["schemas"]["Def8_schema1"][] | {
            [key: string]: components["schemas"]["Def8_schema1"];
        };
        Def9_schema0: string | number | boolean | null | components["schemas"]["Def9_schema0"][] | {
            [key: string]: components["schemas"]["Def9_schema0"];
        };
        Def10_schema1: string | number | boolean | null | components["schemas"]["Def10_schema1"][] | {
            [key: string]: components["schemas"]["Def10_schema1"];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    "saude.verificar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** @enum {string} */
                            status: "ok" | "degradado";
                            banco: boolean;
                            /** @description true pronto, false fora (não muda o status HTTP), null sem Redis configurado */
                            redis: boolean | null;
                            versao: string;
                        };
                    };
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "auth.loginWeb": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: email */
                    email: string;
                    senha: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            usuario: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                                /** Format: email */
                                email: string;
                                adminPlataforma: boolean;
                            };
                            organizacaoAtiva: {
                                /** Format: uuid */
                                organizacaoId: string;
                                nome: string;
                                /** @description empresa_motofrete ou restaurante */
                                tipo: string;
                                papel: string;
                                permissoes: ("organizacao.gerenciar" | "equipe.gerenciar" | "parcerias.solicitar" | "parcerias.decidir" | "motoboys.gerenciar" | "motoboys.documentos.validar" | "entregas.criar" | "entregas.ver" | "entregas.cancelar" | "entregas.decidir_ausente" | "entregas.confirmar_devolucao" | "entregas.atribuir_motoboy" | "rotas.gerenciar" | "ocorrencias.gerenciar" | "condicoes.gerenciar" | "caixa.conferir" | "caixa.confirmar_recebimento" | "planos.gerenciar" | "lancamentos.ajustar" | "fechamentos.gerenciar" | "fechamentos.pagar" | "faturas.gerenciar" | "faturas.ver" | "relatorios.ver" | "app.motoboy")[];
                            } | null;
                            vinculos: {
                                /** Format: uuid */
                                organizacaoId: string;
                                nome: string;
                                /** @description empresa_motofrete ou restaurante */
                                tipo: string;
                                papel: string;
                            }[];
                            /** @description Enviar no header X-CSRF-Token nas mutações com cookie */
                            csrfToken: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Muitas tentativas (limite_excedido, conta_bloqueada) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "auth.loginApp": {
        parameters: {
            query?: never;
            header?: {
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: email */
                    email: string;
                    senha: string;
                    dispositivoId?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** @description JWT de 15 min: Authorization: Bearer <accessToken> */
                            accessToken: string;
                            /** @description Opaco, 30 dias, troca a cada uso em /auth/app/refresh */
                            refreshToken: string;
                            /** Format: date-time */
                            acessoExpiraEm: string;
                            /** Format: uuid */
                            organizacaoId: string;
                            motoboyId: string | null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Muitas tentativas (limite_excedido, conta_bloqueada) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "auth.renovar": {
        parameters: {
            query?: never;
            header?: {
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    refreshToken: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** @description JWT de 15 min: Authorization: Bearer <accessToken> */
                            accessToken: string;
                            /** @description Opaco, 30 dias, troca a cada uso em /auth/app/refresh */
                            refreshToken: string;
                            /** Format: date-time */
                            acessoExpiraEm: string;
                            /** Format: uuid */
                            organizacaoId: string;
                            motoboyId: string | null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "auth.eu": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            usuario: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                                /** Format: email */
                                email: string;
                                adminPlataforma: boolean;
                            };
                            organizacaoAtiva: {
                                /** Format: uuid */
                                organizacaoId: string;
                                nome: string;
                                /** @description empresa_motofrete ou restaurante */
                                tipo: string;
                                papel: string;
                                permissoes: ("organizacao.gerenciar" | "equipe.gerenciar" | "parcerias.solicitar" | "parcerias.decidir" | "motoboys.gerenciar" | "motoboys.documentos.validar" | "entregas.criar" | "entregas.ver" | "entregas.cancelar" | "entregas.decidir_ausente" | "entregas.confirmar_devolucao" | "entregas.atribuir_motoboy" | "rotas.gerenciar" | "ocorrencias.gerenciar" | "condicoes.gerenciar" | "caixa.conferir" | "caixa.confirmar_recebimento" | "planos.gerenciar" | "lancamentos.ajustar" | "fechamentos.gerenciar" | "fechamentos.pagar" | "faturas.gerenciar" | "faturas.ver" | "relatorios.ver" | "app.motoboy")[];
                            } | null;
                            vinculos: {
                                /** Format: uuid */
                                organizacaoId: string;
                                nome: string;
                                /** @description empresa_motofrete ou restaurante */
                                tipo: string;
                                papel: string;
                            }[];
                            /** @description Enviar no header X-CSRF-Token nas mutações com cookie */
                            csrfToken: string;
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "auth.sair": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** @constant */
                            saiu: true;
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "auth.trocarOrganizacao": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: uuid */
                    organizacaoId: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            usuario: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                                /** Format: email */
                                email: string;
                                adminPlataforma: boolean;
                            };
                            organizacaoAtiva: {
                                /** Format: uuid */
                                organizacaoId: string;
                                nome: string;
                                /** @description empresa_motofrete ou restaurante */
                                tipo: string;
                                papel: string;
                                permissoes: ("organizacao.gerenciar" | "equipe.gerenciar" | "parcerias.solicitar" | "parcerias.decidir" | "motoboys.gerenciar" | "motoboys.documentos.validar" | "entregas.criar" | "entregas.ver" | "entregas.cancelar" | "entregas.decidir_ausente" | "entregas.confirmar_devolucao" | "entregas.atribuir_motoboy" | "rotas.gerenciar" | "ocorrencias.gerenciar" | "condicoes.gerenciar" | "caixa.conferir" | "caixa.confirmar_recebimento" | "planos.gerenciar" | "lancamentos.ajustar" | "fechamentos.gerenciar" | "fechamentos.pagar" | "faturas.gerenciar" | "faturas.ver" | "relatorios.ver" | "app.motoboy")[];
                            } | null;
                            vinculos: {
                                /** Format: uuid */
                                organizacaoId: string;
                                nome: string;
                                /** @description empresa_motofrete ou restaurante */
                                tipo: string;
                                papel: string;
                            }[];
                            /** @description Enviar no header X-CSRF-Token nas mutações com cookie */
                            csrfToken: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "auth.solicitarRedefinicao": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: email */
                    email: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** @constant */
                            solicitado: true;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Muitas tentativas (limite_excedido, conta_bloqueada) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "auth.redefinirSenha": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    token: string;
                    /** @description Fora da lista de senhas comuns (erro senha_curta, senha_longa ou senha_comum) */
                    senha: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** @constant */
                            senhaAlterada: true;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Muitas tentativas (limite_excedido, conta_bloqueada) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "auth.aceitarConvite": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    token: string;
                    /** @description Fora da lista de senhas comuns (erro senha_curta, senha_longa ou senha_comum) */
                    senha: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** @constant */
                            conviteAceito: true;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Muitas tentativas (limite_excedido, conta_bloqueada) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "cep.consultar": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                cep: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** @description 8 dígitos, sem hífen */
                            cep: string;
                            /** @description null em CEP geral de cidade */
                            logradouro: string | null;
                            /** @description null em CEP geral de cidade */
                            bairro: string | null;
                            cidade: string;
                            uf: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Muitas tentativas (limite_excedido, conta_bloqueada) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "equipe.listar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            vinculoId: string;
                            /** Format: uuid */
                            usuarioId: string;
                            nome: string;
                            /** Format: email */
                            email: string;
                            /** @enum {string} */
                            papel: "admin_empresa" | "operador" | "financeiro" | "admin_restaurante" | "atendente_restaurante" | "motoboy";
                            /** @enum {string} */
                            status: "convidado" | "ativo" | "suspenso";
                            permissoesExtra: ("organizacao.gerenciar" | "equipe.gerenciar" | "parcerias.solicitar" | "parcerias.decidir" | "motoboys.gerenciar" | "motoboys.documentos.validar" | "entregas.criar" | "entregas.ver" | "entregas.cancelar" | "entregas.decidir_ausente" | "entregas.confirmar_devolucao" | "entregas.atribuir_motoboy" | "rotas.gerenciar" | "ocorrencias.gerenciar" | "condicoes.gerenciar" | "caixa.conferir" | "caixa.confirmar_recebimento" | "planos.gerenciar" | "lancamentos.ajustar" | "fechamentos.gerenciar" | "fechamentos.pagar" | "faturas.gerenciar" | "faturas.ver" | "relatorios.ver" | "app.motoboy")[];
                            permissoesNegadas: ("organizacao.gerenciar" | "equipe.gerenciar" | "parcerias.solicitar" | "parcerias.decidir" | "motoboys.gerenciar" | "motoboys.documentos.validar" | "entregas.criar" | "entregas.ver" | "entregas.cancelar" | "entregas.decidir_ausente" | "entregas.confirmar_devolucao" | "entregas.atribuir_motoboy" | "rotas.gerenciar" | "ocorrencias.gerenciar" | "condicoes.gerenciar" | "caixa.conferir" | "caixa.confirmar_recebimento" | "planos.gerenciar" | "lancamentos.ajustar" | "fechamentos.gerenciar" | "fechamentos.pagar" | "faturas.gerenciar" | "faturas.ver" | "relatorios.ver" | "app.motoboy")[];
                            ultimoLoginEm: string | null;
                        }[];
                        meta: {
                            /** @description Repasse em ?cursor= para a próxima página */
                            proximoCursor: string | null;
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "equipe.convidar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    nome: string;
                    /** Format: email */
                    email: string;
                    /** @enum {string} */
                    papel: "admin_empresa" | "operador" | "financeiro" | "admin_restaurante" | "atendente_restaurante" | "motoboy";
                    /** @default [] */
                    permissoesExtra?: ("organizacao.gerenciar" | "equipe.gerenciar" | "parcerias.solicitar" | "parcerias.decidir" | "motoboys.gerenciar" | "motoboys.documentos.validar" | "entregas.criar" | "entregas.ver" | "entregas.cancelar" | "entregas.decidir_ausente" | "entregas.confirmar_devolucao" | "entregas.atribuir_motoboy" | "rotas.gerenciar" | "ocorrencias.gerenciar" | "condicoes.gerenciar" | "caixa.conferir" | "caixa.confirmar_recebimento" | "planos.gerenciar" | "lancamentos.ajustar" | "fechamentos.gerenciar" | "fechamentos.pagar" | "faturas.gerenciar" | "faturas.ver" | "relatorios.ver" | "app.motoboy")[];
                    /** @default [] */
                    permissoesNegadas?: ("organizacao.gerenciar" | "equipe.gerenciar" | "parcerias.solicitar" | "parcerias.decidir" | "motoboys.gerenciar" | "motoboys.documentos.validar" | "entregas.criar" | "entregas.ver" | "entregas.cancelar" | "entregas.decidir_ausente" | "entregas.confirmar_devolucao" | "entregas.atribuir_motoboy" | "rotas.gerenciar" | "ocorrencias.gerenciar" | "condicoes.gerenciar" | "caixa.conferir" | "caixa.confirmar_recebimento" | "planos.gerenciar" | "lancamentos.ajustar" | "fechamentos.gerenciar" | "fechamentos.pagar" | "faturas.gerenciar" | "faturas.ver" | "relatorios.ver" | "app.motoboy")[];
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            vinculoId: string;
                            /** Format: uuid */
                            usuarioId: string;
                            nome: string;
                            /** Format: email */
                            email: string;
                            /** @enum {string} */
                            papel: "admin_empresa" | "operador" | "financeiro" | "admin_restaurante" | "atendente_restaurante" | "motoboy";
                            /** @enum {string} */
                            status: "convidado" | "ativo" | "suspenso";
                            permissoesExtra: ("organizacao.gerenciar" | "equipe.gerenciar" | "parcerias.solicitar" | "parcerias.decidir" | "motoboys.gerenciar" | "motoboys.documentos.validar" | "entregas.criar" | "entregas.ver" | "entregas.cancelar" | "entregas.decidir_ausente" | "entregas.confirmar_devolucao" | "entregas.atribuir_motoboy" | "rotas.gerenciar" | "ocorrencias.gerenciar" | "condicoes.gerenciar" | "caixa.conferir" | "caixa.confirmar_recebimento" | "planos.gerenciar" | "lancamentos.ajustar" | "fechamentos.gerenciar" | "fechamentos.pagar" | "faturas.gerenciar" | "faturas.ver" | "relatorios.ver" | "app.motoboy")[];
                            permissoesNegadas: ("organizacao.gerenciar" | "equipe.gerenciar" | "parcerias.solicitar" | "parcerias.decidir" | "motoboys.gerenciar" | "motoboys.documentos.validar" | "entregas.criar" | "entregas.ver" | "entregas.cancelar" | "entregas.decidir_ausente" | "entregas.confirmar_devolucao" | "entregas.atribuir_motoboy" | "rotas.gerenciar" | "ocorrencias.gerenciar" | "condicoes.gerenciar" | "caixa.conferir" | "caixa.confirmar_recebimento" | "planos.gerenciar" | "lancamentos.ajustar" | "fechamentos.gerenciar" | "fechamentos.pagar" | "faturas.gerenciar" | "faturas.ver" | "relatorios.ver" | "app.motoboy")[];
                            ultimoLoginEm: string | null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "equipe.alterar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                vinculoId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    papel?: "admin_empresa" | "operador" | "financeiro" | "admin_restaurante" | "atendente_restaurante" | "motoboy";
                    permissoesExtra?: ("organizacao.gerenciar" | "equipe.gerenciar" | "parcerias.solicitar" | "parcerias.decidir" | "motoboys.gerenciar" | "motoboys.documentos.validar" | "entregas.criar" | "entregas.ver" | "entregas.cancelar" | "entregas.decidir_ausente" | "entregas.confirmar_devolucao" | "entregas.atribuir_motoboy" | "rotas.gerenciar" | "ocorrencias.gerenciar" | "condicoes.gerenciar" | "caixa.conferir" | "caixa.confirmar_recebimento" | "planos.gerenciar" | "lancamentos.ajustar" | "fechamentos.gerenciar" | "fechamentos.pagar" | "faturas.gerenciar" | "faturas.ver" | "relatorios.ver" | "app.motoboy")[];
                    permissoesNegadas?: ("organizacao.gerenciar" | "equipe.gerenciar" | "parcerias.solicitar" | "parcerias.decidir" | "motoboys.gerenciar" | "motoboys.documentos.validar" | "entregas.criar" | "entregas.ver" | "entregas.cancelar" | "entregas.decidir_ausente" | "entregas.confirmar_devolucao" | "entregas.atribuir_motoboy" | "rotas.gerenciar" | "ocorrencias.gerenciar" | "condicoes.gerenciar" | "caixa.conferir" | "caixa.confirmar_recebimento" | "planos.gerenciar" | "lancamentos.ajustar" | "fechamentos.gerenciar" | "fechamentos.pagar" | "faturas.gerenciar" | "faturas.ver" | "relatorios.ver" | "app.motoboy")[];
                    /** @enum {string} */
                    status?: "ativo" | "suspenso";
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            vinculoId: string;
                            /** Format: uuid */
                            usuarioId: string;
                            nome: string;
                            /** Format: email */
                            email: string;
                            /** @enum {string} */
                            papel: "admin_empresa" | "operador" | "financeiro" | "admin_restaurante" | "atendente_restaurante" | "motoboy";
                            /** @enum {string} */
                            status: "convidado" | "ativo" | "suspenso";
                            permissoesExtra: ("organizacao.gerenciar" | "equipe.gerenciar" | "parcerias.solicitar" | "parcerias.decidir" | "motoboys.gerenciar" | "motoboys.documentos.validar" | "entregas.criar" | "entregas.ver" | "entregas.cancelar" | "entregas.decidir_ausente" | "entregas.confirmar_devolucao" | "entregas.atribuir_motoboy" | "rotas.gerenciar" | "ocorrencias.gerenciar" | "condicoes.gerenciar" | "caixa.conferir" | "caixa.confirmar_recebimento" | "planos.gerenciar" | "lancamentos.ajustar" | "fechamentos.gerenciar" | "fechamentos.pagar" | "faturas.gerenciar" | "faturas.ver" | "relatorios.ver" | "app.motoboy")[];
                            permissoesNegadas: ("organizacao.gerenciar" | "equipe.gerenciar" | "parcerias.solicitar" | "parcerias.decidir" | "motoboys.gerenciar" | "motoboys.documentos.validar" | "entregas.criar" | "entregas.ver" | "entregas.cancelar" | "entregas.decidir_ausente" | "entregas.confirmar_devolucao" | "entregas.atribuir_motoboy" | "rotas.gerenciar" | "ocorrencias.gerenciar" | "condicoes.gerenciar" | "caixa.conferir" | "caixa.confirmar_recebimento" | "planos.gerenciar" | "lancamentos.ajustar" | "fechamentos.gerenciar" | "fechamentos.pagar" | "faturas.gerenciar" | "faturas.ver" | "relatorios.ver" | "app.motoboy")[];
                            ultimoLoginEm: string | null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "organizacao.obter": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            tipo: "empresa_motofrete" | "restaurante";
                            nomeFantasia: string;
                            razaoSocial: string | null;
                            /** @description CPF ou CNPJ, só dígitos */
                            documento: string | null;
                            email: string | null;
                            telefone: string | null;
                            endereco: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                coordenada: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            } | null;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "rejeitada" | "suspensa";
                            /** @description Restaurante dono, quando a empresa é a frota própria dele (só atende esse restaurante) */
                            frotaPropriaDe: string | null;
                            aprovadaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "organizacao.atualizar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    nomeFantasia?: string;
                    razaoSocial?: string | null;
                    email?: string | null;
                    telefone?: string | null;
                    endereco?: {
                        cep?: string;
                        logradouro: string;
                        numero?: string;
                        complemento?: string;
                        bairro?: string;
                        cidade?: string;
                        uf?: string;
                        referencia?: string;
                        coordenada?: {
                            lat: number;
                            lng: number;
                        };
                    } | null;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            tipo: "empresa_motofrete" | "restaurante";
                            nomeFantasia: string;
                            razaoSocial: string | null;
                            /** @description CPF ou CNPJ, só dígitos */
                            documento: string | null;
                            email: string | null;
                            telefone: string | null;
                            endereco: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                coordenada: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            } | null;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "rejeitada" | "suspensa";
                            /** @description Restaurante dono, quando a empresa é a frota própria dele (só atende esse restaurante) */
                            frotaPropriaDe: string | null;
                            aprovadaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "organizacao.obterConfiguracoes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            prazoOfertaSeg: number;
                            aceiteAutomaticoEntregas: boolean;
                            /** @enum {string} */
                            modoOfertaPadrao: "manual" | "broadcast" | "automatico";
                            /** @enum {string} */
                            periodoFechamentoMotoboy: "diario" | "semanal" | "quinzenal" | "mensal";
                            /** @description 0 = domingo ... 6 = sábado */
                            diaInicioSemana: number;
                            raioChegueiM: number;
                            retencaoLocalizacaoDias: number;
                            /** @description Dias após o estado final até apagar o telefone do cliente */
                            retencaoTelefoneClienteDias: number;
                            liberarAgendadaMinAntes: number;
                            /** Format: date-time */
                            atualizadasEm: string;
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "organizacao.atualizarConfiguracoes": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    prazoOfertaSeg?: number;
                    aceiteAutomaticoEntregas?: boolean;
                    /** @enum {string} */
                    modoOfertaPadrao?: "manual" | "broadcast" | "automatico";
                    /** @enum {string} */
                    periodoFechamentoMotoboy?: "diario" | "semanal" | "quinzenal" | "mensal";
                    diaInicioSemana?: number;
                    raioChegueiM?: number;
                    retencaoLocalizacaoDias?: number;
                    retencaoTelefoneClienteDias?: number;
                    liberarAgendadaMinAntes?: number;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            prazoOfertaSeg: number;
                            aceiteAutomaticoEntregas: boolean;
                            /** @enum {string} */
                            modoOfertaPadrao: "manual" | "broadcast" | "automatico";
                            /** @enum {string} */
                            periodoFechamentoMotoboy: "diario" | "semanal" | "quinzenal" | "mensal";
                            /** @description 0 = domingo ... 6 = sábado */
                            diaInicioSemana: number;
                            raioChegueiM: number;
                            retencaoLocalizacaoDias: number;
                            /** @description Dias após o estado final até apagar o telefone do cliente */
                            retencaoTelefoneClienteDias: number;
                            liberarAgendadaMinAntes: number;
                            /** Format: date-time */
                            atualizadasEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "organizacao.frotaPropria": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            ativa: boolean;
                            empresa: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            } | null;
                            parceria: {
                                /** Format: uuid */
                                id: string;
                                status: string;
                            } | null;
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "organizacao.ativarFrotaPropria": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            ativa: boolean;
                            empresa: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            } | null;
                            parceria: {
                                /** Format: uuid */
                                id: string;
                                status: string;
                            } | null;
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.organizacoes.listar": {
        parameters: {
            query?: {
                cursor?: string;
                limite?: number;
                tipo?: "empresa_motofrete" | "restaurante";
                status?: "pendente" | "ativa" | "rejeitada" | "suspensa";
                busca?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            tipo: "empresa_motofrete" | "restaurante";
                            nomeFantasia: string;
                            razaoSocial: string | null;
                            /** @description CPF ou CNPJ, só dígitos */
                            documento: string | null;
                            email: string | null;
                            telefone: string | null;
                            endereco: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                coordenada: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            } | null;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "rejeitada" | "suspensa";
                            /** @description Restaurante dono, quando a empresa é a frota própria dele (só atende esse restaurante) */
                            frotaPropriaDe: string | null;
                            aprovadaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                        }[];
                        meta: {
                            /** @description Repasse em ?cursor= para a próxima página */
                            proximoCursor: string | null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.organizacoes.criar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    tipo: "empresa_motofrete" | "restaurante";
                    nomeFantasia: string;
                    razaoSocial?: string;
                    documento?: string;
                    /** Format: email */
                    email?: string;
                    telefone?: string;
                    endereco?: {
                        cep?: string;
                        logradouro: string;
                        numero?: string;
                        complemento?: string;
                        bairro?: string;
                        cidade?: string;
                        uf?: string;
                        referencia?: string;
                        coordenada?: {
                            lat: number;
                            lng: number;
                        };
                    };
                    administrador: {
                        nome: string;
                        /** Format: email */
                        email: string;
                    };
                    cobranca?: {
                        /** Format: date */
                        vigenteDe?: string;
                        /** @default 0 */
                        mensalidade?: string;
                        /** @default 0 */
                        precoPorEntrega?: string;
                        /** @default 0 */
                        franquiaEntregas?: number;
                        /** @default 0 */
                        minimoMensal?: string;
                        /**
                         * @default [
                         *       "entregue"
                         *     ]
                         */
                        statusCobrados?: ("entregue" | "devolvida" | "cancelada" | "extraviada")[];
                        /** @default 10 */
                        diaVencimento?: number;
                        observacoes?: string;
                    };
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            tipo: "empresa_motofrete" | "restaurante";
                            nomeFantasia: string;
                            razaoSocial: string | null;
                            /** @description CPF ou CNPJ, só dígitos */
                            documento: string | null;
                            email: string | null;
                            telefone: string | null;
                            endereco: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                coordenada: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            } | null;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "rejeitada" | "suspensa";
                            /** @description Restaurante dono, quando a empresa é a frota própria dele (só atende esse restaurante) */
                            frotaPropriaDe: string | null;
                            aprovadaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.organizacoes.aprovar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            tipo: "empresa_motofrete" | "restaurante";
                            nomeFantasia: string;
                            razaoSocial: string | null;
                            /** @description CPF ou CNPJ, só dígitos */
                            documento: string | null;
                            email: string | null;
                            telefone: string | null;
                            endereco: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                coordenada: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            } | null;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "rejeitada" | "suspensa";
                            /** @description Restaurante dono, quando a empresa é a frota própria dele (só atende esse restaurante) */
                            frotaPropriaDe: string | null;
                            aprovadaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.organizacoes.rejeitar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            tipo: "empresa_motofrete" | "restaurante";
                            nomeFantasia: string;
                            razaoSocial: string | null;
                            /** @description CPF ou CNPJ, só dígitos */
                            documento: string | null;
                            email: string | null;
                            telefone: string | null;
                            endereco: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                coordenada: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            } | null;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "rejeitada" | "suspensa";
                            /** @description Restaurante dono, quando a empresa é a frota própria dele (só atende esse restaurante) */
                            frotaPropriaDe: string | null;
                            aprovadaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.organizacoes.suspender": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            tipo: "empresa_motofrete" | "restaurante";
                            nomeFantasia: string;
                            razaoSocial: string | null;
                            /** @description CPF ou CNPJ, só dígitos */
                            documento: string | null;
                            email: string | null;
                            telefone: string | null;
                            endereco: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                coordenada: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            } | null;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "rejeitada" | "suspensa";
                            /** @description Restaurante dono, quando a empresa é a frota própria dele (só atende esse restaurante) */
                            frotaPropriaDe: string | null;
                            aprovadaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.organizacoes.reativar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            tipo: "empresa_motofrete" | "restaurante";
                            nomeFantasia: string;
                            razaoSocial: string | null;
                            /** @description CPF ou CNPJ, só dígitos */
                            documento: string | null;
                            email: string | null;
                            telefone: string | null;
                            endereco: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                coordenada: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            } | null;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "rejeitada" | "suspensa";
                            /** @description Restaurante dono, quando a empresa é a frota própria dele (só atende esse restaurante) */
                            frotaPropriaDe: string | null;
                            aprovadaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.auditoria.listar": {
        parameters: {
            query?: {
                organizacaoId?: string;
                entidadeTipo?: string;
                entidadeId?: string;
                acao?: string;
                cursor?: string;
                limite?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            id: string;
                            organizacaoId: string | null;
                            usuarioId: string | null;
                            /** @description Ex.: organizacao.aprovar, equipe.convidar */
                            acao: string;
                            entidadeTipo: string;
                            entidadeId: string | null;
                            antes: components["schemas"]["Def0_schema0"] | null;
                            depois: components["schemas"]["Def1_schema1"] | null;
                            acessoExcepcional: boolean;
                            ip: string | null;
                            requestId: string | null;
                            /** Format: date-time */
                            criadoEm: string;
                            usuario: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                                email: string;
                            } | null;
                            organizacao: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            } | null;
                        }[];
                        meta: {
                            /** @description Repasse em ?cursor= para a próxima página */
                            proximoCursor: string | null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.assinatura.obter": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            organizacao: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                                tipo: string;
                            };
                            vigente: {
                                /** Format: uuid */
                                id: string;
                                /** Format: uuid */
                                organizacaoId: string;
                                /** Format: date */
                                vigenteDe: string;
                                vigenteAte: string | null;
                                mensalidade: string;
                                precoPorEntrega: string;
                                franquiaEntregas: number;
                                minimoMensal: string;
                                statusCobrados: ("entregue" | "devolvida" | "cancelada" | "extraviada")[];
                                diaVencimento: number;
                                observacoes: string | null;
                                /** Format: date-time */
                                criadaEm: string;
                            } | null;
                            versoes: {
                                /** Format: uuid */
                                id: string;
                                /** Format: uuid */
                                organizacaoId: string;
                                /** Format: date */
                                vigenteDe: string;
                                vigenteAte: string | null;
                                mensalidade: string;
                                precoPorEntrega: string;
                                franquiaEntregas: number;
                                minimoMensal: string;
                                statusCobrados: ("entregue" | "devolvida" | "cancelada" | "extraviada")[];
                                diaVencimento: number;
                                observacoes: string | null;
                                /** Format: date-time */
                                criadaEm: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.assinatura.definir": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date */
                    vigenteDe?: string;
                    /** @default 0 */
                    mensalidade?: string;
                    /** @default 0 */
                    precoPorEntrega?: string;
                    /** @default 0 */
                    franquiaEntregas?: number;
                    /** @default 0 */
                    minimoMensal?: string;
                    /**
                     * @default [
                     *       "entregue"
                     *     ]
                     */
                    statusCobrados?: ("entregue" | "devolvida" | "cancelada" | "extraviada")[];
                    /** @default 10 */
                    diaVencimento?: number;
                    observacoes?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            organizacaoId: string;
                            /** Format: date */
                            vigenteDe: string;
                            vigenteAte: string | null;
                            mensalidade: string;
                            precoPorEntrega: string;
                            franquiaEntregas: number;
                            minimoMensal: string;
                            statusCobrados: ("entregue" | "devolvida" | "cancelada" | "extraviada")[];
                            diaVencimento: number;
                            observacoes: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.assinatura.encerrar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date */
                    ate?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            organizacaoId: string;
                            /** Format: date */
                            vigenteDe: string;
                            vigenteAte: string | null;
                            mensalidade: string;
                            precoPorEntrega: string;
                            franquiaEntregas: number;
                            minimoMensal: string;
                            statusCobrados: ("entregue" | "devolvida" | "cancelada" | "extraviada")[];
                            diaVencimento: number;
                            observacoes: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.assinatura.consumo": {
        parameters: {
            query?: {
                competencia?: string;
            };
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            competencia: string;
                            entregas: number;
                            itens: {
                                /** @enum {string} */
                                tipo: "mensalidade" | "entregas" | "minimo";
                                descricao: string;
                                /** Format: date */
                                inicio: string;
                                /** Format: date */
                                fim: string;
                                quantidade: number;
                                valorUnitario: string;
                                total: string;
                            }[];
                            total: string;
                        } | null;
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.faturas.listar": {
        parameters: {
            query?: {
                status?: "emitida" | "paga" | "vencida" | "cancelada";
                organizacaoId?: string;
                competencia?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            numero: string;
                            organizacao: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                                tipo: string;
                            };
                            competencia: string;
                            /** @enum {string} */
                            status: "emitida" | "paga" | "vencida" | "cancelada";
                            quantidadeEntregas: number;
                            total: string;
                            itens: {
                                /** @enum {string} */
                                tipo: "mensalidade" | "entregas" | "minimo";
                                descricao: string;
                                /** Format: date */
                                inicio: string;
                                /** Format: date */
                                fim: string;
                                quantidade: number;
                                valorUnitario: string;
                                total: string;
                            }[];
                            /** Format: date */
                            vencimento: string;
                            pagaEm: string | null;
                            canceladaEm: string | null;
                            motivoCancelamento: string | null;
                            geradaAutomaticamente: boolean;
                            /** Format: date-time */
                            criadaEm: string;
                            notaFiscal: {
                                numero: string;
                                /** Format: date */
                                emitidaEm: string;
                                codigoVerificacao: string | null;
                                link: string | null;
                                pdfArquivoId: string | null;
                                xmlArquivoId: string | null;
                                /** Format: date-time */
                                registradaEm: string;
                            } | null;
                            acoesPermitidas: ("pagar" | "cancelar")[];
                        }[];
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.faturas.gerar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    competencia: string;
                    organizacaoIds?: string[];
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            criadas: {
                                /** Format: uuid */
                                id: string;
                                numero: string;
                                organizacao: {
                                    /** Format: uuid */
                                    id: string;
                                    nome: string;
                                    tipo: string;
                                };
                                competencia: string;
                                /** @enum {string} */
                                status: "emitida" | "paga" | "vencida" | "cancelada";
                                quantidadeEntregas: number;
                                total: string;
                                itens: {
                                    /** @enum {string} */
                                    tipo: "mensalidade" | "entregas" | "minimo";
                                    descricao: string;
                                    /** Format: date */
                                    inicio: string;
                                    /** Format: date */
                                    fim: string;
                                    quantidade: number;
                                    valorUnitario: string;
                                    total: string;
                                }[];
                                /** Format: date */
                                vencimento: string;
                                pagaEm: string | null;
                                canceladaEm: string | null;
                                motivoCancelamento: string | null;
                                geradaAutomaticamente: boolean;
                                /** Format: date-time */
                                criadaEm: string;
                                notaFiscal: {
                                    numero: string;
                                    /** Format: date */
                                    emitidaEm: string;
                                    codigoVerificacao: string | null;
                                    link: string | null;
                                    pdfArquivoId: string | null;
                                    xmlArquivoId: string | null;
                                    /** Format: date-time */
                                    registradaEm: string;
                                } | null;
                                acoesPermitidas: ("pagar" | "cancelar")[];
                            }[];
                            ignoradas: {
                                /** Format: uuid */
                                organizacaoId: string;
                                motivo: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.faturas.obter": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            numero: string;
                            organizacao: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                                tipo: string;
                            };
                            competencia: string;
                            /** @enum {string} */
                            status: "emitida" | "paga" | "vencida" | "cancelada";
                            quantidadeEntregas: number;
                            total: string;
                            itens: {
                                /** @enum {string} */
                                tipo: "mensalidade" | "entregas" | "minimo";
                                descricao: string;
                                /** Format: date */
                                inicio: string;
                                /** Format: date */
                                fim: string;
                                quantidade: number;
                                valorUnitario: string;
                                total: string;
                            }[];
                            /** Format: date */
                            vencimento: string;
                            pagaEm: string | null;
                            canceladaEm: string | null;
                            motivoCancelamento: string | null;
                            geradaAutomaticamente: boolean;
                            /** Format: date-time */
                            criadaEm: string;
                            notaFiscal: {
                                numero: string;
                                /** Format: date */
                                emitidaEm: string;
                                codigoVerificacao: string | null;
                                link: string | null;
                                pdfArquivoId: string | null;
                                xmlArquivoId: string | null;
                                /** Format: date-time */
                                registradaEm: string;
                            } | null;
                            acoesPermitidas: ("pagar" | "cancelar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.faturas.pagar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            numero: string;
                            organizacao: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                                tipo: string;
                            };
                            competencia: string;
                            /** @enum {string} */
                            status: "emitida" | "paga" | "vencida" | "cancelada";
                            quantidadeEntregas: number;
                            total: string;
                            itens: {
                                /** @enum {string} */
                                tipo: "mensalidade" | "entregas" | "minimo";
                                descricao: string;
                                /** Format: date */
                                inicio: string;
                                /** Format: date */
                                fim: string;
                                quantidade: number;
                                valorUnitario: string;
                                total: string;
                            }[];
                            /** Format: date */
                            vencimento: string;
                            pagaEm: string | null;
                            canceladaEm: string | null;
                            motivoCancelamento: string | null;
                            geradaAutomaticamente: boolean;
                            /** Format: date-time */
                            criadaEm: string;
                            notaFiscal: {
                                numero: string;
                                /** Format: date */
                                emitidaEm: string;
                                codigoVerificacao: string | null;
                                link: string | null;
                                pdfArquivoId: string | null;
                                xmlArquivoId: string | null;
                                /** Format: date-time */
                                registradaEm: string;
                            } | null;
                            acoesPermitidas: ("pagar" | "cancelar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.faturas.cancelar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            numero: string;
                            organizacao: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                                tipo: string;
                            };
                            competencia: string;
                            /** @enum {string} */
                            status: "emitida" | "paga" | "vencida" | "cancelada";
                            quantidadeEntregas: number;
                            total: string;
                            itens: {
                                /** @enum {string} */
                                tipo: "mensalidade" | "entregas" | "minimo";
                                descricao: string;
                                /** Format: date */
                                inicio: string;
                                /** Format: date */
                                fim: string;
                                quantidade: number;
                                valorUnitario: string;
                                total: string;
                            }[];
                            /** Format: date */
                            vencimento: string;
                            pagaEm: string | null;
                            canceladaEm: string | null;
                            motivoCancelamento: string | null;
                            geradaAutomaticamente: boolean;
                            /** Format: date-time */
                            criadaEm: string;
                            notaFiscal: {
                                numero: string;
                                /** Format: date */
                                emitidaEm: string;
                                codigoVerificacao: string | null;
                                link: string | null;
                                pdfArquivoId: string | null;
                                xmlArquivoId: string | null;
                                /** Format: date-time */
                                registradaEm: string;
                            } | null;
                            acoesPermitidas: ("pagar" | "cancelar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "organizacao.assinatura": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            assinatura: {
                                /** Format: uuid */
                                id: string;
                                /** Format: uuid */
                                organizacaoId: string;
                                /** Format: date */
                                vigenteDe: string;
                                vigenteAte: string | null;
                                mensalidade: string;
                                precoPorEntrega: string;
                                franquiaEntregas: number;
                                minimoMensal: string;
                                statusCobrados: ("entregue" | "devolvida" | "cancelada" | "extraviada")[];
                                diaVencimento: number;
                                observacoes: string | null;
                                /** Format: date-time */
                                criadaEm: string;
                            } | null;
                            mesAtual: {
                                competencia: string;
                                entregas: number;
                                itens: {
                                    /** @enum {string} */
                                    tipo: "mensalidade" | "entregas" | "minimo";
                                    descricao: string;
                                    /** Format: date */
                                    inicio: string;
                                    /** Format: date */
                                    fim: string;
                                    quantidade: number;
                                    valorUnitario: string;
                                    total: string;
                                }[];
                                total: string;
                            } | null;
                            faturas: {
                                /** Format: uuid */
                                id: string;
                                numero: string;
                                organizacao: {
                                    /** Format: uuid */
                                    id: string;
                                    nome: string;
                                    tipo: string;
                                };
                                competencia: string;
                                /** @enum {string} */
                                status: "emitida" | "paga" | "vencida" | "cancelada";
                                quantidadeEntregas: number;
                                total: string;
                                itens: {
                                    /** @enum {string} */
                                    tipo: "mensalidade" | "entregas" | "minimo";
                                    descricao: string;
                                    /** Format: date */
                                    inicio: string;
                                    /** Format: date */
                                    fim: string;
                                    quantidade: number;
                                    valorUnitario: string;
                                    total: string;
                                }[];
                                /** Format: date */
                                vencimento: string;
                                pagaEm: string | null;
                                canceladaEm: string | null;
                                motivoCancelamento: string | null;
                                geradaAutomaticamente: boolean;
                                /** Format: date-time */
                                criadaEm: string;
                                notaFiscal: {
                                    numero: string;
                                    /** Format: date */
                                    emitidaEm: string;
                                    codigoVerificacao: string | null;
                                    link: string | null;
                                    pdfArquivoId: string | null;
                                    xmlArquivoId: string | null;
                                    /** Format: date-time */
                                    registradaEm: string;
                                } | null;
                                acoesPermitidas: ("pagar" | "cancelar")[];
                            }[];
                            aviso: {
                                /** @enum {string} */
                                nivel: "vencida" | "em_aberto";
                                mensagem: string;
                                faturas: number;
                                valor: string;
                                /** Format: date */
                                vencimento: string;
                            } | null;
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "parcerias.listar": {
        parameters: {
            query?: {
                cursor?: string;
                limite?: number;
                status?: "pendente" | "ativa" | "recusada" | "suspensa" | "encerrada";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "recusada" | "suspensa" | "encerrada";
                            /** @enum {string} */
                            origem: "empresa" | "administrador";
                            empresa: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            politicas: {
                                tempoEsperaAusenteSeg: number;
                                /** @enum {string} */
                                politicaAusente: "retornar_automatico" | "aguardar_decisao";
                                /** @enum {string} */
                                politicaDinheiro: "direto_restaurante" | "via_empresa";
                                /** @enum {string} */
                                comprovanteExigido: "nenhum" | "foto" | "codigo" | "assinatura";
                                exigirCodigoColeta: boolean;
                                /** @description Motoboys dedicados ao restaurante; null = todos. O restaurante vê só o id */
                                grupoMotoboys: {
                                    /** Format: uuid */
                                    id: string;
                                    nome: string | null;
                                } | null;
                                /** @enum {string} */
                                periodoFatura: "semanal" | "quinzenal" | "mensal";
                                diasVencimento: number;
                                observacoes: string | null;
                            };
                            motivo: string | null;
                            empresaPadrao: boolean;
                            decididaEm: string | null;
                            ativadaEm: string | null;
                            encerradaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                            /** @description O painel só mostra estes botões */
                            acoesPermitidas: ("aceitar" | "recusar" | "suspender" | "reativar" | "encerrar")[];
                        }[];
                        meta: {
                            /** @description Repasse em ?cursor= para a próxima página */
                            proximoCursor: string | null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "parcerias.buscarRestaurantes": {
        parameters: {
            query: {
                q: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            nome: string;
                            cidade: string | null;
                            uf: string | null;
                        }[];
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "parcerias.solicitar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: uuid */
                    restauranteId: string;
                    politicas?: {
                        tempoEsperaAusenteSeg?: number;
                        /** @enum {string} */
                        politicaAusente?: "retornar_automatico" | "aguardar_decisao";
                        /** @enum {string} */
                        politicaDinheiro?: "direto_restaurante" | "via_empresa";
                        /** @enum {string} */
                        comprovanteExigido?: "nenhum" | "foto" | "codigo" | "assinatura";
                        exigirCodigoColeta?: boolean;
                        /** @enum {string} */
                        periodoFatura?: "semanal" | "quinzenal" | "mensal";
                        diasVencimento?: number;
                        observacoes?: string | null;
                    };
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "recusada" | "suspensa" | "encerrada";
                            /** @enum {string} */
                            origem: "empresa" | "administrador";
                            empresa: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            politicas: {
                                tempoEsperaAusenteSeg: number;
                                /** @enum {string} */
                                politicaAusente: "retornar_automatico" | "aguardar_decisao";
                                /** @enum {string} */
                                politicaDinheiro: "direto_restaurante" | "via_empresa";
                                /** @enum {string} */
                                comprovanteExigido: "nenhum" | "foto" | "codigo" | "assinatura";
                                exigirCodigoColeta: boolean;
                                /** @description Motoboys dedicados ao restaurante; null = todos. O restaurante vê só o id */
                                grupoMotoboys: {
                                    /** Format: uuid */
                                    id: string;
                                    nome: string | null;
                                } | null;
                                /** @enum {string} */
                                periodoFatura: "semanal" | "quinzenal" | "mensal";
                                diasVencimento: number;
                                observacoes: string | null;
                            };
                            motivo: string | null;
                            empresaPadrao: boolean;
                            decididaEm: string | null;
                            ativadaEm: string | null;
                            encerradaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                            /** @description O painel só mostra estes botões */
                            acoesPermitidas: ("aceitar" | "recusar" | "suspender" | "reativar" | "encerrar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "parcerias.obter": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "recusada" | "suspensa" | "encerrada";
                            /** @enum {string} */
                            origem: "empresa" | "administrador";
                            empresa: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            politicas: {
                                tempoEsperaAusenteSeg: number;
                                /** @enum {string} */
                                politicaAusente: "retornar_automatico" | "aguardar_decisao";
                                /** @enum {string} */
                                politicaDinheiro: "direto_restaurante" | "via_empresa";
                                /** @enum {string} */
                                comprovanteExigido: "nenhum" | "foto" | "codigo" | "assinatura";
                                exigirCodigoColeta: boolean;
                                /** @description Motoboys dedicados ao restaurante; null = todos. O restaurante vê só o id */
                                grupoMotoboys: {
                                    /** Format: uuid */
                                    id: string;
                                    nome: string | null;
                                } | null;
                                /** @enum {string} */
                                periodoFatura: "semanal" | "quinzenal" | "mensal";
                                diasVencimento: number;
                                observacoes: string | null;
                            };
                            motivo: string | null;
                            empresaPadrao: boolean;
                            decididaEm: string | null;
                            ativadaEm: string | null;
                            encerradaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                            /** @description O painel só mostra estes botões */
                            acoesPermitidas: ("aceitar" | "recusar" | "suspender" | "reativar" | "encerrar")[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "parcerias.atualizarPoliticas": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    tempoEsperaAusenteSeg?: number;
                    /** @enum {string} */
                    politicaAusente?: "retornar_automatico" | "aguardar_decisao";
                    /** @enum {string} */
                    politicaDinheiro?: "direto_restaurante" | "via_empresa";
                    /** @enum {string} */
                    comprovanteExigido?: "nenhum" | "foto" | "codigo" | "assinatura";
                    exigirCodigoColeta?: boolean;
                    /** @enum {string} */
                    periodoFatura?: "semanal" | "quinzenal" | "mensal";
                    diasVencimento?: number;
                    observacoes?: string | null;
                    grupoMotoboysId?: string | null;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "recusada" | "suspensa" | "encerrada";
                            /** @enum {string} */
                            origem: "empresa" | "administrador";
                            empresa: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            politicas: {
                                tempoEsperaAusenteSeg: number;
                                /** @enum {string} */
                                politicaAusente: "retornar_automatico" | "aguardar_decisao";
                                /** @enum {string} */
                                politicaDinheiro: "direto_restaurante" | "via_empresa";
                                /** @enum {string} */
                                comprovanteExigido: "nenhum" | "foto" | "codigo" | "assinatura";
                                exigirCodigoColeta: boolean;
                                /** @description Motoboys dedicados ao restaurante; null = todos. O restaurante vê só o id */
                                grupoMotoboys: {
                                    /** Format: uuid */
                                    id: string;
                                    nome: string | null;
                                } | null;
                                /** @enum {string} */
                                periodoFatura: "semanal" | "quinzenal" | "mensal";
                                diasVencimento: number;
                                observacoes: string | null;
                            };
                            motivo: string | null;
                            empresaPadrao: boolean;
                            decididaEm: string | null;
                            ativadaEm: string | null;
                            encerradaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                            /** @description O painel só mostra estes botões */
                            acoesPermitidas: ("aceitar" | "recusar" | "suspender" | "reativar" | "encerrar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "parcerias.aceitar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "recusada" | "suspensa" | "encerrada";
                            /** @enum {string} */
                            origem: "empresa" | "administrador";
                            empresa: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            politicas: {
                                tempoEsperaAusenteSeg: number;
                                /** @enum {string} */
                                politicaAusente: "retornar_automatico" | "aguardar_decisao";
                                /** @enum {string} */
                                politicaDinheiro: "direto_restaurante" | "via_empresa";
                                /** @enum {string} */
                                comprovanteExigido: "nenhum" | "foto" | "codigo" | "assinatura";
                                exigirCodigoColeta: boolean;
                                /** @description Motoboys dedicados ao restaurante; null = todos. O restaurante vê só o id */
                                grupoMotoboys: {
                                    /** Format: uuid */
                                    id: string;
                                    nome: string | null;
                                } | null;
                                /** @enum {string} */
                                periodoFatura: "semanal" | "quinzenal" | "mensal";
                                diasVencimento: number;
                                observacoes: string | null;
                            };
                            motivo: string | null;
                            empresaPadrao: boolean;
                            decididaEm: string | null;
                            ativadaEm: string | null;
                            encerradaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                            /** @description O painel só mostra estes botões */
                            acoesPermitidas: ("aceitar" | "recusar" | "suspender" | "reativar" | "encerrar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "parcerias.recusar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "recusada" | "suspensa" | "encerrada";
                            /** @enum {string} */
                            origem: "empresa" | "administrador";
                            empresa: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            politicas: {
                                tempoEsperaAusenteSeg: number;
                                /** @enum {string} */
                                politicaAusente: "retornar_automatico" | "aguardar_decisao";
                                /** @enum {string} */
                                politicaDinheiro: "direto_restaurante" | "via_empresa";
                                /** @enum {string} */
                                comprovanteExigido: "nenhum" | "foto" | "codigo" | "assinatura";
                                exigirCodigoColeta: boolean;
                                /** @description Motoboys dedicados ao restaurante; null = todos. O restaurante vê só o id */
                                grupoMotoboys: {
                                    /** Format: uuid */
                                    id: string;
                                    nome: string | null;
                                } | null;
                                /** @enum {string} */
                                periodoFatura: "semanal" | "quinzenal" | "mensal";
                                diasVencimento: number;
                                observacoes: string | null;
                            };
                            motivo: string | null;
                            empresaPadrao: boolean;
                            decididaEm: string | null;
                            ativadaEm: string | null;
                            encerradaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                            /** @description O painel só mostra estes botões */
                            acoesPermitidas: ("aceitar" | "recusar" | "suspender" | "reativar" | "encerrar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "parcerias.suspender": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "recusada" | "suspensa" | "encerrada";
                            /** @enum {string} */
                            origem: "empresa" | "administrador";
                            empresa: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            politicas: {
                                tempoEsperaAusenteSeg: number;
                                /** @enum {string} */
                                politicaAusente: "retornar_automatico" | "aguardar_decisao";
                                /** @enum {string} */
                                politicaDinheiro: "direto_restaurante" | "via_empresa";
                                /** @enum {string} */
                                comprovanteExigido: "nenhum" | "foto" | "codigo" | "assinatura";
                                exigirCodigoColeta: boolean;
                                /** @description Motoboys dedicados ao restaurante; null = todos. O restaurante vê só o id */
                                grupoMotoboys: {
                                    /** Format: uuid */
                                    id: string;
                                    nome: string | null;
                                } | null;
                                /** @enum {string} */
                                periodoFatura: "semanal" | "quinzenal" | "mensal";
                                diasVencimento: number;
                                observacoes: string | null;
                            };
                            motivo: string | null;
                            empresaPadrao: boolean;
                            decididaEm: string | null;
                            ativadaEm: string | null;
                            encerradaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                            /** @description O painel só mostra estes botões */
                            acoesPermitidas: ("aceitar" | "recusar" | "suspender" | "reativar" | "encerrar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "parcerias.reativar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "recusada" | "suspensa" | "encerrada";
                            /** @enum {string} */
                            origem: "empresa" | "administrador";
                            empresa: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            politicas: {
                                tempoEsperaAusenteSeg: number;
                                /** @enum {string} */
                                politicaAusente: "retornar_automatico" | "aguardar_decisao";
                                /** @enum {string} */
                                politicaDinheiro: "direto_restaurante" | "via_empresa";
                                /** @enum {string} */
                                comprovanteExigido: "nenhum" | "foto" | "codigo" | "assinatura";
                                exigirCodigoColeta: boolean;
                                /** @description Motoboys dedicados ao restaurante; null = todos. O restaurante vê só o id */
                                grupoMotoboys: {
                                    /** Format: uuid */
                                    id: string;
                                    nome: string | null;
                                } | null;
                                /** @enum {string} */
                                periodoFatura: "semanal" | "quinzenal" | "mensal";
                                diasVencimento: number;
                                observacoes: string | null;
                            };
                            motivo: string | null;
                            empresaPadrao: boolean;
                            decididaEm: string | null;
                            ativadaEm: string | null;
                            encerradaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                            /** @description O painel só mostra estes botões */
                            acoesPermitidas: ("aceitar" | "recusar" | "suspender" | "reativar" | "encerrar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "parcerias.encerrar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "recusada" | "suspensa" | "encerrada";
                            /** @enum {string} */
                            origem: "empresa" | "administrador";
                            empresa: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            politicas: {
                                tempoEsperaAusenteSeg: number;
                                /** @enum {string} */
                                politicaAusente: "retornar_automatico" | "aguardar_decisao";
                                /** @enum {string} */
                                politicaDinheiro: "direto_restaurante" | "via_empresa";
                                /** @enum {string} */
                                comprovanteExigido: "nenhum" | "foto" | "codigo" | "assinatura";
                                exigirCodigoColeta: boolean;
                                /** @description Motoboys dedicados ao restaurante; null = todos. O restaurante vê só o id */
                                grupoMotoboys: {
                                    /** Format: uuid */
                                    id: string;
                                    nome: string | null;
                                } | null;
                                /** @enum {string} */
                                periodoFatura: "semanal" | "quinzenal" | "mensal";
                                diasVencimento: number;
                                observacoes: string | null;
                            };
                            motivo: string | null;
                            empresaPadrao: boolean;
                            decididaEm: string | null;
                            ativadaEm: string | null;
                            encerradaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                            /** @description O painel só mostra estes botões */
                            acoesPermitidas: ("aceitar" | "recusar" | "suspender" | "reativar" | "encerrar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.parcerias.criar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: uuid */
                    restauranteId: string;
                    /** Format: uuid */
                    empresaId: string;
                    politicas?: {
                        tempoEsperaAusenteSeg?: number;
                        /** @enum {string} */
                        politicaAusente?: "retornar_automatico" | "aguardar_decisao";
                        /** @enum {string} */
                        politicaDinheiro?: "direto_restaurante" | "via_empresa";
                        /** @enum {string} */
                        comprovanteExigido?: "nenhum" | "foto" | "codigo" | "assinatura";
                        exigirCodigoColeta?: boolean;
                        /** @enum {string} */
                        periodoFatura?: "semanal" | "quinzenal" | "mensal";
                        diasVencimento?: number;
                        observacoes?: string | null;
                    };
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            status: "pendente" | "ativa" | "recusada" | "suspensa" | "encerrada";
                            /** @enum {string} */
                            origem: "empresa" | "administrador";
                            empresa: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            politicas: {
                                tempoEsperaAusenteSeg: number;
                                /** @enum {string} */
                                politicaAusente: "retornar_automatico" | "aguardar_decisao";
                                /** @enum {string} */
                                politicaDinheiro: "direto_restaurante" | "via_empresa";
                                /** @enum {string} */
                                comprovanteExigido: "nenhum" | "foto" | "codigo" | "assinatura";
                                exigirCodigoColeta: boolean;
                                /** @description Motoboys dedicados ao restaurante; null = todos. O restaurante vê só o id */
                                grupoMotoboys: {
                                    /** Format: uuid */
                                    id: string;
                                    nome: string | null;
                                } | null;
                                /** @enum {string} */
                                periodoFatura: "semanal" | "quinzenal" | "mensal";
                                diasVencimento: number;
                                observacoes: string | null;
                            };
                            motivo: string | null;
                            empresaPadrao: boolean;
                            decididaEm: string | null;
                            ativadaEm: string | null;
                            encerradaEm: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                            /** @description O painel só mostra estes botões */
                            acoesPermitidas: ("aceitar" | "recusar" | "suspender" | "reativar" | "encerrar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "localizacao.registrarLote": {
        parameters: {
            query?: never;
            header?: {
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    pontos: {
                        lat: number;
                        lng: number;
                        precisaoM?: number;
                        velocidadeMs?: number;
                        bateriaPct?: number;
                        /** Format: date-time */
                        registradoEm: string;
                    }[];
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            aceitos: number;
                            descartados: number;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "localizacao.ultimasPosicoes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            motoboyId: string;
                            nome: string;
                            disponibilidade: string;
                            lat: number;
                            lng: number;
                            precisaoM: number | null;
                            /** Format: date-time */
                            registradoEm: string;
                        }[];
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "motoboys.listar": {
        parameters: {
            query?: {
                cursor?: string;
                limite?: number;
                status?: "pendente_documentos" | "ativo" | "bloqueado" | "inativo";
                busca?: string;
                grupoId?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            usuarioId: string;
                            nome: string;
                            /** Format: email */
                            email: string;
                            /** @description Completo para quem tem fechamentos.pagar; mascarado (***.***.789-09) para os demais */
                            cpf: string;
                            telefone: string;
                            apelido: string | null;
                            /** @enum {string} */
                            statusCadastro: "pendente_documentos" | "ativo" | "bloqueado" | "inativo";
                            motivoBloqueio: string | null;
                            /** @enum {string} */
                            disponibilidade: "offline" | "disponivel" | "ocupado" | "pausa";
                            tipoVinculo: ("clt" | "mei" | "autonomo" | "outro") | null;
                            chavePix: string | null;
                            /** @description true: CPF mascarado e chave Pix omitida para quem pediu */
                            dadosSensiveisOcultos: boolean;
                            grupos: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            }[];
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("ativar" | "bloquear" | "inativar")[];
                        }[];
                        meta: {
                            /** @description Repasse em ?cursor= para a próxima página */
                            proximoCursor: string | null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "motoboys.cadastrar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    nome: string;
                    /** Format: email */
                    email: string;
                    cpf: string;
                    telefone: string;
                    apelido?: string;
                    /** @enum {string} */
                    tipoVinculo?: "clt" | "mei" | "autonomo" | "outro";
                    chavePix?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            usuarioId: string;
                            nome: string;
                            /** Format: email */
                            email: string;
                            /** @description Completo para quem tem fechamentos.pagar; mascarado (***.***.789-09) para os demais */
                            cpf: string;
                            telefone: string;
                            apelido: string | null;
                            /** @enum {string} */
                            statusCadastro: "pendente_documentos" | "ativo" | "bloqueado" | "inativo";
                            motivoBloqueio: string | null;
                            /** @enum {string} */
                            disponibilidade: "offline" | "disponivel" | "ocupado" | "pausa";
                            tipoVinculo: ("clt" | "mei" | "autonomo" | "outro") | null;
                            chavePix: string | null;
                            /** @description true: CPF mascarado e chave Pix omitida para quem pediu */
                            dadosSensiveisOcultos: boolean;
                            grupos: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            }[];
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("ativar" | "bloquear" | "inativar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "motoboys.obter": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            usuarioId: string;
                            nome: string;
                            /** Format: email */
                            email: string;
                            /** @description Completo para quem tem fechamentos.pagar; mascarado (***.***.789-09) para os demais */
                            cpf: string;
                            telefone: string;
                            apelido: string | null;
                            /** @enum {string} */
                            statusCadastro: "pendente_documentos" | "ativo" | "bloqueado" | "inativo";
                            motivoBloqueio: string | null;
                            /** @enum {string} */
                            disponibilidade: "offline" | "disponivel" | "ocupado" | "pausa";
                            tipoVinculo: ("clt" | "mei" | "autonomo" | "outro") | null;
                            chavePix: string | null;
                            /** @description true: CPF mascarado e chave Pix omitida para quem pediu */
                            dadosSensiveisOcultos: boolean;
                            grupos: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            }[];
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("ativar" | "bloquear" | "inativar")[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "motoboys.atualizar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    telefone?: string;
                    apelido?: string | null;
                    tipoVinculo?: ("clt" | "mei" | "autonomo" | "outro") | null;
                    chavePix?: string | null;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            usuarioId: string;
                            nome: string;
                            /** Format: email */
                            email: string;
                            /** @description Completo para quem tem fechamentos.pagar; mascarado (***.***.789-09) para os demais */
                            cpf: string;
                            telefone: string;
                            apelido: string | null;
                            /** @enum {string} */
                            statusCadastro: "pendente_documentos" | "ativo" | "bloqueado" | "inativo";
                            motivoBloqueio: string | null;
                            /** @enum {string} */
                            disponibilidade: "offline" | "disponivel" | "ocupado" | "pausa";
                            tipoVinculo: ("clt" | "mei" | "autonomo" | "outro") | null;
                            chavePix: string | null;
                            /** @description true: CPF mascarado e chave Pix omitida para quem pediu */
                            dadosSensiveisOcultos: boolean;
                            grupos: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            }[];
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("ativar" | "bloquear" | "inativar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "motoboys.ativar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            usuarioId: string;
                            nome: string;
                            /** Format: email */
                            email: string;
                            /** @description Completo para quem tem fechamentos.pagar; mascarado (***.***.789-09) para os demais */
                            cpf: string;
                            telefone: string;
                            apelido: string | null;
                            /** @enum {string} */
                            statusCadastro: "pendente_documentos" | "ativo" | "bloqueado" | "inativo";
                            motivoBloqueio: string | null;
                            /** @enum {string} */
                            disponibilidade: "offline" | "disponivel" | "ocupado" | "pausa";
                            tipoVinculo: ("clt" | "mei" | "autonomo" | "outro") | null;
                            chavePix: string | null;
                            /** @description true: CPF mascarado e chave Pix omitida para quem pediu */
                            dadosSensiveisOcultos: boolean;
                            grupos: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            }[];
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("ativar" | "bloquear" | "inativar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "motoboys.bloquear": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            usuarioId: string;
                            nome: string;
                            /** Format: email */
                            email: string;
                            /** @description Completo para quem tem fechamentos.pagar; mascarado (***.***.789-09) para os demais */
                            cpf: string;
                            telefone: string;
                            apelido: string | null;
                            /** @enum {string} */
                            statusCadastro: "pendente_documentos" | "ativo" | "bloqueado" | "inativo";
                            motivoBloqueio: string | null;
                            /** @enum {string} */
                            disponibilidade: "offline" | "disponivel" | "ocupado" | "pausa";
                            tipoVinculo: ("clt" | "mei" | "autonomo" | "outro") | null;
                            chavePix: string | null;
                            /** @description true: CPF mascarado e chave Pix omitida para quem pediu */
                            dadosSensiveisOcultos: boolean;
                            grupos: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            }[];
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("ativar" | "bloquear" | "inativar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "motoboys.inativar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            usuarioId: string;
                            nome: string;
                            /** Format: email */
                            email: string;
                            /** @description Completo para quem tem fechamentos.pagar; mascarado (***.***.789-09) para os demais */
                            cpf: string;
                            telefone: string;
                            apelido: string | null;
                            /** @enum {string} */
                            statusCadastro: "pendente_documentos" | "ativo" | "bloqueado" | "inativo";
                            motivoBloqueio: string | null;
                            /** @enum {string} */
                            disponibilidade: "offline" | "disponivel" | "ocupado" | "pausa";
                            tipoVinculo: ("clt" | "mei" | "autonomo" | "outro") | null;
                            chavePix: string | null;
                            /** @description true: CPF mascarado e chave Pix omitida para quem pediu */
                            dadosSensiveisOcultos: boolean;
                            grupos: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            }[];
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("ativar" | "bloquear" | "inativar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "grupos.listar": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            nome: string;
                            motoboyIds: string[];
                            /** Format: date-time */
                            criadoEm: string;
                        }[];
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "grupos.criar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    nome: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            nome: string;
                            motoboyIds: string[];
                            /** Format: date-time */
                            criadoEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "grupos.definirMembros": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motoboyIds: string[];
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            nome: string;
                            motoboyIds: string[];
                            /** Format: date-time */
                            criadoEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "documentos.listar": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            tipo: "cnh" | "curso_motofrete" | "crlv" | "comprovante_residencia" | "outro";
                            numero: string | null;
                            categoria: string | null;
                            primeiraHabilitacao: string | null;
                            validade: string | null;
                            /** @enum {string} */
                            status: "pendente" | "aprovado" | "rejeitado" | "vencido";
                            observacao: string | null;
                            validadoEm: string | null;
                            /** Format: date-time */
                            criadoEm: string;
                            dadosSensiveisOcultos: boolean;
                            acoesPermitidas: ("aprovar" | "rejeitar")[];
                        }[];
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "documentos.registrar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    tipo: "cnh" | "curso_motofrete" | "crlv" | "comprovante_residencia" | "outro";
                    numero?: string;
                    categoria?: string;
                    /** Format: date */
                    primeiraHabilitacao?: string;
                    /** Format: date */
                    validade?: string;
                    observacao?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            tipo: "cnh" | "curso_motofrete" | "crlv" | "comprovante_residencia" | "outro";
                            numero: string | null;
                            categoria: string | null;
                            primeiraHabilitacao: string | null;
                            validade: string | null;
                            /** @enum {string} */
                            status: "pendente" | "aprovado" | "rejeitado" | "vencido";
                            observacao: string | null;
                            validadoEm: string | null;
                            /** Format: date-time */
                            criadoEm: string;
                            dadosSensiveisOcultos: boolean;
                            acoesPermitidas: ("aprovar" | "rejeitar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "documentos.aprovar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            tipo: "cnh" | "curso_motofrete" | "crlv" | "comprovante_residencia" | "outro";
                            numero: string | null;
                            categoria: string | null;
                            primeiraHabilitacao: string | null;
                            validade: string | null;
                            /** @enum {string} */
                            status: "pendente" | "aprovado" | "rejeitado" | "vencido";
                            observacao: string | null;
                            validadoEm: string | null;
                            /** Format: date-time */
                            criadoEm: string;
                            dadosSensiveisOcultos: boolean;
                            acoesPermitidas: ("aprovar" | "rejeitar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "documentos.rejeitar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            tipo: "cnh" | "curso_motofrete" | "crlv" | "comprovante_residencia" | "outro";
                            numero: string | null;
                            categoria: string | null;
                            primeiraHabilitacao: string | null;
                            validade: string | null;
                            /** @enum {string} */
                            status: "pendente" | "aprovado" | "rejeitado" | "vencido";
                            observacao: string | null;
                            validadoEm: string | null;
                            /** Format: date-time */
                            criadoEm: string;
                            dadosSensiveisOcultos: boolean;
                            acoesPermitidas: ("aprovar" | "rejeitar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "veiculos.listar": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            tipo: "moto" | "bicicleta" | "carro" | "outro";
                            marca: string | null;
                            modelo: string | null;
                            placa: string | null;
                            ano: number | null;
                            cor: string | null;
                            ativo: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                        }[];
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "veiculos.cadastrar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * @default moto
                     * @enum {string}
                     */
                    tipo?: "moto" | "bicicleta" | "carro" | "outro";
                    marca?: string;
                    modelo?: string;
                    placa?: string;
                    ano?: number;
                    cor?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            tipo: "moto" | "bicicleta" | "carro" | "outro";
                            marca: string | null;
                            modelo: string | null;
                            placa: string | null;
                            ano: number | null;
                            cor: string | null;
                            ativo: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "veiculos.desativar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            tipo: "moto" | "bicicleta" | "carro" | "outro";
                            marca: string | null;
                            modelo: string | null;
                            placa: string | null;
                            ano: number | null;
                            cor: string | null;
                            ativo: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.listar": {
        parameters: {
            query?: {
                cursor?: string;
                limite?: number;
                status?: "agendada" | "pendente_empresa" | "aguardando_rota" | "em_rota_planejada" | "atribuida" | "no_local_coleta" | "coletada" | "a_caminho" | "no_local_entrega" | "cliente_ausente" | "aguardando_decisao" | "retornando" | "entregue" | "devolvida" | "cancelada" | "extraviada";
                restauranteId?: string;
                de?: string;
                ate?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            codigoExterno: string | null;
                            /** @enum {string} */
                            status: "agendada" | "pendente_empresa" | "aguardando_rota" | "em_rota_planejada" | "atribuida" | "no_local_coleta" | "coletada" | "a_caminho" | "no_local_entrega" | "cliente_ausente" | "aguardando_decisao" | "retornando" | "entregue" | "devolvida" | "cancelada" | "extraviada";
                            /** Format: uuid */
                            restauranteId: string;
                            /** Format: uuid */
                            parceriaId: string;
                            rotaId: string | null;
                            ordemNaRota: number | null;
                            origemLancamento: string;
                            cliente: {
                                nome: string;
                                telefone: string | null;
                            };
                            coleta: {
                                endereco: string;
                                instrucoes: string | null;
                            };
                            destino: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                referencia: string | null;
                                lat: number | null;
                                lng: number | null;
                            };
                            pagamento: {
                                forma: string;
                                valorACobrar: string;
                                trocoPara: string | null;
                                trocoNecessario: string | null;
                                maquininhaDe: string | null;
                                recebimentoStatus: string;
                            };
                            comprovanteExigido: string;
                            observacoes: string | null;
                            agendadaPara: string | null;
                            cancelamento: {
                                fase: string;
                                motivo: string;
                            } | null;
                            ausencia: {
                                /** Format: date-time */
                                desde: string;
                                /** Format: date-time */
                                expiraEm: string;
                            } | null;
                            distanciaEstimadaM: number | null;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("liberar_agendada" | "liberar_agendada_para_aceite" | "aceitar_pela_empresa" | "recusar_pela_empresa" | "incluir_em_rota" | "retirar_da_rota" | "atribuir" | "chegar_coleta" | "devolver_para_fila" | "coletar" | "iniciar_parada" | "adiar_parada" | "chegar_destino" | "marcar_ausente" | "esgotar_espera" | "aguardar_mais" | "informar_novo_destino" | "autorizar_retorno" | "recusada_pelo_cliente" | "concluir" | "confirmar_devolucao" | "cancelar" | "cancelar_apos_coleta" | "marcar_extraviada")[];
                        }[];
                        meta: {
                            /** @description Repasse em ?cursor= para a próxima página */
                            proximoCursor: string | null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.criar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: uuid */
                    parceriaId: string;
                    codigoExterno?: string;
                    cliente: {
                        nome: string;
                        telefone?: string;
                    };
                    destino: {
                        cep?: string;
                        logradouro: string;
                        numero?: string;
                        complemento?: string;
                        bairro?: string;
                        cidade?: string;
                        uf?: string;
                        referencia?: string;
                        coordenada?: {
                            lat: number;
                            lng: number;
                        };
                    };
                    pagamento: {
                        /** @enum {string} */
                        forma: "pago_online" | "dinheiro" | "cartao_maquininha" | "pix_na_entrega" | "misto";
                        valorACobrar?: string;
                        trocoPara?: string;
                        /** @enum {string} */
                        maquininhaDe?: "restaurante" | "empresa" | "motoboy";
                    };
                    /** Format: date-time */
                    agendadaPara?: string;
                    observacoes?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            codigoExterno: string | null;
                            /** @enum {string} */
                            status: "agendada" | "pendente_empresa" | "aguardando_rota" | "em_rota_planejada" | "atribuida" | "no_local_coleta" | "coletada" | "a_caminho" | "no_local_entrega" | "cliente_ausente" | "aguardando_decisao" | "retornando" | "entregue" | "devolvida" | "cancelada" | "extraviada";
                            /** Format: uuid */
                            restauranteId: string;
                            /** Format: uuid */
                            parceriaId: string;
                            rotaId: string | null;
                            ordemNaRota: number | null;
                            origemLancamento: string;
                            cliente: {
                                nome: string;
                                telefone: string | null;
                            };
                            coleta: {
                                endereco: string;
                                instrucoes: string | null;
                            };
                            destino: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                referencia: string | null;
                                lat: number | null;
                                lng: number | null;
                            };
                            pagamento: {
                                forma: string;
                                valorACobrar: string;
                                trocoPara: string | null;
                                trocoNecessario: string | null;
                                maquininhaDe: string | null;
                                recebimentoStatus: string;
                            };
                            comprovanteExigido: string;
                            observacoes: string | null;
                            agendadaPara: string | null;
                            cancelamento: {
                                fase: string;
                                motivo: string;
                            } | null;
                            ausencia: {
                                /** Format: date-time */
                                desde: string;
                                /** Format: date-time */
                                expiraEm: string;
                            } | null;
                            distanciaEstimadaM: number | null;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("liberar_agendada" | "liberar_agendada_para_aceite" | "aceitar_pela_empresa" | "recusar_pela_empresa" | "incluir_em_rota" | "retirar_da_rota" | "atribuir" | "chegar_coleta" | "devolver_para_fila" | "coletar" | "iniciar_parada" | "adiar_parada" | "chegar_destino" | "marcar_ausente" | "esgotar_espera" | "aguardar_mais" | "informar_novo_destino" | "autorizar_retorno" | "recusada_pelo_cliente" | "concluir" | "confirmar_devolucao" | "cancelar" | "cancelar_apos_coleta" | "marcar_extraviada")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.obter": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            codigoExterno: string | null;
                            /** @enum {string} */
                            status: "agendada" | "pendente_empresa" | "aguardando_rota" | "em_rota_planejada" | "atribuida" | "no_local_coleta" | "coletada" | "a_caminho" | "no_local_entrega" | "cliente_ausente" | "aguardando_decisao" | "retornando" | "entregue" | "devolvida" | "cancelada" | "extraviada";
                            /** Format: uuid */
                            restauranteId: string;
                            /** Format: uuid */
                            parceriaId: string;
                            rotaId: string | null;
                            ordemNaRota: number | null;
                            origemLancamento: string;
                            cliente: {
                                nome: string;
                                telefone: string | null;
                            };
                            coleta: {
                                endereco: string;
                                instrucoes: string | null;
                            };
                            destino: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                referencia: string | null;
                                lat: number | null;
                                lng: number | null;
                            };
                            pagamento: {
                                forma: string;
                                valorACobrar: string;
                                trocoPara: string | null;
                                trocoNecessario: string | null;
                                maquininhaDe: string | null;
                                recebimentoStatus: string;
                            };
                            comprovanteExigido: string;
                            observacoes: string | null;
                            agendadaPara: string | null;
                            cancelamento: {
                                fase: string;
                                motivo: string;
                            } | null;
                            ausencia: {
                                /** Format: date-time */
                                desde: string;
                                /** Format: date-time */
                                expiraEm: string;
                            } | null;
                            distanciaEstimadaM: number | null;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("liberar_agendada" | "liberar_agendada_para_aceite" | "aceitar_pela_empresa" | "recusar_pela_empresa" | "incluir_em_rota" | "retirar_da_rota" | "atribuir" | "chegar_coleta" | "devolver_para_fila" | "coletar" | "iniciar_parada" | "adiar_parada" | "chegar_destino" | "marcar_ausente" | "esgotar_espera" | "aguardar_mais" | "informar_novo_destino" | "autorizar_retorno" | "recusada_pelo_cliente" | "concluir" | "confirmar_devolucao" | "cancelar" | "cancelar_apos_coleta" | "marcar_extraviada")[];
                            historico: {
                                acao: string;
                                de: string | null;
                                para: string;
                                origem: string;
                                motivo: string | null;
                                /** Format: date-time */
                                eventoEm: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.cancelar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            codigoExterno: string | null;
                            /** @enum {string} */
                            status: "agendada" | "pendente_empresa" | "aguardando_rota" | "em_rota_planejada" | "atribuida" | "no_local_coleta" | "coletada" | "a_caminho" | "no_local_entrega" | "cliente_ausente" | "aguardando_decisao" | "retornando" | "entregue" | "devolvida" | "cancelada" | "extraviada";
                            /** Format: uuid */
                            restauranteId: string;
                            /** Format: uuid */
                            parceriaId: string;
                            rotaId: string | null;
                            ordemNaRota: number | null;
                            origemLancamento: string;
                            cliente: {
                                nome: string;
                                telefone: string | null;
                            };
                            coleta: {
                                endereco: string;
                                instrucoes: string | null;
                            };
                            destino: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                referencia: string | null;
                                lat: number | null;
                                lng: number | null;
                            };
                            pagamento: {
                                forma: string;
                                valorACobrar: string;
                                trocoPara: string | null;
                                trocoNecessario: string | null;
                                maquininhaDe: string | null;
                                recebimentoStatus: string;
                            };
                            comprovanteExigido: string;
                            observacoes: string | null;
                            agendadaPara: string | null;
                            cancelamento: {
                                fase: string;
                                motivo: string;
                            } | null;
                            ausencia: {
                                /** Format: date-time */
                                desde: string;
                                /** Format: date-time */
                                expiraEm: string;
                            } | null;
                            distanciaEstimadaM: number | null;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("liberar_agendada" | "liberar_agendada_para_aceite" | "aceitar_pela_empresa" | "recusar_pela_empresa" | "incluir_em_rota" | "retirar_da_rota" | "atribuir" | "chegar_coleta" | "devolver_para_fila" | "coletar" | "iniciar_parada" | "adiar_parada" | "chegar_destino" | "marcar_ausente" | "esgotar_espera" | "aguardar_mais" | "informar_novo_destino" | "autorizar_retorno" | "recusada_pelo_cliente" | "concluir" | "confirmar_devolucao" | "cancelar" | "cancelar_apos_coleta" | "marcar_extraviada")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.estenderEspera": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    segundos: number;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            codigoExterno: string | null;
                            /** @enum {string} */
                            status: "agendada" | "pendente_empresa" | "aguardando_rota" | "em_rota_planejada" | "atribuida" | "no_local_coleta" | "coletada" | "a_caminho" | "no_local_entrega" | "cliente_ausente" | "aguardando_decisao" | "retornando" | "entregue" | "devolvida" | "cancelada" | "extraviada";
                            /** Format: uuid */
                            restauranteId: string;
                            /** Format: uuid */
                            parceriaId: string;
                            rotaId: string | null;
                            ordemNaRota: number | null;
                            origemLancamento: string;
                            cliente: {
                                nome: string;
                                telefone: string | null;
                            };
                            coleta: {
                                endereco: string;
                                instrucoes: string | null;
                            };
                            destino: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                referencia: string | null;
                                lat: number | null;
                                lng: number | null;
                            };
                            pagamento: {
                                forma: string;
                                valorACobrar: string;
                                trocoPara: string | null;
                                trocoNecessario: string | null;
                                maquininhaDe: string | null;
                                recebimentoStatus: string;
                            };
                            comprovanteExigido: string;
                            observacoes: string | null;
                            agendadaPara: string | null;
                            cancelamento: {
                                fase: string;
                                motivo: string;
                            } | null;
                            ausencia: {
                                /** Format: date-time */
                                desde: string;
                                /** Format: date-time */
                                expiraEm: string;
                            } | null;
                            distanciaEstimadaM: number | null;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("liberar_agendada" | "liberar_agendada_para_aceite" | "aceitar_pela_empresa" | "recusar_pela_empresa" | "incluir_em_rota" | "retirar_da_rota" | "atribuir" | "chegar_coleta" | "devolver_para_fila" | "coletar" | "iniciar_parada" | "adiar_parada" | "chegar_destino" | "marcar_ausente" | "esgotar_espera" | "aguardar_mais" | "informar_novo_destino" | "autorizar_retorno" | "recusada_pelo_cliente" | "concluir" | "confirmar_devolucao" | "cancelar" | "cancelar_apos_coleta" | "marcar_extraviada")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.alterarDestino": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    destino: {
                        cep?: string;
                        logradouro: string;
                        numero?: string;
                        complemento?: string;
                        bairro?: string;
                        cidade?: string;
                        uf?: string;
                        referencia?: string;
                        coordenada?: {
                            lat: number;
                            lng: number;
                        };
                    };
                    telefone?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            codigoExterno: string | null;
                            /** @enum {string} */
                            status: "agendada" | "pendente_empresa" | "aguardando_rota" | "em_rota_planejada" | "atribuida" | "no_local_coleta" | "coletada" | "a_caminho" | "no_local_entrega" | "cliente_ausente" | "aguardando_decisao" | "retornando" | "entregue" | "devolvida" | "cancelada" | "extraviada";
                            /** Format: uuid */
                            restauranteId: string;
                            /** Format: uuid */
                            parceriaId: string;
                            rotaId: string | null;
                            ordemNaRota: number | null;
                            origemLancamento: string;
                            cliente: {
                                nome: string;
                                telefone: string | null;
                            };
                            coleta: {
                                endereco: string;
                                instrucoes: string | null;
                            };
                            destino: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                referencia: string | null;
                                lat: number | null;
                                lng: number | null;
                            };
                            pagamento: {
                                forma: string;
                                valorACobrar: string;
                                trocoPara: string | null;
                                trocoNecessario: string | null;
                                maquininhaDe: string | null;
                                recebimentoStatus: string;
                            };
                            comprovanteExigido: string;
                            observacoes: string | null;
                            agendadaPara: string | null;
                            cancelamento: {
                                fase: string;
                                motivo: string;
                            } | null;
                            ausencia: {
                                /** Format: date-time */
                                desde: string;
                                /** Format: date-time */
                                expiraEm: string;
                            } | null;
                            distanciaEstimadaM: number | null;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("liberar_agendada" | "liberar_agendada_para_aceite" | "aceitar_pela_empresa" | "recusar_pela_empresa" | "incluir_em_rota" | "retirar_da_rota" | "atribuir" | "chegar_coleta" | "devolver_para_fila" | "coletar" | "iniciar_parada" | "adiar_parada" | "chegar_destino" | "marcar_ausente" | "esgotar_espera" | "aguardar_mais" | "informar_novo_destino" | "autorizar_retorno" | "recusada_pelo_cliente" | "concluir" | "confirmar_devolucao" | "cancelar" | "cancelar_apos_coleta" | "marcar_extraviada")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.autorizarRetorno": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            codigoExterno: string | null;
                            /** @enum {string} */
                            status: "agendada" | "pendente_empresa" | "aguardando_rota" | "em_rota_planejada" | "atribuida" | "no_local_coleta" | "coletada" | "a_caminho" | "no_local_entrega" | "cliente_ausente" | "aguardando_decisao" | "retornando" | "entregue" | "devolvida" | "cancelada" | "extraviada";
                            /** Format: uuid */
                            restauranteId: string;
                            /** Format: uuid */
                            parceriaId: string;
                            rotaId: string | null;
                            ordemNaRota: number | null;
                            origemLancamento: string;
                            cliente: {
                                nome: string;
                                telefone: string | null;
                            };
                            coleta: {
                                endereco: string;
                                instrucoes: string | null;
                            };
                            destino: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                referencia: string | null;
                                lat: number | null;
                                lng: number | null;
                            };
                            pagamento: {
                                forma: string;
                                valorACobrar: string;
                                trocoPara: string | null;
                                trocoNecessario: string | null;
                                maquininhaDe: string | null;
                                recebimentoStatus: string;
                            };
                            comprovanteExigido: string;
                            observacoes: string | null;
                            agendadaPara: string | null;
                            cancelamento: {
                                fase: string;
                                motivo: string;
                            } | null;
                            ausencia: {
                                /** Format: date-time */
                                desde: string;
                                /** Format: date-time */
                                expiraEm: string;
                            } | null;
                            distanciaEstimadaM: number | null;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("liberar_agendada" | "liberar_agendada_para_aceite" | "aceitar_pela_empresa" | "recusar_pela_empresa" | "incluir_em_rota" | "retirar_da_rota" | "atribuir" | "chegar_coleta" | "devolver_para_fila" | "coletar" | "iniciar_parada" | "adiar_parada" | "chegar_destino" | "marcar_ausente" | "esgotar_espera" | "aguardar_mais" | "informar_novo_destino" | "autorizar_retorno" | "recusada_pelo_cliente" | "concluir" | "confirmar_devolucao" | "cancelar" | "cancelar_apos_coleta" | "marcar_extraviada")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.gerarCodigoDevolucao": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            codigo: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.confirmarDevolucao": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            codigoExterno: string | null;
                            /** @enum {string} */
                            status: "agendada" | "pendente_empresa" | "aguardando_rota" | "em_rota_planejada" | "atribuida" | "no_local_coleta" | "coletada" | "a_caminho" | "no_local_entrega" | "cliente_ausente" | "aguardando_decisao" | "retornando" | "entregue" | "devolvida" | "cancelada" | "extraviada";
                            /** Format: uuid */
                            restauranteId: string;
                            /** Format: uuid */
                            parceriaId: string;
                            rotaId: string | null;
                            ordemNaRota: number | null;
                            origemLancamento: string;
                            cliente: {
                                nome: string;
                                telefone: string | null;
                            };
                            coleta: {
                                endereco: string;
                                instrucoes: string | null;
                            };
                            destino: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                referencia: string | null;
                                lat: number | null;
                                lng: number | null;
                            };
                            pagamento: {
                                forma: string;
                                valorACobrar: string;
                                trocoPara: string | null;
                                trocoNecessario: string | null;
                                maquininhaDe: string | null;
                                recebimentoStatus: string;
                            };
                            comprovanteExigido: string;
                            observacoes: string | null;
                            agendadaPara: string | null;
                            cancelamento: {
                                fase: string;
                                motivo: string;
                            } | null;
                            ausencia: {
                                /** Format: date-time */
                                desde: string;
                                /** Format: date-time */
                                expiraEm: string;
                            } | null;
                            distanciaEstimadaM: number | null;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("liberar_agendada" | "liberar_agendada_para_aceite" | "aceitar_pela_empresa" | "recusar_pela_empresa" | "incluir_em_rota" | "retirar_da_rota" | "atribuir" | "chegar_coleta" | "devolver_para_fila" | "coletar" | "iniciar_parada" | "adiar_parada" | "chegar_destino" | "marcar_ausente" | "esgotar_espera" | "aguardar_mais" | "informar_novo_destino" | "autorizar_retorno" | "recusada_pelo_cliente" | "concluir" | "confirmar_devolucao" | "cancelar" | "cancelar_apos_coleta" | "marcar_extraviada")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.criarReentrega": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    destino?: {
                        cep?: string;
                        logradouro: string;
                        numero?: string;
                        complemento?: string;
                        bairro?: string;
                        cidade?: string;
                        uf?: string;
                        referencia?: string;
                        coordenada?: {
                            lat: number;
                            lng: number;
                        };
                    };
                    telefone?: string;
                    observacoes?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            codigoExterno: string | null;
                            /** @enum {string} */
                            status: "agendada" | "pendente_empresa" | "aguardando_rota" | "em_rota_planejada" | "atribuida" | "no_local_coleta" | "coletada" | "a_caminho" | "no_local_entrega" | "cliente_ausente" | "aguardando_decisao" | "retornando" | "entregue" | "devolvida" | "cancelada" | "extraviada";
                            /** Format: uuid */
                            restauranteId: string;
                            /** Format: uuid */
                            parceriaId: string;
                            rotaId: string | null;
                            ordemNaRota: number | null;
                            origemLancamento: string;
                            cliente: {
                                nome: string;
                                telefone: string | null;
                            };
                            coleta: {
                                endereco: string;
                                instrucoes: string | null;
                            };
                            destino: {
                                cep: string | null;
                                logradouro: string;
                                numero: string | null;
                                complemento: string | null;
                                bairro: string | null;
                                cidade: string | null;
                                uf: string | null;
                                referencia: string | null;
                                lat: number | null;
                                lng: number | null;
                            };
                            pagamento: {
                                forma: string;
                                valorACobrar: string;
                                trocoPara: string | null;
                                trocoNecessario: string | null;
                                maquininhaDe: string | null;
                                recebimentoStatus: string;
                            };
                            comprovanteExigido: string;
                            observacoes: string | null;
                            agendadaPara: string | null;
                            cancelamento: {
                                fase: string;
                                motivo: string;
                            } | null;
                            ausencia: {
                                /** Format: date-time */
                                desde: string;
                                /** Format: date-time */
                                expiraEm: string;
                            } | null;
                            distanciaEstimadaM: number | null;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("liberar_agendada" | "liberar_agendada_para_aceite" | "aceitar_pela_empresa" | "recusar_pela_empresa" | "incluir_em_rota" | "retirar_da_rota" | "atribuir" | "chegar_coleta" | "devolver_para_fila" | "coletar" | "iniciar_parada" | "adiar_parada" | "chegar_destino" | "marcar_ausente" | "esgotar_espera" | "aguardar_mais" | "informar_novo_destino" | "autorizar_retorno" | "recusada_pelo_cliente" | "concluir" | "confirmar_devolucao" | "cancelar" | "cancelar_apos_coleta" | "marcar_extraviada")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "rotas.listar": {
        parameters: {
            query?: {
                cursor?: string;
                limite?: number;
                status?: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            }[];
                        }[];
                        meta: {
                            /** @description Repasse em ?cursor= para a próxima página */
                            proximoCursor: string | null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "rotas.criar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    entregaIds: string[];
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "rotas.obter": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "rotas.trajeto": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            rotaId: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            percorrido: {
                                pontos: {
                                    lat: number;
                                    lng: number;
                                    /** Format: date-time */
                                    registradoEm: string;
                                }[];
                                /** @description Soma dos trechos de GPS, sem saltos impossíveis; null com menos de 2 pontos */
                                distanciaM: number | null;
                                pontosDescartados: number;
                            };
                            /** @description Do aceite ao fim (ou até agora, em andamento); null sem aceite */
                            tempo: {
                                /** Format: date-time */
                                inicio: string;
                                /** Format: date-time */
                                fim: string;
                                duracaoSeg: number;
                                emAndamento: boolean;
                            } | null;
                            planejado: {
                                coleta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                paradas: {
                                    /** Format: uuid */
                                    entregaId: string;
                                    codigo: string;
                                    ordem: number | null;
                                    status: string;
                                    cliente: string;
                                    destino: {
                                        lat: number;
                                        lng: number;
                                    } | null;
                                }[];
                                distanciaEstimadaM: number | null;
                            };
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "rotas.incluirEntrega": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: uuid */
                    entregaId: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "rotas.retirarEntrega": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
                entregaId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "rotas.marcarPronta": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "rotas.gerarCodigoColeta": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            codigo: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "rotas.cancelar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "rotas.transferir": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: uuid */
                    motoboyId: string;
                    motivo: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "distribuicao.motoboysDisponiveis": {
        parameters: {
            query: {
                parceriaId: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            nome: string;
                            apelido: string | null;
                            telefone: string;
                        }[];
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "distribuicao.mapa": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            restaurante: {
                                nome: string;
                                coordenada: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            };
                            pedidos: {
                                /** Format: uuid */
                                id: string;
                                codigo: string;
                                status: string;
                                cliente: string;
                                destino: string;
                                coordenada: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                rotaId: string | null;
                                motoboyId: string | null;
                                /** Format: date-time */
                                criadoEm: string;
                            }[];
                            motoboys: {
                                /** Format: uuid */
                                motoboyId: string;
                                nome: string;
                                apelido: string | null;
                                /** Format: uuid */
                                rotaId: string;
                                rotaCodigo: string;
                                rotaStatus: string;
                                posicao: {
                                    lat: number;
                                    lng: number;
                                    /** Format: date-time */
                                    registradoEm: string;
                                } | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "distribuicao.atribuir": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    entregaIds: string[];
                    /** Format: uuid */
                    motoboyId: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "distribuicao.obterRota": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            }[];
                            motoboy: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                                apelido: string | null;
                            } | null;
                            tentativas: {
                                /** Format: uuid */
                                motoboyId: string;
                                nome: string;
                                apelido: string | null;
                                /** @enum {string} */
                                status: "recusada" | "expirada";
                                motivo: string | null;
                                /** Format: date-time */
                                em: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "distribuicao.trajeto": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            rotaId: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            percorrido: {
                                pontos: {
                                    lat: number;
                                    lng: number;
                                    /** Format: date-time */
                                    registradoEm: string;
                                }[];
                                /** @description Soma dos trechos de GPS, sem saltos impossíveis; null com menos de 2 pontos */
                                distanciaM: number | null;
                                pontosDescartados: number;
                            };
                            /** @description Do aceite ao fim (ou até agora, em andamento); null sem aceite */
                            tempo: {
                                /** Format: date-time */
                                inicio: string;
                                /** Format: date-time */
                                fim: string;
                                duracaoSeg: number;
                                emAndamento: boolean;
                            } | null;
                            planejado: {
                                coleta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                paradas: {
                                    /** Format: uuid */
                                    entregaId: string;
                                    codigo: string;
                                    ordem: number | null;
                                    status: string;
                                    cliente: string;
                                    destino: {
                                        lat: number;
                                        lng: number;
                                    } | null;
                                }[];
                                distanciaEstimadaM: number | null;
                            };
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "distribuicao.reofertar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: uuid */
                    motoboyId: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "distribuicao.gerarCodigoColeta": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            codigo: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "distribuicao.desfazer": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "distribuicao.transferir": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: uuid */
                    motoboyId: string;
                    motivo: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "rotas.chegarColeta": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date-time */
                    eventoEm?: string;
                    posicao?: {
                        lat: number;
                        lng: number;
                    };
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                /** @description Do cliente, até a parada terminar; depois, null */
                                telefone: string | null;
                                coleta: {
                                    endereco: string;
                                    instrucoes: string | null;
                                };
                                complemento: string | null;
                                referencia: string | null;
                                observacoes: string | null;
                                pagamento: {
                                    forma: string;
                                    /** @description Decimal em texto, com ponto: "30.00" */
                                    valorACobrar: string;
                                    trocoPara: string | null;
                                    /** @description trocoPara - valorACobrar, calculado pela API */
                                    trocoNecessario: string | null;
                                    maquininhaDe: string | null;
                                    /** @description `a_receber` esconde o "entregar" até o recebimento */
                                    recebimentoStatus: string;
                                };
                                comprovante: {
                                    /** @description Política da parceria: nenhum, foto, assinatura ou codigo */
                                    exigido: string;
                                    /** @description O tipo a enviar em POST /app/entregas/{id}/comprovantes; null sem exigência */
                                    tipo: ("foto_entrega" | "assinatura" | "foto_fachada" | "foto_terceiro" | "codigo_cliente") | null;
                                    /** @description Ainda falta o comprovante exigido: o "entregar" fica de fora */
                                    pendente: boolean;
                                };
                                /** @description Cronômetro do cliente ausente; null fora da espera */
                                ausencia: {
                                    /** Format: date-time */
                                    desde: string;
                                    /** Format: date-time */
                                    expiraEm: string;
                                } | null;
                                /** @description Botões da parada; cada um é a rota POST /app/entregas/{id}/<ação> */
                                acoesPermitidas: ("iniciar" | "cheguei" | "contato" | "recebimentos" | "corrigir_recebimento" | "comprovantes" | "ausente" | "recusada_pelo_cliente" | "entregar" | "devolver")[];
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "rotas.coletar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    entregaIds: string[];
                    codigoColeta?: string;
                    /** Format: date-time */
                    eventoEm?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                /** @description Do cliente, até a parada terminar; depois, null */
                                telefone: string | null;
                                coleta: {
                                    endereco: string;
                                    instrucoes: string | null;
                                };
                                complemento: string | null;
                                referencia: string | null;
                                observacoes: string | null;
                                pagamento: {
                                    forma: string;
                                    /** @description Decimal em texto, com ponto: "30.00" */
                                    valorACobrar: string;
                                    trocoPara: string | null;
                                    /** @description trocoPara - valorACobrar, calculado pela API */
                                    trocoNecessario: string | null;
                                    maquininhaDe: string | null;
                                    /** @description `a_receber` esconde o "entregar" até o recebimento */
                                    recebimentoStatus: string;
                                };
                                comprovante: {
                                    /** @description Política da parceria: nenhum, foto, assinatura ou codigo */
                                    exigido: string;
                                    /** @description O tipo a enviar em POST /app/entregas/{id}/comprovantes; null sem exigência */
                                    tipo: ("foto_entrega" | "assinatura" | "foto_fachada" | "foto_terceiro" | "codigo_cliente") | null;
                                    /** @description Ainda falta o comprovante exigido: o "entregar" fica de fora */
                                    pendente: boolean;
                                };
                                /** @description Cronômetro do cliente ausente; null fora da espera */
                                ausencia: {
                                    /** Format: date-time */
                                    desde: string;
                                    /** Format: date-time */
                                    expiraEm: string;
                                } | null;
                                /** @description Botões da parada; cada um é a rota POST /app/entregas/{id}/<ação> */
                                acoesPermitidas: ("iniciar" | "cheguei" | "contato" | "recebimentos" | "corrigir_recebimento" | "comprovantes" | "ausente" | "recusada_pelo_cliente" | "entregar" | "devolver")[];
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "rotas.reordenar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    entregaIds: string[];
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                /** @description Do cliente, até a parada terminar; depois, null */
                                telefone: string | null;
                                coleta: {
                                    endereco: string;
                                    instrucoes: string | null;
                                };
                                complemento: string | null;
                                referencia: string | null;
                                observacoes: string | null;
                                pagamento: {
                                    forma: string;
                                    /** @description Decimal em texto, com ponto: "30.00" */
                                    valorACobrar: string;
                                    trocoPara: string | null;
                                    /** @description trocoPara - valorACobrar, calculado pela API */
                                    trocoNecessario: string | null;
                                    maquininhaDe: string | null;
                                    /** @description `a_receber` esconde o "entregar" até o recebimento */
                                    recebimentoStatus: string;
                                };
                                comprovante: {
                                    /** @description Política da parceria: nenhum, foto, assinatura ou codigo */
                                    exigido: string;
                                    /** @description O tipo a enviar em POST /app/entregas/{id}/comprovantes; null sem exigência */
                                    tipo: ("foto_entrega" | "assinatura" | "foto_fachada" | "foto_terceiro" | "codigo_cliente") | null;
                                    /** @description Ainda falta o comprovante exigido: o "entregar" fica de fora */
                                    pendente: boolean;
                                };
                                /** @description Cronômetro do cliente ausente; null fora da espera */
                                ausencia: {
                                    /** Format: date-time */
                                    desde: string;
                                    /** Format: date-time */
                                    expiraEm: string;
                                } | null;
                                /** @description Botões da parada; cada um é a rota POST /app/entregas/{id}/<ação> */
                                acoesPermitidas: ("iniciar" | "cheguei" | "contato" | "recebimentos" | "corrigir_recebimento" | "comprovantes" | "ausente" | "recusada_pelo_cliente" | "entregar" | "devolver")[];
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.iniciarParada": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date-time */
                    eventoEm?: string;
                    posicao?: {
                        lat: number;
                        lng: number;
                    };
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                /** @description Do cliente, até a parada terminar; depois, null */
                                telefone: string | null;
                                coleta: {
                                    endereco: string;
                                    instrucoes: string | null;
                                };
                                complemento: string | null;
                                referencia: string | null;
                                observacoes: string | null;
                                pagamento: {
                                    forma: string;
                                    /** @description Decimal em texto, com ponto: "30.00" */
                                    valorACobrar: string;
                                    trocoPara: string | null;
                                    /** @description trocoPara - valorACobrar, calculado pela API */
                                    trocoNecessario: string | null;
                                    maquininhaDe: string | null;
                                    /** @description `a_receber` esconde o "entregar" até o recebimento */
                                    recebimentoStatus: string;
                                };
                                comprovante: {
                                    /** @description Política da parceria: nenhum, foto, assinatura ou codigo */
                                    exigido: string;
                                    /** @description O tipo a enviar em POST /app/entregas/{id}/comprovantes; null sem exigência */
                                    tipo: ("foto_entrega" | "assinatura" | "foto_fachada" | "foto_terceiro" | "codigo_cliente") | null;
                                    /** @description Ainda falta o comprovante exigido: o "entregar" fica de fora */
                                    pendente: boolean;
                                };
                                /** @description Cronômetro do cliente ausente; null fora da espera */
                                ausencia: {
                                    /** Format: date-time */
                                    desde: string;
                                    /** Format: date-time */
                                    expiraEm: string;
                                } | null;
                                /** @description Botões da parada; cada um é a rota POST /app/entregas/{id}/<ação> */
                                acoesPermitidas: ("iniciar" | "cheguei" | "contato" | "recebimentos" | "corrigir_recebimento" | "comprovantes" | "ausente" | "recusada_pelo_cliente" | "entregar" | "devolver")[];
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.chegarDestino": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date-time */
                    eventoEm?: string;
                    posicao?: {
                        lat: number;
                        lng: number;
                    };
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                /** @description Do cliente, até a parada terminar; depois, null */
                                telefone: string | null;
                                coleta: {
                                    endereco: string;
                                    instrucoes: string | null;
                                };
                                complemento: string | null;
                                referencia: string | null;
                                observacoes: string | null;
                                pagamento: {
                                    forma: string;
                                    /** @description Decimal em texto, com ponto: "30.00" */
                                    valorACobrar: string;
                                    trocoPara: string | null;
                                    /** @description trocoPara - valorACobrar, calculado pela API */
                                    trocoNecessario: string | null;
                                    maquininhaDe: string | null;
                                    /** @description `a_receber` esconde o "entregar" até o recebimento */
                                    recebimentoStatus: string;
                                };
                                comprovante: {
                                    /** @description Política da parceria: nenhum, foto, assinatura ou codigo */
                                    exigido: string;
                                    /** @description O tipo a enviar em POST /app/entregas/{id}/comprovantes; null sem exigência */
                                    tipo: ("foto_entrega" | "assinatura" | "foto_fachada" | "foto_terceiro" | "codigo_cliente") | null;
                                    /** @description Ainda falta o comprovante exigido: o "entregar" fica de fora */
                                    pendente: boolean;
                                };
                                /** @description Cronômetro do cliente ausente; null fora da espera */
                                ausencia: {
                                    /** Format: date-time */
                                    desde: string;
                                    /** Format: date-time */
                                    expiraEm: string;
                                } | null;
                                /** @description Botões da parada; cada um é a rota POST /app/entregas/{id}/<ação> */
                                acoesPermitidas: ("iniciar" | "cheguei" | "contato" | "recebimentos" | "corrigir_recebimento" | "comprovantes" | "ausente" | "recusada_pelo_cliente" | "entregar" | "devolver")[];
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.marcarAusente": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date-time */
                    eventoEm?: string;
                    posicao?: {
                        lat: number;
                        lng: number;
                    };
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                /** @description Do cliente, até a parada terminar; depois, null */
                                telefone: string | null;
                                coleta: {
                                    endereco: string;
                                    instrucoes: string | null;
                                };
                                complemento: string | null;
                                referencia: string | null;
                                observacoes: string | null;
                                pagamento: {
                                    forma: string;
                                    /** @description Decimal em texto, com ponto: "30.00" */
                                    valorACobrar: string;
                                    trocoPara: string | null;
                                    /** @description trocoPara - valorACobrar, calculado pela API */
                                    trocoNecessario: string | null;
                                    maquininhaDe: string | null;
                                    /** @description `a_receber` esconde o "entregar" até o recebimento */
                                    recebimentoStatus: string;
                                };
                                comprovante: {
                                    /** @description Política da parceria: nenhum, foto, assinatura ou codigo */
                                    exigido: string;
                                    /** @description O tipo a enviar em POST /app/entregas/{id}/comprovantes; null sem exigência */
                                    tipo: ("foto_entrega" | "assinatura" | "foto_fachada" | "foto_terceiro" | "codigo_cliente") | null;
                                    /** @description Ainda falta o comprovante exigido: o "entregar" fica de fora */
                                    pendente: boolean;
                                };
                                /** @description Cronômetro do cliente ausente; null fora da espera */
                                ausencia: {
                                    /** Format: date-time */
                                    desde: string;
                                    /** Format: date-time */
                                    expiraEm: string;
                                } | null;
                                /** @description Botões da parada; cada um é a rota POST /app/entregas/{id}/<ação> */
                                acoesPermitidas: ("iniciar" | "cheguei" | "contato" | "recebimentos" | "corrigir_recebimento" | "comprovantes" | "ausente" | "recusada_pelo_cliente" | "entregar" | "devolver")[];
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.registrarContato": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date-time */
                    eventoEm?: string;
                    posicao?: {
                        lat: number;
                        lng: number;
                    };
                    /** @enum {string} */
                    canal: "ligacao" | "whatsapp" | "sms";
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** @constant */
                            registrado: true;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "comprovantes.registrar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date-time */
                    eventoEm?: string;
                    posicao?: {
                        lat: number;
                        lng: number;
                    };
                    /** @enum {string} */
                    tipo: "foto_entrega" | "assinatura" | "foto_fachada" | "foto_terceiro" | "codigo_cliente";
                    /** Format: uuid */
                    arquivoId?: string;
                    codigo?: string;
                    recebedorNome?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                /** @description Do cliente, até a parada terminar; depois, null */
                                telefone: string | null;
                                coleta: {
                                    endereco: string;
                                    instrucoes: string | null;
                                };
                                complemento: string | null;
                                referencia: string | null;
                                observacoes: string | null;
                                pagamento: {
                                    forma: string;
                                    /** @description Decimal em texto, com ponto: "30.00" */
                                    valorACobrar: string;
                                    trocoPara: string | null;
                                    /** @description trocoPara - valorACobrar, calculado pela API */
                                    trocoNecessario: string | null;
                                    maquininhaDe: string | null;
                                    /** @description `a_receber` esconde o "entregar" até o recebimento */
                                    recebimentoStatus: string;
                                };
                                comprovante: {
                                    /** @description Política da parceria: nenhum, foto, assinatura ou codigo */
                                    exigido: string;
                                    /** @description O tipo a enviar em POST /app/entregas/{id}/comprovantes; null sem exigência */
                                    tipo: ("foto_entrega" | "assinatura" | "foto_fachada" | "foto_terceiro" | "codigo_cliente") | null;
                                    /** @description Ainda falta o comprovante exigido: o "entregar" fica de fora */
                                    pendente: boolean;
                                };
                                /** @description Cronômetro do cliente ausente; null fora da espera */
                                ausencia: {
                                    /** Format: date-time */
                                    desde: string;
                                    /** Format: date-time */
                                    expiraEm: string;
                                } | null;
                                /** @description Botões da parada; cada um é a rota POST /app/entregas/{id}/<ação> */
                                acoesPermitidas: ("iniciar" | "cheguei" | "contato" | "recebimentos" | "corrigir_recebimento" | "comprovantes" | "ausente" | "recusada_pelo_cliente" | "entregar" | "devolver")[];
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.concluir": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date-time */
                    eventoEm?: string;
                    posicao?: {
                        lat: number;
                        lng: number;
                    };
                    recebedorNome?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                /** @description Do cliente, até a parada terminar; depois, null */
                                telefone: string | null;
                                coleta: {
                                    endereco: string;
                                    instrucoes: string | null;
                                };
                                complemento: string | null;
                                referencia: string | null;
                                observacoes: string | null;
                                pagamento: {
                                    forma: string;
                                    /** @description Decimal em texto, com ponto: "30.00" */
                                    valorACobrar: string;
                                    trocoPara: string | null;
                                    /** @description trocoPara - valorACobrar, calculado pela API */
                                    trocoNecessario: string | null;
                                    maquininhaDe: string | null;
                                    /** @description `a_receber` esconde o "entregar" até o recebimento */
                                    recebimentoStatus: string;
                                };
                                comprovante: {
                                    /** @description Política da parceria: nenhum, foto, assinatura ou codigo */
                                    exigido: string;
                                    /** @description O tipo a enviar em POST /app/entregas/{id}/comprovantes; null sem exigência */
                                    tipo: ("foto_entrega" | "assinatura" | "foto_fachada" | "foto_terceiro" | "codigo_cliente") | null;
                                    /** @description Ainda falta o comprovante exigido: o "entregar" fica de fora */
                                    pendente: boolean;
                                };
                                /** @description Cronômetro do cliente ausente; null fora da espera */
                                ausencia: {
                                    /** Format: date-time */
                                    desde: string;
                                    /** Format: date-time */
                                    expiraEm: string;
                                } | null;
                                /** @description Botões da parada; cada um é a rota POST /app/entregas/{id}/<ação> */
                                acoesPermitidas: ("iniciar" | "cheguei" | "contato" | "recebimentos" | "corrigir_recebimento" | "comprovantes" | "ausente" | "recusada_pelo_cliente" | "entregar" | "devolver")[];
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.iniciarRetorno": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date-time */
                    eventoEm?: string;
                    posicao?: {
                        lat: number;
                        lng: number;
                    };
                    /**
                     * @default cliente_recusou
                     * @enum {string}
                     */
                    tipo?: "cliente_recusou" | "pagamento_recusado";
                    motivo: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                /** @description Do cliente, até a parada terminar; depois, null */
                                telefone: string | null;
                                coleta: {
                                    endereco: string;
                                    instrucoes: string | null;
                                };
                                complemento: string | null;
                                referencia: string | null;
                                observacoes: string | null;
                                pagamento: {
                                    forma: string;
                                    /** @description Decimal em texto, com ponto: "30.00" */
                                    valorACobrar: string;
                                    trocoPara: string | null;
                                    /** @description trocoPara - valorACobrar, calculado pela API */
                                    trocoNecessario: string | null;
                                    maquininhaDe: string | null;
                                    /** @description `a_receber` esconde o "entregar" até o recebimento */
                                    recebimentoStatus: string;
                                };
                                comprovante: {
                                    /** @description Política da parceria: nenhum, foto, assinatura ou codigo */
                                    exigido: string;
                                    /** @description O tipo a enviar em POST /app/entregas/{id}/comprovantes; null sem exigência */
                                    tipo: ("foto_entrega" | "assinatura" | "foto_fachada" | "foto_terceiro" | "codigo_cliente") | null;
                                    /** @description Ainda falta o comprovante exigido: o "entregar" fica de fora */
                                    pendente: boolean;
                                };
                                /** @description Cronômetro do cliente ausente; null fora da espera */
                                ausencia: {
                                    /** Format: date-time */
                                    desde: string;
                                    /** Format: date-time */
                                    expiraEm: string;
                                } | null;
                                /** @description Botões da parada; cada um é a rota POST /app/entregas/{id}/<ação> */
                                acoesPermitidas: ("iniciar" | "cheguei" | "contato" | "recebimentos" | "corrigir_recebimento" | "comprovantes" | "ausente" | "recusada_pelo_cliente" | "entregar" | "devolver")[];
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "entregas.confirmarDevolucaoPorCodigo": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date-time */
                    eventoEm?: string;
                    posicao?: {
                        lat: number;
                        lng: number;
                    };
                    codigoDevolucao: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            /** @enum {string} */
                            status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                            motoboyId: string | null;
                            modoOferta: string;
                            motivoCancelamento: string | null;
                            exigeCodigoColeta: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                            acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                            paradas: {
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                status: string;
                                ordem: number | null;
                                cliente: string;
                                destino: string;
                                coordenadaColeta: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                coordenadaDestino: {
                                    lat: number;
                                    lng: number;
                                } | null;
                                /** @description Do cliente, até a parada terminar; depois, null */
                                telefone: string | null;
                                coleta: {
                                    endereco: string;
                                    instrucoes: string | null;
                                };
                                complemento: string | null;
                                referencia: string | null;
                                observacoes: string | null;
                                pagamento: {
                                    forma: string;
                                    /** @description Decimal em texto, com ponto: "30.00" */
                                    valorACobrar: string;
                                    trocoPara: string | null;
                                    /** @description trocoPara - valorACobrar, calculado pela API */
                                    trocoNecessario: string | null;
                                    maquininhaDe: string | null;
                                    /** @description `a_receber` esconde o "entregar" até o recebimento */
                                    recebimentoStatus: string;
                                };
                                comprovante: {
                                    /** @description Política da parceria: nenhum, foto, assinatura ou codigo */
                                    exigido: string;
                                    /** @description O tipo a enviar em POST /app/entregas/{id}/comprovantes; null sem exigência */
                                    tipo: ("foto_entrega" | "assinatura" | "foto_fachada" | "foto_terceiro" | "codigo_cliente") | null;
                                    /** @description Ainda falta o comprovante exigido: o "entregar" fica de fora */
                                    pendente: boolean;
                                };
                                /** @description Cronômetro do cliente ausente; null fora da espera */
                                ausencia: {
                                    /** Format: date-time */
                                    desde: string;
                                    /** Format: date-time */
                                    expiraEm: string;
                                } | null;
                                /** @description Botões da parada; cada um é a rota POST /app/entregas/{id}/<ação> */
                                acoesPermitidas: ("iniciar" | "cheguei" | "contato" | "recebimentos" | "corrigir_recebimento" | "comprovantes" | "ausente" | "recusada_pelo_cliente" | "entregar" | "devolver")[];
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "recebimentos.registrar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    itens: {
                        /** @enum {string} */
                        forma: "dinheiro" | "cartao_credito" | "cartao_debito" | "pix" | "outro";
                        valor: string;
                        trocoDado?: string;
                        nsu?: string;
                    }[];
                    /** Format: date-time */
                    eventoEm?: string;
                    posicao?: {
                        lat: number;
                        lng: number;
                    };
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            entregaId: string;
                            /** @enum {string} */
                            recebimentoStatus: "recebido" | "divergente";
                            total: string;
                            divergencias: ("valor" | "forma")[];
                            itens: {
                                /** @enum {string} */
                                forma: "dinheiro" | "cartao_credito" | "cartao_debito" | "pix" | "outro";
                                valor: string;
                                trocoDado: string;
                                nsu: string | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "recebimentos.corrigir": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    itens: {
                        /** @enum {string} */
                        forma: "dinheiro" | "cartao_credito" | "cartao_debito" | "pix" | "outro";
                        valor: string;
                        trocoDado?: string;
                        nsu?: string;
                    }[];
                    /** Format: date-time */
                    eventoEm?: string;
                    posicao?: {
                        lat: number;
                        lng: number;
                    };
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            entregaId: string;
                            /** @enum {string} */
                            recebimentoStatus: "recebido" | "divergente";
                            total: string;
                            divergencias: ("valor" | "forma")[];
                            itens: {
                                /** @enum {string} */
                                forma: "dinheiro" | "cartao_credito" | "cartao_debito" | "pix" | "outro";
                                valor: string;
                                trocoDado: string;
                                nsu: string | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "ocorrencias.listar": {
        parameters: {
            query?: {
                cursor?: string;
                limite?: number;
                status?: "aberta" | "resolvida" | "cancelada";
                tipo?: "atraso_restaurante" | "cliente_ausente" | "endereco_incorreto" | "cliente_recusou" | "pagamento_recusado" | "avaria" | "extravio" | "roubo" | "acidente" | "pane_veiculo" | "transito" | "desistencia_motoboy" | "recebimento_divergente" | "outro";
                entregaId?: string;
                motoboyId?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            tipo: "atraso_restaurante" | "cliente_ausente" | "endereco_incorreto" | "cliente_recusou" | "pagamento_recusado" | "avaria" | "extravio" | "roubo" | "acidente" | "pane_veiculo" | "transito" | "desistencia_motoboy" | "recebimento_divergente" | "outro";
                            /** @enum {string} */
                            status: "aberta" | "resolvida" | "cancelada";
                            descricao: string | null;
                            entregaId: string | null;
                            rotaId: string | null;
                            motoboyId: string | null;
                            /** Format: date-time */
                            abertaEm: string;
                            resolvidaEm: string | null;
                            resolucao: string | null;
                        }[];
                        meta: {
                            /** @description Repasse em ?cursor= para a próxima página */
                            proximoCursor: string | null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "ocorrencias.abrir": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    tipo: "atraso_restaurante" | "cliente_ausente" | "endereco_incorreto" | "cliente_recusou" | "pagamento_recusado" | "avaria" | "extravio" | "roubo" | "acidente" | "pane_veiculo" | "transito" | "desistencia_motoboy" | "outro";
                    descricao?: string;
                    /** Format: uuid */
                    entregaId?: string;
                    /** Format: uuid */
                    rotaId?: string;
                    /** Format: uuid */
                    motoboyId?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            tipo: "atraso_restaurante" | "cliente_ausente" | "endereco_incorreto" | "cliente_recusou" | "pagamento_recusado" | "avaria" | "extravio" | "roubo" | "acidente" | "pane_veiculo" | "transito" | "desistencia_motoboy" | "recebimento_divergente" | "outro";
                            /** @enum {string} */
                            status: "aberta" | "resolvida" | "cancelada";
                            descricao: string | null;
                            entregaId: string | null;
                            rotaId: string | null;
                            motoboyId: string | null;
                            /** Format: date-time */
                            abertaEm: string;
                            resolvidaEm: string | null;
                            resolucao: string | null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "ocorrencias.resolver": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    resolucao: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            tipo: "atraso_restaurante" | "cliente_ausente" | "endereco_incorreto" | "cliente_recusou" | "pagamento_recusado" | "avaria" | "extravio" | "roubo" | "acidente" | "pane_veiculo" | "transito" | "desistencia_motoboy" | "recebimento_divergente" | "outro";
                            /** @enum {string} */
                            status: "aberta" | "resolvida" | "cancelada";
                            descricao: string | null;
                            entregaId: string | null;
                            rotaId: string | null;
                            motoboyId: string | null;
                            /** Format: date-time */
                            abertaEm: string;
                            resolvidaEm: string | null;
                            resolucao: string | null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "ocorrencias.abrirNoApp": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    tipo: "atraso_restaurante" | "endereco_incorreto" | "avaria" | "extravio" | "roubo" | "acidente" | "pane_veiculo" | "transito" | "desistencia_motoboy" | "outro";
                    descricao?: string;
                    /** Format: uuid */
                    entregaId?: string;
                    /** Format: date-time */
                    eventoEm?: string;
                    posicao?: {
                        lat: number;
                        lng: number;
                    };
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            tipo: "atraso_restaurante" | "cliente_ausente" | "endereco_incorreto" | "cliente_recusou" | "pagamento_recusado" | "avaria" | "extravio" | "roubo" | "acidente" | "pane_veiculo" | "transito" | "desistencia_motoboy" | "recebimento_divergente" | "outro";
                            /** @enum {string} */
                            status: "aberta" | "resolvida" | "cancelada";
                            descricao: string | null;
                            entregaId: string | null;
                            rotaId: string | null;
                            motoboyId: string | null;
                            /** Format: date-time */
                            abertaEm: string;
                            resolvidaEm: string | null;
                            resolucao: string | null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "planos.listar": {
        parameters: {
            query?: {
                finalidade?: "remuneracao" | "cobranca";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            finalidade: "remuneracao" | "cobranca";
                            nome: string;
                            descricao: string | null;
                            ativo: boolean;
                            versaoPublicada: {
                                /** Format: uuid */
                                id: string;
                                versao: number;
                                /** @enum {string} */
                                status: "rascunho" | "publicada" | "arquivada";
                                publicadaEm: string | null;
                            } | null;
                            rascunho: {
                                /** Format: uuid */
                                id: string;
                                versao: number;
                                /** @enum {string} */
                                status: "rascunho" | "publicada" | "arquivada";
                                publicadaEm: string | null;
                            } | null;
                            versoes: {
                                /** Format: uuid */
                                id: string;
                                versao: number;
                                /** @enum {string} */
                                status: "rascunho" | "publicada" | "arquivada";
                                publicadaEm: string | null;
                            }[];
                        }[];
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "planos.criar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    finalidade: "remuneracao" | "cobranca";
                    nome: string;
                    descricao?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            finalidade: "remuneracao" | "cobranca";
                            nome: string;
                            descricao: string | null;
                            ativo: boolean;
                            versaoPublicada: {
                                /** Format: uuid */
                                id: string;
                                versao: number;
                                /** @enum {string} */
                                status: "rascunho" | "publicada" | "arquivada";
                                publicadaEm: string | null;
                            } | null;
                            rascunho: {
                                /** Format: uuid */
                                id: string;
                                versao: number;
                                /** @enum {string} */
                                status: "rascunho" | "publicada" | "arquivada";
                                publicadaEm: string | null;
                            } | null;
                            versoes: {
                                /** Format: uuid */
                                id: string;
                                versao: number;
                                /** @enum {string} */
                                status: "rascunho" | "publicada" | "arquivada";
                                publicadaEm: string | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "planos.obter": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            finalidade: "remuneracao" | "cobranca";
                            nome: string;
                            descricao: string | null;
                            ativo: boolean;
                            versaoPublicada: {
                                /** Format: uuid */
                                id: string;
                                versao: number;
                                /** @enum {string} */
                                status: "rascunho" | "publicada" | "arquivada";
                                publicadaEm: string | null;
                            } | null;
                            rascunho: {
                                /** Format: uuid */
                                id: string;
                                versao: number;
                                /** @enum {string} */
                                status: "rascunho" | "publicada" | "arquivada";
                                publicadaEm: string | null;
                            } | null;
                            versoes: {
                                /** Format: uuid */
                                id: string;
                                versao: number;
                                /** @enum {string} */
                                status: "rascunho" | "publicada" | "arquivada";
                                publicadaEm: string | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "planos.novaVersao": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            versao: number;
                            /** @enum {string} */
                            status: "rascunho" | "publicada" | "arquivada";
                            publicadaEm: string | null;
                            /** Format: uuid */
                            planoId: string;
                            /** @enum {string} */
                            finalidade: "remuneracao" | "cobranca";
                            notas: string | null;
                            componentes: {
                                /** Format: uuid */
                                id: string;
                                tipo: string;
                                nome: string;
                                parametros: {
                                    [key: string]: components["schemas"]["Def2_schema0"];
                                };
                                condicoes: {
                                    [key: string]: components["schemas"]["Def3_schema1"];
                                };
                                prioridade: number;
                                cumulativo: boolean;
                                ordem: number;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "planos.obterVersao": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            versao: number;
                            /** @enum {string} */
                            status: "rascunho" | "publicada" | "arquivada";
                            publicadaEm: string | null;
                            /** Format: uuid */
                            planoId: string;
                            /** @enum {string} */
                            finalidade: "remuneracao" | "cobranca";
                            notas: string | null;
                            componentes: {
                                /** Format: uuid */
                                id: string;
                                tipo: string;
                                nome: string;
                                parametros: {
                                    [key: string]: components["schemas"]["Def4_schema0"];
                                };
                                condicoes: {
                                    [key: string]: components["schemas"]["Def5_schema1"];
                                };
                                prioridade: number;
                                cumulativo: boolean;
                                ordem: number;
                            }[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "planos.salvarComponentes": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    componentes: {
                        /** @enum {string} */
                        tipo: "fixo_periodo" | "por_entrega" | "por_km" | "faixa_distancia" | "parada_adicional" | "retorno" | "espera" | "adicional_horario" | "adicional_dia" | "adicional_condicao" | "bonus_meta" | "garantia_minima" | "desconto" | "cancelamento" | "mensalidade" | "percentual_cobranca";
                        nome: string;
                        parametros: {
                            [key: string]: components["schemas"]["Def6_schema0"];
                        };
                        /** @default {} */
                        condicoes?: {
                            [key: string]: components["schemas"]["Def6_schema0"];
                        };
                        /** @default 100 */
                        prioridade?: number;
                        /** @default true */
                        cumulativo?: boolean;
                    }[];
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            versao: number;
                            /** @enum {string} */
                            status: "rascunho" | "publicada" | "arquivada";
                            publicadaEm: string | null;
                            /** Format: uuid */
                            planoId: string;
                            /** @enum {string} */
                            finalidade: "remuneracao" | "cobranca";
                            notas: string | null;
                            componentes: {
                                /** Format: uuid */
                                id: string;
                                tipo: string;
                                nome: string;
                                parametros: {
                                    [key: string]: components["schemas"]["Def7_schema0"];
                                };
                                condicoes: {
                                    [key: string]: components["schemas"]["Def8_schema1"];
                                };
                                prioridade: number;
                                cumulativo: boolean;
                                ordem: number;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "planos.publicar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            versao: number;
                            /** @enum {string} */
                            status: "rascunho" | "publicada" | "arquivada";
                            publicadaEm: string | null;
                            /** Format: uuid */
                            planoId: string;
                            /** @enum {string} */
                            finalidade: "remuneracao" | "cobranca";
                            notas: string | null;
                            componentes: {
                                /** Format: uuid */
                                id: string;
                                tipo: string;
                                nome: string;
                                parametros: {
                                    [key: string]: components["schemas"]["Def9_schema0"];
                                };
                                condicoes: {
                                    [key: string]: components["schemas"]["Def10_schema1"];
                                };
                                prioridade: number;
                                cumulativo: boolean;
                                ordem: number;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "planos.listarAtribuicoes": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            planoId: string;
                            /** @enum {string} */
                            finalidade: "remuneracao" | "cobranca";
                            /** @enum {string} */
                            alvoTipo: "motoboy" | "grupo_motoboys" | "parceria" | "organizacao";
                            /** Format: uuid */
                            alvoId: string;
                            /** Format: date-time */
                            vigenteDe: string;
                            vigenteAte: string | null;
                        }[];
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "planos.atribuir": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    alvoTipo: "motoboy" | "grupo_motoboys" | "parceria" | "organizacao";
                    /** Format: uuid */
                    alvoId: string;
                    /** Format: date-time */
                    vigenteDe: string;
                    /** Format: date-time */
                    vigenteAte?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            planoId: string;
                            /** @enum {string} */
                            finalidade: "remuneracao" | "cobranca";
                            /** @enum {string} */
                            alvoTipo: "motoboy" | "grupo_motoboys" | "parceria" | "organizacao";
                            /** Format: uuid */
                            alvoId: string;
                            /** Format: date-time */
                            vigenteDe: string;
                            vigenteAte: string | null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "condicoes.listar": {
        parameters: {
            query?: {
                ativas?: "true" | "false";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            tipo: string;
                            descricao: string | null;
                            /** Format: date-time */
                            inicio: string;
                            fim: string | null;
                            ativa: boolean;
                        }[];
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "condicoes.ativar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    tipo: string;
                    descricao?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            tipo: string;
                            descricao: string | null;
                            /** Format: date-time */
                            inicio: string;
                            fim: string | null;
                            ativa: boolean;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "condicoes.encerrar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            tipo: string;
                            descricao: string | null;
                            /** Format: date-time */
                            inicio: string;
                            fim: string | null;
                            ativa: boolean;
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "lancamentos.extrato": {
        parameters: {
            query?: {
                de?: string;
                ate?: string;
            };
            header?: {
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: date */
                            de: string;
                            /** Format: date */
                            ate: string;
                            total: string;
                            porDia: {
                                /** Format: date */
                                dia: string;
                                total: string;
                            }[];
                            itens: {
                                /** Format: uuid */
                                id: string;
                                /** Format: date */
                                competencia: string;
                                componente: string;
                                valor: string;
                                memoria: string;
                                referencia: {
                                    tipo: string;
                                    id: string | null;
                                };
                                origem: string;
                                fechado: boolean;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "lancamentos.listar": {
        parameters: {
            query?: {
                de?: string;
                ate?: string;
                finalidade?: "remuneracao" | "cobranca";
                motoboyId?: string;
                origem?: "automatico" | "manual" | "ajuste" | "estorno";
                situacao?: "aberto" | "fechado";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            finalidade: "remuneracao" | "cobranca";
                            motoboy: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            } | null;
                            restauranteId: string | null;
                            /** Format: date */
                            competencia: string;
                            componente: string;
                            valor: string;
                            memoria: string;
                            referencia: {
                                tipo: string;
                                id: string | null;
                            };
                            origem: string;
                            estornoDeId: string | null;
                            estornado: boolean;
                            fechamentoId: string | null;
                            faturaId: string | null;
                            criadoPor: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            } | null;
                            /** Format: date-time */
                            criadoEm: string;
                        }[];
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "lancamentos.ajustar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: uuid */
                    motoboyId: string;
                    /** @enum {string} */
                    tipo: "credito" | "debito";
                    valor: string;
                    motivo: string;
                    /** Format: date */
                    competencia?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            finalidade: "remuneracao" | "cobranca";
                            motoboy: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            } | null;
                            restauranteId: string | null;
                            /** Format: date */
                            competencia: string;
                            componente: string;
                            valor: string;
                            memoria: string;
                            referencia: {
                                tipo: string;
                                id: string | null;
                            };
                            origem: string;
                            estornoDeId: string | null;
                            estornado: boolean;
                            fechamentoId: string | null;
                            faturaId: string | null;
                            criadoPor: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            } | null;
                            /** Format: date-time */
                            criadoEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "lancamentos.estornar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            finalidade: "remuneracao" | "cobranca";
                            motoboy: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            } | null;
                            restauranteId: string | null;
                            /** Format: date */
                            competencia: string;
                            componente: string;
                            valor: string;
                            memoria: string;
                            referencia: {
                                tipo: string;
                                id: string | null;
                            };
                            origem: string;
                            estornoDeId: string | null;
                            estornado: boolean;
                            fechamentoId: string | null;
                            faturaId: string | null;
                            criadoPor: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            } | null;
                            /** Format: date-time */
                            criadoEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "caixa.doTurno": {
        parameters: {
            query?: never;
            header?: {
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            turno: {
                                /** Format: uuid */
                                id: string;
                                status: string;
                                caixaStatus: string;
                            } | null;
                            emMaos: string;
                            porRestaurante: {
                                /** Format: uuid */
                                restauranteId: string;
                                total: string;
                            }[];
                            recebimentos: {
                                /** Format: uuid */
                                id: string;
                                /** Format: uuid */
                                entregaId: string;
                                codigo: string;
                                /** Format: uuid */
                                restauranteId: string;
                                forma: string;
                                valor: string;
                                trocoDado: string;
                                /** Format: date-time */
                                recebidoEm: string;
                            }[];
                            acertos: {
                                /** Format: uuid */
                                id: string;
                                /** Format: uuid */
                                turnoId: string;
                                /** Format: uuid */
                                motoboyId: string;
                                /** @enum {string} */
                                destino: "restaurante" | "empresa";
                                restauranteId: string | null;
                                valorPrevisto: string;
                                valorEntregue: string | null;
                                diferenca: string | null;
                                /** @enum {string} */
                                status: "pendente" | "conferido" | "com_divergencia" | "confirmado_restaurante";
                                conferidoEm: string | null;
                                observacao: string | null;
                                /** Format: date */
                                competencia: string;
                                motoboy: {
                                    nome: string;
                                    apelido: string | null;
                                };
                                acoesPermitidas: ("conferir" | "confirmar" | "descontar")[];
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "caixa.listarAcertos": {
        parameters: {
            query?: {
                status?: "pendente" | "conferido" | "com_divergencia" | "confirmado_restaurante";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            turnoId: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            destino: "restaurante" | "empresa";
                            restauranteId: string | null;
                            valorPrevisto: string;
                            valorEntregue: string | null;
                            diferenca: string | null;
                            /** @enum {string} */
                            status: "pendente" | "conferido" | "com_divergencia" | "confirmado_restaurante";
                            conferidoEm: string | null;
                            observacao: string | null;
                            /** Format: date */
                            competencia: string;
                            motoboy: {
                                nome: string;
                                apelido: string | null;
                            };
                            acoesPermitidas: ("conferir" | "confirmar" | "descontar")[];
                        }[];
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "caixa.acertosDoRestaurante": {
        parameters: {
            query?: {
                status?: "pendente" | "conferido" | "com_divergencia" | "confirmado_restaurante";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            turnoId: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            destino: "restaurante" | "empresa";
                            restauranteId: string | null;
                            valorPrevisto: string;
                            valorEntregue: string | null;
                            diferenca: string | null;
                            /** @enum {string} */
                            status: "pendente" | "conferido" | "com_divergencia" | "confirmado_restaurante";
                            conferidoEm: string | null;
                            observacao: string | null;
                            /** Format: date */
                            competencia: string;
                            motoboy: {
                                nome: string;
                                apelido: string | null;
                            };
                            acoesPermitidas: ("conferir" | "confirmar" | "descontar")[];
                        }[];
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "caixa.conferir": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    valorEntregue: string;
                    observacao?: string;
                    /** @default false */
                    descontarDoMotoboy?: boolean;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            turnoId: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            destino: "restaurante" | "empresa";
                            restauranteId: string | null;
                            valorPrevisto: string;
                            valorEntregue: string | null;
                            diferenca: string | null;
                            /** @enum {string} */
                            status: "pendente" | "conferido" | "com_divergencia" | "confirmado_restaurante";
                            conferidoEm: string | null;
                            observacao: string | null;
                            /** Format: date */
                            competencia: string;
                            motoboy: {
                                nome: string;
                                apelido: string | null;
                            };
                            acoesPermitidas: ("conferir" | "confirmar" | "descontar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "caixa.descontar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    observacao?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            turnoId: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            destino: "restaurante" | "empresa";
                            restauranteId: string | null;
                            valorPrevisto: string;
                            valorEntregue: string | null;
                            diferenca: string | null;
                            /** @enum {string} */
                            status: "pendente" | "conferido" | "com_divergencia" | "confirmado_restaurante";
                            conferidoEm: string | null;
                            observacao: string | null;
                            /** Format: date */
                            competencia: string;
                            motoboy: {
                                nome: string;
                                apelido: string | null;
                            };
                            acoesPermitidas: ("conferir" | "confirmar" | "descontar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "caixa.confirmarPeloRestaurante": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    valorRecebido: string;
                    observacao?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            turnoId: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            destino: "restaurante" | "empresa";
                            restauranteId: string | null;
                            valorPrevisto: string;
                            valorEntregue: string | null;
                            diferenca: string | null;
                            /** @enum {string} */
                            status: "pendente" | "conferido" | "com_divergencia" | "confirmado_restaurante";
                            conferidoEm: string | null;
                            observacao: string | null;
                            /** Format: date */
                            competencia: string;
                            motoboy: {
                                nome: string;
                                apelido: string | null;
                            };
                            acoesPermitidas: ("conferir" | "confirmar" | "descontar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "fechamentos.listar": {
        parameters: {
            query?: {
                status?: "aberto" | "em_conferencia" | "aprovado" | "pago" | "cancelado";
                motoboyId?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            motoboy: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            /** Format: date */
                            periodoInicio: string;
                            /** Format: date */
                            periodoFim: string;
                            /** @enum {string} */
                            status: "aberto" | "em_conferencia" | "aprovado" | "pago" | "cancelado";
                            totalCreditos: string;
                            totalDebitos: string;
                            totalLiquido: string;
                            aprovadoEm: string | null;
                            pagoEm: string | null;
                            formaPagamento: string | null;
                            observacao: string | null;
                            acoesPermitidas: ("conferir" | "aprovar" | "pagar" | "cancelar")[];
                        }[];
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "fechamentos.gerar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date */
                    inicio: string;
                    /** Format: date */
                    fim: string;
                    motoboyIds?: string[];
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            criados: {
                                /** Format: uuid */
                                id: string;
                                motoboy: {
                                    /** Format: uuid */
                                    id: string;
                                    nome: string;
                                };
                                /** Format: date */
                                periodoInicio: string;
                                /** Format: date */
                                periodoFim: string;
                                /** @enum {string} */
                                status: "aberto" | "em_conferencia" | "aprovado" | "pago" | "cancelado";
                                totalCreditos: string;
                                totalDebitos: string;
                                totalLiquido: string;
                                aprovadoEm: string | null;
                                pagoEm: string | null;
                                formaPagamento: string | null;
                                observacao: string | null;
                                acoesPermitidas: ("conferir" | "aprovar" | "pagar" | "cancelar")[];
                            }[];
                            ignorados: {
                                /** Format: uuid */
                                motoboyId: string;
                                motivo: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "fechamentos.obter": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            motoboy: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            /** Format: date */
                            periodoInicio: string;
                            /** Format: date */
                            periodoFim: string;
                            /** @enum {string} */
                            status: "aberto" | "em_conferencia" | "aprovado" | "pago" | "cancelado";
                            totalCreditos: string;
                            totalDebitos: string;
                            totalLiquido: string;
                            aprovadoEm: string | null;
                            pagoEm: string | null;
                            formaPagamento: string | null;
                            observacao: string | null;
                            acoesPermitidas: ("conferir" | "aprovar" | "pagar" | "cancelar")[];
                            lancamentos: {
                                /** Format: uuid */
                                id: string;
                                /** Format: date */
                                competencia: string;
                                componente: string;
                                valor: string;
                                memoria: string;
                                referencia: {
                                    tipo: string;
                                    id: string | null;
                                };
                                origem: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "fechamentos.conferir": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            motoboy: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            /** Format: date */
                            periodoInicio: string;
                            /** Format: date */
                            periodoFim: string;
                            /** @enum {string} */
                            status: "aberto" | "em_conferencia" | "aprovado" | "pago" | "cancelado";
                            totalCreditos: string;
                            totalDebitos: string;
                            totalLiquido: string;
                            aprovadoEm: string | null;
                            pagoEm: string | null;
                            formaPagamento: string | null;
                            observacao: string | null;
                            acoesPermitidas: ("conferir" | "aprovar" | "pagar" | "cancelar")[];
                            lancamentos: {
                                /** Format: uuid */
                                id: string;
                                /** Format: date */
                                competencia: string;
                                componente: string;
                                valor: string;
                                memoria: string;
                                referencia: {
                                    tipo: string;
                                    id: string | null;
                                };
                                origem: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "fechamentos.aprovar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            motoboy: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            /** Format: date */
                            periodoInicio: string;
                            /** Format: date */
                            periodoFim: string;
                            /** @enum {string} */
                            status: "aberto" | "em_conferencia" | "aprovado" | "pago" | "cancelado";
                            totalCreditos: string;
                            totalDebitos: string;
                            totalLiquido: string;
                            aprovadoEm: string | null;
                            pagoEm: string | null;
                            formaPagamento: string | null;
                            observacao: string | null;
                            acoesPermitidas: ("conferir" | "aprovar" | "pagar" | "cancelar")[];
                            lancamentos: {
                                /** Format: uuid */
                                id: string;
                                /** Format: date */
                                competencia: string;
                                componente: string;
                                valor: string;
                                memoria: string;
                                referencia: {
                                    tipo: string;
                                    id: string | null;
                                };
                                origem: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "fechamentos.cancelar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            motoboy: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            /** Format: date */
                            periodoInicio: string;
                            /** Format: date */
                            periodoFim: string;
                            /** @enum {string} */
                            status: "aberto" | "em_conferencia" | "aprovado" | "pago" | "cancelado";
                            totalCreditos: string;
                            totalDebitos: string;
                            totalLiquido: string;
                            aprovadoEm: string | null;
                            pagoEm: string | null;
                            formaPagamento: string | null;
                            observacao: string | null;
                            acoesPermitidas: ("conferir" | "aprovar" | "pagar" | "cancelar")[];
                            lancamentos: {
                                /** Format: uuid */
                                id: string;
                                /** Format: date */
                                competencia: string;
                                componente: string;
                                valor: string;
                                memoria: string;
                                referencia: {
                                    tipo: string;
                                    id: string | null;
                                };
                                origem: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "fechamentos.pagar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    formaPagamento: "pix" | "dinheiro" | "transferencia" | "outro";
                    observacao?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            motoboy: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            /** Format: date */
                            periodoInicio: string;
                            /** Format: date */
                            periodoFim: string;
                            /** @enum {string} */
                            status: "aberto" | "em_conferencia" | "aprovado" | "pago" | "cancelado";
                            totalCreditos: string;
                            totalDebitos: string;
                            totalLiquido: string;
                            aprovadoEm: string | null;
                            pagoEm: string | null;
                            formaPagamento: string | null;
                            observacao: string | null;
                            acoesPermitidas: ("conferir" | "aprovar" | "pagar" | "cancelar")[];
                            lancamentos: {
                                /** Format: uuid */
                                id: string;
                                /** Format: date */
                                competencia: string;
                                componente: string;
                                valor: string;
                                memoria: string;
                                referencia: {
                                    tipo: string;
                                    id: string | null;
                                };
                                origem: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "fechamentos.doMotoboy": {
        parameters: {
            query?: never;
            header?: {
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            motoboy: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            /** Format: date */
                            periodoInicio: string;
                            /** Format: date */
                            periodoFim: string;
                            /** @enum {string} */
                            status: "aberto" | "em_conferencia" | "aprovado" | "pago" | "cancelado";
                            totalCreditos: string;
                            totalDebitos: string;
                            totalLiquido: string;
                            aprovadoEm: string | null;
                            pagoEm: string | null;
                            formaPagamento: string | null;
                            observacao: string | null;
                            acoesPermitidas: ("conferir" | "aprovar" | "pagar" | "cancelar")[];
                        }[];
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "faturas.listar": {
        parameters: {
            query?: {
                status?: "aberta" | "fechada" | "enviada" | "paga" | "vencida" | "cancelada";
                restauranteId?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            numero: string;
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            /** Format: uuid */
                            parceriaId: string;
                            /** Format: date */
                            periodoInicio: string;
                            /** Format: date */
                            periodoFim: string;
                            /** @enum {string} */
                            status: "aberta" | "fechada" | "enviada" | "paga" | "vencida" | "cancelada";
                            totalServicos: string;
                            totalAcertoDinheiro: string;
                            totalLiquido: string;
                            vencimento: string | null;
                            enviadaEm: string | null;
                            pagaEm: string | null;
                            notaFiscal: {
                                numero: string;
                                /** Format: date */
                                emitidaEm: string;
                                codigoVerificacao: string | null;
                                link: string | null;
                                pdfArquivoId: string | null;
                                xmlArquivoId: string | null;
                                /** Format: date-time */
                                registradaEm: string;
                            } | null;
                            acoesPermitidas: ("fechar" | "enviar" | "pagar" | "cancelar")[];
                        }[];
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "faturas.gerar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date */
                    inicio: string;
                    /** Format: date */
                    fim: string;
                    parceriaIds?: string[];
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            criadas: {
                                /** Format: uuid */
                                id: string;
                                numero: string;
                                restaurante: {
                                    /** Format: uuid */
                                    id: string;
                                    nome: string;
                                };
                                /** Format: uuid */
                                parceriaId: string;
                                /** Format: date */
                                periodoInicio: string;
                                /** Format: date */
                                periodoFim: string;
                                /** @enum {string} */
                                status: "aberta" | "fechada" | "enviada" | "paga" | "vencida" | "cancelada";
                                totalServicos: string;
                                totalAcertoDinheiro: string;
                                totalLiquido: string;
                                vencimento: string | null;
                                enviadaEm: string | null;
                                pagaEm: string | null;
                                notaFiscal: {
                                    numero: string;
                                    /** Format: date */
                                    emitidaEm: string;
                                    codigoVerificacao: string | null;
                                    link: string | null;
                                    pdfArquivoId: string | null;
                                    xmlArquivoId: string | null;
                                    /** Format: date-time */
                                    registradaEm: string;
                                } | null;
                                acoesPermitidas: ("fechar" | "enviar" | "pagar" | "cancelar")[];
                            }[];
                            ignoradas: {
                                /** Format: uuid */
                                parceriaId: string;
                                motivo: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "faturas.obter": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            numero: string;
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            /** Format: uuid */
                            parceriaId: string;
                            /** Format: date */
                            periodoInicio: string;
                            /** Format: date */
                            periodoFim: string;
                            /** @enum {string} */
                            status: "aberta" | "fechada" | "enviada" | "paga" | "vencida" | "cancelada";
                            totalServicos: string;
                            totalAcertoDinheiro: string;
                            totalLiquido: string;
                            vencimento: string | null;
                            enviadaEm: string | null;
                            pagaEm: string | null;
                            notaFiscal: {
                                numero: string;
                                /** Format: date */
                                emitidaEm: string;
                                codigoVerificacao: string | null;
                                link: string | null;
                                pdfArquivoId: string | null;
                                xmlArquivoId: string | null;
                                /** Format: date-time */
                                registradaEm: string;
                            } | null;
                            acoesPermitidas: ("fechar" | "enviar" | "pagar" | "cancelar")[];
                            lancamentos: {
                                /** Format: uuid */
                                id: string;
                                /** Format: date */
                                competencia: string;
                                componente: string;
                                valor: string;
                                memoria: string;
                                referencia: {
                                    tipo: string;
                                    id: string | null;
                                };
                                origem: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "faturas.fechar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            numero: string;
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            /** Format: uuid */
                            parceriaId: string;
                            /** Format: date */
                            periodoInicio: string;
                            /** Format: date */
                            periodoFim: string;
                            /** @enum {string} */
                            status: "aberta" | "fechada" | "enviada" | "paga" | "vencida" | "cancelada";
                            totalServicos: string;
                            totalAcertoDinheiro: string;
                            totalLiquido: string;
                            vencimento: string | null;
                            enviadaEm: string | null;
                            pagaEm: string | null;
                            notaFiscal: {
                                numero: string;
                                /** Format: date */
                                emitidaEm: string;
                                codigoVerificacao: string | null;
                                link: string | null;
                                pdfArquivoId: string | null;
                                xmlArquivoId: string | null;
                                /** Format: date-time */
                                registradaEm: string;
                            } | null;
                            acoesPermitidas: ("fechar" | "enviar" | "pagar" | "cancelar")[];
                            lancamentos: {
                                /** Format: uuid */
                                id: string;
                                /** Format: date */
                                competencia: string;
                                componente: string;
                                valor: string;
                                memoria: string;
                                referencia: {
                                    tipo: string;
                                    id: string | null;
                                };
                                origem: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "faturas.enviar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            numero: string;
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            /** Format: uuid */
                            parceriaId: string;
                            /** Format: date */
                            periodoInicio: string;
                            /** Format: date */
                            periodoFim: string;
                            /** @enum {string} */
                            status: "aberta" | "fechada" | "enviada" | "paga" | "vencida" | "cancelada";
                            totalServicos: string;
                            totalAcertoDinheiro: string;
                            totalLiquido: string;
                            vencimento: string | null;
                            enviadaEm: string | null;
                            pagaEm: string | null;
                            notaFiscal: {
                                numero: string;
                                /** Format: date */
                                emitidaEm: string;
                                codigoVerificacao: string | null;
                                link: string | null;
                                pdfArquivoId: string | null;
                                xmlArquivoId: string | null;
                                /** Format: date-time */
                                registradaEm: string;
                            } | null;
                            acoesPermitidas: ("fechar" | "enviar" | "pagar" | "cancelar")[];
                            lancamentos: {
                                /** Format: uuid */
                                id: string;
                                /** Format: date */
                                competencia: string;
                                componente: string;
                                valor: string;
                                memoria: string;
                                referencia: {
                                    tipo: string;
                                    id: string | null;
                                };
                                origem: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "faturas.pagar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            numero: string;
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            /** Format: uuid */
                            parceriaId: string;
                            /** Format: date */
                            periodoInicio: string;
                            /** Format: date */
                            periodoFim: string;
                            /** @enum {string} */
                            status: "aberta" | "fechada" | "enviada" | "paga" | "vencida" | "cancelada";
                            totalServicos: string;
                            totalAcertoDinheiro: string;
                            totalLiquido: string;
                            vencimento: string | null;
                            enviadaEm: string | null;
                            pagaEm: string | null;
                            notaFiscal: {
                                numero: string;
                                /** Format: date */
                                emitidaEm: string;
                                codigoVerificacao: string | null;
                                link: string | null;
                                pdfArquivoId: string | null;
                                xmlArquivoId: string | null;
                                /** Format: date-time */
                                registradaEm: string;
                            } | null;
                            acoesPermitidas: ("fechar" | "enviar" | "pagar" | "cancelar")[];
                            lancamentos: {
                                /** Format: uuid */
                                id: string;
                                /** Format: date */
                                competencia: string;
                                componente: string;
                                valor: string;
                                memoria: string;
                                referencia: {
                                    tipo: string;
                                    id: string | null;
                                };
                                origem: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "faturas.cancelar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            numero: string;
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            /** Format: uuid */
                            parceriaId: string;
                            /** Format: date */
                            periodoInicio: string;
                            /** Format: date */
                            periodoFim: string;
                            /** @enum {string} */
                            status: "aberta" | "fechada" | "enviada" | "paga" | "vencida" | "cancelada";
                            totalServicos: string;
                            totalAcertoDinheiro: string;
                            totalLiquido: string;
                            vencimento: string | null;
                            enviadaEm: string | null;
                            pagaEm: string | null;
                            notaFiscal: {
                                numero: string;
                                /** Format: date */
                                emitidaEm: string;
                                codigoVerificacao: string | null;
                                link: string | null;
                                pdfArquivoId: string | null;
                                xmlArquivoId: string | null;
                                /** Format: date-time */
                                registradaEm: string;
                            } | null;
                            acoesPermitidas: ("fechar" | "enviar" | "pagar" | "cancelar")[];
                            lancamentos: {
                                /** Format: uuid */
                                id: string;
                                /** Format: date */
                                competencia: string;
                                componente: string;
                                valor: string;
                                memoria: string;
                                referencia: {
                                    tipo: string;
                                    id: string | null;
                                };
                                origem: string;
                            }[];
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "faturas.notaFiscal.registrar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    numero: string;
                    /** Format: date */
                    emitidaEm: string;
                    codigoVerificacao?: string;
                    /** Format: uri */
                    link?: string;
                    /** Format: uuid */
                    pdfArquivoId?: string;
                    /** Format: uuid */
                    xmlArquivoId?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            numero: string;
                            /** Format: date */
                            emitidaEm: string;
                            codigoVerificacao: string | null;
                            link: string | null;
                            pdfArquivoId: string | null;
                            xmlArquivoId: string | null;
                            /** Format: date-time */
                            registradaEm: string;
                        } | null;
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "faturas.notaFiscal.remover": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            numero: string;
                            /** Format: date */
                            emitidaEm: string;
                            codigoVerificacao: string | null;
                            link: string | null;
                            pdfArquivoId: string | null;
                            xmlArquivoId: string | null;
                            /** Format: date-time */
                            registradaEm: string;
                        } | null;
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.faturas.notaFiscal.registrar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    numero: string;
                    /** Format: date */
                    emitidaEm: string;
                    codigoVerificacao?: string;
                    /** Format: uri */
                    link?: string;
                    /** Format: uuid */
                    pdfArquivoId?: string;
                    /** Format: uuid */
                    xmlArquivoId?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            numero: string;
                            /** Format: date */
                            emitidaEm: string;
                            codigoVerificacao: string | null;
                            link: string | null;
                            pdfArquivoId: string | null;
                            xmlArquivoId: string | null;
                            /** Format: date-time */
                            registradaEm: string;
                        } | null;
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.faturas.notaFiscal.remover": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            numero: string;
                            /** Format: date */
                            emitidaEm: string;
                            codigoVerificacao: string | null;
                            link: string | null;
                            pdfArquivoId: string | null;
                            xmlArquivoId: string | null;
                            /** Format: date-time */
                            registradaEm: string;
                        } | null;
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.faturas.notaFiscal.urlEnvio": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    mime: "application/pdf" | "application/xml" | "text/xml";
                    tamanhoBytes: number;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            arquivo: {
                                /** Format: uuid */
                                id: string;
                                /** @enum {string} */
                                categoria: "documento_motoboy" | "comprovante_entrega" | "comprovante_recebimento" | "ocorrencia" | "comprovante_pagamento" | "nota_fiscal" | "outro";
                                /** @enum {string} */
                                mime: "image/jpeg" | "image/png" | "image/webp" | "image/heic" | "application/pdf" | "application/xml" | "text/xml";
                                tamanhoBytes: number;
                                confirmado: boolean;
                                /** Format: date-time */
                                criadoEm: string;
                            };
                            envio: {
                                /** Format: uri */
                                url: string;
                                /** Format: date-time */
                                expiraEm: string;
                                /** @constant */
                                metodo: "PUT";
                                /** @description Mande exatamente estes cabeçalhos, com o arquivo no corpo */
                                cabecalhos: {
                                    [key: string]: string;
                                };
                            };
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.faturas.notaFiscal.confirmar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
                arquivoId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            categoria: "documento_motoboy" | "comprovante_entrega" | "comprovante_recebimento" | "ocorrencia" | "comprovante_pagamento" | "nota_fiscal" | "outro";
                            /** @enum {string} */
                            mime: "image/jpeg" | "image/png" | "image/webp" | "image/heic" | "application/pdf" | "application/xml" | "text/xml";
                            tamanhoBytes: number;
                            confirmado: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.faturas.notaFiscal.urlLeitura": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
                arquivoId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uri */
                            url: string;
                            /** Format: date-time */
                            expiraEm: string;
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "dashboard.empresa": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: date */
                            dia: string;
                            entregas: {
                                lancadasHoje: number;
                                entreguesHoje: number;
                                canceladasHoje: number;
                                devolvidasOuExtraviadasHoje: number;
                                emAndamento: number;
                                semMotoboy: number;
                                comPedidoEmMaos: number;
                                pedemAtencao: number;
                                agendadas: number;
                            };
                            motoboys: {
                                online: number;
                                disponiveis: number;
                                ocupados: number;
                                emPausa: number;
                            };
                            valores: {
                                cobranca: string;
                                remuneracao: string;
                                margem: string;
                            };
                            caixa: {
                                acertosPendentes: {
                                    quantidade: number;
                                    total: string;
                                };
                            };
                            financeiro: {
                                fechamentosAPagar: {
                                    quantidade: number;
                                    total: string;
                                };
                                faturasAReceber: {
                                    quantidade: number;
                                    total: string;
                                };
                                faturasVencidas: {
                                    quantidade: number;
                                    total: string;
                                };
                            };
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.suporte.entregas": {
        parameters: {
            query: {
                motivo: string;
                status?: "agendada" | "pendente_empresa" | "aguardando_rota" | "em_rota_planejada" | "atribuida" | "no_local_coleta" | "coletada" | "a_caminho" | "no_local_entrega" | "cliente_ausente" | "aguardando_decisao" | "retornando" | "entregue" | "devolvida" | "cancelada" | "extraviada";
                limite?: number;
            };
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            codigo: string;
                            status: string;
                            empresa: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            restaurante: {
                                /** Format: uuid */
                                id: string;
                                nome: string;
                            };
                            rota: string | null;
                            motoboy: string | null;
                            /** Format: date-time */
                            criadaEm: string;
                            finalizadaEm: string | null;
                        }[];
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "plataforma.suporte.motoboys": {
        parameters: {
            query: {
                motivo: string;
                status?: "agendada" | "pendente_empresa" | "aguardando_rota" | "em_rota_planejada" | "atribuida" | "no_local_coleta" | "coletada" | "a_caminho" | "no_local_entrega" | "cliente_ausente" | "aguardando_decisao" | "retornando" | "entregue" | "devolvida" | "cancelada" | "extraviada";
                limite?: number;
            };
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            nome: string;
                            email: string;
                            status: string;
                            disponibilidade: string;
                            motivoBloqueio: string | null;
                            /** Format: date-time */
                            criadoEm: string;
                        }[];
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "arquivos.urlEnvio": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    categoria: "documento_motoboy" | "comprovante_entrega" | "comprovante_recebimento" | "ocorrencia" | "comprovante_pagamento" | "nota_fiscal" | "outro";
                    /** @enum {string} */
                    mime: "image/jpeg" | "image/png" | "image/webp" | "image/heic" | "application/pdf" | "application/xml" | "text/xml";
                    tamanhoBytes: number;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            arquivo: {
                                /** Format: uuid */
                                id: string;
                                /** @enum {string} */
                                categoria: "documento_motoboy" | "comprovante_entrega" | "comprovante_recebimento" | "ocorrencia" | "comprovante_pagamento" | "nota_fiscal" | "outro";
                                /** @enum {string} */
                                mime: "image/jpeg" | "image/png" | "image/webp" | "image/heic" | "application/pdf" | "application/xml" | "text/xml";
                                tamanhoBytes: number;
                                confirmado: boolean;
                                /** Format: date-time */
                                criadoEm: string;
                            };
                            envio: {
                                /** Format: uri */
                                url: string;
                                /** Format: date-time */
                                expiraEm: string;
                                /** @constant */
                                metodo: "PUT";
                                /** @description Mande exatamente estes cabeçalhos, com o arquivo no corpo */
                                cabecalhos: {
                                    [key: string]: string;
                                };
                            };
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "arquivos.confirmar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            categoria: "documento_motoboy" | "comprovante_entrega" | "comprovante_recebimento" | "ocorrencia" | "comprovante_pagamento" | "nota_fiscal" | "outro";
                            /** @enum {string} */
                            mime: "image/jpeg" | "image/png" | "image/webp" | "image/heic" | "application/pdf" | "application/xml" | "text/xml";
                            tamanhoBytes: number;
                            confirmado: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "arquivos.urlLeitura": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uri */
                            url: string;
                            /** Format: date-time */
                            expiraEm: string;
                        };
                    };
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "arquivos.app.urlEnvio": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    categoria: "documento_motoboy" | "comprovante_entrega" | "comprovante_recebimento" | "ocorrencia" | "comprovante_pagamento" | "nota_fiscal" | "outro";
                    /** @enum {string} */
                    mime: "image/jpeg" | "image/png" | "image/webp" | "image/heic" | "application/pdf" | "application/xml" | "text/xml";
                    tamanhoBytes: number;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            arquivo: {
                                /** Format: uuid */
                                id: string;
                                /** @enum {string} */
                                categoria: "documento_motoboy" | "comprovante_entrega" | "comprovante_recebimento" | "ocorrencia" | "comprovante_pagamento" | "nota_fiscal" | "outro";
                                /** @enum {string} */
                                mime: "image/jpeg" | "image/png" | "image/webp" | "image/heic" | "application/pdf" | "application/xml" | "text/xml";
                                tamanhoBytes: number;
                                confirmado: boolean;
                                /** Format: date-time */
                                criadoEm: string;
                            };
                            envio: {
                                /** Format: uri */
                                url: string;
                                /** Format: date-time */
                                expiraEm: string;
                                /** @constant */
                                metodo: "PUT";
                                /** @description Mande exatamente estes cabeçalhos, com o arquivo no corpo */
                                cabecalhos: {
                                    [key: string]: string;
                                };
                            };
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "arquivos.app.confirmar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** @enum {string} */
                            categoria: "documento_motoboy" | "comprovante_entrega" | "comprovante_recebimento" | "ocorrencia" | "comprovante_pagamento" | "nota_fiscal" | "outro";
                            /** @enum {string} */
                            mime: "image/jpeg" | "image/png" | "image/webp" | "image/heic" | "application/pdf" | "application/xml" | "text/xml";
                            tamanhoBytes: number;
                            confirmado: boolean;
                            /** Format: date-time */
                            criadoEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "arquivos.app.urlLeitura": {
        parameters: {
            query?: never;
            header?: {
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uri */
                            url: string;
                            /** Format: date-time */
                            expiraEm: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro */
            503: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "turnos.abrir": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date-time */
                    eventoEm?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            status: "aberto" | "encerrado";
                            /** Format: date-time */
                            abertoEm: string;
                            encerradoEm: string | null;
                            caixaStatus: string;
                            /** Format: date */
                            competencia: string;
                            disponibilidade: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "turnos.fechar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** Format: date-time */
                    eventoEm?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            status: "aberto" | "encerrado";
                            /** Format: date-time */
                            abertoEm: string;
                            encerradoEm: string | null;
                            caixaStatus: string;
                            /** Format: date */
                            competencia: string;
                            disponibilidade: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "motoboys.alterarDisponibilidade": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    disponibilidade: "disponivel" | "pausa";
                    /** Format: date-time */
                    eventoEm?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            status: "aberto" | "encerrado";
                            /** Format: date-time */
                            abertoEm: string;
                            encerradoEm: string | null;
                            caixaStatus: string;
                            /** Format: date */
                            competencia: string;
                            disponibilidade: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "turnos.encerrarForcado": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            status: "aberto" | "encerrado";
                            /** Format: date-time */
                            abertoEm: string;
                            encerradoEm: string | null;
                            caixaStatus: string;
                            /** Format: date */
                            competencia: string;
                            disponibilidade: string;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "ofertas.ofertarRota": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    modo: "manual" | "broadcast";
                    motoboyIds?: string[];
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            rotaId: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            status: "enviada" | "visualizada" | "aceita" | "recusada" | "expirada" | "retirada";
                            modo: string;
                            rodada: number;
                            /** Format: date-time */
                            enviadaEm: string;
                            /** Format: date-time */
                            expiraEm: string;
                            paradas: {
                                codigo: string;
                                bairro: string | null;
                            }[];
                            coleta: string | null;
                            /** @description Km somado das paradas (o que o cálculo paga por km), com uma casa; null se faltar distância */
                            kmEstimado: number | null;
                            acoesPermitidas: ("visualizar" | "aceitar" | "recusar" | "expirar" | "retirar")[];
                        }[];
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "ofertas.retirar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** @constant */
                            retirada: true;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "ofertas.abertasDoMotoboy": {
        parameters: {
            query?: never;
            header?: {
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            rotaId: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            status: "enviada" | "visualizada" | "aceita" | "recusada" | "expirada" | "retirada";
                            modo: string;
                            rodada: number;
                            /** Format: date-time */
                            enviadaEm: string;
                            /** Format: date-time */
                            expiraEm: string;
                            paradas: {
                                codigo: string;
                                bairro: string | null;
                            }[];
                            coleta: string | null;
                            /** @description Km somado das paradas (o que o cálculo paga por km), com uma casa; null se faltar distância */
                            kmEstimado: number | null;
                            acoesPermitidas: ("visualizar" | "aceitar" | "recusar" | "expirar" | "retirar")[];
                        }[];
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "ofertas.visualizar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            rotaId: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            status: "enviada" | "visualizada" | "aceita" | "recusada" | "expirada" | "retirada";
                            modo: string;
                            rodada: number;
                            /** Format: date-time */
                            enviadaEm: string;
                            /** Format: date-time */
                            expiraEm: string;
                            paradas: {
                                codigo: string;
                                bairro: string | null;
                            }[];
                            coleta: string | null;
                            /** @description Km somado das paradas (o que o cálculo paga por km), com uma casa; null se faltar distância */
                            kmEstimado: number | null;
                            acoesPermitidas: ("visualizar" | "aceitar" | "recusar" | "expirar" | "retirar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "ofertas.aceitar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            rotaId: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            status: "enviada" | "visualizada" | "aceita" | "recusada" | "expirada" | "retirada";
                            modo: string;
                            rodada: number;
                            /** Format: date-time */
                            enviadaEm: string;
                            /** Format: date-time */
                            expiraEm: string;
                            paradas: {
                                codigo: string;
                                bairro: string | null;
                            }[];
                            coleta: string | null;
                            /** @description Km somado das paradas (o que o cálculo paga por km), com uma casa; null se faltar distância */
                            kmEstimado: number | null;
                            acoesPermitidas: ("visualizar" | "aceitar" | "recusar" | "expirar" | "retirar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "ofertas.recusar": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    motivo?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: uuid */
                            id: string;
                            /** Format: uuid */
                            rotaId: string;
                            /** Format: uuid */
                            motoboyId: string;
                            /** @enum {string} */
                            status: "enviada" | "visualizada" | "aceita" | "recusada" | "expirada" | "retirada";
                            modo: string;
                            rodada: number;
                            /** Format: date-time */
                            enviadaEm: string;
                            /** Format: date-time */
                            expiraEm: string;
                            paradas: {
                                codigo: string;
                                bairro: string | null;
                            }[];
                            coleta: string | null;
                            /** @description Km somado das paradas (o que o cálculo paga por km), com uma casa; null se faltar distância */
                            kmEstimado: number | null;
                            acoesPermitidas: ("visualizar" | "aceitar" | "recusar" | "expirar" | "retirar")[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Não encontrado, ou de outra organização */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Estado alterado por outra requisição */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Regra de negócio recusou (regra_violada e códigos específicos) */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "appMotoboy.inicio": {
        parameters: {
            query?: never;
            header?: {
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            turno: {
                                /** Format: uuid */
                                id: string;
                                /** Format: uuid */
                                motoboyId: string;
                                /** @enum {string} */
                                status: "aberto" | "encerrado";
                                /** Format: date-time */
                                abertoEm: string;
                                encerradoEm: string | null;
                                caixaStatus: string;
                                /** Format: date */
                                competencia: string;
                                disponibilidade: string;
                            } | null;
                            ofertas: {
                                /** Format: uuid */
                                id: string;
                                /** Format: uuid */
                                rotaId: string;
                                /** Format: uuid */
                                motoboyId: string;
                                /** @enum {string} */
                                status: "enviada" | "visualizada" | "aceita" | "recusada" | "expirada" | "retirada";
                                modo: string;
                                rodada: number;
                                /** Format: date-time */
                                enviadaEm: string;
                                /** Format: date-time */
                                expiraEm: string;
                                paradas: {
                                    codigo: string;
                                    bairro: string | null;
                                }[];
                                coleta: string | null;
                                /** @description Km somado das paradas (o que o cálculo paga por km), com uma casa; null se faltar distância */
                                kmEstimado: number | null;
                                acoesPermitidas: ("visualizar" | "aceitar" | "recusar" | "expirar" | "retirar")[];
                            }[];
                            rotaAtiva: {
                                /** Format: uuid */
                                id: string;
                                codigo: string;
                                /** @enum {string} */
                                status: "montando" | "pronta" | "ofertada" | "aceita" | "em_coleta" | "em_entrega" | "finalizada" | "cancelada";
                                motoboyId: string | null;
                                modoOferta: string;
                                motivoCancelamento: string | null;
                                exigeCodigoColeta: boolean;
                                /** Format: date-time */
                                criadoEm: string;
                                acoesPermitidas: ("marcar_pronta" | "voltar_a_montar" | "ofertar" | "devolver_oferta" | "aceitar" | "chegar_coleta" | "sair_para_entrega" | "finalizar" | "cancelar")[];
                                paradas: {
                                    /** Format: uuid */
                                    entregaId: string;
                                    codigo: string;
                                    status: string;
                                    ordem: number | null;
                                    cliente: string;
                                    destino: string;
                                    coordenadaColeta: {
                                        lat: number;
                                        lng: number;
                                    } | null;
                                    coordenadaDestino: {
                                        lat: number;
                                        lng: number;
                                    } | null;
                                    /** @description Do cliente, até a parada terminar; depois, null */
                                    telefone: string | null;
                                    coleta: {
                                        endereco: string;
                                        instrucoes: string | null;
                                    };
                                    complemento: string | null;
                                    referencia: string | null;
                                    observacoes: string | null;
                                    pagamento: {
                                        forma: string;
                                        /** @description Decimal em texto, com ponto: "30.00" */
                                        valorACobrar: string;
                                        trocoPara: string | null;
                                        /** @description trocoPara - valorACobrar, calculado pela API */
                                        trocoNecessario: string | null;
                                        maquininhaDe: string | null;
                                        /** @description `a_receber` esconde o "entregar" até o recebimento */
                                        recebimentoStatus: string;
                                    };
                                    comprovante: {
                                        /** @description Política da parceria: nenhum, foto, assinatura ou codigo */
                                        exigido: string;
                                        /** @description O tipo a enviar em POST /app/entregas/{id}/comprovantes; null sem exigência */
                                        tipo: ("foto_entrega" | "assinatura" | "foto_fachada" | "foto_terceiro" | "codigo_cliente") | null;
                                        /** @description Ainda falta o comprovante exigido: o "entregar" fica de fora */
                                        pendente: boolean;
                                    };
                                    /** @description Cronômetro do cliente ausente; null fora da espera */
                                    ausencia: {
                                        /** Format: date-time */
                                        desde: string;
                                        /** Format: date-time */
                                        expiraEm: string;
                                    } | null;
                                    /** @description Botões da parada; cada um é a rota POST /app/entregas/{id}/<ação> */
                                    acoesPermitidas: ("iniciar" | "cheguei" | "contato" | "recebimentos" | "corrigir_recebimento" | "comprovantes" | "ausente" | "recusada_pelo_cliente" | "entregar" | "devolver")[];
                                }[];
                            } | null;
                            caixa: null;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "appMotoboy.historico": {
        parameters: {
            query?: {
                de?: string;
                ate?: string;
            };
            header?: {
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** Format: date */
                            de: string;
                            /** Format: date */
                            ate: string;
                            resumo: {
                                entregas: number;
                                entregues: number;
                                devolvidas: number;
                                canceladas: number;
                                ganho: string;
                            };
                            entregas: {
                                /** Format: uuid */
                                id: string;
                                codigo: string;
                                /** @enum {string} */
                                status: "entregue" | "devolvida" | "cancelada" | "extraviada";
                                /** Format: date-time */
                                finalizadaEm: string;
                                cliente: string;
                                bairro: string | null;
                                restaurante: string;
                                rotaCodigo: string | null;
                                pagamento: {
                                    forma: string;
                                    valorACobrar: string;
                                    recebimentoStatus: string;
                                };
                                ganho: string | null;
                            }[];
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "notificacoes.registrarDispositivo": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    expoToken: string;
                    /** @enum {string} */
                    plataforma: "android" | "ios";
                    appVersao?: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** @constant */
                            registrado: true;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
    "notificacoes.desativarDispositivo": {
        parameters: {
            query?: never;
            header: {
                /** @description Chave única por ação (8 a 100 caracteres). Repetir com o mesmo corpo devolve a mesma resposta. */
                "Idempotency-Key": string;
                /** @description Versão do app (x.y.z). Abaixo da mínima, 426 app_desatualizado com detalhes.versaoMinima. */
                "X-App-Version"?: string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    expoToken: string;
                };
            };
        };
        responses: {
            /** @description Sucesso */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        dados: {
                            /** @constant */
                            desativado: true;
                        };
                    };
                };
            };
            /** @description Dados inválidos (validacao, json_invalido) */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem sessão, credenciais erradas ou token vencido (token_expirado) */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Sem permissão (sem_permissao, csrf_invalido, sem_organizacao_ativa) */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description X-App-Version abaixo da mínima */
            426: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
            /** @description Erro interno; o detalhe fica no log com o requestId */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Erro"];
                };
            };
        };
    };
}
