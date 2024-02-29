import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home'
import Feedback from "./pages/feedback"

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/ASL4All' element={<Home/>} />
                <Route path="/*" element={<Navigate to="/asl4all" />} />
                <Route path="/feedback" element={<Feedback/>} />
            </Routes>
        </Router>
    )
}