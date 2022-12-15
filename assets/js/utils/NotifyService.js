class NotifyService {

    notificatonSuccess(text) {
        Notiflix.Notify.success(text);
    }

    loadingNotification(text = 'Cargando...') {
        Notiflix.Loading.circle(text, {
            svgColor: '#f3616d',
        });
    }

    loadingNotificationRemove() {
        Notiflix.Loading.remove();
    }

    notificatonError(text) {
        Notiflix.Notify.failure(text);
    }

    notificatonWarning(text) {
        Notiflix.Notify.warning(text);
    }

    notificatonInfo(text) {
        Notiflix.Notify.info(text);
    }

    notificationFallInternet() {
        Notiflix.Notify.warning('Atención, estás navegando sin conexión a internet', {
            clickToClose: true,
            cssAnimation: true,
            closeButton: true,
            useIcon: true,
            position: 'center-top',
            fontSize: '16px',
        });
    }

    notificationInternetComeBack() {
        Notiflix.Notify.success('Conexión a internet establecida',{
            showOnlyTheLastOne: true,
        })
    }
}


export default new NotifyService();