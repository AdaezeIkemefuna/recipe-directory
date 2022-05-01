import { projectFirebase } from '../../firebase/config';
import RecipeList from '../../components/RecipeList';
import './Home.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true)

      const unsub = projectFirebase.collection("recipes").onSnapshot((snapshot) => {
      if(snapshot.empty){
        setError("Could not find any recipes")
        setIsPending(false)
      }else{
        let results = []
        snapshot.docs.forEach((doc) => {results.push({ id: doc.id, ...doc.data() }) })
        setData(results)
        setIsPending(false)
      }
    }, (err) => {
       setError(err);
       setIsPending(false)
    })

    return () => unsub();
  }, [])
  
  return (
    <div className='home'>
      {isPending && <div className='loading'>Loading Resources...</div>}
      {error && <div className='error'>{error}</div>}
       {data && <RecipeList recipes={data} />}
    </div>
  )
}