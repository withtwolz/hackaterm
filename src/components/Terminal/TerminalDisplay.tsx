// Terminal jumble display

interface DisplayProps {
    terminalText: string;
    handleCharacterClick: (index: number) => void;
    handleCharacterHover: (index: number) => void;
    shouldHighlight: (index: number) => boolean;
}

export function TerminalDisplay({terminalText, handleCharacterClick, handleCharacterHover, shouldHighlight}: DisplayProps) {
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
							backgroundColor: shouldHighlight(index) ? 'rgba(0, 255, 0, 0.3)' : 'transparent'
						}}
					>
						{char}
					</span>
				))}
			</div>
		</main>
    )
}