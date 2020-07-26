import React from 'react';

interface ModalContentsProps {
    content : string
}

const ModalContent = (props : ModalContentsProps) => {
    return (
        <p>{props.content}</p>
    );    
}

export default ModalContent;