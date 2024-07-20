import Axios from "axios";

class CifraClubHttp {
  async bascarletraMusica(link) {
    try {
      const { data } = await Axios.get(`${link}/imprimir.html`);

      return data;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
export { CifraClubHttp };
