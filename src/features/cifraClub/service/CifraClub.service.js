class CifraClubService {
  async formatarPadraoHolyrics(letrasMusica) {
    try {
      const linhas = letrasMusica.split("\n");

      let linhasProcessadas = [];

      // Processando cada linha
      for (let i = 0; i < linhas.length; i++) {
        let linhaAtual = linhas[i].trim(); // Remover espaços em branco

        if (linhaAtual.includes("[")) {
          // Adiciona // no início da linha atual e ignora a próxima linha
          linhasProcessadas.push(`// ${linhaAtual}`);
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
}
export { CifraClubService };
