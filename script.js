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