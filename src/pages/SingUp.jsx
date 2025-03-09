import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerUserService } from '@/Service/userService';
import '@/styles/form.scss';

function SingUp() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = async (data) => {
        console.log(data);

        try {
            const response = await registerUserService(data);
            console.log('Registration successful:', response.data);
            setSuccessMessage('Registration successful!');
            setErrorMessage('');
            reset();
        } catch (error) {
            console.error('Registration failed:', error);
            setErrorMessage('Registration failed. Please try again.');
            setSuccessMessage('');
        }
    };
    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);
    return (
        <div className="container">
            <div className="form-container">
                <h2>Sign Up</h2>
                {successMessage && <div className="success-message">{successMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            {...register('first_name', { required: 'First Name is required' })}
                        />
                        {errors.first_name && <span className="error">{errors.first_name.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            type="text"
                            {...register('last_name', { required: 'Last Name is required' })}
                        />
                        {errors.last_name && <span className="error">{errors.last_name.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select className='form-group__select' id="gender" {...register('gender', { required: 'Gender is required' })}>
                            <option value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>
                        {errors.gender && <span className="error">{errors.gender.message}</span>}
                    </div>
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
                    <button type="submit" className="form-button">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SingUp