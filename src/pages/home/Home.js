import { useState } from 'react';
import RecipeList from '../../components/RecipeList';
import {useFetch} from '../../hooks/useFetch';
import './Home.css';

export default function Home() {
    const [url] = useState('http://localhost:3000/recipes');
    const { data, isPending, error} = useFetch(url);
  
  return (
    <div className='home'>
      {isPending && <div className='loading'>Loading Resources...</div>}
      {error && <div className='error'>{error}</div>}
       {data && <RecipeList recipes={data} />}
    </div>
  )
}