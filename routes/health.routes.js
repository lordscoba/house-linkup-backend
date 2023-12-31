const health = require("../controllers/users/health.controllers");
const healthRoutes = require("express").Router();

healthRoutes.get("/health", health.Get);
healthRoutes.post("/health", health.Post);

module.exports = healthRoutes;
