// Terminal Header component

import type { Level } from "@/types/game"

interface HeaderProps {
    attempts: number;
    currentLevel: Level;
}

export function TerminalHeader({attempts, currentLevel}: HeaderProps) {
    return (
        <>
			<header id="header">
				WITHTWOLZ INDUSTRIES (TM) TERMINAL PROTOCOL
			</header>
			<section id="level">
				Level: {currentLevel}
			</section>
			<section id="attempts">
				Attempts: {" ■ ".repeat(attempts)}
			</section>
		</>
    )
}