export function authorizedFetch(url, options) {
    return fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: getAuthorizationHeader(),
        "Content-Type": "application/json"
      }
    })
  }
  
  // function getAuthorizationHeader() {
  //   const token = sessionStorage.getItem("token");
  //   return `Bearer ${token}`;
  // }

  function getAuthorizationHeader() {
    const username = window.sessionStorage.getItem('username');
    const password = window.sessionStorage.getItem('password');
    return `Basic ${btoa(`${username}:${password}`)}`;
  }