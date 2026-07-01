import { useEffect, useMemo, useState } from 'react';

const SCREENS = ['welcome', 'feature', 'result'];

function detectEmbedded() {
  try {
    if (window.self !== window.top) return true;
    return new URLSearchParams(window.location.search).get('embed') === '1';
  } catch {
    return true;
  }
}

function WelcomeScreen({ onNext }) {
  return (
    <div className="screen">
      <p className="result-badge">Prototype</p>
      <h1 className="screen-title">Welcome</h1>
      <p className="screen-subtitle">
        TODO: Replace with your app welcome message. Customize this screen in mockup/src/App.jsx.
      </p>
      <div className="card">
        <h3>Your value proposition</h3>
        <p>Short description of what the app helps users accomplish.</p>
      </div>
      <button type="button" className="btn-primary" onClick={onNext}>
        Get started
      </button>
    </div>
  );
}

function FeatureScreen({ onNext, onBack }) {
  return (
    <div className="screen">
      <h1 className="screen-title">Core feature</h1>
      <p className="screen-subtitle">
        TODO: Show your primary user flow or key feature here.
      </p>
      <div className="card">
        <h3>Feature step 1</h3>
        <p>Describe the main interaction users perform.</p>
      </div>
      <div className="card">
        <h3>Feature step 2</h3>
        <p>What happens next in the flow.</p>
      </div>
      <button type="button" className="btn-primary" onClick={onNext}>
        Continue
      </button>
      <button type="button" className="btn-secondary" onClick={onBack}>
        Back
      </button>
    </div>
  );
}

function ResultScreen({ onBack }) {
  return (
    <div className="screen">
      <p className="result-badge">Complete</p>
      <h1 className="screen-title">Results</h1>
      <p className="screen-subtitle">
        TODO: Show the outcome or payoff users get from your app.
      </p>
      <div className="card">
        <h3>Outcome summary</h3>
        <p>Highlight the result, insight, or achievement.</p>
      </div>
      <button type="button" className="btn-primary" onClick={onBack}>
        Start over
      </button>
    </div>
  );
}

export default function App() {
  const isEmbedded = useMemo(() => detectEmbedded(), []);
  const [screen, setScreen] = useState('welcome');

  useEffect(() => {
    if (!isEmbedded) return;
    document.documentElement.classList.add('embed-mode');
    document.body.classList.add('embed-mode');
    return () => {
      document.documentElement.classList.remove('embed-mode');
      document.body.classList.remove('embed-mode');
    };
  }, [isEmbedded]);

  const goWelcome = () => setScreen('welcome');
  const goFeature = () => setScreen('feature');
  const goResult = () => setScreen('result');

  return (
    <div className="app-shell">
      {screen === 'welcome' && <WelcomeScreen onNext={goFeature} />}
      {screen === 'feature' && (
        <FeatureScreen onNext={goResult} onBack={goWelcome} />
      )}
      {screen === 'result' && <ResultScreen onBack={goWelcome} />}

      {!isEmbedded && (
        <nav className="nav-bar" aria-label="Mockup navigation">
          {SCREENS.map((id) => (
            <button
              key={id}
              type="button"
              className={`nav-btn${screen === id ? ' active' : ''}`}
              onClick={() => setScreen(id)}
            >
              {id}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
