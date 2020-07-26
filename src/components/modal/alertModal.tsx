import React, { Component } from 'react';
import ModalContent from './ModalConents';
import '../../style/alertModal.css';

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
                        {props.contents.map((value) => {
                            return <ModalContent key={value} content={value}/>
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default AlertModal;