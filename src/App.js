import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub } from '@fortawesome/free-brands-svg-icons';

import Box from './components/Box';

import './styles/App.scss';

const App = () => {
  return (
    <div className='PokemonBoxCalculator'>
      <div className='PokemonBoxCalculator__Header'>
        <div className='PokemonBoxCalculator__Header__Left' />
        <div className='PokemonBoxCalculator__Header__Title'>
          Pokemon GO Box Value Calculator
        </div>
        <div className='PokemonBoxCalculator__Header__Right'>
          
        </div>
      </div>
      <div className="App">
        <Box />
        <Box />
        <Box />
      </div>
      <div className='PokemonBoxCalculator__Footer'>
        <a className='PokemonBoxCalculator__Footer__Section' href='https://scottnha.com'>Built by Scott Ha.</a>
        <div className='PokemonBoxCalculator__Footer__Section'>
          <a className='PokemonBoxCalculator__Footer__Icon' href='https://github.com/Scott-N-Ha'><FontAwesomeIcon icon={faSquareGithub} /></a>
        </div>
      </div>
    </div>
  );
}

export default App;
