import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Recipe.css';
import { useTheme } from '../../hooks/useTheme';
import { projectFirebase } from '../../firebase/config';

export default function Recipe() {
  const { id } = useParams();
  const {mode} = useTheme()

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true)

    const unsub = projectFirebase.collection("recipes").doc(id).onSnapshot((doc) => {
        if(doc.exists){
          setIsPending(false)
          setRecipe(doc.data())
        } else{
          setIsPending(false)
          setError("Could not find recipe")
        }
      })

      return () => unsub();
    }, [id])
    
    const handleDelete = () =>{
      projectFirebase.collection('recipes').doc(id).update({
        title: "Something Different"
      })
    }
  

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
            <button
             onClick={handleDelete}
            >
              Update me
            </button>
          </>
      )}
    </div>
  )
}