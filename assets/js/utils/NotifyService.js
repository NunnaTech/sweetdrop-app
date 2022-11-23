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

    notificationConfirm( functionConfirm){
        Notiflix.Confirm.show(
            'Confirmación',
            '¿Estas seguro de eliminar el producto?',
            'Si, eliminar',
            'No, regresar',
            function(){ functionConfirm() },
            function(){ /* No button callback */ }
        );
    }
}


export default new NotifyService();