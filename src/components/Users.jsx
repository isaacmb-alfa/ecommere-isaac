import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    getAllUsersService, updateUserService, registerUserService, deleteUserService
} from '@/Service/userService';
import { useAuthContext } from '@/Hook/useAuthContext';
import ConfirmationModal from './ConfirmationModal';
import '@/styles/users.scss';

function Users() {
    const { userId } = useAuthContext(); // Obtener el ID del usuario autenticado
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchUsers = async () => {
            const response = await getAllUsersService(token);
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    const onSubmit = async (data) => {
        try {
            if (editingUser) {
                await updateUserService(editingUser.id, data);
                setSuccessMessage('User updated successfully!');
            } else {
                await registerUserService(data);
                setSuccessMessage('User created successfully!');
                setIsCreatingUser(false);
            }
            setEditingUser(null);
            reset();
            const token = localStorage.getItem('token');
            const response = await getAllUsersService(token);
            setUsers(response.data);
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await deleteUserService(id);
            setSuccessMessage('User deleted successfully!');
            const token = localStorage.getItem('token');
            const response = await getAllUsersService(token);
            setUsers(response.data);
        } catch (error) {
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    const confirmDeleteUser = (user) => {
        setUserToDelete(user);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        handleDeleteUser(userToDelete.id);
        setShowModal(false);
    };

    const handleCancelDelete = () => {
        setUserToDelete(null);
        setShowModal(false);
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
        <div className="table-container">
            <h2>Usuarios</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button onClick={() => setIsCreatingUser(true)}>Add User</button>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    onClick={() => setEditingUser(user)}
                                    disabled={user.id === userId}  // Deshabilitar el botón de edición si el usuario es el mismo que el autenticado
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => confirmDeleteUser(user)}
                                    disabled={user.id === userId} // Deshabilitar el botón de eliminación si el usuario es el mismo que el autenticado
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {(editingUser || isCreatingUser) && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>{editingUser ? 'Edit User' : 'Add User'}</h3>
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input
                            id="first_name"
                            type="text"
                            placeholder="First Name"
                            defaultValue={editingUser ? editingUser.first_name : ''}
                            {...register('first_name', { required: 'First Name is required' })}
                        />
                        {errors.first_name && <span className="error">{errors.first_name.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            id="last_name"
                            type="text"
                            placeholder="Last Name"
                            defaultValue={editingUser ? editingUser.last_name : ''}
                            {...register('last_name', { required: 'Last Name is required' })}
                        />
                        {errors.last_name && <span className="error">{errors.last_name.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            defaultValue={editingUser ? editingUser.email : ''}
                            {...register('email', { required: 'Email is required' })}
                        />
                        {errors.email && <span className="error">{errors.email.message}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select id="role" defaultValue={editingUser ? editingUser.role : ''} {...register('role', { required: 'Role is required' })}>
                            <option value="CUSTOMER">Customer</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                        {errors.role && <span className="error">{errors.role.message}</span>}
                    </div>
                    {!editingUser && (
                        <>
                            <div className="form-group">
                                <label htmlFor="gender">Gender</label>
                                <select id="gender" {...register('gender', { required: 'Gender is required' })}>
                                    <option value="">Select Gender</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                    <option value="O">Other</option>
                                </select>
                                {errors.gender && <span className="error">{errors.gender.message}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    {...register('password', { required: 'Password is required' })}
                                />
                                {errors.password && <span className="error">{errors.password.message}</span>}
                            </div>
                        </>
                    )}
                    <div className="form-buttons">
                        <button type="submit">{editingUser ? 'Save' : 'Add'}</button>
                        <button type="button" onClick={() => { setEditingUser(null); setIsCreatingUser(false); reset(); }}>Cancel</button>
                    </div>
                </form>
            )}
            {showModal && (
                <ConfirmationModal
                    message={`¿Deseas borrar al usuario ${userToDelete.first_name} ${userToDelete.last_name}?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
}

export default Users;