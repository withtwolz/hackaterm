import { useGameLogic } from "@/hooks/useGameLogic";
import { useEffect, useState } from "react";

export function Terminal() {
  const { state, gameStart, selectText } = useGameLogic();
  const [hoveredRegion, setHoveredRegion] = useState<{start: number, end: number} | null>(null);
  // Immediately start game
  useEffect(() => {
    if (state.gameStatus === "GAME START") {
      gameStart(3);
    }
  }, []);

  function handleCharacterClick(charIndex: number) {
    const region = state.clickableRegions?.find(region => 
      charIndex >= region.start && charIndex < region.end
    );
    
    if (region && region.type === 'word') {
      selectText(region.text);
    }
  }
  
  function handleCharacterHover(charIndex: number) {
    const region = state.clickableRegions?.find(region => 
      charIndex >= region.start && charIndex < region.end
    );
    
    setHoveredRegion(region ? { start: region.start, end: region.end } : null);
  }
  
  function shouldHighlight(charIndex: number): boolean {
    if (!hoveredRegion) return false;

    return charIndex >= hoveredRegion.start && charIndex < hoveredRegion.end;
  }
  
  return (
    <div id="outer-terminal">
      <div id="inner-terminal">
        <div id="terminal-text">

          <header id="header">
            WITHTWOLZ INDUSTRIES (TM) TERMINAL PROTOCOL
          </header>

          <section id="attempts">
            Attempts: {" ■ ".repeat(state.attempts)}
          </section>

          <div id="content-area">
            <main id="jumble-text">
              <div id="fill-text">
                {state.terminalText.split('').map((char, index) => (
                  <span
                    key={index}
                    onClick={() => handleCharacterClick(index)}
                    onMouseEnter={() => handleCharacterHover(index)}
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: shouldHighlight(index) ? 'rgba(0, 255, 0, 0.3)' : 'transparent'
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </main>

            <aside id="sidebar">
              <div id="sidebar-log">
                {state.logHistory.map((line, i) => (
                  <div key={i} className="log-line">{line}</div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
