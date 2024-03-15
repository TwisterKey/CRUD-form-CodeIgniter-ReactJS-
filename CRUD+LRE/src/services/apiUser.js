let token;

export async function logOut() {
  const response = await fetch("http://localhost:8080/api/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = response.json();
  return data;
}

export async function register({ email, password, username }) {
  const dataToSend = {
    email: email,
    password: password,
    username: username,
  };
  console.log(dataToSend);
  const response = await fetch("http://localhost:8080/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });
  console.log(response);
  const data = await response.json();
  if (data.status === true) return data;
}

export async function login({ user_email, user_password }) {
  const dataToSend = {
    email: user_email,
    password: user_password,
  };
  console.log(dataToSend);
  const response = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  });
  // console.log(response);
  const data = await response.json();
  console.log(data.status);
  if (data.status == false) {
    alert(data.message);
    return;
  }
  if (data.status == true) {
    token = data.data.token;
    console.log(token);
    return data;
  }
}

export async function createUser({ user_name, user_email, user_password }) {
  const dataToSend = {
    username: user_name,
    email: user_email,
    password: user_password,
  };
  const response = await fetch("http://localhost:8080/api/add-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataToSend),
  });
  const data = await response.json();
  if (data.status == "400") throw new Error(data.messages.error);
}

export async function deleteUser({ id }) {
  const response = await fetch(`http://localhost:8080/api/delete-user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(id),
  });
  const data = await response.json();
  if (data.status == "404") throw new Error(data.messages.error);
}

export async function showAllUsers() {
  const converter = [];
  const response = await fetch("http://localhost:8080/api/get-users", {
    headers: {
      Authorization: `Bearer ${token}`, // Adăugarea tokenului în antetul de autorizare
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

export async function editUser({ newUserData, user_id }) {
  console.log(newUserData);
  console.log(user_id);
  const response = await fetch(
    `http://localhost:8080/api/edit-user/${user_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newUserData),
    }
  );
  const data = await response.json();
  if (data.session === true) return data;
  else throw new Error(data.messages.error);
}
