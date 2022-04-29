const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function handleError(error) {
  throw new error(error.message);
}

async function checaStatus(arrayURLs) {
  try {
    const arrayStatus = await Promise.all(
      arrayURLs.map(async (url) => {
        const res = await fetch(url);
        return `${res.status} - ${res.statusText}`;
      })
    );
    return arrayStatus;
  } catch (erro) {
    handleError(erro);
  }
}

function geraArrayDeURLs(arrayLinks) {
  return arrayLinks.map((objetoLink) => {
    return Object.values(objetoLink).join();
  });
}

async function validaURLs(arrayLinks) {
  const links = geraArrayDeURLs(arrayLinks);
  const statusLinks = await checaStatus(links);
  const resultados = arrayLinks.map((objeto, index) => {
    return {
      ...objeto,
      status: statusLinks[index],
    };
  });
  return resultados;
}

export default validaURLs;
