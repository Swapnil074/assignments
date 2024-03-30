import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signin from './components/Signin'
import Dashboard from './components/Dashboard'
import Send from './components/Send'
import Signup from './components/Signup'

function App() {

  return (
   <Router>
   <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/send" element={<Send/>}/>
   </Routes>
   </Router>
  )
}

export default App
