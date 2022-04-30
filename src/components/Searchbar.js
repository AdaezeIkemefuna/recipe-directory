import './Searchbar.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [term, setTerm] = useState('');
  const navigate = useNavigate('');
  const handleSubmit = (e) => {
      e.preventDefault();

      navigate(`/search/?q=${term}`)
  }

  return (
    <div className='search-bar'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input 
          type="text"
          id='search'
          onChange={(e) => setTerm(e.target.value)}
          value={term}
          required
        />
      </form>
    </div>
  )
}