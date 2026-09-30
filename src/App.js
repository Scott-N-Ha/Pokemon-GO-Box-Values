import React, { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import BoxManager from './components/BoxManager';
import { applyLivePricing } from './lib/ItemLib';
import { fetchLiveBoxes, fetchLiveItemCosts } from './lib/livePricing';

import './styles/App.scss';

const App = () => {
  const [pricingState, setPricingState] = useState('Fallback pricing');
  const [pricingVersion, setPricingVersion] = useState(0);
  const [refreshModal, setRefreshModal] = useState({ open: false, progress: 0, step: 'Fetching live pricing' });
  const [liveBoxes, setLiveBoxes] = useState([]);
  const [liveBoxesVersion, setLiveBoxesVersion] = useState(0);

  const refreshLivePricing = useCallback(async () => {
    setRefreshModal({ open: true, progress: 18, step: 'Fetching live pricing' });
    setPricingState('Fetching live pricing…');

    try {
      const [prices, boxes] = await Promise.all([
        fetchLiveItemCosts(),
        fetchLiveBoxes(),
      ]);

      setRefreshModal({ open: true, progress: 45, step: 'Updating current boxes' });
      setPricingState('Updating current boxes…');

      applyLivePricing(prices);
      setPricingVersion((version) => version + 1);

      await new Promise((resolve) => window.setTimeout(resolve, 350));

      setRefreshModal({ open: true, progress: 78, step: 'Populating missing boxes' });
      setPricingState('Populating missing boxes…');
      setLiveBoxes(boxes);
      setLiveBoxesVersion((value) => value + 1);

      await new Promise((resolve) => window.setTimeout(resolve, 350));

      setRefreshModal({ open: true, progress: 100, step: 'Complete' });
      setPricingState('Live GO pricing');

      window.setTimeout(() => {
        setRefreshModal((current) => ({ ...current, open: false }));
      }, 700);
    } catch (error) {
      console.warn('Unable to refresh live pricing:', error);
      setRefreshModal({ open: true, progress: 100, step: 'Refresh failed' });
      setPricingState('Fallback pricing');

      window.setTimeout(() => {
        setRefreshModal((current) => ({ ...current, open: false }));
      }, 900);
    }
  }, []);

  const isProcessing = refreshModal.open || pricingState === 'Fetching live pricing…' || pricingState === 'Updating current boxes…' || pricingState === 'Populating missing boxes…';

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
          <button
            type="button"
            className="PokemonBoxCalculator__RefreshButton"
            onClick={refreshLivePricing}
            disabled={isProcessing}
          >
            {isProcessing ? 'Updating…' : 'Refresh GO pricing'}
          </button>
          <span className={`PokemonBoxCalculator__Header__Status ${pricingState === 'Live GO pricing' ? 'is-live' : 'is-fallback'}`}>
            {pricingState}
          </span>
        </div>
      </header>

      {refreshModal.open && (
        <div className="PokemonBoxCalculator__RefreshModal" role="dialog" aria-modal="true" aria-live="polite">
          <div className="PokemonBoxCalculator__RefreshModalCard">
            <p className="PokemonBoxCalculator__RefreshModal__Eyebrow">Updating Pokémon GO pricing</p>
            <h2>Refreshing live data</h2>
            <div className="PokemonBoxCalculator__RefreshModal__ProgressTrack" aria-hidden="true">
              <span className="PokemonBoxCalculator__RefreshModal__ProgressFill" style={{ width: `${refreshModal.progress}%` }} />
            </div>
            <div className="PokemonBoxCalculator__RefreshModal__Meta">
              <strong>{refreshModal.step}</strong>
              <span>{refreshModal.progress}%</span>
            </div>
          </div>
        </div>
      )}

      <main className="App">
        <BoxManager
          pricingState={pricingState}
          pricingVersion={pricingVersion}
          apiBoxes={liveBoxes}
          apiBoxesVersion={liveBoxesVersion}
        />
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
