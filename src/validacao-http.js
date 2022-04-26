function geraArrayDeURLs(arrayLinks) {
  //loop para cada {chave: valor}
  //objeto -> [valor]
  //Object.value(objeto) ===== esse metodo recebe um objeto e retorna somente o valor;
  return arrayLinks.map((objetoLink) => Object.values(objetoLink).join());
}

function validaURLs(arrayLinks) {
  return geraArrayDeURLs(arrayLinks);
}

export default validaURLs;
