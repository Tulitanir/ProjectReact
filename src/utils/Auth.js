export default class Authentication {
  static async loginRequest(data) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      const errorMessage = `Ошибка: ${error.message}`;
      alert(errorMessage);
    }
  }

  static async registrationRequest(data) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      const errorMessage = `Ошибка: ${error.message}`;
      alert(errorMessage);
    }
  }

  static async fetchWithAuth(url, options, force) {
    let tokenData = localStorage.getItem("refreshToken");
    if (!tokenData) {
      return;
    }

    if (!options.headers) {
      options.headers = {};
    }

    const isTokenValid =
      Date.now() - parseInt(localStorage.getItem("expiresIn")) <= 0;
    if (!isTokenValid || force) {
      try {
        const response = await getNewAccessToken(tokenData);
        if (!response.status === 200) {
          throw new Error(response.text());
        }

        localStorage.setItem("user", JSON.stringify(response.member));
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("expiresIn", response.expiresIn);
        options.headers.Authentication = `Bearer ${response.accessToken}`;
      } catch (error) {
        alert(error);
      }
    } else {
      options.headers.Authentication = `Bearer ${localStorage.getItem(
        "accessToken"
      )}`;
    }
    return { url, options };
  }
}

async function getNewAccessToken(refreshToken) {
  try {
    const body = {
      refreshToken: refreshToken,
    };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/refreshToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
