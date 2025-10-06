// Terminal jumble display

interface DisplayProps {
    terminalText: string;
    handleCharacterClick: (index: number) => void;
    handleCharacterHover: (index: number) => void;
    shouldHighlight: (index: number) => boolean;
}

export function TerminalJumbleText({terminalText, handleCharacterClick, handleCharacterHover, shouldHighlight}: DisplayProps) {
    return (
        <main id="jumble-text">
			<div id="fill-text">
				{terminalText.split('').map((char, index) => (
					<span
						key={index}
						onClick={() => handleCharacterClick(index)}
						onMouseEnter={() => handleCharacterHover(index)}
						style={{ 
							cursor: shouldHighlight(index) ? 'pointer' : 'normal',
							backgroundColor: shouldHighlight(index) ? 'rgba(0, 255, 0, 0.3)' : 'transparent',
							color: shouldHighlight(index) ? 'rgba(20, 38, 26, 1)' : '#00b884ff',
							fontWeight: shouldHighlight(index) ? 'bold' : 'normal'
						}}
					>
						{char}
					</span>
				))}
			</div>
		</main>
    )
}