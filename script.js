// função chamada quando o usuário clica no card de Corte de Cabelo
function mostrarOpcoesCorte() {
  const opcoesCorte = document.getElementById("opcoesCorte"); // pega a seção dos cortes pelo id
  opcoesCorte.classList.toggle("mostrar"); // mostra ou esconde a seção

  // quando abrir os cortes, leva a tela suavemente até eles
  if (opcoesCorte.classList.contains("mostrar")) {
    opcoesCorte.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// função chamada quando o usuário clica no card de Barba
function mostrarOpcoesBarba() {
  const opcoesBarba = document.getElementById("opcoesBarba"); // pega a seção das opções pelo id
  opcoesBarba.classList.toggle("mostrar"); // adiciona ou remove a classe que deixa a seção visível

  // quando abrir as opções, leva a tela suavemente até elas
  if (opcoesBarba.classList.contains("mostrar")) {
    opcoesBarba.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

//função para abrir o menu no botão de menu no celular
function abrirMenu() {
    const navbar = document.querySelector(".navbar"); // seleciona o menu de navegação
    if (navbar.style.display === "block") { // verifica se o menu está visível
        navbar.style.display = "none"; // se estiver visível, esconde o menu
    } else {
        navbar.style.display = "block"; // se estiver escondido, mostra o menu
    }

}

//codigos de validação do formulário

// Seleção dos elementos do DOM
const formulario = document.querySelector("#formAgendamento");
const inputNome = document.querySelector("#nome");
const inputTelefone = document.querySelector("#telefone");
const inputEmail = document.querySelector("#email");


const erroNome = document.querySelector("#erroNome");
const erroTelefone = document.querySelector("#erroTelefone");
const erroEmail = document.querySelector("#erroEmail");
const mensagemSucesso = document.querySelector("#mensagemSucesso");


// Evento de submissão do formulário
formulario.addEventListener("submit", function(event) {
// Impede o envio padrão (evita recarregar a página)
event.preventDefault();
// Limpa mensagens e bordas de erros anteriores
limparErros();
let formularioValido = true;
// Validação do campo Nome
if (inputNome.value.trim() === "") {
exibirErro(inputNome, erroNome, "O campo nome é obrigatório.");
formularioValido = false;
}

// Validação do telefone
if (!validarTelefone(inputTelefone.value.trim())) {
    exibirErro(inputTelefone, erroTelefone, "Informe um telefone válido.");
    formularioValido = false;
}

// Validação do campo E-mail
if (!validarEmail(inputEmail.value.trim())) {
exibirErro(inputEmail, erroEmail, "Informe um endereço de e-mail válido.");
formularioValido = false;
}

// Se todos os campos forem válidos
if (formularioValido) {
    mensagemSucesso.textContent = "✔ Agendamento realizado com sucesso!";
    mensagemSucesso.classList.add("exibir");

    console.log("Mensagem de sucesso executada!");

    formulario.reset();
}
});

// Adiciona o texto de erro e a classe CSS de campo inválido
function exibirErro(input, elementoErro, mensagem) {
elementoErro.textContent = mensagem;
input.classList.add("invalido");
}

// Remove todas as mensagens de erro e estados visuais
function limparErros() {
erroNome.textContent = "";
erroTelefone.textContent = "";
erroEmail.textContent = "";

mensagemSucesso.textContent = "";
mensagemSucesso.classList.remove("exibir");

inputNome.classList.remove("invalido");
inputTelefone.classList.remove("invalido");
inputEmail.classList.remove("invalido");
}

// Testa se a string corresponde ao formato padrão de e-mail
function validarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}
function validarTelefone(telefone) {
    const regexTelefone = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;

    return regexTelefone.test(telefone);
}

const botaoData = document.getElementById("botaoData");
const calendario = document.getElementById("calendario");

const mesAno = document.getElementById("mesAno");
const diasCalendario = document.getElementById("diasCalendario");

const listaHorarios = document.getElementById("listaHorarios");

const dataInput = document.getElementById("dataSelecionada");
const horarioInput = document.getElementById("horarioSelecionado");

const textoData = document.getElementById("textoData");

const hoje = new Date();
hoje.setHours(0, 0, 0, 0);

let mesAtual = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    1
);

let dataEscolhida = null;


// DIAS QUE NÃO ESTÃO DISPONÍVEIS
const diasBloqueados = [
    // Exemplos:
    // "2026-11-24",
    // "2026-11-27"
];


// HORÁRIOS DISPONÍVEIS POR DIA DA SEMANA
// 0 = Domingo, 1 = Segunda, ... 6 = Sábado

const horariosPorDia = {
    0: [],

    1: ["08:00", "09:00", "10:00", "13:00", "14:00", "15:00"],
    2: ["08:00", "09:00", "10:00", "13:00", "14:00", "15:00"],
    3: ["08:00", "09:00", "10:00", "13:00", "14:00", "15:00"],
    4: ["08:00", "09:00", "10:00", "13:00", "14:00", "15:00"],
    5: ["08:00", "09:00", "10:00", "13:00", "14:00", "15:00"],

    6: ["08:00", "09:00", "10:00", "11:00"]
};


// HORÁRIOS QUE NÃO ESTÃO DISPONÍVEIS EM DETERMINADAS DATAS

const horariosBloqueados = {
    // Exemplo:
    // "2026-11-20": ["09:00", "14:00"],
    // "2026-11-21": ["08:00"]
};


// TRANSFORMA A DATA EM AAAA-MM-DD
function formatarData(data) {

    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
}


// ABRIR E FECHAR CALENDÁRIO

botaoData.addEventListener("click", () => {

    calendario.hidden = !calendario.hidden;

    botaoData.setAttribute(
        "aria-expanded",
        String(!calendario.hidden)
    );

});


// GERAR CALENDÁRIO

function gerarCalendario() {

    diasCalendario.innerHTML = "";

    const ano = mesAtual.getFullYear();
    const mes = mesAtual.getMonth();

    const primeiroDia = new Date(ano, mes, 1).getDay();

    const quantidadeDias = new Date(ano, mes + 1, 0).getDate();

    mesAno.textContent = new Intl.DateTimeFormat("pt-BR", {
        month: "long",
        year: "numeric"
    }).format(mesAtual);

    // Desabilitar botão de voltar antes do mês atual
    const mesmoMes =
        ano === hoje.getFullYear() &&
        mes === hoje.getMonth();

    document.getElementById("mesAnterior").disabled = mesmoMes;

    // Espaços antes do primeiro dia do mês
    for (let i = 0; i < primeiroDia; i++) {

        const espaco = document.createElement("span");

        diasCalendario.appendChild(espaco);

    }


    // Criar os dias
    for (let dia = 1; dia <= quantidadeDias; dia++) {

        const data = new Date(ano, mes, dia);

        const dataFormatada = formatarData(data);

        const botao = document.createElement("button");

        botao.type = "button";
        botao.textContent = dia;

        const domingo = data.getDay() === 0;

        const dataPassada = data < hoje;

        const diaBloqueado = diasBloqueados.includes(dataFormatada);

        // Desabilitar dias indisponíveis
        if (domingo || dataPassada || diaBloqueado) {

            botao.disabled = true;

        }

        // Destacar data selecionada
        if (dataEscolhida === dataFormatada) {

            botao.classList.add("selecionado");

        }

        botao.addEventListener("click", () => {

            selecionarData(data);

        });

        diasCalendario.appendChild(botao);

    }

}


// SELECIONAR DATA

function selecionarData(data) {

    dataEscolhida = formatarData(data);

    textoData.textContent = new Intl.DateTimeFormat("pt-BR").format(data);

    dataInput.value = dataEscolhida;

    horarioInput.value = "";

    calendario.hidden = true;

    botaoData.setAttribute("aria-expanded", "false");

    gerarCalendario();

    gerarHorarios(data);

}


// GERAR HORÁRIOS DISPONÍVEIS

function gerarHorarios(data) {

    listaHorarios.innerHTML = "";

    const diaSemana = data.getDay();

    // Horários disponíveis naquele dia
    const horarios = horariosPorDia[diaSemana] || [];

    // Horários que já estão bloqueados
    const bloqueados = horariosBloqueados[dataEscolhida] || [];

    const disponiveis = horarios.filter(
        horario => !bloqueados.includes(horario)
    );


    if (disponiveis.length === 0) {

        listaHorarios.innerHTML =
            "<p>Não há horários disponíveis nesta data.</p>";

        return;

    }


    // Criar um botão para cada horário disponível
    disponiveis.forEach(horario => {

        const botao = document.createElement("button");

        botao.type = "button";
        botao.textContent = horario;

        botao.classList.add("botao-horario");

        botao.addEventListener("click", () => {

            document.querySelectorAll(".botao-horario")
                .forEach(b => b.classList.remove("selecionado"));

            botao.classList.add("selecionado");

            horarioInput.value = horario;

        });

        listaHorarios.appendChild(botao);

    });

}


// NAVEGAÇÃO ENTRE MESES

document.getElementById("mesAnterior").addEventListener("click", () => {

    if (
        mesAtual.getFullYear() === hoje.getFullYear() &&
        mesAtual.getMonth() === hoje.getMonth()
    ) {
        return;
    }

    mesAtual.setMonth(mesAtual.getMonth() - 1);

    gerarCalendario();

});


document.getElementById("proximoMes").addEventListener("click", () => {

    mesAtual.setMonth(mesAtual.getMonth() + 1);

    gerarCalendario();

});


// FECHAR CALENDÁRIO AO CLICAR FORA

document.addEventListener("click", (event) => {

    if (!event.target.closest(".seletor-data")) {

        calendario.hidden = true;

        botaoData.setAttribute("aria-expanded", "false");

    }

});


// INICIAR CALENDÁRIO

gerarCalendario();