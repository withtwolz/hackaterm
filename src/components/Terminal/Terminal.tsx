import { useGameLogic } from "@/hooks/useGameLogic";

export function Terminal() {
  const { state, gameStart, selectText } = useGameLogic();
  const jumbled: string = "$%^&*&^%$#$%^&*&^%$#$%^&*^%$#$%^&^%$#$%^&*&^%^&**((*(*&^&^%^%$$######$%^^&^&^".repeat(50)
  const logs: string[] = [
    ">WOW",
    "likeness: 0"
  ]
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
              <pre id="fill-text">{jumbled}</pre>
            </main>

            <aside id="sidebar">
              <div id="sidebar-log">
                {logs.map((line, i) => (
                  <div key={i} className="log-line">{line}</div>
                ))}
              </div>
              <div id="highlighted" aria-label="Highlighted word">
                {state.highlightedText}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
