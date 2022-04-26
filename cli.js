import chalk from "chalk";
import pegaArquivo from "./index.js";

const caminho = process.argv;

async function processaTexto(filepath) {
  const resultado = await pegaArquivo(filepath[2]);
  console.log(chalk.yellow("Lista de links: "), resultado);
}

processaTexto(caminho);