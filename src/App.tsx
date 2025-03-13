import { useCallback, useEffect, useState } from '@lynx-js/react';
import './App.css';
import lynxLogo from './assets/lynx-logo.png';
import reactLynxLogo from './assets/react-logo.png';

// Define the session type
interface GoonSession {
  id: string;
  title: string;
  date: string;
  description: string;
  links: string[];
}

export function App() {
    const [alterLogo, setAlterLogo] = useState(false);
    const [activeTab, setActiveTab] = useState<"sessions" | "stats" | "detox">("sessions");
    
    // State for sessions
    const [sessions, setSessions] = useState<GoonSession[]>([
      {
        id: '1',
        title: 'First Session',
        date: '2025-03-10',
        description: 'My first tracked session',
        links: ['https://example.com/link1']
      },
      {
        id: '2',
        title: 'Intense Session',
        date: '2025-03-11',
        description: 'Really got into it this time',
        links: ['https://example.com/link1', 'https://example.com/link2']
      }
    ]);
    
    // Form state for adding new sessions
    const [showAddForm, setShowAddForm] = useState(false);
    const [newSession, setNewSession] = useState<Omit<GoonSession, 'id'>>({
      title: '',
      date: new Date().toISOString().split('T')[0],
      description: '',
      links: ['']
    });

    // Log on mount
    useEffect(() => {
        console.info('Hello, ReactLynx');
    }, []);

    const onTap = useCallback(() => {
        setAlterLogo(!alterLogo);
    }, [alterLogo]);

    const resetSessions = useCallback(() => {
        setSessions([]);
    }, []);

    // Handle form input changes
    const handleInputChange = (field: string, value: string) => {
      setNewSession({
        ...newSession,
        [field]: value
      });
    };

    // Handle link input changes
    const handleLinkChange = (index: number, value: string) => {
      const updatedLinks = [...newSession.links];
      updatedLinks[index] = value;
      setNewSession({
        ...newSession,
        links: updatedLinks
      });
    };

    // Add a new link input field
    const addLinkField = () => {
      setNewSession({
        ...newSession,
        links: [...newSession.links, '']
      });
    };

    // Remove a link input field
    const removeLinkField = (index: number) => {
      const updatedLinks = [...newSession.links];
      updatedLinks.splice(index, 1);
      setNewSession({
        ...newSession,
        links: updatedLinks
      });
    };

    // Submit new session
    const submitNewSession = () => {
      // Filter out empty links
      const filteredLinks = newSession.links.filter(link => link.trim() !== '');
      
      const sessionToAdd: GoonSession = {
        id: Date.now().toString(), // Generate a unique ID
        ...newSession,
        links: filteredLinks
      };
      
      setSessions([...sessions, sessionToAdd]);
      
      // Reset form
      setNewSession({
        title: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
        links: ['']
      });
      
      setShowAddForm(false);
    };

    // Calculate stats
    const totalSessions = sessions.length;
    // const totalLinks = sessions.reduce((sum, session) => sum + session.links.length, 0);

    // Sessions Tab Content
    const SessionsTab = () => (
        <>
        <view className="Content">
            <>
            {showAddForm ? (
                <>
                <view className="AddSessionForm">
                    <text className="FormTitle">Add New Session</text>
                    
                    <view className="FormGroup">
                        <text className="FormLabel">Title:</text>
                        <input
                            type="text"
                            className="FormInput FormTextarea"
                            value={newSession.title}
                            onInput={(e) => handleInputChange('title', e.target.value)}
                            placeholder="Enter session title"
                            />
                    </view>
                    
                    <view className="FormGroup">
                        <text className="FormLabel">Date:</text>
                        <input
                            type="date"
                            className="FormInput FormTextarea"
                            value={newSession.date}
                            onInput={(e) => handleInputChange('date', e.target.value)}
                            />
                    </view>
                    
                    <view className="FormGroup">
                        <text className="FormLabel">Description:</text>
                        <input
                            className="FormInput FormTextarea"
                            value={newSession.description}
                            onInput={(e) => handleInputChange('description', e.target.value)}
                            placeholder="Describe your session"
                            />
                    </view>
                    
                    <text className="FormLabel">Links:</text>
                    {newSession.links.map((link, index) => (
                        <view key={index} className="LinkInputGroup">
                            <input
                                type="url"
                                className="FormInput LinkInput  FormTextarea"
                                value={link}
                                onInput={(e) => handleLinkChange(index, e.target.value)}
                                placeholder="https://..."
                                />
                            <view className="LinkRemoveButton" bindtap={() => removeLinkField(index)}>
                                <text>✕</text>
                            </view>
                        </view>
                    ))}
                    
                    <view className="AddLinkButton" bindtap={addLinkField}>
                        <text>+ Add Another Link</text>
                    </view>
                    
                    <view className="FormActions">
                        <view className="CancelButton" bindtap={() => setShowAddForm(false)}>
                            <text>Cancel</text>
                        </view>
                        <view className="SaveButton" bindtap={submitNewSession}>
                            <text>Save Session</text>
                        </view>
                    </view>
                </view>
                    </>
            ) : (
                <view className="SessionsList">
                    <view className="AddSessionButton" bindtap={() => setShowAddForm(true)}>
                        <text>+ Add New Session</text>
                    </view>
                    
                    {sessions.length === 0 ? (
                        <text className="NoSessions">No sessions recorded yet.</text>
                    ) : (
                        <list className="SessionItems">
                            {sessions.length > 0 && (<>
                            {sessions.map((session) => (
                                <list-item key={session.id} item-key={session.id} className="SessionItem">
                                <text className="SessionTitle">{session.title}</text>
                                <text className="SessionDate">{session.date}</text>
                                <text className="SessionDescription">{session.description}</text>
                                
                                {session.links.length > 0 && (
                                    <view className="SessionLinks">
                                            <text className="LinksLabel">Links:</text>
                                            {session.links.map((link, i) => (
                                                <text key={i} className="SessionLink">{link}</text>
                                            ))}
                                        </view>
                                    )}
                                    </list-item>
                                ))}
                                </>
                           ) }
                        </list>
                    )}
                </view>
            )}
            </>
        </view>
        </>
    );

    const StatsTab = () => (
        <view className="Content">
            <text className="StatsTitle">Session Statistics</text>
            <view className="StatItem">
                <text className="StatLabel">Total Sessions:</text>
                <text className="StatValue">{totalSessions}</text>
            </view>
            <view className="StatItem">
                <text className="StatLabel">Total Saved Links:</text>
                {/* <text className="StatValue">{totalLinks}</text> */}
            </view>
            <view className="StatItem">
                <text className="StatLabel">Most Recent Session:</text>
                <text className="StatValue">
                    {sessions.length > 0 
                        ? sessions[sessions.length - 1].title 
                        : 'None'}
                </text>
            </view>
        </view>
    );

    const DetoxTab = () => (
        <view className="Content">
            <text className="Description">Detox Mode</text>
            <text className="DetoxDescription">
                Clear all your session history and start fresh.
            </text>
            <view className="ResetButton" bindtap={resetSessions}>
                <text>Reset All Sessions</text>
            </view>
        </view>
    );

    // Render active tab
    const renderContent = () => {
        switch (activeTab) {
            case "sessions": return <SessionsTab />;
            case "stats": return <StatsTab />;
            case "detox": return <DetoxTab />;
            default: return <SessionsTab />;
        }
    };

    // Icons for nav items
    const getNavIcon = (tab: "sessions" | "stats" | "detox") => {
        switch (tab) {
            case "sessions": return "📝";
            case "stats": return "📊";
            case "detox": return "🧹";
            default: return "";
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

            {/* Mobile-friendly Bottom Navigation Bar */}
            <view className="MobileNavBar">
                {["sessions", "stats", "detox"].map((tab) => (
                    <view 
                        key={tab}
                        className={`NavItem ${activeTab === tab ? "active" : ""}`}
                        bindtap={() => setActiveTab(tab as "sessions" | "stats" | "detox")}
                    >
                        <text className="NavIcon">{getNavIcon(tab as "sessions" | "stats" | "detox")}</text>
                        <text className="NavLabel">{tab.charAt(0).toUpperCase() + tab.slice(1)}</text>
                    </view>
                ))}
            </view>
        </view>
    );
}