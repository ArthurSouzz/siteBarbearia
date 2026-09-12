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