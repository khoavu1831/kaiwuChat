import { BrowserRouter, Route, Routes } from 'react-router'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import ChatAppPage from './pages/ChatAppPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
// import Main from './components/main/Main'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* public routes: '/signin', '/signup' */}

          <Route
            path='/signin'
            element={<SignInPage />}
          />

          <Route
            path='/signup'
            element={<SignUpPage />}
          />

          {/* protected routes: '/' */}
          <Route element={<ProtectedRoute />} >
            <Route
              path='/'
              element={<ChatAppPage />}
            />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App