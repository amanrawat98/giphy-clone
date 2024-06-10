import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";
import axios from "axios";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setshowCategories] = useState(false);


  useEffect(() => {
    const fetchGifCategories = async () => {
      try {
        const { data } = await axios.get(
          `https://api.giphy.com/v1/gifs/categories?api_key=${"wApefGvnYgOZKzK2oq38gmzNvqmAQErE"}`
        );
        const { data: newData } = data;
        console.log(newData);
        setCategories(newData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGifCategories();
  }, []);

  return (
    <nav>
      <div className="flex gap-2 justify-between items-center mb-2 relative">
        <Link to="/" className="flex gap-2">
          <img className="w-8" src="/logo.svg" alt="gihly" />
          <p className="text-4xl font-bold tracking-tighter cursor-pointer">
            GIPHY
          </p>
        </Link>

        <div className="flex gap-2">
          {categories?.slice(0, 5).map((item) => {
            return (
              <Link
                className="px-4 py-1 text-2xl hover:gradient border-b-4 hidden lg:block"
                key={item.name}
                to={`/${item.name}`}
              >
                {item.name}
              </Link>
            );
          })}

          <button
            className={`py-1 hover:gradient border-b-4 hidden ${
              showCategories && "gradient"
            } lg:block`}
            onClick={() => setshowCategories(!showCategories)}
          >
            <FaEllipsisV className="pt-2" size={35} />
          </button>

          <div className="bg-gray-600 h-12 px-3 py-2 text-xl sm:hidden md:hidden lg:block xl:block rounded-lg">
            <Link to="/favourites">Favourite GIF</Link>
          </div>

        </div>

       {showCategories &&  <div className="absolute left-0 top-16 gradient w-full z-20  px-9 py-5">
        <span className="text-3xl font-extrabold  "> Categories </span>
        <hr className="bg-white my-5 w-full" />

          { (
            <div className="grid sm:grid-cols-3 md: grid-cols-4 gap-2 lg:grid-cols-3 xl:grid-cols-4 px-4 py-2 text-1xl  ">
             {" "}
              {categories?.map((i) => {
                return (
                  <div className="h-9 text-2xl cursor-pointer flex items-center align-middle font-bold" onClick={() => setshowCategories(!showCategories)}>
                    {" "}
                    <Link to={`/${i.name}}`}>
                    {i.name}
                   </Link> 
                   {" "}
                   
                  </div>
                );
              })}
            </div>
            
          )}
        </div>
}
      </div>
    </nav>
  );
};

export default Header;
