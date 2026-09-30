import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import BoxManager from './components/BoxManager';
import { applyLivePricing } from './lib/ItemLib';
import { fetchLiveItemCosts } from './lib/livePricing';

import './styles/App.scss';

const App = () => {
  const [pricingState, setPricingState] = useState('Loading live pricing…');

  useEffect(() => {
    let isMounted = true;

    fetchLiveItemCosts()
      .then((prices) => {
        if (!isMounted) {
          return;
        }

        applyLivePricing(prices);
        setPricingState('Live GO pricing');
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setPricingState('Fallback pricing');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="PokemonBoxCalculator">
      <header className="PokemonBoxCalculator__Header">
        <div className="PokemonBoxCalculator__Header__Left">
          <span className="PokemonBoxCalculator__Header__Badge">Pokémon GO</span>
        </div>
        <div className="PokemonBoxCalculator__Header__TitleWrap">
          <p className="PokemonBoxCalculator__Header__Eyebrow">Box value insight</p>
          <h1 className="PokemonBoxCalculator__Header__Title">Box Value Calculator</h1>
        </div>
        <div className="PokemonBoxCalculator__Header__Right">
          <span className={`PokemonBoxCalculator__Header__Status ${pricingState === 'Live GO pricing' ? 'is-live' : 'is-fallback'}`}>
            {pricingState}
          </span>
        </div>
      </header>

      <main className="App">
        <BoxManager pricingState={pricingState} />
      </main>

      <footer className="PokemonBoxCalculator__Footer">
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
      </footer>
    </div>
  );
};

export default App;
