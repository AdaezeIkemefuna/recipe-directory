import { Routes, Route } from 'react-router-dom';

//pages
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Recipe from './pages/recipe/Recipe';
import Search from './pages/search/Search';
import Navbar from './components/Navbar';
import ThemeSelector from './components/ThemeSelector';


export default function Pages() {
  
  return (
    <div>
        <Navbar/>
        <ThemeSelector/>
        <Routes>
            <Route path='/' element= {<Home/>} />
            <Route path='/create' element= {<Create/>} />
            <Route path='/recipe/:id' element= {<Recipe/>} />
            <Route path='/search' element= {<Search/>} />
        </Routes>
    </div>
  )
}
