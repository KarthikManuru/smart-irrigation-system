require("dotenv").config();

const express = require("express");
const weatherRoutes = require("./weatherRoutes");

const app = express();

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "weather-api",
  });
});

app.use("/api/weather", weatherRoutes);

const PORT = process.env.PORT || 4001;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Weather API running at http://localhost:${PORT}`);
  });
}

module.exports = app;
