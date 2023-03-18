import '../styles/globals.css'
import '../styles/style.css'
import '../styles/dashBoard.css'
// import Navbar from './components/Navbar'
import Dashboard from '../pages/dashBoard/index'

function MyApp({Component, pageProps }) {
  return (
   <div>
    <Dashboard/>
    {/* <Component {...pageProps} /> */}
   </div> 
  )
}

export default MyApp
