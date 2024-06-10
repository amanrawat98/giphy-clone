import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Gifs } from "../context/Context.Gif";
import FilterGifs from "../components/FilterGifs";
import { IoLogoInstagram } from "react-icons/io5";
import { LuTwitter } from "react-icons/lu";
import { FaHeart, FaShare, FaFacebook } from "react-icons/fa";
import { ImEmbed2 } from "react-icons/im";
import { GiphyFetch } from "@giphy/js-fetch-api";
import InfiniteScroll from "react-infinite-scroll-component";
import { FaEye } from "react-icons/fa6";

const SingleGif = () => {
  const { type, slug } = useParams();

  const [browserUrl, setbrowerUrl] = useState("");
  const [textcopired, settextCopied] = useState(false);
  let { gifs, setGifs, gifsId, setGifsId, addfavourite } = Gifs();
  const [realtedGifs, setReleatedGifs] = useState([]);
  const [offsetVal, setOffsetVal] = useState(0);
  const [paginationVal, setPaginationVal] = useState({ total_count: 0 });
  const [showPasteBox, setshowPasteBox] = useState(false);

  useEffect(() => {
    const url = window.location.href;
    console.log("page url is", url);
    setbrowerUrl(url);
  }, []);

  useEffect(() => {
    settextCopied(false);
  }, [slug]);

  const copyUrlToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("Copied ...");
        settextCopied(true);
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  const copyUrl = () => {
    const url = window.location.href;
    console.log("page url is", url);
    setbrowerUrl(url);
  };

  const fetchGif = async () => {
    const gifId = slug.split("-");
    const { data } = await axios.get(
      `https://api.giphy.com/v1/gifs/${
        gifId[gifId.length - 1]
      }?api_key=${import.meta.env.VITE_GIPHY}&rating=g`
    );

    let { data: fetchdata } = data;
    setGifs(fetchdata);
    console.log("fetchdata......", fetchdata);

    {
      /* related gifs */
    }

    const gf = new GiphyFetch(`${import.meta.env.VITE_GIPHY}`);
    const { data: gifs, pagination } = await gf.related(
      gifId[gifId.length - 1],
      {
        limit: 25,
        offset: `${offsetVal}`,
      }
    );
    console.log("the PaginationOptions are", pagination);
    setPaginationVal(pagination);
    setReleatedGifs(gifs);
    setOffsetVal((prevOffset) => prevOffset + 25);
  };

  useEffect(() => {
    setOffsetVal(0);
    fetchGif();
  }, [slug]);

  useEffect(() => {
    if (gifs && gifs.id) {
      addfavourite(gifs.id);
      console.log("Added to favorites:", gifs.id);
    }
  }, [gifs]);

  const fetchMoreData = async () => {
    const gifId = slug.split("-");

    const gf = new GiphyFetch(`${import.meta.env.VITE_GIPHY}`);
    const { data: gifs, pagination } = await gf.related(
      gifId[gifId.length - 1],
      {
        limit: 25,
        offset: `${offsetVal}`,
      }
    );

    console.log("the PaginationOptions are", pagination);
    setPaginationVal(pagination);
    setReleatedGifs((prev) => [...prev, ...gifs]);
    setOffsetVal((prevOffset) => prevOffset + 25);
  };

  return (
    <div className="grid grid-cols-4 my-10 mx-9 gap-4">
      <div className="hidden sm:block">
        {gifs?.user && (
          <div className="flex gap-3">
            <img src={gifs?.user?.banner_image} className="w-16 " alt="" />
            <div>
              <h2 className="font-extrabold text-1xl">
                {gifs?.user?.username}
              </h2>
              <h2>{`@${gifs?.user?.username}`}</h2>
            </div>
          </div>
        )}
        <p className=" my-6 text-sm">{gifs?.user?.description}</p>
        <p className="text-1xl font-bold">Follow Us:</p>
        <div className="flex gap-4 mt-5">
          <IoLogoInstagram />
          <FaFacebook />
          <LuTwitter />
        </div>
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-3 flex-col md:flex-row">
          <div className="w-full sm:w-3/4 flex flex-col gap-5">
            <h3 className="mt-2">{gifs?.title}</h3>
            <div className="relative">
              <FilterGifs gif={gifs} className="w-9" />

              {showPasteBox && (
                <div className="w-full h-full bg-black bg-opacity-65 top-0 left-0 absolute p-7 text-center text-1xl ">
                  <p> Want to embed this GIF on your website or blog? </p>
                  <p> Just drop in the embed code below and you're done! </p>

                  <div className=" mt-9 flex flex-col w-full py-3 gap-8 ">
                    <p className="text-2xl font-bold "> Embed Code </p>
                    <div className="flex justify-center">
                      <div className="text-1xl font-extrabold  bg-white pt-2 px-4 text-black">
                        {" "}
                        {browserUrl}{" "}
                      </div>
                      <button
                        onClick={copyUrlToClipboard}
                        className={`${
                          textcopired ? "bg-red-500" : " bg-slate-400"
                        }  text-1xl  px-5 py-3 font-extrabold `}
                      >
                        {textcopired ? "Text Copied!!" : `Copy`}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="mx-6 flex flex-row md:flex-col gap-5 cursor-pointer my-5 md:my-2">
            <div className="flex gap-5 items-center ">
              <FaHeart size={27} />{" "}
              <p className="text-lg " onClick={() => addfavourite(gifs.id)}>
                {" "}
                Favourite{" "}
              </p>
            </div>
            <div className="flex gap-5 items-center cursor-pointer ">
              <FaShare size={23} /> <p className="text-lg"> Share </p>
            </div>
            <div className="flex gap-5 items-center cursor-pointer">
            {showPasteBox ? <FaEye size={27}/> : <ImEmbed2 size={27} />} {" "}
              <p
                className="text-lg cursor-pointer"
                onClick={() => setshowPasteBox(!showPasteBox)}
              >
                {" "}
                Embeded{" "}
              </p>
            </div>
          </div>
        </div>
        <InfiniteScroll
          dataLength={realtedGifs.length}
          next={fetchMoreData}
          hasMore={offsetVal < paginationVal.total_count}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          <div className="font-extrabold columns-2 md:columns-3 lg:columns-3 xl:columns-3  gap-3 px-1 py-2 ">
            {realtedGifs?.map((gifs) => {
              return <FilterGifs gif={gifs} className="w-9" />;
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default SingleGif;
