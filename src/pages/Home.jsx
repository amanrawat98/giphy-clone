import React, { useEffect, useState } from "react";
import { Gifs } from "../context/Context.Gif";
import FilterGifs from "../components/FilterGifs";
import axios from "axios";
import ChangeFilter from "../components/ChangeFilter";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = () => {
  const { gifs, setGifs, filters } = Gifs();
  const [offsetVal, setOffsetVal] = useState(0);
  const [paginationVal, setPaginationVal] = useState({ total_count: 0 });

  const trendingGf = async () => {
    try {
      const { data: newd } = await axios.get(
        `https://api.giphy.com/v1/${filters}/trending?api_key=${import.meta.env.VITE_GIPHY}&limit=25&offset=${offsetVal}&rating=g&bundle=clips_grid_picker`
      );

      const { data: gifData, pagination } = newd;
      setPaginationVal(pagination);

      setGifs(gifData);
      setOffsetVal((prevOffset) => prevOffset + 25); // Increment offset by 25 for the next page
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setOffsetVal(0);
    trendingGf();
  }, [filters]); // Fetch data when filters change

  const fetchMoreData = async () => {
    try {
      const { data: newd } = await axios.get(
        `https://api.giphy.com/v1/${filters}/trending?api_key=${import.meta.env.VITE_GIPHY}&limit=25&offset=${offsetVal}&rating=g&bundle=clips_grid_picker`
      );

      const { data: gifData, pagination } = newd;
      setPaginationVal(pagination);

      setGifs((prevData) => [...prevData, ...gifData]); 
      setOffsetVal((prevOffset) => prevOffset + 25); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ChangeFilter />
        <InfiniteScroll
          dataLength={Array.isArray(gifs) && gifs?.length}
          next={fetchMoreData}
          hasMore={offsetVal < paginationVal.total_count} 
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
                <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 px-11 py-2">
          { Array.isArray(gifs) && gifs?.map((item,index) => (
            <FilterGifs key={index} gif={item} />
          ))}
          </div>
        </InfiniteScroll>
    </>
  );
};

export default Home;
