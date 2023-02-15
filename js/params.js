function setQueryParams(newParams) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    for (var paramName in newParams) {
        const paramValue = newParams[paramName];
        params.set(paramName, paramValue); // used to update an existing query string parameter or add a new one if it doesn't exist.
    }

    url.search = params.toString();
    window.history.pushState({ path: url.href }, '', url.href); //modify the URL of the current page without reloading the page
}

function deleteQueryParam(key) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    params.delete(key);
    url.search = params.toString();

    window.history.pushState({ path: url.href }, '', url.href);
}

function getValFromParam(key) {
    const queryStringParams = new URLSearchParams(window.location.search);
    return queryStringParams.get(key);
}