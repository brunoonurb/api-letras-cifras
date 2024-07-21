import express from "express";
import bodyParser from "body-parser";
import { CifraClubRoutes } from "./features/cifraClub/routes/CifraClub.route.js";


async function start() {
  try {
    const app = express();

    app.use(bodyParser.json());

    app.use("/cifraclub", await CifraClubRoutes());

    app.listen(4000, () => {
      console.log("Serviço rodando na porta 4000");
    });
  } catch (erro) {
    console.error("ocorreu um para iniciar o serviço", erro.message);
  }
}

start();
