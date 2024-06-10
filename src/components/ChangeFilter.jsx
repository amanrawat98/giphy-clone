import React from 'react'
import { Gifs } from '../context/Context.Gif';

const ChangeFilter = ({alignLeft=true}) => {
  const filterChange = [
    {
      title:'GIFs',
      value:'gifs',
      background: 'bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500'
    },
    {
      title:'Stickers',
      value:'stickers',
      background: 'bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500'
    },
    {
      title:'Text',
      value:'text',
      background: 'bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500'
    }
  ];

  const {filters, setFilters } = Gifs();


  return ( 
    <div className={`flex ${alignLeft ? "justify-end" : "" } w-full  px-11 py-2 `}> 

    <div className='bg-slate-800 rounded-full flex '
    >
    {filterChange.map((i)=> {
      return <div value={i.value} className={`${ filters == i.value ? i.background : ""} h-13 w-36 text-center cursor-pointer rounded-full text-2xl  py-2 `}
      onClick={(e)=> {setFilters(i.value)}}
      > {i.title}  </div>
    })}
    </div>

    </div>

  )
}

export default ChangeFilter;