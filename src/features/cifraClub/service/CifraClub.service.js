import fs from "fs/promises";

class CifraClubService {
  async formatarPadraoHolyrics(letrasMusica) {
    try {
      const linhas = letrasMusica.split("\n");

      let linhasProcessadas = [];

      // Processando cada linha
      const condicoesDelete = ["[", "Afinação:", "Intro:"];

      for (let i = 0; i < linhas.length; i++) {
        let linhaAtual = linhas[i].trim(); // Remover espaços em branco

        if (condicoesDelete.some((condicao) => linhaAtual.includes(condicao))) {
          i++; // Ignorar a próxima linha
        } else if (linhaAtual.includes("<b>")) {
          // Remove <b> e </b> e adiciona // no início da linha atual
          linhaAtual = linhaAtual.replace(/<b>|<\/b>/g, "");
          linhasProcessadas.push(`// ${linhaAtual}`);
        } else {
          linhasProcessadas.push(linhaAtual);
        }
      }

      // Juntando as linhas processadas em uma string novamente
      const textoProcessado = linhasProcessadas.join("\n");

      return textoProcessado;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async salvahtml(htmlContent, comErro, link) {
    const filePath = "src/html/cifra.html";
    if (comErro) {
      const html = await this.buscarHtmlModelo();
      htmlContent = html.replace("############", link);
    }
    try {
      await fs.writeFile(filePath, htmlContent);
    } catch (err) {
      console.error("\n\n\nErro escrever arquivo", err);
    }
  }

  async buscarHtmlModelo() {
    const filePath = "src/html/PaginaModeloErro.html";

    try {
      const data = await fs.readFile(filePath, "utf8");

      return data;
    } catch (err) {
      console.error("Erro buscar arquivo");
      return "";
    }
  }
}

export { CifraClubService };
