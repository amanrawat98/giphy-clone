import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilterGifs from "../components/FilterGifs";
import { Gifs } from "../context/Context.Gif";
import InfiniteScroll from "react-infinite-scroll-component";

const Category = () => {
  const { category } = useParams();
  const { gifs, setGifs } = Gifs();
  const [offsetVal, setOffsetVal] = useState(0);
  const [paginationVal, setPaginationVal] = useState({ total_count: 0 });

  const fetchSearch = async (category, offset) => {
    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY}&q=${category}&limit=25&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`
      );

      const { data, pagination } = response.data;
      if (offset === 0) {
        setGifs(data);
      } else {
        setGifs((prevData) => [...prevData, ...data]);
      }

      setPaginationVal(pagination);
      setOffsetVal((prevOffset) => prevOffset + 25);
      console.log("Fetched data:", data);
      console.log("Pagination:", pagination);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setOffsetVal(0);
    setGifs([]); 
    fetchSearch(category, 0);
    console.log("Category changed:", category);
  }, [category]);

  const fetchMoreData = async () => {
    console.log("Fetching more data with offset:", offsetVal);
    fetchSearch(category, offsetVal);
  };

  return (
    <InfiniteScroll
      dataLength={gifs?.length}
      next={fetchMoreData}
      hasMore={offsetVal < paginationVal?.total_count}
      loader={<h4>Loading...</h4>}
      endMessage={<p>All GIFs loaded</p>}
      scrollableTarget="scrollableDiv"
    >
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 px-11 py-2">
        {Array.isArray(gifs) && gifs?.map((gif, index) => (
          <FilterGifs gif={gif} key={index} />
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default Category;
