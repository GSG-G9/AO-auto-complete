const fetch = (() => {
  const _fetch = (method, url, data, callback) => {
    const xhr = new XMLHttpRequest();
    const dataString = JSON.stringify(data);

    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          callback(null, JSON.parse(xhr.responseText));
        } else {
          callback(true);
        }
      }
    });

    xhr.open(method, url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(dataString);
  };

  const get = (url, cb) => {
    _fetch("GET", url, null, cb);
  };

  const post = (url, data, cb) => {
    _fetch("POST", url, data, cb);
  };

  return (fetch = {
    get,
    post,
  });
})();