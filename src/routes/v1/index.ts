import { Router } from "express";

import authRouter from "./authRoute";
import docsRouter from "./docsRoute";
import userRouter from "./userRoutes";
import categoryRouter from "./categoryRoute";

const appRouter = Router();

// all routes
const appRoutes = [
  {
    path: "/auth",
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
];

appRoutes.forEach(route => {
  appRouter.use(route.path, route.router);
});

export default appRouter;
