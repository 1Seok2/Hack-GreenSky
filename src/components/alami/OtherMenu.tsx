import React, { useState } from 'react';

interface OtherMenuProps{
    bgColor : string
}

const OtherMenu = (props : OtherMenuProps) => {
    const [clicked,setClicked] = useState('none');
    const [aboutClicked,setAboutClicked] = useState('none');

    const onClickHBG = () => {
        const dropdown : any = document.querySelector('.other-menu');
        const setBgColor : any = document.getElementById('other-menu');
        const HBGColor : any = document.getElementById('btn-hamberger');
        if(clicked === 'none') {
            setClicked('show');
            dropdown.classList.remove('none');
            dropdown.classList.add('show');
            HBGColor.style.color = "gray";
            // setBgColor.style.color = props.bgColor;
        } else {
            setClicked('none');
            dropdown.classList.remove('show');
            dropdown.classList.add('none');
            HBGColor.style.color = "white";
        }
    }

    const onClickAbout = () => {
        const about = document.querySelector('.other-menu-about');
        if(aboutClicked === 'none'){
            setAboutClicked('show');
            about?.classList.remove('none');
            about?.classList.add('show');
        } else {
            setAboutClicked('none');
            about?.classList.remove('show');
            about?.classList.add('none');
        }
    }

    return (
        <>
            <a href="#" className="btn-hamberger" onClick={onClickHBG}>
                <i className="icon-menu" id="btn-hamberger"></i>
            </a>
            <ul className="other-menu dropdown_menu none" id="other-menu">
                <li className=".dropdown_item-1"><a href="#" onClick={() => window.open('http://ncov.mohw.go.kr/')}>COVID-19<span className="list-entity">&gt;</span></a></li>
                <li className=".dropdown_item-2"><a href="#" onClick={() => window.open('http://www.cdc.go.kr/')}>질병관리부<span className="list-entity">&gt;</span></a></li>
                <li className=".dropdown_item-3"><a href="#" onClick={() => window.open('http://www.mohw.go.kr/react/index.jsp')}>보건복지부 <span className="list-entity">&gt;</span></a></li>
                <li className=".dropdown_item-4"><a href="#" onClick={onClickAbout}>ABOUT <span className="list-entity">&gt;</span></a></li>
                <ul className="other-menu-about none">
                    <li><a href="https://apis.map.kakao.com/">@KAKAO MAP</a></li>
                    <li><a href="https://github.com/1Seok2/Hack-GreenSky">@GITHUB</a></li>
                    <li><a href="mailto:unos@khu.ac.kr">CONTACT</a></li>
                </ul>
            </ul>
        </>
    );
}

export default OtherMenu;