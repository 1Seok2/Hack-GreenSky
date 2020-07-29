import React from 'react';
import ButtonClose from '../button/ButtonClose';

interface SearchProps {
    searchValue : string
}

const SearchLists = (props : SearchProps) => {
    return (
        <>
            <div id="menu_wrap" className="bg_white none">
                <div className="option">
                <div onClick={ButtonClose} className="btn-search-close"><i className="icon-cancel"></i>
                    <form className="kakao-search-form">
                        키워드 : <input type="text" value={props.searchValue} id="keyword" size={15} /> 
                        <button type="submit">검색하기</button> 
                    </form>
                </div>
                </div>
                <ul id="placesList"></ul>
                <div id="pagination"></div>
            </div>
        </>
    );
}

export default SearchLists;