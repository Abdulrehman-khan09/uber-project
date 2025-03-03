import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignUp from './pages/CaptainSignUp'
import UserHome from './pages/UserHome'
import UserProtected from './pages/protection/userProtected'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtected from './pages/protection/CaptainProtected'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/user-login" element={<UserLogin/>} />
          <Route path="/user-signup" element={<UserSignup/>} />
          <Route path="/captain-login" element={<CaptainLogin/>} />
          <Route path="/captain-signup" element={<CaptainSignUp/>} />
          <Route path="/user-riding" element={<Riding/>} />
          <Route path="/captain-riding" element={<CaptainRiding/>} />
          // protecting home route
          <Route path='/user-home' element={<UserProtected>
            <UserHome/>
          </UserProtected>} />
          // route to handle logout
          <Route path='/user/logout' element={<UserProtected>
            <UserLogout/>
          </UserProtected>} />
          // protecting cap-home route
          <Route path='/captain-home' element={<CaptainProtected>
            <CaptainHome/>
          </CaptainProtected>} />

          <Route path='/captain/logout' element={<CaptainProtected>
            <CaptainLogout/>
          </CaptainProtected>} />

        </Routes>
    </div>
  )
}

export default App
