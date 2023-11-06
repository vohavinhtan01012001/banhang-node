const swaggerOption = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SHOP SHORT",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}/api`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["src/routes/v1/*.ts", "src/app.ts"],
};
export { swaggerOption };
