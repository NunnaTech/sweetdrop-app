const db = new PouchDB('sweetdropdb');

function saveVisitOrder(body, url, method, token) {
    const _id = new Date().toISOString();
    return db.put({_id, body: body, url: url, method: method, token: token}).then(response => {
        self.registration.sync.register('sync-visit-order');
        let data = {
            "success": true,
            "message": "Visit registered",
            "data": JSON.stringify(body),
            "offline": true
        }
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {'Content-Type': 'application/json'},
        });
    });
}

function postVisitOrder() {
    const promises = [];
    db.allDocs({include_docs: true, attachments: true}).then((docs) => {
        docs.rows.forEach(row => {
            const {body, url, method, token} = row.doc;
            console.log(body);
            const petition = fetch(url, {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Origin': '*',
                    'Authorization': token,
                },
            }).then(() => db.remove(row.doc))
            promises.push(petition);
        })
    })
    return Promise.all(promises);
}

function successSync() {
    console.log("Sincronización exitosa, se han sincronizado los datos correctamente");
}