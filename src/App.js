import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import BoxManager from './components/BoxManager';

import './styles/App.scss';

const App = () => {
  return (
    <div className="PokemonBoxCalculator">
      <div className="PokemonBoxCalculator__Header">
        <div className="PokemonBoxCalculator__Header__Left" />
        <div className="PokemonBoxCalculator__Header__Title">
          Pokemon GO Box Value Calculator
        </div>
        <div className="PokemonBoxCalculator__Header__Right"></div>
      </div>
      <div className="App">
        <BoxManager />
      </div>
      <div className="PokemonBoxCalculator__Footer">
        <a
          className="PokemonBoxCalculator__Footer__Section"
          href="https://scottnha.com"
        >
          Built by Scott Ha.
        </a>
        <div className="PokemonBoxCalculator__Footer__Section">
          <a
            className="PokemonBoxCalculator__Footer__Icon"
            href="https://github.com/Scott-N-Ha"
          >
            <FontAwesomeIcon icon={faSquareGithub} />
          </a>
          <a
            className="PokemonBoxCalculator__Footer__Icon"
            href="https://www.linkedin.com/in/hascottn/"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
