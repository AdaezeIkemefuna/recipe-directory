import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';
import { projectFirebase } from '../../firebase/config';

export default function Create() {
  const [title, setTitle] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [method, setMethod] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [errorInput, setErrorInput] = useState(null);
  const ingredientInput = useRef(null);
  const navigate = useNavigate();

  const handleSubmit =  async (e) => {
      e.preventDefault()
      
      const doc = {title, ingredients, method, cookingTime: cookingTime + " minutes"}

      try {
      await projectFirebase.collection("recipes").add(doc)
      navigate('/')
    } catch(err) {
      console.log(err)
    }
  }

  const addIngredient =  (e) => {
    e.preventDefault()
    const ing = newIngredient.trim() //to take away any spaces at the beginning or any place

    //check to prevent duplication of ingredients
    if(ing && !ingredients.includes(ing)){
      setIngredients(prevIngredients => [...prevIngredients, ing])
      setErrorInput(null)
    } else{
        setErrorInput("*cannot input ingredient twice")
    }
   
    setNewIngredient('')
    ingredientInput.current.focus()
    console.log(ingredients)
  }

  return (
    <div className='create'>
      <h2 className="page-tile">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input 
            type="text" 
            placeholder='title' 
            onChange={(e) => setTitle(e.target.value)}
            value= {title}
            required
          />
        </label>


        <label>
          <span>Ingredients:</span>

          {errorInput && <span className='err'>{errorInput}</span>}
          <div className="ingredients">
            <input type="text" 
            onChange={(e) => setNewIngredient(e.target.value)} 
            value={newIngredient}
            ref = {ingredientInput}
            />
            <button className="btn" onClick={addIngredient}>Add</button>

          </div>
          <p>Current Ingredients: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>

        </label>


        <label>
          <span> Recipe Method:</span>
         <textarea 
            onChange={(e) => setMethod(e.target.value)}   
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking Time (in minutes):</span>
          <input 
          type="number" 
          onChange={(e) => setCookingTime(e.target.value)}
          value={cookingTime}
          required
          />
        </label>

        <button className='btn'>Submit</button>
      </form>
      
    </div>
  )
}
