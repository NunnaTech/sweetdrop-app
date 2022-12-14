import NotifyService from "../utils/NotifyService.js";

isOnline(false);

function isOnline(initial) {
    if (initial) {
        if (navigator.onLine){
            NotifyService.notificationInternetComeBack()
            // setTimeout(() => {location.reload()}, 2000);
        }
        else NotifyService.notificationFallInternet();
    }
}

window.addEventListener('online', () => {isOnline(true)});
window.addEventListener('offline', () => {isOnline(true)});