import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Test from "./pages/test";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/ASL4All' element={<Home/>} />
                <Route path='/test' element={<Test/>} />
            </Routes>
        </Router>
    )
}