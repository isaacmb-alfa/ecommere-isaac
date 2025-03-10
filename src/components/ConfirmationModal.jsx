import '@/styles/confirmationModal.scss';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="modal-confirmation__overlay">
            <div className="modal-confirmation__content">
                <p>{message}</p>
                <div className="modal-confirmation__buttons">
                    <button className="modal-confirmation__button--confirm" onClick={onConfirm}>Sí</button>
                    <button className="modal-confirmation__button--cancel" onClick={onCancel}>No</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
