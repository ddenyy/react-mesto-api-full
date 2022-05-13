const BASE_URL = "https://api.mesto-frontend.nomoredomains.work";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": email
    })
  })
    .then((response) => response.json())
};

export const authorize = (email, password) => {
  return (fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "password": password,
      "email": email,
    })
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        return data
      }
      else {
        return false;
      }
    })
  );
};

export const getContent = (token) => {
  return (fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
        }
    })
    )
    .then(res => res.json())
}

