function BtnAdd() {
    // Cria um novo parágrafo
    var newParagraph = document.createElement("p");
    var paragraphText = document.createTextNode("Este é um novo parágrafo!");
    newParagraph.appendChild(paragraphText);

    // Cria um novo input
    var newInput = document.createElement("input");
    newInput.type = "text";

    // Adiciona o novo parágrafo e input à div
    var div = document.getElementById("content");
    div.appendChild(newParagraph);
    div.appendChild(newInput);
  }

  // Adiciona um listener de evento ao botão
  var button = document.getElementById("btnAdd");
  button.addEventListener("click", addParagraphAndInput);