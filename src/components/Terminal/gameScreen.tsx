// Generic Non-gaming screens, i.e. menu, game over, useEffect

import { useFadeIn } from "@/utils/animationUtils";
import { animated, useSpring } from "@react-spring/web";

type ScreenColor = 'RED' | 'GREEN';
type ButtonColor = 'FAIL' | 'NEUTRAL';

const SCREENCOLORS: Record<ScreenColor, string> = {
  RED: 'radial-gradient(circle, rgba(171, 54, 54, 0.8) 0%, rgba(87, 31, 31, 0.9) 50%, rgba(39, 16, 16, 1) 100%)',
  GREEN: 'radial-gradient(circle, rgba(55, 89, 66, 1) 20%, rgba(26, 50, 34, 1) 80%, rgba(20, 38, 26, 1) 100%)'
};

const BUTTONCOLORS: Record<ButtonColor, {text: string, background: string}> = {
  FAIL: {text: '#fff', background: 'rgba(55, 0, 0, 1)'},
  NEUTRAL: {text: '#00b884ff', background: '#1a3222'}
};

interface GameScreenProps {
  title: string;
  subTitle?: string;
  buttonText: string;
  onButtonClick: () => void;
  screenColor: ScreenColor;
  buttonColor: ButtonColor;
}
export function GameScreen({
    title, 
    subTitle, 
    buttonText,
    buttonColor,
    onButtonClick, 
    screenColor
}: GameScreenProps) {
    const fadeIn = useFadeIn();

    return (
        <>
			<div id="terminal-frame">
				<div id="terminal-inner-frame">
                    <animated.div 
                    id="terminal-text" 
                    style={{
                        ...fadeIn,
                        background: SCREENCOLORS[screenColor],
                        transition: 'background 2s ease-in-out',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        color: '#fff',
                        height: '100%',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        <h2>{title}</h2>
                        {subTitle &&<p>{subTitle}</p>}
                        <button 
                        onClick={onButtonClick}
                        style={{
                            padding: '2px',
                            fontSize: '20px',
                            cursor: 'pointer',
                            color: BUTTONCOLORS[buttonColor].text,
                            background: BUTTONCOLORS[buttonColor].background,
                            width: '200px',
                            margin: '0 auto',
                            borderRadius: '0'
                        }}
                        >{buttonText}</button>
                    </animated.div>
                </div>
            </div>
            <div id="controls-box">
                <div id="power"></div>
                <div id="difficulty"></div>
                <div id="reset"></div>
            </div>
        </>
    )
}