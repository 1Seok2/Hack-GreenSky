import React, { Component } from 'react';
import '../style/alertModal.css';

interface ModalProps {
    idNum : number,
    contents : string[]
}

const AlertModal = (props : ModalProps) => {
    const onClickClose = () => {
        const thisModal = document.getElementsByClassName('modal-wrapper')[props.idNum];
        thisModal.classList.add('none');
    }
    return (
        <>
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="modal-exit"><a onClick={onClickClose}>X</a></div>
                    <div className="modal-content">
                        <p>{props.contents[0]}</p>
                        <p>{props.contents[1]}</p>
                        <p>{props.contents[2]}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AlertModal;