import { useGameLogic } from "@/hooks/useGameLogic";
import { useEffect, useState } from "react";
import { TerminalSidebar } from "./TerminalSidebar";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalDisplay } from "./TerminalDisplay";

export function Terminal() {
	const { state, gameStart, selectText, selectBrackets } = useGameLogic();
	const [hoveredRegion, setHoveredRegion] = useState<{start: number, end: number, text: string} | null>(null);
	// Immediately start game
	useEffect(() => {
		if (state.gameStatus === "GAME START") {gameStart(3);}
	}, []);

	function handleCharacterClick(charIndex: number) {
		const region = state.clickableRegions?.find(region => 
			charIndex >= region.start && charIndex < region.end
		);

		if (!region) {return;}
		
		switch(region.type){
			case 'word': selectText(region.text); break;
			case 'bracket': selectBrackets([region.start, region.end]);  break;
			default: break;
		}
	
	}

	function handleCharacterHover(charIndex: number) {
		const region = state.clickableRegions?.find(region => 
			charIndex >= region.start && charIndex < region.end
		);
		
		setHoveredRegion(region ? { start: region.start, end: region.end, text: region.text } : null);
	}

	function shouldHighlight(charIndex: number): boolean {
		if (!hoveredRegion) return false;

		return charIndex >= hoveredRegion.start && charIndex < hoveredRegion.end;
	}

	return (
		<div id="terminal-frame">
			<div id="terminal-inner-frame">
				<div id="terminal-text">

					<TerminalHeader
						attempts={state.attempts}
						currentLevel={state.currentLevel}
					/>

					<div id="content-area">
						<TerminalDisplay
							terminalText={state.terminalText}
							handleCharacterClick={handleCharacterClick}
							handleCharacterHover={handleCharacterHover}
							shouldHighlight={shouldHighlight}
						/>

						<TerminalSidebar 
							logHistory={state.logHistory} 
							hoveredText={hoveredRegion?.text || null}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
