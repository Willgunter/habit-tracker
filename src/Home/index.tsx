import { root } from '@lynx-js/react'
import { MemoryRouter, Routes, Route } from 'react-router';

export default function Home() {

    return (
            
            <view className="HomeContent">
          <text className="Title">Gooning</text>
          <text className="Subtitle">Tracker</text>
    
            
          <view className="ButtonContainer">
              <text className="HomeButton" bindtap={() => nav('/home')}>Sessions</text>
              <text className="HomeButton" bindtap={() => nav('/home')}>Stats</text>
              <text className="HomeButton" bindtap={() => nav('/home')}>Detox</text>
          </view>
        </view>
      );
  }

  
root.render(<Home />);
<MemoryRouter>
<Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<App />} />
</Routes>
</MemoryRouter>

if (import.meta.webpackHot) {
    import.meta.webpackHot.accept()
}