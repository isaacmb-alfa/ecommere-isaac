import { useEffect, useState } from "react";
import CardComponent from "./CardComponent";

function CardAnimated({ product, index, onClick, userId }) {
    const animations = ['fadeIn', 'fadeInLeft', 'fadeInRight', 'fadeInDown', 'fadeInRandom']; // Lista de animaciones disponibles
    const [animationName, setAnimationName] = useState('');

    useEffect(() => {
        // Selecciona una animación aleatoria
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        setAnimationName(randomAnimation);

        // Aplica un retardo entre cada card
        const delay = index * 0.3; 

        const card = document.querySelector(`[data-key="${product.id}"]`);
        if (card) {
            card.style.animation = `${randomAnimation} 0.5s ease-in-out ${delay}s forwards`;
            card.style.opacity = '0'; // Inicialmente invisible
        }
    }, [index, product.id]);

    return (
        <div
            className="card__modal"
            data-key={product.id}
            onClick={onClick}
        >
            <CardComponent
                productId={product.id}
                userId={userId}
                nameProduct={product.product_name}
                img={product.image}
                price={product.price}
                description={product.description}
            />
        </div>
    );
}

export default CardAnimated;