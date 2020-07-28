import React, { useState } from 'react';

// interface OtherMenuProps{
//     bgColor : string
// }

const OtherMenu = () => {
    const [clicked,setClicked] = useState('none');
    const [aboutClicked,setAboutClicked] = useState('none');

    // const onClickHBG = () => {
    //     const dropdown : any = document.querySelector('.other-menu');
    //     const setBgColor : any = document.getElementById('other-menu');
    //     const HBGColor : any = document.getElementById('btn-hamberger');
    //     if(clicked === 'none') {
    //         setClicked('show');
    //         dropdown.classList.remove('none');
    //         dropdown.classList.add('show');
    //         HBGColor.style.color = "gray";
    //         // setBgColor.style.color = props.bgColor;
    //     } else {
    //         setClicked('none');
    //         dropdown.classList.remove('show');
    //         dropdown.classList.add('none');
    //         HBGColor.style.color = "white";
    //     }
    // }

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

    const onClickHBG = (e : any) => {
        e.preventDefault();
        const wrapper = document.querySelector('.other-menu-wrapper');
        wrapper?.classList.toggle("nav-visible");
    }

    return (
        <>
            <header>
                <button aria-label="Toggle menu" className="nav-button button-lines button-lines-x close" 
                        role="button" type="button" onClick={onClickHBG}
                >
                    <span className="lines"></span>
                </button>
            </header>
             <nav className="nav-wrapper">
                <ul className="nav">
                <li className="nav-list">
                    <a href="#" onClick={() => window.open('http://ncov.mohw.go.kr/')}>COVID-19
                    <span className="list-entity">&gt;</span></a>
                </li>
                <li className="nav-list">
                    <a href="#" onClick={() => window.open('http://www.cdc.go.kr/')}>질병관리부
                    <span className="list-entity">&gt;</span></a>
                </li>
                <li className="nav-list">
                    <a href="#" onClick={() => window.open('http://www.mohw.go.kr/react/index.jsp')}>보건복지부 
                    <span className="list-entity">&gt;</span></a>
                </li>
                <li className="nav-list">
                    <a href="#" onClick={onClickAbout}>ABOUT 
                    <span className="list-entity">&gt;</span></a>
                </li>
                <ul className="other-menu-about none">
                    <li><a href="https://apis.map.kakao.com/">@KAKAO MAP</a></li>
                    <li><a href="https://github.com/1Seok2/Hack-GreenSky">@GITHUB</a></li>
                    <li><a href="mailto:unos@khu.ac.kr">CONTACT</a></li>
                </ul>
                </ul>
            </nav>
        </>
    );
}

export default OtherMenu;