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
  const crypto = require("crypto");

  const data = req.body.data;

  if (!data) {
    return res.status(400).json({ error: "No data provided" });
  }

  const timestamp = new Date().toISOString();

  const hash = crypto
    .createHash("sha256")
    .update(data + timestamp)
    .digest("hex");

  const proof = {
    version: "1.0",
    proof_id: crypto.randomUUID(),
    timestamp: timestamp,
    hash_algorithm: "sha256",
    data_hash: hash
  };

  res.json(proof);
});
