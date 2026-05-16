import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import LoginPage from './Pages/LoginPage/LoginPage';
import ProfilePage from './Pages/Profile/ProfilePage';
import { ShortURL } from './Pages/ShortURL/ShortURL';
import { URLHistory } from './Pages/ShortURL/MyURLs.jsx';
import './index.css';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import { HeaderMegaMenu } from './Components/Navbar/HeaderMegaMenu';


function App() {
  return (
    <Router>
        <HeaderMegaMenu/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<LoginPage/>} />
            <Route element={<PrivateRoute/>}>
              <Route path='/profile' element={<ProfilePage/>}/>
              <Route path='/url/shortener' element={<ShortURL/>}/>
              <Route path='/url/my-urls' element={<URLHistory/>}/>
            </Route>
        </Routes>
    </Router>
  )
}

export default App
