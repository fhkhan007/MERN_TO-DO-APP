import './style/app.css'
import NavBar from './components/navbar'
import { Routes, Route } from 'react-router-dom'
import AddTask from './components/AddTask'
import List from './components/List'
import UpdateTask from './components/UpdateTask'
import SignUp from './components/Signup'
import Login from './components/Login'
import Protected from './components/Protected'

function App() {
  return (
    <>
      {/* Show NavBar only when user is logged in */}
      {localStorage.getItem('login') && <NavBar />}

      <Routes>
        {/* Protected Routes */}
        <Route element={<Protected />}>
          <Route path="/" element={<List />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/update/:id" element={<UpdateTask />} />
        </Route>

        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App