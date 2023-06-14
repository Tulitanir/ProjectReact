export default class Authentication {
  static async loginRequest(data) {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
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
      const response = await fetch("http://localhost:8080/api/auth/register", {
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
}
