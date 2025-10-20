// Terminal sidebar component and props

interface SidebarProps {
    logHistory: string[];
    hoveredText: string | null;
    debug?: boolean | false;
    password?: string | null;
}

export function TerminalSidebar({logHistory, hoveredText, debug, password}: SidebarProps) {
    return (
        <aside id="sidebar">
            <div id="sidebar-log">
                {logHistory.map((line, i) => (
                    <div key={i} className="log-line">{line}</div>
                ))}
            </div>
            <div id="hover-box">
                 &gt; {hoveredText || ""}
            </div>
            {debug && password && (
                <div id="debug-box">
                 &gt; DEBUG: {password}
                </div>
            )}
        </aside>
    )
}