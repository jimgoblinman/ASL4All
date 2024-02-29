import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/asl4all' element={<Home/>} />
                <Route path="/*" element={<Navigate to="/asl4all" />} />
            </Routes>
        </Router>
    )
}