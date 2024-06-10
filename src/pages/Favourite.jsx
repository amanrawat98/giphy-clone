import React, { useEffect, useState } from 'react';
import { Gifs } from '../context/Context.Gif';
import FilterGifs from '../components/FilterGifs';
import { useParams } from 'react-router-dom';

const Favourite = () => {
  const { gifs, gifsId, setGifsId } = Gifs();
  const [fetchvalue, setFetchvalue] = useState([]);

 const {favourites} = useParams();

  useEffect(() => {
    console.log("Fetching favorite GIFs...", gifsId);
    if (gifsId.length !== 0) {
      console.log("Fetching favorite GIFs...", gifsId);

      const newFetchValue = Array.isArray(gifsId) &&  gifsId?.map((id) => {
        const storedValue = JSON.parse(sessionStorage.getItem(id));
        if (storedValue) {
          console.log("fetched value is", storedValue);
          return storedValue;
        }
        return null;
      }).filter(gif => gif !== null); 

      if (!Array.isArray(gifsId)) {
        setGifsId([id]);
      } else if(fetchvalue?.length == 0) {
        setFetchvalue([newFetchValue]);
      }
      else {
        setFetchvalue((prev)=> [...prev, newFetchValue]);
      }


    }

   // console.log('newFetchValue',newFetchValue);
    console.log("fetchvalue", fetchvalue);

  }, [gifsId, favourites]);

  return (
    <div className='columns-2 md:columns-3 lg:columns-3 xl:columns-3 gap-3 px-1 py-2'>
      {Array.isArray(fetchvalue) && fetchvalue.length !== 0 && fetchvalue?.map((i, index) => (
        <FilterGifs key={index} gif={i} />
      ))}
    </div>
  );
}

export default Favourite;
