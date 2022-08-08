function itheima(parm) {
    var xhr = new XMLHttpRequest();
    var datastr = resolveData(parm.data);
    if (parm.type.toUpperCase() === 'GET') {
        xhr.open(parm.type, parm.url + '?' + datastr);
        xhr.send();
    }
    else if (parm.itheima.toUpperCase() === 'POST') {
        xhr.open(parm.type, parm.url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(datastr);
    }
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4 && this.status === 200) {
            var res = JSON.parse(xhr.responseText);
            parm.success(res);
        }
    })
}

function resolveData(data) {
    var arr = [];
    for (k in data) {
        arr.push(k + '=' + data[k]);
    }
    return arr.join('&');
}