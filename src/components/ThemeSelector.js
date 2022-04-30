import { useTheme } from '../hooks/useTheme';
import './ThemeSelector.css';
import modeIcon from '../assets/mode-icon.svg'



export default function ThemeSelector() {
    const themeColors = ["teal", "crimson", "orange"]

    const {changeColor, changeMode, mode} = useTheme();

    const toggleMenu = () => {
        changeMode(mode === "dark" ? "light" : "dark")
    }
  return (
    <div className='theme-selector'>
        <div className='toggle-icon'>
            <img 
                src={modeIcon} 
                onClick={toggleMenu}
                alt="change background" 
                style={{filter: mode === "dark" ? "invert(100%)" : "invert(20%)"}}
            />
        </div>
        <div className="theme-color">
            {themeColors.map(color => (
                <div
                key={color}
                onClick= {() => changeColor(color)}
                style= {{backgroundColor: color}}
                />
            ))}
        </div>
        
    </div>
  )
}
