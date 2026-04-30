const express = require("express");
const cors = require("cors");
const optimizeRoutes = require("./routes/optimize");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Cloud Cost Optimizer API is running." });
});

app.use("/api", optimizeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
