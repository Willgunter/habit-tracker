import { useCallback, useEffect, useState } from '@lynx-js/react';
// import { View, Text, Image, TouchableOpacity } from '@lynx-js/react'; // Ensure TouchableOpacity is imported
import './App.css';
import arrow from './assets/arrow.png';
import lynxLogo from './assets/lynx-logo.png';
import reactLynxLogo from './assets/react-logo.png';

export function App() {
    const [alterLogo, setAlterLogo] = useState(false);
    const [activeTab, setActiveTab] = useState<"timer" | "stats" | "detox">("timer"); // TypeScript tab state
    const [time, setTime] = useState(0); // Gooning timer
    const [isGooning, setIsGooning] = useState(false); // Gooning toggle
    const [sessions, setSessions] = useState<number[]>([]); // Session history

    // Log on mount
    useEffect(() => {
        console.info('Hello, ReactLynx');
    }, []);

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isGooning) {
            interval = setInterval(() => setTime((t) => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isGooning]);

    const onTap = useCallback(() => {
        setAlterLogo(!alterLogo);
    }, [alterLogo]);

    const resetGooning = useCallback(() => {
        setSessions([]);
        setTime(0);
    }, []);

    const toggleGooning = useCallback(() => {
        if (isGooning) {
            setSessions([...sessions, time]);
            setTime(0);
        }
        setIsGooning(!isGooning);
    }, [isGooning, time, sessions]);

    const goonScore = sessions.reduce((sum, s) => sum + s, 0) + sessions.length * 10;

    // Tab Content Components
    const TimerTab = () => (
        <view className="Content">
            <text className="Timer">{new Date(time * 1000).toISOString().slice(11, 19)}</text>
            <view className="GoonButton" bindtap={toggleGooning}>
                <text>{isGooning ? "STOP GOONING" : "START GOONING"}</text>
            </view>
            <text className="Description">Tap to track your goon sesh!</text>
        </view>
    );

    const StatsTab = () => (
        <view className="Content">
            <text className="Score">Goon Score: {goonScore}</text>
            <text>Total Sessions: {sessions.length}</text>
            <text>Total Goon Time: {sessions.reduce((sum, s) => sum + s, 0)}s</text>
        </view>
    );

    const DetoxTab = () => (
        <view className="Content">
            <text className="Description">Detox Mode</text>
            <view className="ResetButton" bindtap={resetGooning}>
                <text>Reset All</text>
            </view>
        </view>
    );

    // Render active tab
    const renderContent = () => {
        switch (activeTab) {
            case "timer": return <TimerTab />;
            case "stats": return <StatsTab />;
            case "detox": return <DetoxTab />;
            default: return <TimerTab />;
        }
    };

    return (
        <view className="AppContainer">
            <view className="Background" />
            <view className="App">
                <view className="Banner">
                    <view className="Logo" bindtap={onTap}>
                        {alterLogo ? (
                            <image src={reactLynxLogo} className="Logo--react" />
                        ) : (
                            <image src={lynxLogo} className="Logo--lynx" />
                        )}
                    </view>
                    <text className="Title">Gooning</text>
                    <text className="Subtitle">Tracker</text>
                </view>
                {renderContent()}
            </view>

            {/* Bottom Navigation Bar */}
            <view className="NavBar">
                <view
                    className={`NavItem ${activeTab === "timer" ? "active" : ""}`}
                    bindtap={() => setActiveTab("timer")}
                >
                    <text>Timer</text>
                </view>
                <view
                    className={`NavItem ${activeTab === "stats" ? "active" : ""}`}
                    bindtap={() => setActiveTab("stats")}
                >
                    <text>Stats</text>
                </view>
                <view
                    className={`NavItem ${activeTab === "detox" ? "active" : ""}`}
                    bindtap={() => setActiveTab("detox")}
                >
                    <text>Detox</text>
                </view>
            </view>
        </view>
    );
}