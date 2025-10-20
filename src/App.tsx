import { Terminal } from './components/Terminal/Terminal';
import './App.css';

function App() {
  return (
    <div>
      <div id="h1-box">
        <h1>
          <a rel="help" href="https://fallout.fandom.com/wiki/Hacking#Overview" target='_blank' style={{cursor: 'help'}}>Fallout Terminal Hacking</a>
        </h1>
      </div>
      <Terminal />
    </div>
  );
}

export default App;