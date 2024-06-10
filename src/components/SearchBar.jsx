import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { Gifs } from "../context/Context.Gif";
import { RxCrossCircled } from "react-icons/rx";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
 let {query,setQuery} = Gifs();
  const navigate = useNavigate();

  const searchGifs = ()=> {
    if(query?.trim() === '') return;
    navigate(`/search/${query}`);
    setQuery('');
    }
  
    const removeQuery = ()=> {
      if(query?.trim() === '') return;
      setQuery('');
    }

  return (
    <div className="w-full flex relative mt-4 ">
    <input
        type="text"
        value={query}
        placeholder="Search Gif and Stickers"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        className="   text-black w-full sm:text-2xl md:text-4xl lg:text-4xl xl:text-4xl px-6 py-3"
      />

      <button onClick={searchGifs} className=" bg-gradient-to-r from-pink-600 to-pink-400 text-2xl px-4 py-2 font-bold ">
      <IoSearch size={35} className="-scale-x-100" />
      </button>

      <RxCrossCircled size={30} className="absolute top-5 left-[82rem] text-black cursor-pointer" onClick={removeQuery} />
    </div>

  );
};

export default SearchBar;
