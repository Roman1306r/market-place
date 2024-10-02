import { useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Preloader from './components/Preloader/Preloader'
import Catalog from './components/Catalog/Catalog'
import About from './components/About/About'
import Clients from './components/Clients/Clients'
import Error from './components/Error/Error'
import Login from './components/Login/Login'
import useCustomContext from './hooks/useCustomContext'
import Posts from './components/Posts/Posts'
import Contacts from './components/Contacts/Contacts'
import BasicSpeedDial from './components/SpeedDial/SpeedDial'
import Basket from './components/Basket/Basket'
import Up from './components/Up/Up'
import Favorite from './components/Favorite/Favorite'
import Deliveries from './components/Deliveries/Deliveries'

function App() {

  const { preloader, setPreloader, setBasket, setFavorite } = useCustomContext()

  useEffect(() => {
    window.addEventListener('load', () => setPreloader(false))
    setBasket(localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket') ?? '') : [])  
    setFavorite(localStorage.getItem('favorite') ? JSON.parse(localStorage.getItem('favorite') ?? '') : [])  
  }, [])

  return (<HashRouter>
            <Up />
            {preloader && window.innerWidth > 1050 && <Preloader />}
            <BasicSpeedDial />
            <div className='app'>
              <Header />
              <main className='main'>
                <Routes>
                  <Route path='/' element={<Main />} />
                  <Route path='/catalog/*' element={<Catalog />}  />
                  <Route path='/clients/*' element={<Clients />} />
                  <Route path='/contacts' element={<Contacts />} />
                  <Route path='/posts/*' element={<Posts />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/basket/*' element={<Basket />}  />
                  <Route path='/favorits' element={<Favorite />}  />
                  <Route path='/delivery' element={<Deliveries />}  />
                  <Route path='/about' element={<About />} />
                  <Route path='*' element={<Error />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </HashRouter>)
}
export default App