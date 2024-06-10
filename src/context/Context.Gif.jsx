import { createContext, useContext, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

const GifContext = createContext();


const GifProvider = ({ children }) => {

  const giphyApiKey = import.meta.env.VITE_GIPHY;

  console.log("Giphy API Key:", import.meta.env.VITE_GIPHY);

  const gf = new GiphyFetch('wApefGvnYgOZKzK2oq38gmzNvqmAQErE');

  const [gifs, setGifs] = useState([]);
  const [filters, setFilters] = useState("gifs");
  const [query, setQuery] = useState("");
  const [apiKey, setApiKey] = useState("wApefGvnYgOZKzK2oq38gmzNvqmAQErE");
  const [gifsId, setGifsId] = useState([]);
  const [favourites, setFavourites] = useState([]);


  const addfavourite = ( gifids) => {
  if(gifsId.includes(gifids)) return;
    if (!Array.isArray(gifsId)) {
      setGifsId([gifids]);
    } else if (gifsId.length === 0) {
      setGifsId([gifids]);
    } else {
      setGifsId((prev) => [...prev, gifids]);
    }
  };


  return (
    <GifContext.Provider
      value={{ gf, gifs, setGifs, filters, setFilters, favourites,query,setQuery, apiKey, gifsId, setGifsId, addfavourite }}
    >
      
      {children}
    </GifContext.Provider>
  );
};

export const Gifs = () => {
  return useContext(GifContext);
};

export default GifProvider;
