import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

/* Test route */
app.get("/", (req, res) => {
  res.send("Backend running");
});

/* Stock API Route */
app.get("/api/stock/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;

    const response = await axios.get(
      "https://www.alphavantage.co/query",
      {
        params: {
          function: "GLOBAL_QUOTE",
          symbol: symbol,
          apikey: process.env.ALPHA_KEY
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
