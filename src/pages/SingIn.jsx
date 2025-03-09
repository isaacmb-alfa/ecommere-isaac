import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUserService } from '@/Service/userService';
import { useAuthContext } from '@/Hook/useAuthContext';
import { useCartContext } from '@/context/CartContext';
import '@/styles/form.scss';

function SingIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { login, userRole } = useAuthContext();
    const { loadCart } = useCartContext();

    const onSubmit = async (data) => {
        try {
            const response = await loginUserService(data);
            if (response.status === 200) {
                const userAuth = response.data.user.email;
                const userId = response.data.user.id; // Obtener el ID del usuario
                console.log('Login successful:', response.data);
                localStorage.setItem('activeUser', userAuth);
                localStorage.setItem('userId', userId); // Guardar el ID del usuario en localStorage
                login(response.data.token);
                loadCart(); // Cargar los elementos guardados en el carrito
                console.log('userRole:', userRole);

                // Redirigir al usuario al home inmediatamente después de loguearse
                navigate('/');

                // Si el usuario es ADMIN, redirigir al dashboard
                if (response.data.user.role === 'ADMIN') {
                    navigate('/dashboard');
                }
            }

        } catch (error) {
            console.error('Login failed:', error);

        }
    };

    return (
        <>
            <div className="container">
                <div className="form-container">
                    <h2>Sign In</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                            />
                            {errors.email && <span className="error">{errors.email.message}</span>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                {...register('password', { required: 'Password is required' })}
                            />
                            {errors.password && <span className="error">{errors.password.message}</span>}
                        </div>
                        <button type="submit" className="form-button">Sign In</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SingIn;