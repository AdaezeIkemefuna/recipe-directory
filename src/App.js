import './App.css';
import Pages from './Pages';
import { BrowserRouter } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';

function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;