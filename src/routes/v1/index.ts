import { Router } from "express";

import authRouter from "./authRoute";
import docsRouter from "./docsRoute";
import userRouter from "./userRoutes";
import categoryRouter from "./categoryRoute";
import productRouter from "./productRoute";
import promotionRouter from "./promotionRoute";

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
];

appRoutes.forEach(route => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
