// components/Terminal/Terminal.tsx
import { useGameLogic } from 'hooks/useGameLogic';

export function Terminal() {
  const { state, gameStart, selectText } = useGameLogic();
  
  return (
    <div style={{ 
      fontFamily: 'monospace', 
      padding: '20px',
      display: 'grid',
      gridTemplateColumns: '1fr 300px',
      gap: '20px',
      height: '90vh'
    }}>
      
      {/* Main Terminal Display */}
      <div style={{ 
        backgroundColor: '#000', 
        color: '#00ff00', 
        padding: '15px',
        border: '2px solid #00ff00'
      }}>
        <div>ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</div>
        <div>Attempts Remaining: {state.attempts}</div>
        <div>Level: {state.currentLevel}</div>
        <div style={{ marginTop: '10px', whiteSpace: 'pre-wrap' }}>
          {state.terminalLines.join('\n')}
        </div>
      </div>

      {/* Debug Panel */}
      <div style={{ 
        backgroundColor: '#000000', 
        padding: '15px',
        border: '1px solid #ccc',
        overflow: 'auto'
      }}>
        <h3>Debug View</h3>
        <div>Status: {state.gameStatus}</div>
        <div>XP: {state.xp}</div>
        <div>Password: {state.password}</div>
        
        <button 
          onClick={() => gameStart(3)}
          style={{ margin: '10px 0', padding: '10px' }}
        >
          Start Game (Diff 3)
        </button>
        
        <h4>Available Words:</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {state.availableWords.map(word => (
            <button
              key={word}
              onClick={() => selectText(word)}
              style={{ padding: '5px', fontSize: '12px' }}
            >
              {word}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}