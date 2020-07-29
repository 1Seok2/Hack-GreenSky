const ButtonClose = () => {
    const menu_wrap = document.querySelector('#menu_wrap');
    menu_wrap?.classList.toggle('none');
    menu_wrap?.classList.toggle('show');
}

export default ButtonClose;