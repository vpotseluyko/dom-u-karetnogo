document.addEventListener('DOMContentLoaded', worker);

function worker() {
    let menu_btn = document.querySelector('button.menu-control');
    menu_btn.addEventListener('click', function () {
        this.parentNode.classList.toggle('active');
        this.classList.toggle('turned')
    });
}