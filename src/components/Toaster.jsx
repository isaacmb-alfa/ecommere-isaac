import  { useState, useEffect } from 'react';
import '@/styles/toaster.scss';
const Toaster = ({ message, duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    if (!visible) return null;

    return (
        <div className="toaster" onClick={(e) => e.stopPropagation()}>
            <div className="toaster__message">{message}</div>
            <button className="toaster__close" onClick={onClose}>X</button>
        </div>
    );
};

export default Toaster;
