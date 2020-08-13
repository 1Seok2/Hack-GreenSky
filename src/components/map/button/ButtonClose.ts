const ButtonClose = () => {
    // 검색된 리스트 X 버튼 누를 시 리스트 제거 및 검색 버튼 active 제거
    const menu_wrap = document.querySelector('#menu_wrap');
    const actived = document.querySelector('#btn-search');
    menu_wrap?.classList.toggle('none');
    menu_wrap?.classList.toggle('show');
    actived?.classList.remove('active');
}

export default ButtonClose;