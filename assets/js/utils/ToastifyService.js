class ToastifyService {

    notificatonSuccess(text) {
        Toastify({
            text,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#54d37a",
        }).showToast();
    }

    notificatonError(text) {
        Toastify({
            text,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#f3616d",
        }).showToast();
    }
}


export default new ToastifyService();