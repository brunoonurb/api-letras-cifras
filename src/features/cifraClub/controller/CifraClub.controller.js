// const cheerio = require('cheerio')
import * as cheerio from "cheerio";

class CifraClubController {
  constructor(http, service) {
    this.http = http;
    this.service = service;
  }

  async bascarletraMusica(req, res) {

    console.log('\n\n\n',"link");

    try {
      let { artista, musica } = req.params;
      let { link } = req.query;

      console.log('\n\n\n',link);

      const artistaFormatado = artista.toLowerCase().replace(/\s+/g, "-");
      const musicaFormatado = musica.toLowerCase().replace(/\s+/g, "-");

      const resultadoDoHtml = await this.http.bascarletraMusica(
        artistaFormatado,
        musicaFormatado
      );

      const $ = cheerio.load(resultadoDoHtml);
      $(".tablatura").remove();

      const letraMusica = $("pre").html();
      // console.log(letraMusica);

      const letrasFormatada = await this.service.formatarPadraoHolyrics(
        letraMusica
      );

      // console.log("letrasFormatada", letrasFormatada);
      if (!letrasFormatada) {
        return res.status(400).json("Não foi possível extrair letras");
      }

      const resultado = {
        type: "exact",
        art: {
          id: "01",
          name: artista,
          url: `https://www.cifraclub.com.br/${artista}/${musica}/imprimir.html`,
        },
        mus: [
          {
            id: "01",
            name: musica,
            url: `https://www.cifraclub.com.br/${artista}/${musica}/imprimir.html`,
            lang: 1,
            text: letrasFormatada,
          },
        ],
        badwords: false,
      };

      console.log('\n\n\n',link);
      return res.status(200).json(resultado);
      res.json();

      return res.status(404).json({
        message: "Nenhum usuário encontrado",
      });

      const usuarios = await this.http.bascarletraMusica();

      // se não tivermos usuários para listar vamos retornar o status de
      // erro 404 (NOT FOUND | NÃO ENCONTRADO), com a mensagem de nenhum usuário encontrado
      if (!usuarios.length) {
        res.status(404).json({
          message: "Nenhum usuário encontrado",
        });
        return;
      }

      // retorna status de sucesso e a lista de usuários
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(400).json("Erro ao buscar musica");
    }
  }
}
export { CifraClubController };
