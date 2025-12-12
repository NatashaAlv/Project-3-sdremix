import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const JUSTTCG_KEY = process.env.JUSTTCG_KEY;

app.get("/price", async (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ error: "Missing card name" });

  try {
    const response = await fetch(
      `https://api.justtcg.com/v1/pricing?game=yugioh&name=${encodeURIComponent(name)}`,
      {
        headers: {
          Authorization: `Bearer ${JUSTTCG_KEY}`
        }
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching price" });
  }
});

app.listen(3000, () => console.log("Proxy server running on port 3000"));
