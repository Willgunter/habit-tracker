import { root } from '@lynx-js/react'
import { MemoryRouter, Routes, Route } from 'react-router';
import Home from './Home/index.js'
import { App } from './App.js'

root.render(
    <MemoryRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<App />} />
        </Routes>
    </MemoryRouter>,
);

if (import.meta.webpackHot) {
    import.meta.webpackHot.accept()
}
