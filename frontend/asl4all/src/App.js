import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/ASL4All' element={<Home/>} />
            </Routes>
        </Router>
    )
}