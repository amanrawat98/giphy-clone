import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilterGifs from "../components/FilterGifs";
import { Gifs } from "../context/Context.Gif";
import ChangeFilter from "../components/ChangeFilter";
import InfiniteScroll from "react-infinite-scroll-component";

const Search = () => {
  const { query } = useParams();
  let { gifs, setGifs } = Gifs([]);
  const [offsetVal, setOffsetVal] = useState(0);
  const [paginationVal, setPaginationVal] = useState({ total_count: 0 });

  let fetchSearch = async (query, offsetVal) => {
    console.log("fetching more");
    let { data } = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY}&q=${query}&limit=25&offset=${offsetVal}&rating=g&lang=en&bundle=messaging_non_clips`
    );

    let { data: searchdata, pagination } = data;
    if(offsetVal == 0) {
      setGifs(searchdata);
    } else {
      setGifs((prevData) => [...prevData, ...searchdata]); 

    }

    setPaginationVal(pagination);

    setOffsetVal((prevOffset) => prevOffset + 25); 
  };

  useEffect(() => {
    setGifs([]);
    fetchSearch(query, offsetVal);
  }, [query]);


  return (
    <>
      <h2 className="px-11 py-4 text-4xl font-bold md:text-6xl uppercase ">
        {query}
      </h2>

      <InfiniteScroll
          dataLength={gifs?.length}
          next={()=> {fetchSearch(query, offsetVal)}}
          hasMore={offsetVal < paginationVal?.total_count} 
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 px-11 py-2">

          {Array.isArray(gifs) &&
            gifs?.map((i) => {
              return <FilterGifs gif={i} />;
            })}
      </div>
      </InfiniteScroll>

    </>
  );
};

export default Search;
