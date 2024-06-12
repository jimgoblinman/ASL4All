import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'
import Feedback from "./pages/feedback"
import Training from "./pages/training"

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/asl4all' element={<Home/>} />
                <Route path="/*" element={<Navigate to="/asl4all" />} />
                <Route path="/feedback" element={<Feedback/>} />
                <Route path="/training" element={<Training/>} />
            </Routes>
        </Router>
    )
}