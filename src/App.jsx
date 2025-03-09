import '@/styles/style.scss'
import './App.css'
import { BrowserRouter as Router } from 'react-router'
import RoutesIndex from './routes/RoutesIndex'
import { AuthProvider, CartProvider, NavBarProvider, } from './context/index'
import { LogoutProvider } from './context/LogoutProvider'



function App() {


    return (
        <>
            <LogoutProvider>
                <AuthProvider>
                    <CartProvider>
                        <NavBarProvider>
                            <Router>
                                <RoutesIndex />
                            </Router>
                        </NavBarProvider>
                    </CartProvider>
                </AuthProvider>
            </LogoutProvider>
        </>
    )
}

export default App
