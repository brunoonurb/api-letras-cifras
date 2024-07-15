import { Router } from "express";
import { CifraClubController } from "../controller/CifraClub.controller.js";
import { CifraClubHttp } from "../http/CifraClub.http.js";
import { CifraClubService } from "../service/CifraClub.service.js";

async function CifraClubRoutes() {
  const cifraClubHttp = new CifraClubHttp();
  const cifraClubService = new CifraClubService();

  const cifraClubController = new CifraClubController(cifraClubHttp, cifraClubService );

  const router = Router();

  router.get("/:artista/:musica", (req, res) =>
    cifraClubController.bascarletraMusica(req, res)
  );

  return router;
}
export { CifraClubRoutes };
