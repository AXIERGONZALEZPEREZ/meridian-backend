import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "Meridian Backend Running" });
});

app.post("/hash", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: "No data provided" });
  }

  const hash = crypto.createHash("sha256").update(data).digest("hex");

  res.json({ hash });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Meridian backend running on port ${PORT}`);
});
