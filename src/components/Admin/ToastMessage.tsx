import React, { useEffect, useState } from 'react';

interface ToastMessageProps {
    message: string;
    onClose: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ message, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 1000); // Give time for the fade-out effect
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            {message}
        </div>
    );
};

export default ToastMessage;
