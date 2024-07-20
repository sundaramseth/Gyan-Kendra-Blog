import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Search from './pages/Search'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import CreatePost from './pages/CreatePost'
import PrivateRouteAdmin from './components/PrivateRouteAdmin'

export default function App() {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route element={<PrivateRoute />}>
      <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route element={<PrivateRouteAdmin/>}>
       <Route path='/create-post' element={<CreatePost/>} />
      </Route>
      <Route path='/projects' element={<Projects />} />
      <Route path='/search' element={<Search />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  );
}
