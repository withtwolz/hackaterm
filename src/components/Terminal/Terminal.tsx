import { useGameLogic } from "@/hooks/useGameLogic";
import { useState } from "react";
import { TerminalSidebar } from "./TerminalSidebar";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalJumbleText } from "./TerminalJumbleText";
import { GameScreen } from "./gameScreen";
import { useFadeIn } from "@/utils/animationUtils";
import { animated } from "@react-spring/web";

export function Terminal() {
	const { state, gameStart, selectText, selectBrackets } = useGameLogic();
	const [hoveredRegion, setHoveredRegion] = useState<{start: number, end: number, text: string} | null>(null);
	const fadeIn = useFadeIn(250);

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

	if (state.currentLevel === 0){
		// MainMenu
		return (
			<GameScreen
			title="Fallout Terminal Hacker"
			subTitle="Hack Computer Terminals. See Fallout sign above terminal for help."
			buttonText="START HACKING"
			onButtonClick={() => gameStart(state.difficulty)}
			screenColor="GREEN"
			buttonColor="NEUTRAL"
			/>
		)
	}

	if (state.gameStatus === "GAME LOST") {
		return (
			<GameScreen 
			title="TERMINAL LOCKED"
			subTitle="try again hacker?"
			buttonText="RETRY"
			onButtonClick={() => gameStart(state.difficulty)}
			screenColor="RED"
			buttonColor="FAIL"
			/>
		)
	} else if (state.gameStatus === "GAME WON") {
		return (
			<GameScreen 
			title="GAME WON"
			subTitle="You have unlocked the epstein files"
			buttonText="PLAY AGAIN?"
			onButtonClick={() => gameStart(state.difficulty)}
			screenColor="GREEN"
			buttonColor="NEUTRAL"
			/>
		)
	} else if (state.gameStatus === "LEVEL WON") {
		return (
			<GameScreen 
			title={`LEVEL ${state.currentLevel - 1} TERMINAL UNLOCKED`}
			subTitle={`Only ${15 - state.currentLevel} levels to unlock the secrets`}
			buttonText={`CONTINUE TO LEVEL ${state.currentLevel}`}
			onButtonClick={() => gameStart(state.difficulty, state.currentLevel)}
			screenColor="GREEN"
			buttonColor="NEUTRAL"
			/>
		)
	} else {
	
		return (
			<>
				<div id="terminal-frame">
					<div id="terminal-inner-frame">
						<animated.div id="terminal-text" style={fadeIn} key={state.currentLevel}>

							<TerminalHeader
								attempts={state.attempts}
								currentLevel={state.currentLevel}
							/>

							<div id="content-area">
								<TerminalJumbleText
									terminalText={state.terminalText}
									handleCharacterClick={handleCharacterClick}
									handleCharacterHover={handleCharacterHover}
									shouldHighlight={shouldHighlight}
								/>

								<TerminalSidebar 
									logHistory={state.logHistory} 
									hoveredText={hoveredRegion?.text || null}
									debug={false}
									password={state.password}
								/>
							</div>
						</animated.div>
					</div>
				</div>
				<div id="controls-box">
					<div id="power"></div>
					<div id="difficulty"></div>
					<div id="reset"></div>
				</div>
			</>
		);
	}
}
