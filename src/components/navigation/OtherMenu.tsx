import React, { useState } from 'react';
import MenuList from './MenuList';


const OtherMenu = () => {
    const [clicked,setClicked] = useState('none');
    const [aboutClicked,setAboutClicked] = useState('none');

    const MenuValueList = [
        {
            name : 'COVID-19',
            source : 'http://ncov.mohw.go.kr/'
        },{
            name : '질병관리부',
            source : 'http://www.cdc.go.kr/'
        },{
            name : '보건복지부',
            source : 'http://www.mohw.go.kr/react/index.jsp'
        }
    ];

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
                    {MenuValueList.map((value) => {
                        return <MenuList key={value.name+value.source} 
                                        name={value.name} source={value.source} />
                    })}
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