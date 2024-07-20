import * as cheerio from "cheerio";

class CifraClubController {
  constructor(http, service) {
    this.http = http;
    this.service = service;
  }

  async bascarletraMusica(req, res) {
    console.log("\n\n\n", "link");

    try {
      let { link } = req.query;

      link = link.replace(".html", "");

      const resultadoDoHtml = await this.http.bascarletraMusica(link);

      if (!resultadoDoHtml) {
        this.service.salvahtml(resultadoDoHtml, true, link);

        return res.status(400).json("Não foi possível extrair letras");
      }
      this.service.salvahtml(resultadoDoHtml);
      const $ = cheerio.load(resultadoDoHtml);
      $(".tablatura").remove();

      const letraMusica = $("pre").html();

      const letrasFormatada = await this.service.formatarPadraoHolyrics(
        letraMusica
      );

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

      return res.status(200).json(resultado);
    } catch (error) {
      res.status(400).json("Erro ao buscar musica");
    }
  }
}
export { CifraClubController };
