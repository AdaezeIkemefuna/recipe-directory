import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import "./RecipeList.css"
import Trashcan from '../assets/trashcan.svg';
import { projectFirebase } from "../firebase/config";


export default function RecipeList({recipes}) {
  const {mode} = useTheme();
   if (recipes.length === 0){
     return <div className="error">No recipes to load...</div>
   }

   const handleDelete = (id) => {
     projectFirebase.collection('recipes').doc(id).delete()
   }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipe/${recipe.id}`}>Cook This</Link>
          <img 
            className="trash-icon"
            src={Trashcan} 
            alt="trash-icon"
            onClick={() => handleDelete(recipe.id)} />
        </div>
      ))}
        
    </div>
  )
}
