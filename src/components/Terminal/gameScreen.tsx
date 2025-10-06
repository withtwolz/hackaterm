// Generic Non-gaming screens, i.e. menu, game over, useEffect

type ScreenColor = 'RED' | 'GREEN';

const SCREENCOLORS: Record<ScreenColor, string> = {
  RED: 'radial-gradient(circle, rgba(139, 0, 0, 0.8) 0%, rgba(80, 0, 0, 0.9) 50%, rgba(40, 0, 0, 1) 100%)',
  GREEN: 'radial-gradient(circle, rgba(55, 89, 66, 1) 20%, rgba(26, 50, 34, 1) 80%, rgba(20, 38, 26, 1) 100%)'
};

interface GameScreenProps {
  title: string;
  subTitle?: string;
  buttonText: string;
  onButtonClick: () => void;
  screenColor: ScreenColor;
}
export function GameScreen({
    title, 
    subTitle, 
    buttonText, 
    onButtonClick, 
    screenColor
}: GameScreenProps) {
    return (
        <>
			<div id="terminal-frame">
				<div id="terminal-inner-frame">
                    <div id="terminalText" style={{
                        // TODO: in the process of moving gameScreens based on gameStatus
                        background: SCREENCOLORS[screenColor]
                        }}>
                        <h2>{title}</h2>
                        {subTitle &&<p>{subTitle}</p>}
                        <button onClick={onButtonClick}>{buttonText}</button>
                    </div>
                </div>
            </div>
        </>
    )
}