const db = new PouchDB('sweetdropdb');

function saveVisitOrder(body, url, method, token) {
    const _id = new Date().toISOString();
    return db.put({_id, body: body, url: url, method: method, token: token}).then(response => {
        self.registration.sync.register('sync-visit-order');
        return new Response({
            "success": true,
            "message": "Visit registered",
            "data": JSON.stringify(body),
            "offline": true
        }, {
            status: 200,
            headers: {'Content-Type': 'application/json'},
        });
    });
}

function postVisitOrder() {
    const promises = [];
    db.allDocs({include_docs: true}).then(docs => {
        docs.rows.forEach(row => {
            const {body, url, method, token} = row.doc;
            console.log(body)
            const petition = fetch(url, {
                method,
                body: JSON.stringify(body),
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                },
            }).then(response => db.remove(response))
            promises.push(petition);
        })
    })
    return Promise.all(promises);
}