import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";
import "./css/App.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(11);
  const api_url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${pageSize}&page=1&sparkline=false`;

  useEffect(() => {
    axios
      .get(api_url)
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, [api_url, pageSize]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
        </form>
      </div>
      <div className="coin-search">
        <h1 className="coin-page-text"> Page Size</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={handlePageSizeChange}
            placeholder="Search"
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      })}
    </div>
  );
}

export default App;
