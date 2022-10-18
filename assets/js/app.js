if(navigator.serviceWorker){
    navigator.serviceWorker.register('./sw.js');
    console.log('SW: Soportado');
}else{
    console.log('SW: NO soportado');
}