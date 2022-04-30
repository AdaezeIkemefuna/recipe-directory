import { useParams } from 'react-router-dom';
import './Recipe.css';
import { useFetch } from '../../hooks/useFetch'
import { useTheme } from '../../hooks/useTheme';

export default function Recipe() {

  const { id } = useParams();
  const url = `http://localhost:3000/recipes/${id}`
  const { data: recipe, isPending, error } = useFetch(url);
  const {mode} = useTheme()
  

  return (
    <div className={`recipe ${mode}`}>
      {isPending && <div className='loading'>Loading Resources...</div>}
      {error && <div className='error'>{error}</div>}
      {recipe && (
          <>
            <h2 className={`page-title ${mode}`}>{recipe.title}</h2>
            <p>Takes {recipe.cookingTime} to make.</p>
            <ul>
              {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
            </ul>
            <p className='method'>{recipe.method}</p>
          </>
      )}
    </div>
  )
}