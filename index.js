import chalk from "chalk";
import fs from "fs";
import path from "path";

function extraiLinks(texto) {
  const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s]*.[^\s]*)\)/gm;

  const arrayResultados = [];
  let temp;

  while ((temp = regex.exec(texto)) !== null) {
    arrayResultados.push({ [temp[1]]: temp[2] });
  }
  return arrayResultados.length === 0 ? "não há links" : arrayResultados;
}

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, "não existe arquivo no caminho"));
}

{
  // função executada de forma síncrona
  // function pegaArquivo(filepath) {
  //   const encoding = "utf-8";
  //   fs.readFile(filepath, encoding, (erro, texto) => {
  //     if (erro) {
  //       trataErro(erro);
  //     }
  //     console.log(chalk.green(texto));
  //   });
  // }
  // função executada de forma assíncrona
  // function pegaArquivo(filepath) {
  //   const encoding = "utf-8";
  //   fs.promises
  //     .readFile(filepath, encoding)
  //     .then((texto) => console.log(chalk.blue(texto)))
  //     .catch((erro) => trataErro(erro));
  // }
}
// função executada de forma assíncrona utilizando async await
async function pegaArquivo(filepath) {
  const caminhoAbsoluto = path.join(__dirname, "..", filepath);
  const encoding = "utf-8";
  try {
    const arquivos = await fs.promises.readdir(caminhoAbsoluto, { encoding });
    const result = await Promise.all(arquivos.map( async (arquivo) => {
      const localArquivo = `${caminhoAbsoluto}/${arquivo}`;
      const texto = await fs.promises.readFile(localArquivo, encoding);
      return extraiLinks(texto);
    }))
    console.log(result);
  } catch (erro) {
    trataErro(erro);
  }
}

export default pegaArquivo;
