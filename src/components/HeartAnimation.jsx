import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '@/animation/Animation-heart.json';
import Toaster from '@/components/Toaster.jsx'

const HeartAnimation = ({ productId, userId }) => {
    const [isStopped, setIsStopped] = useState(true);
    const [showToaster, setShowToaster] = useState(false);

    useEffect(() => {
        if (userId) {
            const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (savedFavorites.includes(productId)) {
                setIsStopped(false);
            }
        }
    }, [productId, userId]);

    const handleClick = () => {
        if (!userId) {
            setShowToaster(true);
            setTimeout(() => setShowToaster(false), 3000);
            return;
        }
        setIsStopped(!isStopped);
        const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${userId}`)) || [];
        if (!isStopped) {
            //Elimina el producto de los favoritos
            const updatedFavorites = savedFavorites.filter(id => id !== productId);
            localStorage.setItem(`favorites_${userId}`, JSON.stringify(updatedFavorites));
        } else {
            savedFavorites.push(productId);
            localStorage.setItem(`favorites_${userId}`, JSON.stringify(savedFavorites));
        }

    }

    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };


    return (
        <>
            <div onClick={handleClick}>
                <Lottie
                    options={defaultOptions}
                    isStopped={isStopped}
                    height={100}
                    width={100} />
            </div>
            {showToaster && <Toaster message="Please sign in to like products" onClose={() => setShowToaster(false)} />}
        </>
    );
};

export default HeartAnimation;