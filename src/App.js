import GitHubIcon from '@mui/icons-material/GitHub';

import Calculator from './components/Calculator';

import './styles/App.scss';

function App() {
  return (
    <div className='PokemonBoxCalculator'>
      <div className='PokemonBoxCalculator__Header'>
        Pokemon GO Box Value Calculator
      </div>
      <div className="App">
        <Calculator />
        <Calculator />
        <Calculator />
      </div>
      <div className='PokemonBoxCalculator__Footer'>
        Built by <a className='PokemonBoxCalculator__Footer__Link' href='https://scottnha.com'>Scott Ha.</a>
        <div className='PokemonBoxCalculator__Footer__Icons'>
          <a className='PokemonBoxCalculator__Footer__Link' href='https://scottnha.com'><GitHubIcon /></a>
        </div>
      </div>
    </div>
  );
}

export default App;
