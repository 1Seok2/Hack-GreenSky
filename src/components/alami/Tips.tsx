import React, { useState } from 'react';

const Tips = () => {
    const onClickTips = () => {
        const modal : any = document.getElementsByClassName('modal-wrapper')[0];
        modal.classList.remove('none');
        modal.classList.add('show');
        // const modal2 : any = document.getElementsByClassName('modal-wrapper')[1];
        // modal2.classList.remove('none');
        // modal2.classList.add('show');
    }

    return (
        <a href="#" onClick={onClickTips} className="btn-tips">
            <i className="icon-lightbulb"></i>
        </a>
    );
}

export default Tips;