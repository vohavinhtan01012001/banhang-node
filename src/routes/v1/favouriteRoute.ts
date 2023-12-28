import { Router } from "express";
import { createFavouriteSchema } from "../../validation/favourite";
import validateRequest from "../../middleware/validateRequest";
import { addFavourite, getFavourite } from "../../controllers/favourite";
import requireUser from "../../middleware/requiresUser";

const favouriteRouter = Router();
favouriteRouter.patch(
  "/client/add-favourite",
  validateRequest(createFavouriteSchema),
  requireUser,
  addFavourite
);
favouriteRouter.get("/client/show-favourite/:id", requireUser, getFavourite);

export default favouriteRouter;
