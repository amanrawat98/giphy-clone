import React from 'react';
import { Link } from 'react-router-dom';

const FilterGifs = ({gif,hover=true}) => {
  return (
    <Link to={`/${gif.type}/${gif.slug}`}> 
    <div className='rounded-md relative w-full mb-2 '>
    <img src={`${gif?.images?.fixed_width.webp}`} alt={gif.title} className='w-full  object-cover transition-all duration-300 rounded' /> 
    </div>
    </Link>
  )
}

export default FilterGifs;