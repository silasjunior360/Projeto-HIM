function openMenu() {
  document.getElementById("menu_aba").style.display = "block"; 
}

function closeMenu() {
  document.getElementById("menu_aba").style.display = "none";    
}

function temaLim() {
    document.documentElement.style.setProperty('--cor-click', '#38184C');
    document.documentElement.style.setProperty('--cor-sombra', '#9b0a59');
    document.documentElement.style.setProperty('--cor-text', 'black');
    document.documentElement.style.setProperty('--cor-back1', '#CEF09D');
    document.documentElement.style.setProperty('--cor-back2', '#4f6a93');
    document.documentElement.style.setProperty('--md-sys-color-primary', '#38184C');
}

function temaInatel() {
    document.documentElement.style.setProperty('--cor-click', '#126ae2');
    document.documentElement.style.setProperty('--cor-sombra', '#0a599b');
    document.documentElement.style.setProperty('--cor-text', 'black');
    document.documentElement.style.setProperty('--cor-back1', '#edf2f4');
    document.documentElement.style.setProperty('--cor-back2', '#6a937a');
    document.documentElement.style.setProperty('--md-sys-color-primary', '#126ae2');
  
}

function temaDark() {
    const cores = {
        '--cor-click': '#CEF09D',
        '--cor-sombra': '#9b0a59',
        '--cor-text': 'black',
        '--cor-back1': '#38184C',
        '--cor-back2': '#4f6a93',
        '--md-sys-color-primary': '#CEF09D'
    };

    for (const [variavel, valor] of Object.entries(cores)) {
        document.documentElement.style.setProperty(variavel, valor);
    }
}




const eventos = [
    {
        id: 1,
        title: 'Semana do Software 2025',
        date: '12/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'tech',
        description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 2,
        title: 'Workshop de IoT',
        date: '12/01',
        time: '08:00',
        location: 'Laboratório CS&I',
        type: 'tech',
        description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 3,
        title: 'Festa dos Alunos 2025',
        date: '18/05',
        time: '19:00',
        location: 'Área Esportiva',
        type: 'cultural',
        description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 4,
        title: 'Feira de Oportunidades',
        date: '04/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'academic',
        description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
    }
];

const carousel = document.querySelector('.carousel');

// Função para criar os cards
function createCards() {
    eventos.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p><span class="material-symbols-outlined icon">event</span> ${event.date} às ${event.time} <span class="material-symbols-outlined icon">pin_drop</span> ${event.location}</p>
            </div>
        `;
        carousel.appendChild(card);
    });
}

// Controle do carrossel
let index = 0;
function nextCard() {
    index = (index + 1) % eventos.length;
    updateCarousel();
}

function prevCard() {
    index = (index - 1 + eventos.length) % eventos.length;
    updateCarousel();
}

function updateCarousel() {
    carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Adicionando interatividade
document.getElementById('nextBtn').addEventListener('click', nextCard);
document.getElementById('prevBtn').addEventListener('click', prevCard);

// Auto avanço a cada 5 segundos
setInterval(nextCard, 5000);

// Arrastar no celular
let startX;
carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextCard();
    if (endX - startX > 50) prevCard();
});

// Inicializando
createCards();


// Componente Aulas ----------------------------------------------------------------------------------

class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Cria o Shadow DOM
    this.aulas = [
      {
        id: 1,
        disciplina: 'S05 - Interface Homem-máquina',
        data: 'ter',
        horario: '10:00',
        local: 'P1-S17',
        prova_alert: false,
        prova: '12/05',
        frequencia: '10/25',
        nota: '10'
      },
      {
        id: 2,
        disciplina: 'E01 - Circuitos Elétricos em Corrente Contínua',
        data: 'ter',
        horario: '10:00',
        local: 'P1-S17',
        prova_alert: true,
        prova: '12/05',
        frequencia: '10/25',
        nota: '5'
      },
      {
        id: 3,
        disciplina: 'M02 - Álgebra e Geometria Analítica',
        data: 'qua',
        horario: '10:00',
        local: 'P1-S17',
        prova_alert: true,
        prova: '12/05',
        frequencia: '10/25',
        nota: '7'
      }
    ];
    this.hoje = "ter"; // Dia atual
  }

  connectedCallback() {
    this.render(); // Renderiza o componente
  }

  // Método para renderizar o conteúdo do componente
  render() {
    const aulasDia = this.aulas.filter(a => a.data === this.hoje); // Filtra as aulas para o dia de hoje
    this.shadowRoot.innerHTML = `
      <style>
      .comp-aula {
        position: relative;
        background-color: white;
        top: 0px;
        left: 0px;
        rigth: 0px;
        padding: 15px;
        margin: 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      }

      .titulo_aula {
        font-family: "Arimo", sans-serif;
        font-optical-sizing: auto;
        font-weight: bold;
        font-style: normal;
        font-size: 15px;
        color: var(--cor-text);
        padding-left: 5px;
        padding-right: 5px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      p {
        font-family: "Arimo", sans-serif;
        font-optical-sizing: auto;
        font-weight: <weight>;
        font-style: normal;
        font-size: 11px;
        color: var(--cor-text);
        line-height: 1.5;
        orphans: 3;
        padding-left: 5px;
        padding-right: 5px
      }

      .lables {
        display: flex;
        /*justify-content: space-between;*/
      }

      .lable-prova {
        background-color: var(--prova);
        padding: 7px;
        padding-right: 15px;
        padding-left: 15px;
        margin-bottom: 10px;
        border-radius: 500px;
        text-align: center
      }

      .lable-frequencia {
        background-color: var(--frequencia);
        padding: 7px;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: 10px;
        border-radius: 500px;
      }

      .lable-nota {
        background-color: var(--prova);
        padding: 7px;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: 10px;
        border-radius: 500px;
      }

      .p_lable {
        font-family: "Arimo", sans-serif;
        font-optical-sizing: auto;
        font-weight: <weight>;
        font-style: normal;
        font-size: 11px;
        color: white;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      </style>
      <div>
        ${aulasDia.map(a => {
          let provaDisplay = a.prova_alert ? '' : 'display: none;';
          return `
            <div class="comp-aula">
              <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
              <div class="titulo_aula">${a.disciplina}</div>
              <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
              <div class="lables">
                <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                <div class="lable-nota p_lable">CR: <b>${a.nota}</b></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
}

// Registrando o componente
customElements.define('aulas-component', AulasComponent);


// Adicione estas funções ao seu JavaScript existente

function abrirAlmoxarifado() {
  closeMenu();
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('almoxarifado_page').style.display = 'block';
}

function voltarDashboard() {
  document.getElementById('almoxarifado_page').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
}

function solicitarItem() {
  alert('Função: Solicitar Item\nAqui você pode solicitar itens do almoxarifado.');
  // Implementar lógica para solicitar itens
}

function devolverItem() {
  alert('Função: Devolver Item\nAqui você pode devolver itens do almoxarifado.');
  // Implementar lógica para devolver itens
}

function situacaoPerda() {
  alert('Função: Situação de Perda\nAqui você pode reportar situações de perda de itens.');
  // Implementar lógica para situações de perda
}

// As funções JavaScript permanecem as mesmas
function abrirAlmoxarifado() {
  closeMenu();
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('almoxarifado_page').style.display = 'block';
}

function voltarDashboard() {
  document.getElementById('almoxarifado_page').style.display = 'none';
  document.getElementById('dashboard').style.display = 'block';
}

function solicitarItem() {
  alert('Função: Solicitar Item\nAqui você pode solicitar itens do almoxarifado.');
  // Implementar lógica para solicitar itens
}

function devolverItem() {
  alert('Função: Devolver Item\nAqui você pode devolver itens do almoxarifado.');
  // Implementar lógica para devolver itens
}

function situacaoPerda() {
  alert('Função: Situação de Perda\nAqui você pode reportar situações de perda de itens.');
  // Implementar lógica para situações de perda
}

// Dados das ferramentas
const ferramentas = [
  { id: 1, nome: "Multímetro Digital", status: "disponivel" },
  { id: 2, nome: "Osciloscópio", status: "disponivel" },
  { id: 3, nome: "Fonte de Alimentação", status: "indisponivel" },
  { id: 4, nome: "Solda Station", status: "disponivel" },
  { id: 5, nome: "Alicate de Corte", status: "disponivel" },
  { id: 6, nome: "Chave de Fenda", status: "disponivel" },
  { id: 7, nome: "Protoboard", status: "indisponivel" },
  { id: 8, nome: "Kit Arduino", status: "disponivel" },
  { id: 9, nome: "Tesoura", status: "disponivel" },
  { id: 10, nome: "Martelo", status: "disponivel" }
];

let ferramentasSelecionadas = [];
let dataRetirada = '';
let horaRetirada = '';

// Função para abrir a página de solicitação
function solicitarItem() {
  document.getElementById('almoxarifado_page').style.display = 'none';
  document.getElementById('solicitacao_page').style.display = 'block';
  carregarFerramentas();
  resetarSolicitacao();
}

// Função para voltar para a página do almoxarifado
function voltarParaAlmoxarifado() {
  document.getElementById('solicitacao_page').style.display = 'none';
  document.getElementById('almoxarifado_page').style.display = 'block';
}

// Carregar lista de ferramentas
function carregarFerramentas() {
  const container = document.getElementById('ferramentas_lista');
  container.innerHTML = '';
  
  ferramentas.forEach(ferramenta => {
    const div = document.createElement('div');
    div.className = `ferramenta-item ${ferramenta.status}`;
    if (ferramenta.status === 'disponivel') {
      div.onclick = () => toggleFerramenta(ferramenta);
    }
    
    div.innerHTML = `
      <div class="ferramenta-nome">${ferramenta.nome}</div>
      <div class="ferramenta-status ${ferramenta.status}">
        ${ferramenta.status === 'disponivel' ? 'Disponível' : 'Indisponível'}
      </div>
    `;
    
    container.appendChild(div);
  });
}

// Alternar seleção de ferramenta
function toggleFerramenta(ferramenta) {
  const index = ferramentasSelecionadas.findIndex(f => f.id === ferramenta.id);
  
  if (index === -1) {
    ferramentasSelecionadas.push(ferramenta);
  } else {
    ferramentasSelecionadas.splice(index, 1);
  }
  
  atualizarListaSelecionadas();
  atualizarBotoesFerramentas();
}

// Atualizar lista de ferramentas selecionadas
function atualizarListaSelecionadas() {
  const container = document.getElementById('lista_selecionadas');
  container.innerHTML = '';
  
  ferramentasSelecionadas.forEach(ferramenta => {
    const div = document.createElement('div');
    div.className = 'item-selecionado';
    div.innerHTML = `
      <span>${ferramenta.nome}</span>
      <span class="material-symbols-outlined" onclick="removerFerramenta(${ferramenta.id})" style="cursor: pointer; color: red;">close</span>
    `;
    container.appendChild(div);
  });
}

// Remover ferramenta da lista
function removerFerramenta(id) {
  ferramentasSelecionadas = ferramentasSelecionadas.filter(f => f.id !== id);
  atualizarListaSelecionadas();
  atualizarBotoesFerramentas();
}

// Atualizar estado visual dos botões das ferramentas
function atualizarBotoesFerramentas() {
  const botoes = document.querySelectorAll('.ferramenta-item');
  botoes.forEach(botao => {
    const nome = botao.querySelector('.ferramenta-nome').textContent;
    const ferramenta = ferramentas.find(f => f.nome === nome);
    
    if (ferramenta && ferramentasSelecionadas.find(f => f.id === ferramenta.id)) {
      botao.classList.add('selecionada');
    } else {
      botao.classList.remove('selecionada');
    }
  });
}

// Avançar para o passo 2
function avancarParaPasso2() {
  if (ferramentasSelecionadas.length === 0) {
    alert('Selecione pelo menos uma ferramenta!');
    return;
  }
  
  document.getElementById('passo1').style.display = 'none';
  document.getElementById('passo2').style.display = 'block';
  carregarHorarios();
}

// Voltar para o passo 1
function voltarParaPasso1() {
  document.getElementById('passo2').style.display = 'none';
  document.getElementById('passo1').style.display = 'block';
}

// Carregar horários disponíveis
function carregarHorarios() {
  const select = document.getElementById('hora_retirada');
  select.innerHTML = '<option value="">Selecione a hora</option>';
  
  // Horários das 8h às 18h, a cada 30 minutos
  for (let hora = 8; hora <= 18; hora++) {
    for (let minuto = 0; minuto < 60; minuto += 30) {
      const horaFormatada = hora.toString().padStart(2, '0');
      const minutoFormatado = minuto.toString().padStart(2, '0');
      const horario = `${horaFormatada}:${minutoFormatado}`;
      
      const option = document.createElement('option');
      option.value = horario;
      option.textContent = horario;
      select.appendChild(option);
    }
  }
  
  // Configurar data mínima como hoje
  const dataInput = document.getElementById('data_retirada');
  const hoje = new Date().toISOString().split('T')[0];
  dataInput.min = hoje;
}

// Avançar para o passo 3
function avancarParaPasso3() {
  dataRetirada = document.getElementById('data_retirada').value;
  horaRetirada = document.getElementById('hora_retirada').value;
  
  if (!dataRetirada || !horaRetirada) {
    alert('Selecione a data e hora de retirada!');
    return;
  }
  
  document.getElementById('passo2').style.display = 'none';
  document.getElementById('passo3').style.display = 'block';
  carregarResumo();
}

// Voltar para o passo 2
function voltarParaPasso2() {
  document.getElementById('passo3').style.display = 'none';
  document.getElementById('passo2').style.display = 'block';
}

// Carregar resumo da solicitação
function carregarResumo() {
  const container = document.getElementById('resumo_solicitacao');
  container.innerHTML = `
    <div class="resumo-item">
      <strong>Ferramentas Selecionadas:</strong>
      <ul>
        ${ferramentasSelecionadas.map(f => `<li>${f.nome}</li>`).join('')}
      </ul>
    </div>
    <div class="resumo-item">
      <strong>Data de Retirada:</strong> ${formatarData(dataRetirada)}
    </div>
    <div class="resumo-item">
      <strong>Horário de Retirada:</strong> ${horaRetirada}
    </div>
  `;
}

// Formatar data para exibição
function formatarData(data) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

// Confirmar solicitação
function confirmarSolicitacao() {
  document.getElementById('passo3').style.display = 'none';
  document.getElementById('passo4').style.display = 'block';
  gerarQRCode();
}

// Gerar QR Code
function gerarQRCode() {
  const canvas = document.getElementById('qrCodeCanvas');
  const ctx = canvas.getContext('2d');
  
  // Dados para o QR Code
  const dadosSolicitacao = {
    usuario: "Raphael",
    ferramentas: ferramentasSelecionadas.map(f => f.nome),
    dataRetirada: dataRetirada,
    horaRetirada: horaRetirada,
    codigo: Math.random().toString(36).substr(2, 9).toUpperCase()
  };
  
  // Simular geração de QR Code (em produção, usar uma biblioteca como qrcode.js)
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 200, 200);
  
  ctx.fillStyle = 'black';
  ctx.font = '12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('QR CODE', 100, 80);
  ctx.fillText('Solicitação Almoxarifado', 100, 100);
  ctx.fillText(dadosSolicitacao.codigo, 100, 120);
  ctx.fillText('Apresente no balcão', 100, 140);
}

// Finalizar solicitação
function finalizarSolicitacao() {
  alert('Solicitação finalizada com sucesso!');
  voltarParaAlmoxarifado();
}

// Resetar dados da solicitação
function resetarSolicitacao() {
  ferramentasSelecionadas = [];
  dataRetirada = '';
  horaRetirada = '';
  document.getElementById('passo1').style.display = 'block';
  document.getElementById('passo2').style.display = 'none';
  document.getElementById('passo3').style.display = 'none';
  document.getElementById('passo4').style.display = 'none';
  document.getElementById('data_retirada').value = '';
  document.getElementById('hora_retirada').value = '';
}


// Dados dos itens emprestados (simulados)
const itensEmprestados = [
  { 
    id: 1, 
    nome: "Multímetro Digital", 
    dataEmprestimo: "2024-01-15", 
    dataDevolucaoPrevista: "2024-01-22",
    codigoQR: "123",
    status: "emprestado"
  },
  { 
    id: 2, 
    nome: "Osciloscópio", 
    dataEmprestimo: "2024-01-18", 
    dataDevolucaoPrevista: "2024-01-25",
    codigoQR: "123",
    status: "emprestado"
  },
  { 
    id: 3, 
    nome: "Kit Arduino", 
    dataEmprestimo: "2024-01-10", 
    dataDevolucaoPrevista: "2024-01-17",
    codigoQR: "123",
    status: "atrasado"
  }
];

let itemSelecionadoDevolucao = null;
let codigoVerificado = '';

// Função para abrir a página de devolução
function devolverItem() {
  document.getElementById('almoxarifado_page').style.display = 'none';
  document.getElementById('devolucao_page').style.display = 'block';
  carregarItensEmprestados();
  resetarDevolucao();
}

// Função para voltar para a página do almoxarifado
function voltarParaAlmoxarifadoDevolucao() {
  document.getElementById('devolucao_page').style.display = 'none';
  document.getElementById('almoxarifado_page').style.display = 'block';
}

// Carregar itens emprestados
function carregarItensEmprestados() {
  const container = document.getElementById('itens_emprestados');
  container.innerHTML = '';
  
  itensEmprestados.forEach(item => {
    const div = document.createElement('div');
    div.className = `item-emprestado ${item.status === 'atrasado' ? 'status-atrasado' : ''}`;
    div.onclick = () => selecionarItemDevolucao(item);
    
    const statusText = item.status === 'atrasado' ? 'ATRASADO' : 'EM EMPRÉSTIMO';
    const statusClass = item.status === 'atrasado' ? 'status-atrasado' : 'status-emprestado';
    
    div.innerHTML = `
      <div class="item-info">
        <div class="item-nome">${item.nome}</div>
        <div class="item-detalhes">
          Emprestado em: ${formatarData(item.dataEmprestimo)}<br>
          Devolução prevista: ${formatarData(item.dataDevolucaoPrevista)}
        </div>
      </div>
      <div class="item-status ${statusClass}">${statusText}</div>
    `;
    
    container.appendChild(div);
  });
}

// Selecionar item para devolução
function selecionarItemDevolucao(item) {
  itemSelecionadoDevolucao = item;
  
  // Remover seleção anterior
  document.querySelectorAll('.item-emprestado').forEach(el => {
    el.classList.remove('selecionado');
  });
  
  // Adicionar seleção atual
  event.currentTarget.classList.add('selecionado');
  
  // Habilitar botão próximo
  document.getElementById('btnDevolucaoProximo').disabled = false;
}

// Avançar para o passo 2 da devolução
function avancarParaDevolucaoPasso2() {
  if (!itemSelecionadoDevolucao) {
    alert('Selecione um item para devolver!');
    return;
  }
  
  document.getElementById('devolucao_passo1').style.display = 'none';
  document.getElementById('devolucao_passo2').style.display = 'block';
  
  // Em um app real, aqui iniciaria a câmera para escanear QR Code
  // iniciarScannerQRCode();
}

// Voltar para o passo 1 da devolução
function voltarParaDevolucaoPasso1() {
  document.getElementById('devolucao_passo2').style.display = 'none';
  document.getElementById('devolucao_passo3').style.display = 'none';
  document.getElementById('devolucao_passo1').style.display = 'block';
}

// Verificar código manual (simulação do QR Code)
function verificarCodigoManual() {
  const codigoInput = document.getElementById('codigoManual').value.trim();
  
  if (!codigoInput) {
    alert('Digite o código do item!');
    return;
  }
  
  // Simular verificação do código
  if (codigoInput === itemSelecionadoDevolucao.codigoQR) {
    codigoVerificado = codigoInput;
    avancarParaDevolucaoPasso3();
  } else {
    alert('Código inválido! Verifique o código do item e tente novamente.');
  }
}

// Avançar para confirmação da devolução
function avancarParaDevolucaoPasso3() {
  document.getElementById('devolucao_passo2').style.display = 'none';
  document.getElementById('devolucao_passo3').style.display = 'block';
  carregarResumoDevolucao();
}

// Voltar para o passo 2 da devolução
function voltarParaDevolucaoPasso2() {
  document.getElementById('devolucao_passo3').style.display = 'none';
  document.getElementById('devolucao_passo2').style.display = 'block';
}

// Carregar resumo da devolução
function carregarResumoDevolucao() {
  const container = document.getElementById('resumo_devolucao');
  const hoje = new Date().toISOString().split('T')[0];
  
  container.innerHTML = `
    <div class="resumo-item">
      <strong>Item a Devolver:</strong> ${itemSelecionadoDevolucao.nome}
    </div>
    <div class="resumo-item">
      <strong>Código:</strong> ${itemSelecionadoDevolucao.codigoQR}
    </div>
    <div class="resumo-item">
      <strong>Data de Empréstimo:</strong> ${formatarData(itemSelecionadoDevolucao.dataEmprestimo)}
    </div>
    <div class="resumo-item">
      <strong>Data de Devolução:</strong> ${formatarData(hoje)}
    </div>
    <div class="resumo-item ${itemSelecionadoDevolucao.status === 'atrasado' ? 'status-atrasado' : ''}">
      <strong>Status:</strong> ${itemSelecionadoDevolucao.status === 'atrasado' ? 'DEVOLUÇÃO COM ATRASO' : 'DEVOLUÇÃO NO PRAZO'}
    </div>
  `;
}

// Confirmar devolução
function confirmarDevolucao() {
  // Simular processamento da devolução
  const hoje = new Date().toLocaleDateString('pt-BR');
  
  document.getElementById('devolucao_passo3').style.display = 'none';
  document.getElementById('devolucao_passo4').style.display = 'block';
  
  document.getElementById('detalhes_devolucao').innerHTML = `
    Item: <strong>${itemSelecionadoDevolucao.nome}</strong><br>
    Devolvido em: <strong>${hoje}</strong><br>
    Código: <strong>${itemSelecionadoDevolucao.codigoQR}</strong>
  `;
  
  // Em um sistema real, aqui faria a atualização no banco de dados
  console.log('Item devolvido:', itemSelecionadoDevolucao);
}

// Finalizar devolução
function finalizarDevolucao() {
  alert('Devolução concluída com sucesso!');
  voltarParaAlmoxarifadoDevolucao();
}

// Resetar dados da devolução
function resetarDevolucao() {
  itemSelecionadoDevolucao = null;
  codigoVerificado = '';
  document.getElementById('devolucao_passo1').style.display = 'block';
  document.getElementById('devolucao_passo2').style.display = 'none';
  document.getElementById('devolucao_passo3').style.display = 'none';
  document.getElementById('devolucao_passo4').style.display = 'none';
  document.getElementById('codigoManual').value = '';
  document.getElementById('btnDevolucaoProximo').disabled = true;
  
  // Remover seleções visuais
  document.querySelectorAll('.item-emprestado').forEach(el => {
    el.classList.remove('selecionado');
  });
}

// Função auxiliar para formatar data
function formatarData(data) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}


// Dados dos itens que podem ser reportados como perdidos
const itensParaPerda = [
  { 
    id: 1, 
    nome: "Multímetro Digital", 
    categoria: "Medição",
    valor: "R$ 250,00",
    codigo: "MTD-12345"
  },
  { 
    id: 2, 
    nome: "Osciloscópio", 
    categoria: "Medição", 
    valor: "R$ 1.200,00",
    codigo: "OSC-67890"
  },
  { 
    id: 3, 
    nome: "Kit Arduino", 
    categoria: "Eletrônica",
    valor: "R$ 180,00",
    codigo: "ARD-54321"
  },
  { 
    id: 4, 
    nome: "Fonte de Alimentação", 
    categoria: "Alimentação",
    valor: "R$ 350,00",
    codigo: "FON-98765"
  },
  { 
    id: 5, 
    nome: "Solda Station", 
    categoria: "Montagem",
    valor: "R$ 420,00",
    codigo: "SOL-13579"
  }
];

let itemSelecionadoPerda = null;
let dadosRelatorioPerda = {};

// Função para abrir a página de situação de perda
function situacaoPerda() {
  document.getElementById('almoxarifado_page').style.display = 'none';
  document.getElementById('perda_page').style.display = 'block';
  carregarItensParaPerda();
  resetarPerda();
}

// Função para voltar para a página do almoxarifado
function voltarParaAlmoxarifadoPerda() {
  document.getElementById('perda_page').style.display = 'none';
  document.getElementById('almoxarifado_page').style.display = 'block';
}

// Carregar itens para reportar perda
function carregarItensParaPerda() {
  const container = document.getElementById('itens_perda');
  container.innerHTML = '';
  
  itensParaPerda.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item-emprestado';
    div.onclick = () => selecionarItemPerda(item);
    
    div.innerHTML = `
      <div class="item-info">
        <div class="item-nome">${item.nome}</div>
        <div class="item-detalhes">
          Categoria: ${item.categoria}<br>
          Valor: ${item.valor}<br>
          Código: ${item.codigo}
        </div>
      </div>
      <div class="material-symbols-outlined" style="color: #666;">arrow_forward</div>
    `;
    
    container.appendChild(div);
  });
}

// Selecionar item para reportar perda
function selecionarItemPerda(item) {
  itemSelecionadoPerda = item;
  
  // Remover seleção anterior
  document.querySelectorAll('.item-emprestado').forEach(el => {
    el.classList.remove('selecionado');
  });
  
  // Adicionar seleção atual
  event.currentTarget.classList.add('selecionado');
  
  // Habilitar botão próximo
  document.getElementById('btnPerdaProximo').disabled = false;
}

// Avançar para o passo 2 da perda
function avancarParaPerdaPasso2() {
  if (!itemSelecionadoPerda) {
    alert('Selecione um item para reportar perda!');
    return;
  }
  
  document.getElementById('perda_passo1').style.display = 'none';
  document.getElementById('perda_passo2').style.display = 'block';
  
  // Configurar data mínima como 30 dias atrás
  const dataInput = document.getElementById('data_perda');
  const hoje = new Date();
  const trintaDiasAtras = new Date(hoje.setDate(hoje.getDate() - 30));
  dataInput.min = trintaDiasAtras.toISOString().split('T')[0];
  dataInput.max = new Date().toISOString().split('T')[0];
  
  // Adicionar validação em tempo real do formulário
  adicionarValidacaoFormulario();
}

// Voltar para o passo 1 da perda
function voltarParaPerdaPasso1() {
  document.getElementById('perda_passo2').style.display = 'none';
  document.getElementById('perda_passo1').style.display = 'block';
}

// Adicionar validação em tempo real do formulário
function adicionarValidacaoFormulario() {
  const inputs = document.querySelectorAll('#perda_passo2 input, #perda_passo2 select, #perda_passo2 textarea');
  const checkbox = document.getElementById('confirmacao_perda');
  
  function validarFormulario() {
    const email = document.getElementById('email_usuario').value;
    const confirmacao = checkbox.checked;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    document.getElementById('btnEnviarRelatorio').disabled = !(emailValido && confirmacao);
  }
  
  inputs.forEach(input => {
    input.addEventListener('input', validarFormulario);
    input.addEventListener('change', validarFormulario);
  });
  
  checkbox.addEventListener('change', validarFormulario);
}

// Avançar para confirmação do relatório
function avancarParaPerdaPasso3() {
  // Coletar dados do formulário
  const email = document.getElementById('email_usuario').value;
  const dataPerda = document.getElementById('data_perda').value;
  const localPerda = document.getElementById('local_perda').value;
  const descricao = document.getElementById('descricao_perda').value;
  
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Por favor, insira um e-mail válido!');
    return;
  }
  
  dadosRelatorioPerda = {
    email: email,
    dataPerda: dataPerda,
    localPerda: localPerda,
    descricao: descricao,
    timestamp: new Date().toISOString()
  };
  
  document.getElementById('perda_passo2').style.display = 'none';
  document.getElementById('perda_passo3').style.display = 'block';
  carregarResumoPerda();
}

// Voltar para o passo 2 da perda
function voltarParaPerdaPasso2() {
  document.getElementById('perda_passo3').style.display = 'none';
  document.getElementById('perda_passo2').style.display = 'block';
}

// Carregar resumo do relatório de perda
function carregarResumoPerda() {
  const container = document.getElementById('resumo_perda');
  const locais = {
    'laboratorio': 'Laboratório',
    'sala_aula': 'Sala de Aula',
    'area_comum': 'Área Comum',
    'exterior': 'Área Externa',
    'outro': 'Outro Local'
  };
  
  container.innerHTML = `
    <div class="resumo-item">
      <strong>Item Perdido:</strong> ${itemSelecionadoPerda.nome}
    </div>
    <div class="resumo-item">
      <strong>Código:</strong> ${itemSelecionadoPerda.codigo}
    </div>
    <div class="resumo-item">
      <strong>Valor:</strong> ${itemSelecionadoPerda.valor}
    </div>
    <div class="resumo-item">
      <strong>E-mail para contato:</strong> ${dadosRelatorioPerda.email}
    </div>
    <div class="resumo-item">
      <strong>Data da Perda:</strong> ${dadosRelatorioPerda.dataPerda ? formatarData(dadosRelatorioPerda.dataPerda) : 'Não informada'}
    </div>
    <div class="resumo-item">
      <strong>Local da Perda:</strong> ${locais[dadosRelatorioPerda.localPerda] || 'Não informado'}
    </div>
    <div class="resumo-item">
      <strong>Descrição:</strong><br>
      ${dadosRelatorioPerda.descricao || 'Não informada'}
    </div>
  `;
}

// Confirmar envio do relatório de perda
function confirmarRelatorioPerda() {
  // Simular envio do relatório
  document.getElementById('perda_passo3').style.display = 'none';
  document.getElementById('perda_passo4').style.display = 'block';
  
  document.getElementById('detalhes_envio').innerHTML = `
    <div class="email-confirmacao">
      <p><strong>Relatório enviado para:</strong> ${dadosRelatorioPerda.email}</p>
      <p><strong>Item:</strong> ${itemSelecionadoPerda.nome}</p>
      <p><strong>Protocolo:</strong> PERDA-${Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
    </div>
    <div class="email-info">
      <p><strong>O que acontece agora:</strong></p>
      <ul style="text-align: left; margin: 10px 0;">
        <li>Você receberá um e-mail de confirmação</li>
        <li>O almoxarifado analisará seu relatório</li>
        <li>Serão enviadas instruções sobre os próximos passos</li>
        <li>Possível agendamento de reunião para detalhamento</li>
      </ul>
    </div>
  `;
  
  // Simular envio de e-mail (em sistema real, seria uma chamada API)
  console.log('Relatório de perda enviado:', {
    item: itemSelecionadoPerda,
    relatorio: dadosRelatorioPerda
  });
}

// Finalizar relatório de perda
function finalizarRelatorioPerda() {
  alert('Relatório de perda enviado! Verifique seu e-mail.');
  voltarParaAlmoxarifadoPerda();
}

// Resetar dados da perda
function resetarPerda() {
  itemSelecionadoPerda = null;
  dadosRelatorioPerda = {};
  document.getElementById('perda_passo1').style.display = 'block';
  document.getElementById('perda_passo2').style.display = 'none';
  document.getElementById('perda_passo3').style.display = 'none';
  document.getElementById('perda_passo4').style.display = 'none';
  document.getElementById('btnPerdaProximo').disabled = true;
  
  // Limpar formulário
  document.getElementById('email_usuario').value = '';
  document.getElementById('data_perda').value = '';
  document.getElementById('local_perda').value = '';
  document.getElementById('descricao_perda').value = '';
  document.getElementById('confirmacao_perda').checked = false;
  
  // Remover seleções visuais
  document.querySelectorAll('.item-emprestado').forEach(el => {
    el.classList.remove('selecionado');
  });
}