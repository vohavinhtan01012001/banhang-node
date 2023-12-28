import { Router } from "express";

import authRouter from "./authRoute";
import docsRouter from "./docsRoute";
import userRouter from "./userRoutes";
import categoryRouter from "./categoryRoute";
import productRouter from "./productRoute";
import promotionRouter from "./promotionRoute";
import sizeRouter from "./sizeRoute";
import orderRoute from "./orderRoute";
import favouriteRouter from "./FavouriteRoute";

const appRouter = Router();

// all routes
const appRoutes = [
  {
    path: "/authorization",
    router: authRouter,
  },
  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/docs",
    router: docsRouter,
  },
  {
    path: "/category",
    router: categoryRouter,
  },
  {
    path: "/product",
    router: productRouter,
  },
  {
    path: "/promotion",
    router: promotionRouter,
  },
  {
    path: "/size",
    router: sizeRouter,
  },
  {
    path: "/order",
    router: orderRoute,
  },
  {
    path: "/favourite",
    router: favouriteRouter,
  },
];

appRoutes.forEach(route => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
