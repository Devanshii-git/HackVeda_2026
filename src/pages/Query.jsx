import { useState } from "react";
import Sidebar from "../components/sidebar";

function Query() {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
<Sidebar />
  const handleSearch = async () => {
    if (!symbol) return;

    setLoading(true);
    setError("");
    setStockData(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/stock/${symbol}`
      );

      const data = await res.json();
      setStockData({
        symbol: data["Global Quote"]["01. symbol"],
        price: data["Global Quote"]["05. price"],
    });
    } catch (err) {
      setError("Failed to fetch stock data");
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200">

      {/* CARD */}
      <div className="relative z-10 bg-white p-8 rounded-xl shadow-xl w-[420px] transition hover:scale-[1.02]">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Stock Query
        </h1>

        {/* INPUT ROW */}
        <div className="flex gap-3">

          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter Stock Symbol (AAPL)"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={handleSearch}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Search
          </button>

        </div>

        {/* STATUS */}

        {loading && (
          <p className="mt-4 text-center text-gray-600">
            Loading...
          </p>
        )}

        {error && (
          <p className="mt-4 text-center text-red-500">
            {error}
          </p>
        )}

        {stockData && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg space-y-2">

            <p>
              <b>Symbol:</b> {stockData.symbol}
            </p>

            <p>
              <b>Price:</b> ${stockData.price}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default Query;
