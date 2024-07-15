import Axios from "axios";

class CifraClubHttp {
  async bascarletraMusica(artista, musica) {
    const BASE_URL = "https://www.cifraclub.com.br";


    
    try {
      const { data } = await Axios.get(
        `${BASE_URL}/${artista}/${musica}/imprimir.html`
      );

      return data;
    } catch (error) {
      console.log(error);
      console.log( `\n\n\n\n ${BASE_URL}/${artista}/${musica}/imprimir.html \n\n\n`);
      return false;
    }
    
  }
}
export { CifraClubHttp };
