
var tab = document.querySelector('.drupal-header .tab');
if (tab !== null) {
    tab.addEventListener('click', function () {
        this.parentElement.classList.toggle('open');
    });
}
