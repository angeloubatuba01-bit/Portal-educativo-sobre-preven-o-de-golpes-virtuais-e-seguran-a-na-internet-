/**
 * PORTAL DIGITAL EDUCATIVO - PREVENÇÃO DE GOLPES VIRTUAIS E SEGURANÇA NA INTERNET
 * Lógica Interativa: Simulador em Mockup de iPhone com Telas Reais dos Aplicativos,
 * Modo Detetive, Nível de Blindagem, Checklist e Busca em Tempo Real.
 */

// ==========================================================================
// 1. BANCO DE DADOS DE 10 CENÁRIOS COM DESIGN DE APLICATIVOS REAIS
// ==========================================================================
const allScenarios = [
  {
    id: 1,
    appType: "sms",
    category: "sms",
    senderName: "SMS de Remetente Desconhecido",
    senderPhone: "+55 11 98877-0012",
    avatar: "💬",
    time: "Hoje, 11:42",
    clockTime: "11:42",
    riskLevel: "Risco Alto",
    tactic: "Gatilho de Urgência & Falsa Vantagem",
    message: "URGENTE: Prezado cliente, seus 48.700 pontos do cartão de crédito EXPIRAM HOJE às 23h59! Resgate agora em milhas ou dinheiro no link: bit.ly/resgate-milhas-hoje",
    annotatedMessage: "<mark class='clue-danger' title='Palavra alarmista'>URGENTE:</mark> Prezado cliente, seus 48.700 pontos do cartão de crédito <mark class='clue-danger' title='Pressão temporal forçada'>EXPIRAM HOJE às 23h59!</mark> Resgate agora em milhas ou dinheiro no link: <mark class='clue-danger' title='Link encurtado suspeito'>bit.ly/resgate-milhas-hoje</mark>",
    hint: "Bancos e administradoras de cartão nunca enviam links encurtados por SMS. Observe a tentativa de criar desespero para fazer você clicar sem pensar.",
    isScam: true,
    explanation: "⚠️ <strong>É GOLPE (Phishing por SMS / Smishing)!</strong><br>Bancos e financeiras nunca utilizam links encurtados (como bit.ly). O fraudador cria um falso senso de urgência ('expiram hoje') para fazer você clicar e digitar seus dados em um site clonado."
  },
  {
    id: 2,
    appType: "whatsapp",
    category: "whatsapp",
    senderName: "Filho ❤️",
    senderStatus: "online",
    senderPhone: "+55 11 97722-4411",
    avatar: "👦",
    time: "Hoje, 14:15",
    clockTime: "14:15",
    riskLevel: "Risco Crítico",
    tactic: "Apelo Emocional & Clonagem de Imagem",
    message: "Oi mãe, meu celular molhou e travou a tela, tô usando esse número temporário. Preciso pagar um boleto do curso urgente até as 17h e meu app do banco não autoriza aqui. Você pode transferir R$ 680,00 via Pix pra mim? Te devolvo amanhã cedo!",
    annotatedMessage: "Oi mãe, <mark class='clue-warning' title='Desculpa clássica para novo número'>meu celular molhou e travou a tela</mark>, tô usando esse número temporário. <mark class='clue-danger' title='Cobrança de transferência urgente'>Preciso pagar um boleto do curso urgente até as 17h</mark> e meu app do banco não autoriza aqui. Você pode transferir R$ 680,00 via Pix pra mim? Te devolvo amanhã cedo!",
    hint: "Sempre desconfie de parentes que mandam mensagem de números desconhecidos pedindo dinheiro. Tente ligar para o número antigo por voz antes de fazer qualquer ação.",
    isScam: true,
    explanation: "⚠️ <strong>É GOLPE (Golpe do Falso Parente no WhatsApp)!</strong><br>Os golpistas baixam fotos de perfis públicos nas redes sociais e entram em contato dizendo que trocaram de número. <strong>Regra de Ouro:</strong> Nunca envie dinheiro sem fazer uma chamada de voz ou de vídeo direta com o familiar!"
  },
  {
    id: 3,
    appType: "banco",
    category: "banco",
    senderName: "App Banco Oficial",
    senderStatus: "Notificação Interna Verificada",
    avatar: "🏦",
    time: "Hoje, 09:30",
    clockTime: "09:30",
    riskLevel: "Seguro",
    tactic: "Comunicação Autêntica & Criptografada",
    message: "Seu informe de rendimentos para a Declaração de Imposto de Renda já está disponível no menu 'Minha Conta > Documentos'. Acesse quando quiser.",
    annotatedMessage: "<mark class='clue-success' title='Notificação interna sem link'>Seu informe de rendimentos para a Declaração de Imposto de Renda</mark> já está disponível no menu oficial 'Minha Conta > Documentos'. <mark class='clue-success' title='Sem pressão por urgência'>Acesse quando quiser.</mark>",
    hint: "A notificação ocorre diretamente no ambiente seguro do aplicativo oficial do banco, sem links externos nem solicitações de senhas.",
    isScam: false,
    explanation: "✅ <strong>É SEGURO / COMUNICAÇÃO LEGÍTIMA!</strong><br>A notificação ocorreu diretamente dentro do aplicativo oficial do banco. Ela não pede senhas, não ameaça cancelamentos e não exige transferências nem cliques em links estranhos."
  },
  {
    id: 4,
    appType: "email",
    category: "email",
    senderName: "Correios - Taxa Alfândega",
    senderEmail: "suporte@correios-taxa-alfandega.site",
    subject: "Aviso de Retenção: Encomenda Internacional",
    avatar: "📦",
    time: "Hoje, 10:05",
    clockTime: "10:05",
    riskLevel: "Risco Alto",
    tactic: "Falsa Autoridade & Domínio Fraudulento",
    message: "Aviso de Retenção: Sua encomenda internacional está retida na alfândega em Curitiba. Efetue o pagamento da taxa de R$ 48,90 em até 2 horas via Pix Copia e Cola para liberação imediata, caso contrário o pacote será destruído.",
    annotatedMessage: "De: <mark class='clue-danger' title='Domínio falso (.site em vez de .com.br)'>suporte@correios-taxa-alfandega.site</mark><br>Sua encomenda internacional está retida. Pague a taxa de R$ 48,90 <mark class='clue-danger' title='Prazo irreal para gerar pânico'>em até 2 horas via Pix Copia e Cola</mark> para liberação imediata, caso contrário o pacote será destruído.",
    hint: "Observe o final do endereço de e-mail do remetente. O site e e-mails oficiais dos Correios terminam sempre em .com.br e nunca em .site.",
    isScam: true,
    explanation: "⚠️ <strong>É GOLPE (Falso Rastreio dos Correios)!</strong><br>O domínio do e-mail é falso (<code>.site</code>). Todas as taxas alfandegárias de importação devem ser consultadas e pagas com login Gov.br diretamente no portal oficial <em>Minhas Importações</em> dos Correios."
  },
  {
    id: 5,
    appType: "whatsapp",
    category: "whatsapp",
    senderName: "Recrutamento Vagas VIP",
    senderStatus: "online",
    senderPhone: "+55 21 99876-5544",
    avatar: "💼",
    time: "Hoje, 13:20",
    clockTime: "13:20",
    riskLevel: "Risco Alto",
    tactic: "Promessa de Lucro Fácil & Depósito Caução",
    message: "Olá! Vaga de meio período home-office para avaliar produtos e curtir vídeos no YouTube. Ganhe de R$ 250 a R$ 600 por dia dedicando apenas 30 minutos. Para liberar seu cadastro no sistema e receber as primeiras tarefas, faça uma recarga caução de R$ 30.",
    annotatedMessage: "Vaga de meio período home-office: <mark class='clue-danger' title='Salário desproporcional para tarefa simples'>Ganhe de R$ 250 a R$ 600 por dia dedicando apenas 30 minutos</mark>. Para liberar seu cadastro, <mark class='clue-danger' title='Cobrança de taxa para trabalhar'>faça uma recarga caução de R$ 30</mark>.",
    hint: "Nenhuma empresa séria cobra dinheiro, depósito prévio ou Pix para que um candidato possa começar a trabalhar.",
    isScam: true,
    explanation: "⚠️ <strong>É GOLPE (Golpe das Tarefas / Falso Emprego)!</strong><br>Os golpistas pagam centavos no primeiro dia para ganhar sua confiança e depois induzem depósitos crescentes de centenas ou milhares de reais que nunca são devolvidos."
  },
  {
    id: 6,
    appType: "whatsapp",
    category: "whatsapp",
    senderName: "Comprador de Eletrônicos",
    senderStatus: "online",
    senderPhone: "+55 19 98123-7788",
    avatar: "🛍️",
    time: "Hoje, 16:50",
    clockTime: "16:50",
    riskLevel: "Risco Crítico",
    tactic: "Falso Pagamento com Pix Agendado",
    message: "Olá, acabei de fazer o Pix de R$ 1.200 pelo celular para comprar seu videogame! Veja o comprovante em anexo com status 'Pix Agendado para amanhã'. Pode entregar o produto agora pro motorista de aplicativo que mandei aí?",
    annotatedMessage: "Acabei de fazer o Pix! Veja o comprovante: <mark class='clue-danger' title='Pix agendado NÃO é dinheiro na conta'>'Pix Agendado para amanhã'</mark>. <mark class='clue-danger' title='Pressa para retirar o produto'>Pode entregar o produto agora pro motorista de aplicativo?</mark>",
    hint: "Pix agendado não é garantia de pagamento. O pagador pode cancelar o agendamento a qualquer momento pelo aplicativo antes do horário de liquidação.",
    isScam: true,
    explanation: "⚠️ <strong>É GOLPE (Golpe do Pix Agendado)!</strong><br>O golpista agenda a transferência para uma data futura, gera o comprovante para induzir a vítima a entregar a mercadoria e cancela o agendamento minutos depois no banco. Só entregue qualquer item após conferir o extrato no seu próprio banco!"
  },
  {
    id: 7,
    appType: "email",
    category: "email",
    senderName: "Netflix Faturamento",
    senderEmail: "faturamento@netflix-renovacao-suporte.online",
    subject: "Sua assinatura foi suspensa temporariamente",
    avatar: "🎬",
    time: "Ontem, 20:10",
    clockTime: "20:10",
    riskLevel: "Risco Alto",
    tactic: "Phishing de Assinatura & Clonagem de Cartão",
    message: "Prezado assinante: Não conseguimos processar a mensalidade do seu plano Netflix. Sua conta será suspensa em 24h caso você não revalide os dados do seu cartão no link seguro: netflix-renovacao.online/atualizar",
    annotatedMessage: "De: <mark class='clue-danger' title='Domínio falso'>faturamento@netflix-renovacao-suporte.online</mark><br>Sua conta será suspensa em 24h caso você não revalide seu cartão no link: <mark class='clue-danger' title='Link falso que captura senhas'>netflix-renovacao.online/atualizar</mark>",
    hint: "Serviços de streaming usam apenas seus domínios oficiais (como netflix.com). Links com termos adicionais como 'renovacao-suporte' são páginas falsas.",
    isScam: true,
    explanation: "⚠️ <strong>É GOLPE (Phishing de Streaming)!</strong><br>O link direciona para uma cópia visual idêntica da página da Netflix, onde tudo o que for digitado (login, senha e número do cartão de crédito com CVV) vai direto para a quadrilha de criminosos."
  },
  {
    id: 8,
    appType: "sms",
    category: "sms",
    senderName: "SMS Banco Notifica",
    senderPhone: "28400",
    avatar: "🏦",
    time: "Hoje, 08:15",
    clockTime: "08:15",
    riskLevel: "Risco Crítico",
    tactic: "Vishing & Falsa Central Telefônica",
    message: "BANCO INFORMA: Compra aprovada de R$ 4.290,00 no Magazine Luiza. Se você NÃO reconhece esta transação, ligue imediatamente para a Central de Cancelamento no 0800 591 0422.",
    annotatedMessage: "BANCO INFORMA: <mark class='clue-danger' title='Valor alto para provocar choque emocional'>Compra aprovada de R$ 4.290,00</mark>. Se você NÃO reconhece, ligue para a Central no <mark class='clue-danger' title='Falso 0800 contratado por criminosos'>0800 591 0422</mark>.",
    hint: "Criminosos contratam linhas 0800 falsas. Ao ligar, um falso atendente com som de telemarketing induzirá você a fazer um Pix para 'salvar sua conta'.",
    isScam: true,
    explanation: "⚠️ <strong>É GOLPE (Falsa Central Telefônica / Vishing)!</strong><br>Bancos nunca pedem para você ligar para números desconhecidos nem solicitam que você faça transferências Pix para 'proteger seu dinheiro'. Desligue e use sempre o número impresso no verso do seu cartão!"
  },
  {
    id: 9,
    appType: "whatsapp",
    category: "whatsapp",
    senderName: "Sorteios & Prêmios Brasil",
    senderStatus: "online",
    senderPhone: "+55 11 96655-1122",
    avatar: "🎁",
    time: "Hoje, 15:40",
    clockTime: "15:40",
    riskLevel: "Risco Crítico",
    tactic: "Falso Sorteio & Roubo de Código SMS",
    message: "Parabéns! Você foi contemplado em nosso sorteio oficial de Natal para ganhar um iPhone 15 Pro. Enviamos um código de segurança de 6 dígitos para o seu celular. Repasse esse código para nós por aqui para confirmarmos o despacho do brinde!",
    annotatedMessage: "Você foi contemplado no sorteio! <mark class='clue-danger' title='Tentativa de roubo de 2FA / Autenticação'>Enviamos um código de 6 dígitos no seu SMS</mark>. <mark class='clue-danger' title='Código de invasão de conta'>Repasse esse código para nós</mark> para confirmarmos o envio!",
    hint: "O código de 6 dígitos recebido por SMS é o código de ativação do seu WhatsApp ou autenticação de dois fatores da sua própria conta.",
    isScam: true,
    explanation: "⚠️ <strong>É GOLPE (Invasão de Contas por Engenharia Social)!</strong><br>O golpista tenta fazer login no seu WhatsApp ou Instagram e solicita que a operadora envie o código SMS para você. Se você repassar esses 6 dígitos, ele assume o controle da sua conta e você é desconectado imediatamente!"
  },
  {
    id: 10,
    appType: "browser",
    category: "banco",
    senderName: "mercadolivre.com.br",
    senderStatus: "🔒 Conexão Segura SSL",
    avatar: "🛡️",
    time: "Hoje, 17:02",
    clockTime: "17:02",
    riskLevel: "Seguro",
    tactic: "Autenticação em Duas Etapas em Canal Criptografado",
    message: "Acesso de um novo dispositivo identificado. Para prosseguir com segurança no site oficial com certificado SSL, digite o código de 6 dígitos gerado no seu aplicativo Google Authenticator previamente cadastrado.",
    annotatedMessage: "No navegador em <mark class='clue-success' title='Domínio oficial com HTTPS legítimo'>https://www.mercadolivre.com.br</mark>: <mark class='clue-success' title='Uso de app autenticador local seguro'>Digite o código gerado no seu app Google Authenticator previamente cadastrado</mark>.",
    hint: "O site possui o domínio correto e o cadeado HTTPS autêntico, e utiliza um gerador de códigos local (Google Authenticator) cadastrado pelo próprio usuário.",
    isScam: false,
    explanation: "✅ <strong>É SEGURO / COMUNICAÇÃO LEGÍTIMA!</strong><br>Trata-se de uma autenticação em dois fatores autêntica no portal oficial com criptografia SSL, protegendo o acesso à conta contra invasores."
  }
];

// Estado do Simulador
let activeScenarios = [...allScenarios];
let currentScenarioIndex = 0;
let userScore = 0;
let currentStreak = 0;
let correctCount = 0;
let detectiveModeActive = false;
let userAnswersLog = []; // Armazena true/false para cada pergunta respondida

// ==========================================================================
// 2. FUNÇÕES DE RENDERIZAÇÃO VISUAL DO IPHONE E APLICATIVOS
// ==========================================================================

/**
 * Renderiza o cabeçalho autêntico do aplicativo ativo na tela do iPhone
 */
function renderAppHeader(sc) {
  const topBarEl = document.getElementById("phoneAppTopBar");
  if (!topBarEl) return;

  if (sc.appType === "whatsapp") {
    topBarEl.className = "iphone-app-header app-theme-whatsapp";
    topBarEl.innerHTML = `
      <div class="whatsapp-back-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        <span class="unread-pill">12</span>
      </div>
      <div class="whatsapp-avatar">${sc.avatar}</div>
      <div class="whatsapp-user-info">
        <div class="whatsapp-name">${sc.senderName}</div>
        <div class="whatsapp-sub">${sc.senderStatus || 'online'}</div>
      </div>
      <div class="whatsapp-header-icons">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </div>
    `;
  } else if (sc.appType === "sms") {
    topBarEl.className = "iphone-app-header app-theme-sms";
    topBarEl.innerHTML = `
      <div class="sms-back-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007aff" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        <span>Mensagens</span>
      </div>
      <div class="sms-contact-center">
        <div class="sms-avatar">${sc.avatar}</div>
        <div class="sms-name">${sc.senderPhone || sc.senderName}</div>
      </div>
      <div class="sms-info-btn">
        <span>ⓘ</span>
      </div>
    `;
  } else if (sc.appType === "email") {
    topBarEl.className = "iphone-app-header app-theme-email";
    topBarEl.innerHTML = `
      <div class="email-back-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        <span>Caixa de Entrada</span>
      </div>
      <div class="email-top-actions">
        <span title="Arquivar">📥</span>
        <span title="Lixeira">🗑️</span>
      </div>
    `;
  } else if (sc.appType === "banco") {
    topBarEl.className = "iphone-app-header app-theme-bank";
    topBarEl.innerHTML = `
      <div class="bank-brand">
        <span class="bank-icon">🏦</span>
        <div>
          <div class="bank-title">${sc.senderName}</div>
          <div class="bank-sub">🔒 Canal Oficial Criptografado</div>
        </div>
      </div>
    `;
  } else {
    // Safari / Navegador
    topBarEl.className = "iphone-app-header app-theme-browser";
    topBarEl.innerHTML = `
      <div class="safari-bar">
        <span class="safari-lock">🔒</span>
        <span class="safari-domain">https://${sc.senderName}</span>
        <span class="safari-reload">🔄</span>
      </div>
    `;
  }
}

/**
 * Renderiza o balão de mensagem animado chegando na tela do iPhone
 */
function renderAppMessage(sc) {
  const container = document.getElementById("incomingBubbleContainer");
  const phoneBody = document.getElementById("phoneAppBody");
  if (!container) return;

  // Atualizar classe de fundo do corpo do app
  if (phoneBody) {
    phoneBody.className = `iphone-app-body body-theme-${sc.appType}`;
  }

  let bubbleHtml = "";

  if (sc.appType === "whatsapp") {
    bubbleHtml = `
      <div class="whatsapp-bubble arriving-message" id="messageBubble">
        <div class="bubble-sender-name">${sc.senderName}</div>
        <div class="bubble-content" id="bubbleContent">${sc.message}</div>
        <div class="bubble-meta">
          <span class="bubble-time">${sc.clockTime || '14:15'}</span>
          <span class="bubble-ticks">✓✓</span>
        </div>
      </div>
    `;
  } else if (sc.appType === "sms") {
    bubbleHtml = `
      <div class="sms-bubble arriving-message" id="messageBubble">
        <div class="sms-badge-label">SMS de ${sc.senderPhone || sc.senderName}</div>
        <div class="bubble-content" id="bubbleContent">${sc.message}</div>
        <div class="sms-time">${sc.clockTime || '11:42'}</div>
      </div>
    `;
  } else if (sc.appType === "email") {
    bubbleHtml = `
      <div class="email-card arriving-message" id="messageBubble">
        <div class="email-subject">${sc.subject || 'Notificação Importante'}</div>
        <div class="email-sender-row">
          <div class="email-avatar">${sc.avatar}</div>
          <div class="email-sender-meta">
            <div class="email-sender-name">${sc.senderName}</div>
            <div class="email-sender-address">&lt;${sc.senderEmail}&gt;</div>
            <div class="email-to-me">Para: mim <span class="arrow-down">▾</span></div>
          </div>
          <div class="email-date-right">${sc.clockTime || '10:05'}</div>
        </div>
        <div class="email-body-text bubble-content" id="bubbleContent">${sc.message}</div>
      </div>
    `;
  } else if (sc.appType === "banco") {
    bubbleHtml = `
      <div class="bank-notification-card arriving-message" id="messageBubble">
        <div class="bank-card-header">
          <span class="bank-card-icon">🔔</span>
          <span class="bank-card-title">Notificação Oficial do Banco</span>
          <span class="bank-card-time">${sc.clockTime || '09:30'}</span>
        </div>
        <div class="bubble-content" id="bubbleContent">${sc.message}</div>
      </div>
    `;
  } else {
    // Navegador Web
    bubbleHtml = `
      <div class="browser-web-card arriving-message" id="messageBubble">
        <div class="browser-card-header">
          <span>🛡️ Autenticação em Duas Etapas</span>
        </div>
        <div class="bubble-content" id="bubbleContent">${sc.message}</div>
      </div>
    `;
  }

  container.innerHTML = bubbleHtml;

  // Reiniciar animação de chegada da mensagem (pop-in/slide-up)
  container.classList.remove("arrived");
  void container.offsetWidth; // Força reflow no navegador
  container.classList.add("arrived");
}

/**
 * Renderiza os indicadores circulares de progresso no topo
 */
function renderProgressIndicators() {
  const container = document.getElementById("simIndicators");
  if (!container) return;

  container.innerHTML = "";
  activeScenarios.forEach((sc, idx) => {
    const dot = document.createElement("span");
    dot.className = "sim-indicator-dot";
    dot.setAttribute("data-index", idx);

    if (idx === currentScenarioIndex) {
      dot.classList.add("current");
    }

    if (userAnswersLog[idx] === true) {
      dot.classList.add("correct");
      dot.textContent = "✓";
    } else if (userAnswersLog[idx] === false) {
      dot.classList.add("wrong");
      dot.textContent = "✗";
    } else {
      dot.textContent = (idx + 1);
    }

    container.appendChild(dot);
  });
}

/**
 * Carrega e exibe um cenário específico na tela do iPhone
 */
function loadScenario(index) {
  if (index >= activeScenarios.length) {
    showFinalQuizResult();
    return;
  }

  const sc = activeScenarios[index];
  const iphoneClockEl = document.getElementById("iphoneClock");
  const simFeedbackEl = document.getElementById("simFeedback");
  const currentQuestionNumEl = document.getElementById("currentQuestionNum");
  const totalQuestionsNumEl = document.getElementById("totalQuestionsNum");
  const simActionsArea = document.getElementById("simActionsArea");
  const iphoneNextAction = document.getElementById("iphoneNextAction");
  const scenarioHintBox = document.getElementById("scenarioHintBox");
  const btnCluesText = document.getElementById("btnCluesText");
  const iphoneDockTitle = document.getElementById("iphoneDockTitle");

  // Resetar modo detetive e dicas
  detectiveModeActive = false;
  if (btnCluesText) btnCluesText.textContent = "🔍 Modo Detetive";
  if (scenarioHintBox) {
    scenarioHintBox.style.display = "none";
    scenarioHintBox.innerHTML = "";
  }

  // Atualizar relógio do iPhone com o horário do cenário
  if (iphoneClockEl) {
    iphoneClockEl.textContent = sc.clockTime || "09:41";
  }

  // Atualizar contadores
  if (currentQuestionNumEl) currentQuestionNumEl.textContent = index + 1;
  if (totalQuestionsNumEl) totalQuestionsNumEl.textContent = activeScenarios.length;

  // Renderizar o cabeçalho e corpo autênticos do aplicativo
  renderAppHeader(sc);
  renderAppMessage(sc);

  // Restaurar visibilidade dos botões de decisão e ocultar botão de próximo
  if (simActionsArea) {
    simActionsArea.style.display = "flex";
    const btnGolpe = document.getElementById("btnGolpe");
    const btnSeguro = document.getElementById("btnSeguro");
    if (btnGolpe) btnGolpe.disabled = false;
    if (btnSeguro) btnSeguro.disabled = false;
  }
  if (iphoneNextAction) iphoneNextAction.style.display = "none";
  if (iphoneDockTitle) iphoneDockTitle.textContent = "Esta mensagem é segura ou é uma tentativa de golpe?";

  // Ocultar feedback anterior
  if (simFeedbackEl) {
    simFeedbackEl.style.display = "none";
    simFeedbackEl.className = "sim-feedback";
    simFeedbackEl.innerHTML = "";
  }

  renderProgressIndicators();
}

/**
 * Ativa ou desativa o Modo Detetive, destacando trechos suspeitos
 */
function toggleDetectiveMode() {
  const sc = activeScenarios[currentScenarioIndex];
  const bubbleContent = document.getElementById("bubbleContent");
  const btnCluesText = document.getElementById("btnCluesText");
  if (!sc || !bubbleContent) return;

  detectiveModeActive = !detectiveModeActive;

  if (detectiveModeActive) {
    bubbleContent.innerHTML = sc.annotatedMessage;
    if (btnCluesText) btnCluesText.textContent = "👁️ Ocultar Pistas";
  } else {
    bubbleContent.innerHTML = sc.message;
    if (btnCluesText) btnCluesText.textContent = "🔍 Modo Detetive";
  }
}

/**
 * Exibe ou recolhe a dica didática do especialista
 */
function toggleExpertHint() {
  const sc = activeScenarios[currentScenarioIndex];
  const hintBox = document.getElementById("scenarioHintBox");
  if (!sc || !hintBox) return;

  if (hintBox.style.display === "none" || hintBox.style.display === "") {
    hintBox.innerHTML = `<strong>💡 Dica do Especialista:</strong><br>${sc.hint}`;
    hintBox.style.display = "block";
  } else {
    hintBox.style.display = "none";
  }
}

/**
 * Processa a decisão do usuário (É Golpe vs É Confiável)
 */
function handleUserAnswer(userSaidGolpe) {
  const sc = activeScenarios[currentScenarioIndex];
  const btnGolpe = document.getElementById("btnGolpe");
  const btnSeguro = document.getElementById("btnSeguro");
  const simActionsArea = document.getElementById("simActionsArea");
  const iphoneNextAction = document.getElementById("iphoneNextAction");
  const simFeedbackEl = document.getElementById("simFeedback");
  const simScoreEl = document.getElementById("simScore");
  const simStreakEl = document.getElementById("simStreak");
  const iphoneDockTitle = document.getElementById("iphoneDockTitle");

  if (btnGolpe) btnGolpe.disabled = true;
  if (btnSeguro) btnSeguro.disabled = true;

  const isCorrect = (userSaidGolpe === sc.isScam);
  userAnswersLog[currentScenarioIndex] = isCorrect;

  if (isCorrect) {
    userScore += 10;
    correctCount++;
    currentStreak++;
    if (simFeedbackEl) {
      simFeedbackEl.className = "sim-feedback feedback-success";
      simFeedbackEl.innerHTML = `
        <div class="feedback-badge-row">
          <span class="f-badge f-success">🎯 PARABÉNS! VOCÊ ACERTOU!</span>
          <span class="f-badge f-risk ${sc.riskLevel === 'Seguro' ? 'safe' : 'scam'}">${sc.riskLevel}</span>
        </div>
        <div class="feedback-text">${sc.explanation}</div>
      `;
    }
  } else {
    currentStreak = 0;
    if (simFeedbackEl) {
      simFeedbackEl.className = "sim-feedback feedback-danger";
      simFeedbackEl.innerHTML = `
        <div class="feedback-badge-row">
          <span class="f-badge f-danger">❌ ATENÇÃO! VOCÊ SE ENGANOU</span>
          <span class="f-badge f-risk ${sc.riskLevel === 'Seguro' ? 'safe' : 'scam'}">${sc.riskLevel}</span>
        </div>
        <div class="feedback-text">${sc.explanation}</div>
      `;
    }
  }

  // Atualizar placar e sequência
  if (simScoreEl) simScoreEl.textContent = `${userScore} pts`;
  if (simStreakEl) simStreakEl.textContent = `🔥 Sequência: ${currentStreak}`;

  // Exibir o painel de feedback diretamente no iPhone
  if (simFeedbackEl) {
    simFeedbackEl.style.display = "block";
    simFeedbackEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Ocultar os botões de decisão e exibir o botão de Avançar
  if (simActionsArea) simActionsArea.style.display = "none";
  if (iphoneDockTitle) iphoneDockTitle.textContent = "Avaliação Concluída! Veja o resultado acima:";
  if (iphoneNextAction) iphoneNextAction.style.display = "block";

  renderProgressIndicators();
}

/**
 * Exibe a tela final com pontuação, taxa de acerto e nível de blindagem digital
 */
function showFinalQuizResult() {
  const mockupWrapper = document.querySelector(".iphone-mockup-wrapper");
  const simFinalResults = document.getElementById("simFinalResults");
  const statFinalScore = document.getElementById("statFinalScore");
  const statAccuracy = document.getElementById("statAccuracy");
  const statBlindagemBadge = document.getElementById("statBlindagemBadge");
  const statCorrectAnswers = document.getElementById("statCorrectAnswers");
  const resultsTrophy = document.getElementById("resultsTrophy");
  const resultsTitle = document.getElementById("resultsTitle");
  const resultsSubtitle = document.getElementById("resultsSubtitle");
  const resultsFeedbackText = document.getElementById("resultsFeedbackText");

  if (mockupWrapper) mockupWrapper.style.display = "none";
  if (simFinalResults) simFinalResults.style.display = "block";

  const total = activeScenarios.length;
  const accuracy = Math.round((correctCount / total) * 100);

  if (statFinalScore) statFinalScore.textContent = `${userScore} pts`;
  if (statAccuracy) statAccuracy.textContent = `${accuracy}%`;
  if (statCorrectAnswers) statCorrectAnswers.textContent = `${correctCount} / ${total}`;

  if (accuracy >= 80) {
    if (resultsTrophy) resultsTrophy.textContent = "🛡️";
    if (resultsTitle) resultsTitle.textContent = "Desafio Concluído: Nível Blindado!";
    if (resultsSubtitle) resultsSubtitle.textContent = "Excelente! Você demonstrou forte senso crítico para identificar fraudes e armadilhas digitais.";
    if (statBlindagemBadge) {
      statBlindagemBadge.textContent = "🛡️ Blindado";
      statBlindagemBadge.style.color = "#16a34a";
    }
    if (resultsFeedbackText) {
      resultsFeedbackText.innerHTML = "<strong>Diagnóstico de Segurança:</strong> Você identificou corretamente a imensa maioria dos golpes simulados. Seu perfil de navegação é <strong>altamente seguro e consciente</strong> contra técnicas de engenharia social, phishing e falsos comprovantes do Pix.";
    }
  } else if (accuracy >= 60) {
    if (resultsTrophy) resultsTrophy.textContent = "⚡";
    if (resultsTitle) resultsTitle.textContent = "Desafio Concluído: Nível Moderado";
    if (resultsSubtitle) resultsSubtitle.textContent = "Bom trabalho, mas atenção: ainda há vulnerabilidades que golpistas poderiam explorar.";
    if (statBlindagemBadge) {
      statBlindagemBadge.textContent = "⚡ Moderado";
      statBlindagemBadge.style.color = "#d97706";
    }
    if (resultsFeedbackText) {
      resultsFeedbackText.innerHTML = "<strong>Diagnóstico de Segurança:</strong> Você acertou a maior parte dos cenários, porém caiu em algumas armadilhas cotidianas. Lembre-se: bancos <strong>nunca</strong> solicitam transferências para 'proteger contas' e links encurtados com urgência quase sempre ocultam phishing.";
    }
  } else {
    if (resultsTrophy) resultsTrophy.textContent = "⚠️";
    if (resultsTitle) resultsTitle.textContent = "Desafio Concluído: Nível Vulnerável";
    if (resultsSubtitle) resultsSubtitle.textContent = "Atenção redobrada! Suas contas e dados estariam em alto risco com as decisões tomadas.";
    if (statBlindagemBadge) {
      statBlindagemBadge.textContent = "⚠️ Vulnerável";
      statBlindagemBadge.style.color = "#dc2626";
    }
    if (resultsFeedbackText) {
      resultsFeedbackText.innerHTML = "<strong>Diagnóstico de Segurança:</strong> Você caiu em armadilhas críticas de clonagem de contas, falsos boletos e falsa central telefônica. Recomendamos revisar os <strong>6 Guias Principais de Golpes</strong> na página inicial e praticar novamente até alcançar a blindagem completa.";
    }
  }
}

/**
 * Reinicia todos os desafios do simulador
 */
function restartSimulator() {
  currentScenarioIndex = 0;
  userScore = 0;
  currentStreak = 0;
  correctCount = 0;
  userAnswersLog = [];

  const simScoreEl = document.getElementById("simScore");
  const simStreakEl = document.getElementById("simStreak");
  const mockupWrapper = document.querySelector(".iphone-mockup-wrapper");
  const simFinalResults = document.getElementById("simFinalResults");
  const certDoc = document.getElementById("certificateDocument");

  if (simScoreEl) simScoreEl.textContent = "0 pts";
  if (simStreakEl) simStreakEl.textContent = "🔥 Sequência: 0";
  if (mockupWrapper) mockupWrapper.style.display = "block";
  if (simFinalResults) simFinalResults.style.display = "none";
  if (certDoc) certDoc.style.display = "none";

  loadScenario(currentScenarioIndex);
}

/**
 * Filtro de Categoria
 */
function filterScenariosByCategory(category) {
  if (category === "all") {
    activeScenarios = [...allScenarios];
  } else {
    activeScenarios = allScenarios.filter(sc => sc.category === category);
  }
  restartSimulator();
}

// ==========================================================================
// 3. CHECKLIST DE SEGURANÇA DIGITAL (AJUSTES DO IPHONE)
// ==========================================================================
function updateChecklistProgress() {
  const checkboxes = document.querySelectorAll(".checklist-item input[type='checkbox']");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const progressBadge = document.getElementById("progressBadge");

  if (checkboxes.length === 0 || !progressFill) return;

  const total = checkboxes.length;
  let checkedCount = 0;

  checkboxes.forEach(cb => {
    if (cb.checked) checkedCount++;
  });

  const percentage = Math.round((checkedCount / total) * 100);
  progressFill.style.width = `${percentage}%`;
  if (progressText) {
    progressText.textContent = `${checkedCount} de ${total} ajustes ativados (${percentage}%)`;
  }

  if (progressBadge) {
    if (percentage === 100) {
      progressBadge.textContent = "🛡️ Proteção Máxima Ativa!";
      progressBadge.style.background = "#dcfce7";
      progressBadge.style.color = "#15803d";
      progressFill.style.background = "linear-gradient(90deg, #10b981, #059669)";
    } else if (percentage >= 50) {
      progressBadge.textContent = "⚖️ Proteção Moderada";
      progressBadge.style.background = "#fef3c7";
      progressBadge.style.color = "#b45309";
      progressFill.style.background = "linear-gradient(90deg, #7c3aed, #f59e0b)";
    } else {
      progressBadge.textContent = "⚠️ Vulnerável a Golpes";
      progressBadge.style.background = "#fee2e2";
      progressBadge.style.color = "#b91c1c";
      progressFill.style.background = "linear-gradient(90deg, #ef4444, #f97316)";
    }
  }
}

// ==========================================================================
// 4. FILTRO / BUSCA DE GOLPES EM TEMPO REAL (PÁGINA PRINCIPAL)
// ==========================================================================
function filterCards() {
  const searchInput = document.getElementById("scamSearchInput");
  const scamCards = document.querySelectorAll(".cards-grid .card");
  if (!searchInput) return;

  const query = (searchInput.value || "").toLowerCase().trim();

  scamCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const wrapper = card.closest(".card-wrapper");
    if (text.includes(query)) {
      if (wrapper) wrapper.style.display = "";
      card.style.display = "flex";
    } else {
      if (wrapper) wrapper.style.display = "none";
      card.style.display = "none";
    }
  });
}

// ==========================================================================
// 5. EXPANSÃO DOS BALÕES: HOVER (SENSOR) NO PC E CLIQUE/TOQUE EM QUALQUER DISPOSITIVO
// ==========================================================================
function initCardExpansion() {
  const interactiveCards = document.querySelectorAll(".interactive-card");
  if (interactiveCards.length === 0) return;

  interactiveCards.forEach(card => {
    card.addEventListener("click", (e) => {
      // Ignorar caso o clique tenha sido em links, botões ou inputs internos
      if (e.target.closest("a") || e.target.closest("button") || e.target.closest("input")) {
        return;
      }

      const isExpanded = card.classList.contains("expanded");
      const wrapper = card.closest(".card-wrapper");

      // Fecha os outros balões para manter a tela limpa e focada
      interactiveCards.forEach(c => {
        if (c !== card) {
          c.classList.remove("expanded", "mobile-animated");
          const w = c.closest(".card-wrapper");
          if (w) w.classList.remove("has-expanded");
        }
      });

      // Alterna expansão no balão clicado
      if (!isExpanded) {
        card.classList.add("expanded");
        card.classList.add("mobile-animated");
        if (wrapper) wrapper.classList.add("has-expanded");
      } else {
        card.classList.remove("expanded", "mobile-animated");
        if (wrapper) wrapper.classList.remove("has-expanded");
      }
    });
  });

  // Ao clicar fora de qualquer balão, recolhe todos
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".interactive-card")) {
      interactiveCards.forEach(c => {
        c.classList.remove("expanded", "mobile-animated");
        const w = c.closest(".card-wrapper");
        if (w) w.classList.remove("has-expanded");
      });
    }
  });

  // Sincroniza a altura do wrapper com a altura em repouso dos cards
  syncCardWrapperHeights();
  window.addEventListener("resize", syncCardWrapperHeights);
}

function syncCardWrapperHeights() {
  const wrappers = document.querySelectorAll(".cards-grid .card-wrapper");
  if (!wrappers.length) return;

  wrappers.forEach(wrap => {
    const card = wrap.querySelector(".card");
    if (card && !card.classList.contains("expanded") && window.innerWidth > 640) {
      const naturalHeight = card.offsetHeight;
      if (naturalHeight > 100) {
        wrap.style.height = naturalHeight + "px";
      }
    } else if (window.innerWidth <= 640) {
      wrap.style.height = "auto";
    }
  });
}

// ==========================================================================
// 6. CHAT COM IA PARA AUTOATENDIMENTO E DÚVIDAS (GUARDIÃO DIGITAL)
// ==========================================================================

const AI_KNOWLEDGE_BASE = [
  // 1. Golpes do Pix
  {
    keywords: ["pix", "chave pix", "bug do pix", "agendado", "comprovante", "qr code", "adulterado", "devolucao", "estorno", "pix errado"],
    answer: `<strong>💸 Como se Proteger de Golpes do Pix:</strong><br><br>
Os golpes mais frequentes envolvendo Pix são:
<ul>
  <li><strong>Pix Agendado / Comprovante Falso:</strong> O golpista agenda a transferência para uma data futura, gera o comprovante e cancela logo depois. <em>Regra de ouro:</em> Só entregue mercadorias ou preste serviços após conferir o extrato no seu próprio aplicativo do banco!</li>
  <li><strong>Bug do Pix:</strong> Promessa fraudulenta de que ao transferir R$ 50 ou R$ 100 para uma chave você receberá R$ 500 ou R$ 1.000 em dobro. Isso é 100% golpe!</li>
  <li><strong>QR Code Falso / Adulterado:</strong> Páginas falsas de pagamento que alteram o destinatário final.</li>
</ul>
💡 <strong>Dica Vital:</strong> Antes de digitar sua senha, sempre confira com atenção o <strong>Nome do Beneficiário</strong> e a instituição de destino.<br>
Se você foi vítima de transferência fraudulenta, acione imediatamente o <strong>MED (Mecanismo Especial de Devolução)</strong> pelo suporte do seu banco.<br><br>
<a href="simulador.html" class="ai-action-btn-link">🎮 Testar Golpe do Pix no Simulador</a>`
  },

  // 2. WhatsApp e Mensagens Suspeitas
  {
    keywords: ["whatsapp", "zap", "parente", "filho", "filha", "mae", "pai", "irmao", "numero novo", "troquei de numero", "celular quebrou", "codigo", "sms", "seis digitos", "6 digitos", "pin", "duas etapas", "clonaram"],
    answer: `<strong>📱 Golpes no WhatsApp (Falso Parente e Código SMS):</strong><br><br>
<ul>
  <li><strong>Golpe do Falso Parente:</strong> O criminoso coloca a foto do seu filho ou familiar em um número desconhecido e alega urgência ("troquei de número, preciso pagar um boleto urgente").<br>
  👉 <strong>O que fazer:</strong> Nunca transfira! Ligue imediatamente para o <strong>número antigo e tradicional</strong> do seu parente por linha comum ou chamada de voz para checar a história.</li>
  <li><strong>Roubo de Conta por Código SMS:</strong> Um golpista finge ser de um hotel, OLX ou suporte e pede um código de 6 dígitos que acabou de chegar no seu SMS.<br>
  👉 <strong>Nunca passe esse código!</strong> Ele é a autorização para instalar o seu WhatsApp em outro telefone.</li>
</ul>
🛡️ <strong>Como se blindar agora:</strong> Abra seu WhatsApp &gt; Configurações &gt; Conta &gt; <strong>Confirmação em duas etapas</strong> e cadastre um PIN de segurança.<br><br>
<a href="checklist.html" class="ai-action-btn-link">📋 Ver Passo a Passo no Checklist</a>`
  },

  // 3. Phishing e Links / E-mails Falsos
  {
    keywords: ["phishing", "link", "site falso", "email", "correios", "encomenda", "taxa alfandegaria", "receita federal", "receita", "cpf cancelado", "clicar", "url", "cadeado", "site seguro", "leilao", "promocao"],
    answer: `<strong>🔍 Como Identificar Phishing e Páginas Falsas:</strong><br><br>
O <em>Phishing</em> é a tentativa de roubar senhas e dados bancários através de mensagens alarmantes ou falsas promoções:
<ul>
  <li><strong>Falsos Correios:</strong> "Sua encomenda está retida na alfândega, pague a taxa no link...". Os Correios nunca mandam links com cobrança por SMS ou WhatsApp.</li>
  <li><strong>Falsa Receita Federal:</strong> Mensagens sobre CPF irregular ou pendência na declaração com links encurtados.</li>
  <li><strong>Endereço Suspeito (URL):</strong> Olhe a barra de navegação. Órgãos oficiais usam <code>.gov.br</code>. Domínios estranhos com <code>.xyz</code>, <code>.online</code> ou <code>suporte-banco123</code> são fraudulentos.</li>
</ul>
⚠️ <strong>Regra de Ouro:</strong> Nunca clique em links recebidos. Entre diretamente digitando o site oficial no navegador ou pelo aplicativo oficial da empresa.<br><br>
<a href="simulador.html" class="ai-action-btn-link">🎮 Treinar Detecção no Simulador</a>`
  },

  // 4. Falsa Central Telefônica (Vishing)
  {
    keywords: ["ligacao", "telefone", "central", "0800", "compra suspeita", "casas bahia", "mercado livre", "atendente", "conta de seguranca", "conta de protecao", "conta temporaria", "anydesk", "teamviewer", "modulo", "suporte remoto", "gerente"],
    answer: `<strong>📞 Falsa Central Telefônica do Banco (Vishing):</strong><br><br>
Criminosos enviam SMS ou ligam com som de telemarketing gravado: <em>"Compra de R$ 3.890 aprovada. Digite 2 se não reconhece..."</em>.<br><br>
Ao atender, o falso operador tenta induzir a vítima a:
<ul>
  <li>Fazer uma transferência Pix para uma <strong>"conta temporária de proteção"</strong> do banco.</li>
  <li>Instalar aplicativos de suporte remoto como <strong>AnyDesk, TeamViewer ou RustDesk</strong>, que permitem que o criminoso controle seu celular à distância.</li>
</ul>
🚫 <strong>Lembre-se sempre:</strong>
<ul>
  <li>Bancos <strong>NUNCA</strong> pedem para transferir dinheiro para proteger sua conta.</li>
  <li>Bancos <strong>NUNCA</strong> solicitam instalação de softwares ou aplicativos de suporte.</li>
  <li>Bancos <strong>NUNCA</strong> mandam motoboy recolher seu cartão.</li>
</ul>
👉 <strong>O que fazer:</strong> Desligue a chamada na hora e ligue para o telefone oficial impresso no <strong>verso do seu cartão de crédito/débito</strong>!`
  },

  // 5. Golpe do Emprego e Tarefas
  {
    keywords: ["emprego", "vaga", "tarefas", "curtir", "curtida", "youtube", "tiktok", "avaliar", "hotel", "google maps", "telegram", "lucro facil", "recarga", "renda extra", "home office", "dinheiro facil"],
    answer: `<strong>💼 Golpe das Tarefas e Falsa Vaga de Emprego:</strong><br><br>
Mensagens no WhatsApp ou Telegram oferecendo R$ 250 a R$ 800 por dia para realizar tarefas simples, como curtir vídeos no YouTube ou avaliar restaurantes no Google Maps.<br><br>
<strong>A armadilha dos golpistas:</strong>
<ul>
  <li>No começo pagam R$ 10 ou R$ 20 reais direto no seu Pix para você acreditar que o esquema é real.</li>
  <li>Em seguida, colocam você em um grupo no Telegram e exigem que você faça "recargas caução" de R$ 100, R$ 500 ou R$ 2.000 para liberar tarefas VIP de maior rendimento.</li>
  <li>Quando você tenta sacar o dinheiro acumulado, inventam taxas alfandegárias ou tributárias e retêm todo o seu dinheiro!</li>
</ul>
🚨 <strong>Alerta Absoluto:</strong> Emprego sério paga o trabalhador pelos seus serviços; <strong>nunca exige pagamento prévio ou Pix para você poder trabalhar</strong>!`
  },

  // 6. Invasão de Contas e Redes Sociais
  {
    keywords: ["instagram", "insta", "stories", "geladeira", "tv", "venda de moveis", "hackeado", "invadido", "perfil invadido", "urubu do pix", "sorteio", "investimento milagroso", "concurso"],
    answer: `<strong>📸 Invasão de Contas no Instagram e Redes Sociais:</strong><br><br>
Criminosos roubam contas no Instagram e publicam Stories fingindo que uma amiga está vendendo eletrodomésticos baratos (geladeiras, TVs, celulares) por motivo de mudança ou anunciando o "Urubu do Pix".<br><br>
<strong>Como eles roubam essas contas:</strong>
<ul>
  <li>Enviam mensagens no Direct dizendo que você ganhou um sorteio ou pedindo seu voto em um concurso.</li>
  <li>Pedem para você enviar um link ou código que chega no seu SMS para "confirmar a votação".</li>
</ul>
🛡️ <strong>Como se proteger:</strong>
<ul>
  <li>Nunca compartilhe códigos ou links recebidos por mensagem.</li>
  <li>Desconfie sempre de produtos baratos vendidos nos Stories de amigos.</li>
  <li>Ative a <strong>Autenticação em Duas Etapas (2FA)</strong> nas configurações do seu Instagram usando um app autenticador.</li>
</ul>`
  },

  // 7. Fui Vítima / Primeiros Socorros
  {
    keywords: ["fui vitima", "cai no golpe", "cai num golpe", "perdi dinheiro", "roubado", "golpista", "o que fazer", "e agora", "socorro", "ajuda urgente", "boletim", "boletim de ocorrencia", "policia", "denunciar", "delegacia", "urgente"],
    answer: `<strong>🚨 Fui Vítima de um Golpe! Guia Imediato de Primeiros Socorros:</strong><br><br>
Mantenha a calma e tome estas 4 atitudes com a máxima rapidez:
<ol>
  <li><strong>Contate seu Banco Imediatamente:</strong> Ligue para o SAC ou Ouvidoria da sua instituição financeira. Peça o bloqueio preventivo da transação e o acionamento do <strong>MED (Mecanismo Especial de Devolução do Pix)</strong>. Exija e anote o número de protocolo!</li>
  <li><strong>Registre o Boletim de Ocorrência (B.O.):</strong> Acesse a <strong>Delegacia Eletrônica da Polícia Civil</strong> do seu Estado. Reúna e anexe prints das conversas, comprovantes de transferência, extratos e telefones usados pelo criminoso.</li>
  <li><strong>Bloqueie Acessos e Troque Senhas:</strong> Altere imediatamente as senhas do seu e-mail principal, contas bancárias e redes sociais. Finalize todas as sessões ativas no WhatsApp Web e Instagram.</li>
  <li><strong>Avise Seus Contatos:</strong> Avise amigos e familiares caso seu perfil tenha sido clonado para que ninguém envie dinheiro aos criminosos em seu nome.</li>
</ol>
📞 Acesse a nossa central SOS para ver contatos oficiais de emergência:<br>
<a href="sos.html" class="ai-action-btn-link">🚨 Ver Canais Oficiais de Socorro (SOS)</a>`
  },

  // 8. O que é o MED (Mecanismo Especial de Devolução do Pix)
  {
    keywords: ["med", "mecanismo especial", "mecanismo de devolucao", "recuperar pix", "devolver pix", "estornar pix", "devolucao banco central"],
    answer: `<strong>🛡️ O que é o MED (Mecanismo Especial de Devolução do Pix)?</strong><br><br>
O MED é uma ferramenta oficial criada pelo <strong>Banco Central do Brasil</strong> exclusivamente para facilitar devoluções em casos de golpes, fraudes ou invasões de conta via Pix.<br><br>
<strong>Como acionar o MED:</strong>
<ol>
  <li>Você deve entrar em contato com o seu banco em até <strong>80 dias</strong> após a transação fraudulenta.</li>
  <li>O seu banco registra a solicitação e notifica a instituição financeira do golpista.</li>
  <li>O banco de destino bloqueia preventivamente o valor que ainda estiver disponível na conta do golpista.</li>
  <li>Ambos os bancos analisam as evidências em até 7 dias corridos. Se comprovado o golpe, o valor bloqueado é devolvido para a sua conta.</li>
</ol>
⚠️ <strong>Atenção:</strong> Quanto mais rápido você comunicar seu banco logo após o golpe, maiores são as chances de o dinheiro ainda estar disponível na conta do recebedor!`
  },

  // 9. Dúvidas sobre o Simulador e Ferramentas do Portal
  {
    keywords: ["simulador", "desafios", "jogo", "gamificado", "cenarios", "modo detetive", "pontuacao", "blindagem", "portal", "checklist", "ferramentas"],
    answer: `<strong>🎮 Sobre as Ferramentas do Portal Digital Educativo:</strong><br><br>
Este portal disponibiliza ferramentas práticas e gratuitas para blindar você contra o crime virtual:
<ul>
  <li><strong>🎮 Simulador de Golpes:</strong> Um simulador estilo smartphone com 10 cenários baseados em golpes reais (WhatsApp, Pix, Falsa Central, Phishing, etc.). Inclui o <em>Modo Detetive</em> com dicas de peritos em segurança, pontuação e taxa de acerto em tempo real.</li>
  <li><strong>📋 Checklist do Usuário:</strong> Painel interativo estilo ajustes de celular com 15 itens essenciais para você auditar a blindagem do seu smartphone e contas.</li>
  <li><strong>🚨 Central SOS:</strong> Telefones diretos de emergência (190, 181, Bacen 145, Procon) e links para delegacias eletrônicas.</li>
</ul>
Onde você deseja ir agora?<br>
<a href="simulador.html" class="ai-action-btn-link">🎮 Ir para o Simulador</a>
<a href="checklist.html" class="ai-action-btn-link" style="margin-left: 6px;">📋 Ir para o Checklist</a>`
  },

  // 10. Senhas e Autenticação em Duas Etapas (2FA)
  {
    keywords: ["senha", "senhas", "gerenciador", "2fa", "dois fatores", "duas etapas", "autenticador", "google authenticator", "microsoft authenticator", "seguranca de conta"],
    answer: `<strong>🔐 Boas Práticas para Senhas e Autenticação (2FA):</strong><br><br>
<ul>
  <li><strong>Nunca reutilize a mesma senha:</strong> Se uma loja online for invadida, os criminosos testarão essa mesma senha no seu e-mail e nos seus bancos.</li>
  <li><strong>Crie frases-senha longas:</strong> Frases com mais de 14 caracteres combinando letras maiúsculas, minúsculas, números e símbolos (ex: <code>CafeComPao!2026#Seguro</code>) são praticamente impossíveis de quebrar por computadores.</li>
  <li><strong>Prefira apps autenticadores a SMS:</strong> O código por SMS pode ser interceptado caso criminosos clonem seu chip (SIM Swap). Use aplicativos como <strong>Google Authenticator</strong> ou <strong>Microsoft Authenticator</strong>.</li>
  <li><strong>Cadastre um PIN no chip da sua operadora:</strong> Impede que retirem seu chip do aparelho e acessem seus códigos em caso de furto.</li>
</ul>
<a href="checklist.html" class="ai-action-btn-link">📋 Marcar Práticas no Checklist</a>`
  },

  // 11. Saudações e Apresentação
  {
    keywords: ["ola", "olá", "oi", "oie", "bom dia", "boa tarde", "boa noite", "quem e voce", "quem é você", "o que voce faz", "o que você faz", "ajuda", "duvida", "duvidas", "socorro bot", "assistente"],
    answer: `👋 <strong>Olá! Sou o Guardião Digital</strong>, seu assistente de inteligência artificial para autoatendimento e dúvidas sobre segurança na internet e prevenção de golpes virtuais.<br><br>
Estou pronto para te ajudar a identificar mensagens falsas, entender táticas de criminosos e saber como agir caso desconfie de algo.<br><br>
<strong>Você pode me perguntar sobre:</strong>
<ul>
  <li>💸 Golpes do Pix e comprovantes falsos</li>
  <li>📱 Mensagens de falsos parentes no WhatsApp</li>
  <li>📞 Falsas ligações de central telefônica de banco</li>
  <li>🔍 Como verificar se links e sites são verdadeiros</li>
  <li>🚨 O que fazer passo a passo caso tenha sido vítima</li>
</ul>
Qual é a sua dúvida no momento? Digite abaixo!`
  },

  // 12. Agradecimentos e Finalizações
  {
    keywords: ["obrigado", "obrigada", "valeu", "muito obrigado", "muito obrigada", "ajudou muito", "excelente", "top", "perfeito", "tchau", "ate mais", "show", "parabens", "otimo"],
    answer: `😊 <strong>Fico muito feliz em ter ajudado!</strong><br><br>
Lembre-se: na internet, a melhor defesa é a prevenção e a checagem cuidadosa antes de qualquer ação financeira ou clique em links.<br><br>
Se tiver qualquer outra suspeita no seu dia a dia, é só me chamar aqui no cantinho inferior esquerdo. Mantenha-se sempre protegido! 🛡️`
  }
];

// Helper para normalizar textos (remover acentos e pontuações)
function normalizeAIChatText(str) {
  return (str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s]/gi, " ")
    .trim();
}

// Mecanismo de Inteligência Artificial para Respostas
function getAIResponse(userQuery) {
  const normUser = normalizeAIChatText(userQuery);
  const words = normUser.split(/\s+/).filter(w => w.length > 2);

  let bestMatch = null;
  let highestScore = 0;

  AI_KNOWLEDGE_BASE.forEach(entry => {
    let score = 0;
    entry.keywords.forEach(kw => {
      const normKw = normalizeAIChatText(kw);
      if (normUser.includes(normKw)) {
        score += 3;
      } else {
        const kwWords = normKw.split(/\s+/);
        kwWords.forEach(kwW => {
          if (words.includes(kwW)) {
            score += 1;
          }
        });
      }
    });

    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  });

  if (bestMatch && highestScore >= 2) {
    return bestMatch.answer;
  }

  // Fallback Inteligente e Pedagógico
  return `🤔 <strong>Boa pergunta!</strong> Como sou uma IA especializada em prevenção de fraudes virtuais, quero te orientar da melhor forma possível.<br><br>
As <strong>3 Regras de Ouro da Segurança Digital</strong> para qualquer situação são:
<ol>
  <li><strong>Nunca clique em links recebidos por mensagem</strong> sob pressão de urgência ou promessa de prêmios.</li>
  <li><strong>Desconfie de ligações ou contatos com urgência financeira</strong> (bancos nunca pedem transferências nem senhas).</li>
  <li><strong>Confira sempre por canais oficiais</strong> ligando para o número do verso do seu cartão ou falando diretamente com o familiar em número antigo.</li>
</ol>
👉 <em>Sobre qual desses temas específicos você gostaria de tirar dúvidas agora?</em><br>
<div class="ai-quick-topics-wrap" style="margin-top: 8px;">
  <button type="button" class="ai-topic-pill" data-query="Como identificar golpes do Pix e comprovantes falsos?">💸 Golpes do Pix e Comprovantes</button>
  <button type="button" class="ai-topic-pill" data-query="Recebi mensagem de parente no WhatsApp pedindo dinheiro">📱 Parente pedindo dinheiro no WhatsApp</button>
  <button type="button" class="ai-topic-pill" data-query="Recebi ligação do banco sobre compra suspeita de alto valor">📞 Falsa ligação do banco (0800)</button>
  <button type="button" class="ai-topic-pill" data-query="Como saber se um link ou site de compras é falso?">🔍 Links e Páginas Falsas (Phishing)</button>
  <button type="button" class="ai-topic-pill" data-query="Fui vítima de um golpe na internet, o que devo fazer agora?">🚨 Fui vítima de golpe! O que fazer?</button>
</div>`;
}

// Inicializador do Widget de Chat com IA no Canto Inferior Esquerdo
function initAIChatWidget() {
  // Evitar duplicações caso já exista no DOM
  if (document.getElementById("aiChatWidget")) return;

  const chatContainer = document.createElement("div");
  chatContainer.id = "aiChatWidget";
  chatContainer.innerHTML = `
    <!-- Botão Flutuante (Canto Inferior Esquerdo) -->
    <button id="aiChatToggleBtn" class="ai-chat-launcher-btn" type="button" aria-label="Abrir Chat com IA para dúvidas e autoatendimento">
      <span class="ai-status-pulse" aria-hidden="true"></span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V7h1a7 7 0 0 1 7 7v1a3 3 0 0 1-3 3h-1.17l-2.42 2.41A2 2 0 0 1 13 22H9a2 2 0 0 1-1.41-.59L5.17 19H4a3 3 0 0 1-3-3v-1a7 7 0 0 1 7-7h1V5.72A2.001 2.001 0 0 1 10 4a2 2 0 0 1 2-2zm-3 8a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1zm6 0a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1z"/>
      </svg>
    </button>

    <!-- Tooltip Callout Flutuante -->
    <div id="aiChatCallout" class="ai-chat-callout" role="tooltip">
      <span>🤖 <strong>Dúvidas sobre golpes?</strong> Fale com a IA</span>
      <button type="button" class="ai-callout-close" aria-label="Fechar aviso">×</button>
    </div>

    <!-- Janela Flutuante do Chat -->
    <div id="aiChatWindow" class="ai-chat-window" role="dialog" aria-modal="false" aria-label="Janela do Assistente IA Guardião Digital">
      <div class="ai-chat-header">
        <div class="ai-chat-header-info">
          <div class="ai-avatar-box">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.38-1 1.72V7h1a7 7 0 0 1 7 7v1a3 3 0 0 1-3 3h-1.17l-2.42 2.41A2 2 0 0 1 13 22H9a2 2 0 0 1-1.41-.59L5.17 19H4a3 3 0 0 1-3-3v-1a7 7 0 0 1 7-7h1V5.72A2.001 2.001 0 0 1 10 4a2 2 0 0 1 2-2z"/>
            </svg>
          </div>
          <div class="ai-header-text">
            <h3>Guardião Digital <span class="ai-badge-ia">IA</span></h3>
            <span class="ai-header-status"><span class="ai-header-status-dot"></span> Online • Autoatendimento</span>
          </div>
        </div>
        <div class="ai-chat-header-actions">
          <button id="aiChatResetBtn" class="ai-header-btn" type="button" title="Reiniciar conversa" aria-label="Reiniciar conversa">↺</button>
          <button id="aiChatCloseBtn" class="ai-header-btn" type="button" title="Fechar chat" aria-label="Fechar chat">✕</button>
        </div>
      </div>

      <!-- Área de Mensagens -->
      <div id="aiChatBody" class="ai-chat-body">
        <!-- Mensagem Inicial -->
        <div class="ai-msg bot">
          <div class="ai-msg-bubble">
            <p>👋 <strong>Olá! Sou o Guardião Digital</strong>, seu assistente de inteligência artificial para autoatendimento e esclarecimento de dúvidas sobre fraudes virtuais.</p>
            <p>Você pode digitar qualquer pergunta no campo abaixo ou clicar nos temas rápidos a seguir:</p>
            <div class="ai-quick-topics-wrap">
              <span class="ai-quick-topics-title">Perguntas Frequentes:</span>
              <button type="button" class="ai-topic-pill" data-query="Como identificar golpes do Pix e comprovantes falsos?">💸 Como identificar golpes do Pix?</button>
              <button type="button" class="ai-topic-pill" data-query="Recebi mensagem de parente no WhatsApp pedindo dinheiro">📱 Parente pedindo dinheiro no WhatsApp</button>
              <button type="button" class="ai-topic-pill" data-query="Recebi ligação do banco sobre compra suspeita de alto valor">📞 Falsa ligação do banco (0800)</button>
              <button type="button" class="ai-topic-pill" data-query="Como saber se um link ou site de compras é falso?">🔍 Como saber se um link é falso?</button>
              <button type="button" class="ai-topic-pill" data-query="Fui vítima de um golpe na internet, o que devo fazer agora?">🚨 Fui vítima de golpe! O que fazer?</button>
              <button type="button" class="ai-topic-pill" data-query="O que é o MED do Banco Central e como recuperar o Pix?">🛡️ O que é o MED do Banco Central?</button>
            </div>
          </div>
          <span class="ai-msg-time">Agora</span>
        </div>
      </div>

      <!-- Rodapé com Campo de Entrada -->
      <div class="ai-chat-footer">
        <form id="aiChatForm" class="ai-chat-form" autocomplete="off">
          <input 
            id="aiChatInput" 
            class="ai-chat-input" 
            type="text" 
            placeholder="Digite sua dúvida sobre segurança..." 
            aria-label="Digite sua mensagem para a IA"
            maxlength="400"
          />
          <button id="aiChatSendBtn" class="ai-chat-send-btn" type="submit" aria-label="Enviar mensagem" disabled>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
        <p class="ai-chat-disclaimer">🔒 Autoatendimento educacional 100% privado e gratuito.</p>
      </div>
    </div>
  `;

  document.body.appendChild(chatContainer);

  const toggleBtn = document.getElementById("aiChatToggleBtn");
  const callout = document.getElementById("aiChatCallout");
  const calloutClose = callout ? callout.querySelector(".ai-callout-close") : null;
  const chatWindow = document.getElementById("aiChatWindow");
  const closeBtn = document.getElementById("aiChatCloseBtn");
  const resetBtn = document.getElementById("aiChatResetBtn");
  const chatForm = document.getElementById("aiChatForm");
  const chatInput = document.getElementById("aiChatInput");
  const sendBtn = document.getElementById("aiChatSendBtn");
  const chatBody = document.getElementById("aiChatBody");

  function formatCurrentTime() {
    const now = new Date();
    return now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");
  }

  function toggleChat(open) {
    const willOpen = typeof open === "boolean" ? open : !chatWindow.classList.contains("is-open");
    if (willOpen) {
      chatWindow.classList.add("is-open");
      if (callout) callout.classList.add("is-hidden");
      setTimeout(() => chatInput.focus(), 250);
    } else {
      chatWindow.classList.remove("is-open");
    }
  }

  function appendMessage(sender, htmlContent) {
    const msgEl = document.createElement("div");
    msgEl.className = `ai-msg ${sender}`;
    msgEl.innerHTML = `
      <div class="ai-msg-bubble">${htmlContent}</div>
      <span class="ai-msg-time">${formatCurrentTime()}</span>
    `;
    chatBody.appendChild(msgEl);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showTypingIndicator() {
    const typingEl = document.createElement("div");
    typingEl.id = "aiTypingIndicator";
    typingEl.className = "ai-typing-box";
    typingEl.innerHTML = `
      <span class="ai-typing-dot"></span>
      <span class="ai-typing-dot"></span>
      <span class="ai-typing-dot"></span>
    `;
    chatBody.appendChild(typingEl);
    chatBody.scrollTop = chatBody.scrollHeight;
    return typingEl;
  }

  function removeTypingIndicator() {
    const el = document.getElementById("aiTypingIndicator");
    if (el) el.remove();
  }

  function handleSend(userText) {
    const text = (userText || chatInput.value || "").trim();
    if (!text) return;

    // Desabilitar envio enquanto processa
    chatInput.value = "";
    sendBtn.disabled = true;

    // Adicionar mensagem do usuário
    appendMessage("user", `<p>${escapeHTML(text)}</p>`);

    // Indicador de digitação da IA
    showTypingIndicator();

    // Simulação orgânica de processamento de IA (entre 500ms e 800ms)
    const replyDelay = Math.min(800, Math.max(500, text.length * 15));
    setTimeout(() => {
      removeTypingIndicator();
      const botResponse = getAIResponse(text);
      appendMessage("bot", botResponse);
      chatInput.focus();
    }, replyDelay);
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function resetConversation() {
    chatBody.innerHTML = `
      <div class="ai-msg bot">
        <div class="ai-msg-bubble">
          <p>👋 <strong>Conversa reiniciada!</strong> Sou o Guardião Digital. Como posso te orientar agora?</p>
          <div class="ai-quick-topics-wrap">
            <button type="button" class="ai-topic-pill" data-query="Como identificar golpes do Pix e comprovantes falsos?">💸 Como identificar golpes do Pix?</button>
            <button type="button" class="ai-topic-pill" data-query="Recebi mensagem de parente no WhatsApp pedindo dinheiro">📱 Parente pedindo dinheiro no WhatsApp</button>
            <button type="button" class="ai-topic-pill" data-query="Recebi ligação do banco sobre compra suspeita de alto valor">📞 Falsa ligação do banco (0800)</button>
            <button type="button" class="ai-topic-pill" data-query="Fui vítima de um golpe na internet, o que devo fazer agora?">🚨 Fui vítima de golpe! O que fazer?</button>
          </div>
        </div>
        <span class="ai-msg-time">${formatCurrentTime()}</span>
      </div>
    `;
    chatInput.value = "";
    sendBtn.disabled = true;
    chatInput.focus();
  }

  // Event Listeners
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => toggleChat());
  }

  if (callout) {
    callout.addEventListener("click", (e) => {
      if (e.target.closest(".ai-callout-close")) {
        e.stopPropagation();
        callout.classList.add("is-hidden");
        return;
      }
      toggleChat(true);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => toggleChat(false));
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetConversation);
  }

  if (chatInput) {
    chatInput.addEventListener("input", () => {
      sendBtn.disabled = chatInput.value.trim().length === 0;
    });
  }

  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSend();
    });
  }

  // Delegar cliques nos chips de tópicos rápidos
  chatBody.addEventListener("click", (e) => {
    const pill = e.target.closest(".ai-topic-pill");
    if (pill) {
      const query = pill.getAttribute("data-query");
      if (query) {
        handleSend(query);
      }
    }
  });

  // Fechar no Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && chatWindow.classList.contains("is-open")) {
      toggleChat(false);
    }
  });
}

// ==========================================================================
// 7. INICIALIZAÇÃO DOS EVENTOS AO CARREGAR A PÁGINA
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar Chat com IA no Canto Inferior Esquerdo
  initAIChatWidget();

  // Inicializar Efeito de Expansão dos Balões da Home
  initCardExpansion();

  // Inicializar Simulador no iPhone
  const btnGolpe = document.getElementById("btnGolpe");
  const btnSeguro = document.getElementById("btnSeguro");
  const btnNextScenario = document.getElementById("btnNextScenario");
  const btnToggleClues = document.getElementById("btnToggleClues");
  const btnToggleHint = document.getElementById("btnToggleHint");
  const btnRestartAll = document.getElementById("btnRestartAll");

  if (btnGolpe && btnSeguro) {
    btnGolpe.addEventListener("click", () => handleUserAnswer(true));
    btnSeguro.addEventListener("click", () => handleUserAnswer(false));

    if (btnNextScenario) {
      btnNextScenario.addEventListener("click", () => {
        currentScenarioIndex++;
        loadScenario(currentScenarioIndex);
      });
    }

    if (btnToggleClues) {
      btnToggleClues.addEventListener("click", toggleDetectiveMode);
    }

    if (btnToggleHint) {
      btnToggleHint.addEventListener("click", toggleExpertHint);
    }

    if (btnRestartAll) {
      btnRestartAll.addEventListener("click", restartSimulator);
    }

    // Filtros de Categoria do Simulador
    const filterPills = document.querySelectorAll(".sim-category-filter-group .filter-pill");
    filterPills.forEach(pill => {
      pill.addEventListener("click", () => {
        filterPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        const category = pill.getAttribute("data-category");
        filterScenariosByCategory(category);
      });
    });

    // Carregar imediatamente o primeiro cenário no iPhone
    loadScenario(currentScenarioIndex);
  }

  // Inicializar Checklist na tela de Ajustes do Smartphone
  const checkboxes = document.querySelectorAll(".checklist-item input[type='checkbox']");
  if (checkboxes.length > 0) {
    checkboxes.forEach(cb => {
      cb.addEventListener("change", updateChecklistProgress);
    });

    // Permitir clicar em qualquer parte da linha do ajuste para alternar o interruptor
    const settingsRows = document.querySelectorAll(".settings-row");
    settingsRows.forEach(row => {
      row.addEventListener("click", (e) => {
        if (e.target.closest("input") || e.target.closest("label")) return;
        const cb = row.querySelector("input[type='checkbox']");
        if (cb) {
          cb.checked = !cb.checked;
          updateChecklistProgress();
        }
      });
    });

    const btnToggleAllChecklist = document.getElementById("btnToggleAllChecklist");
    const btnResetChecklist = document.getElementById("btnResetChecklist");

    if (btnToggleAllChecklist) {
      btnToggleAllChecklist.addEventListener("click", () => {
        checkboxes.forEach(cb => { cb.checked = true; });
        updateChecklistProgress();
      });
    }

    if (btnResetChecklist) {
      btnResetChecklist.addEventListener("click", () => {
        checkboxes.forEach(cb => { cb.checked = false; });
        updateChecklistProgress();
      });
    }

    updateChecklistProgress();
  }

  // Inicializar Campo de Busca (se estiver na página inicial de golpes)
  const searchInput = document.getElementById("scamSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", filterCards);
  }

  // Botão Geral de Imprimir Guia / Cartilha
  const printBtn = document.getElementById("printGuideBtn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
});
