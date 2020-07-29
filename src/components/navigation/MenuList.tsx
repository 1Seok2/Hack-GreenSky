import React from 'react';

interface MenuListProps {
    name : string,
    source : string
}

const MenuList = (props : MenuListProps) => {
    return (
        <li className="nav-list">
            <a href="#" onClick={() => window.open(`${props.source}`)}>{props.name}
            <span className="list-entity">&gt;</span></a>
        </li>
    );
}

export default MenuList;