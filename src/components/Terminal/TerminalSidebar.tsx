// Terminal sidebar component and props

interface SidebarProps {
    logHistory: string[];
    hoveredText: string | null;
}

export function TerminalSidebar({logHistory, hoveredText}: SidebarProps) {
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
        </aside>
    )
}