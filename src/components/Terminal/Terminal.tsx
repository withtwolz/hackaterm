import { useGameLogic } from "@/hooks/useGameLogic";

export function Terminal() {
  const { state, gameStart, selectText } = useGameLogic();

  return (
    <div id="outer-terminal">
      <div id="inner-terminal">
        <div id="terminal-text">
          <section id="header">
            WITHTWOLZ INDUSTRIES [TM] TERMINAL PROTOCOL
          </section>

          <section id="attempts">
            <p>Attempts: { ' ■ '.repeat(state.attempts) } </p>
          </section>

          <div id="content-area">
            {/* Main text content */}
            <main id="main-text">
              <p>Lots of text goes here... more paragraphs...</p>
            </main>

            {/* Sidebar on the right */}
            <aside id="sidebar">
                <div id="sidebar-log" style={{ marginTop: "auto" }}>Sidebar box</div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
