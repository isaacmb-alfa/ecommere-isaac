import { Routes, Route } from 'react-router';
import { Home, Category, Favorite, SingIn, SingUp, Dashboard } from '@/pages';
import Navbar from '@/components/Navbar';
import { useAuthContext } from '@/Hook/useAuthContext';
import { AuthProvider } from '@/context/AuthContext';
import ProtectedRoute from '@/Controller/ProtectedRoute';

function RoutesIndex() {
    const { isAuth } = useAuthContext()
    
    
    return (
        <>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/category' element={<Category />} />
                    <Route path='/favorite' element={isAuth ? <Favorite /> : <SingIn />} />
                    <Route path='/singin' element={<SingIn />} />
                    <Route path='/singup' element={<SingUp />} />
                    <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                </Routes>
            </AuthProvider>
        </>
    )
}

export default RoutesIndex