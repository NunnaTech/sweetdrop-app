const dealerNavTemplate = document.querySelector('#dealerNavTemplate');
document.addEventListener('DOMContentLoaded', () => {
    fetch('../templates/DealerNav.html').then(response => response.text().then(data => dealerNavTemplate.innerHTML = data));
})
