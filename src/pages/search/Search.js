import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import RecipeList from '../../components/RecipeList';
import './Search.css';

export default function Search() {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q')

  const url = `http://localhost:3000/recipes?q=${query}`
  const {data, isPending, error} = useFetch(url);
  return (
    <div>
      <h2 className='page_title'>Recipes including "{query}"</h2>
      {isPending && <div className='loading'>Loading Resources...</div>}
      {error && <div className='error'>{error}</div>}
       {data && <RecipeList recipes={data} />}
    </div>
  )
}
