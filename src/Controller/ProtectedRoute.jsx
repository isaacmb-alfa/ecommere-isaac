import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/Hook/useAuthContext';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
    const { isAuth, userPayload, userRole } = useAuthContext();
    const location = useLocation();
    const [shouldRedirect, setShouldRedirect] = useState(false);

    
    useEffect(() => {
        
        // Verificar si el usuario está autenticado y tiene el rol de ADMIN
        if ( userRole !== 'ADMIN') {
            // Establecer el estado para redirigir al usuario a la página de inicio de sesión
            console.log('no autorizado');
            setShouldRedirect(true);
        }
    }, [isAuth, userPayload, userRole]);

    // Si el usuario no está autenticado o no tiene el rol de ADMIN, redirigir
    if (shouldRedirect) {
        return <Navigate to="/singin" state={{ from: location }} replace />;
    }
    console.log(!isAuth , !userPayload , userRole !== 'ADMIN');
    

    // Si el usuario está autenticado y tiene el rol de ADMIN, mostrar el contenido
    return children;
};

export default ProtectedRoute;