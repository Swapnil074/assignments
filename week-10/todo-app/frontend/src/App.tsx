import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login/Login'
import List from './components/List/List'
import './App.css'

function App() {

  return (
    <Router>
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/todo" element={<List/>}/>
     </Routes>
    </Router>
  )
}

export default App
