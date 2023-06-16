export default class Utils {
  static formatDateTime(dateTimeString) {
    let date;
    if (dateTimeString !== null && dateTimeString !== undefined) {
      let timeStamp = dateTimeString.replace(/ /g, "+");
      date = new Date(timeStamp);
    } else {
      date = new Date(dateTimeString);
    }
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    return date.toLocaleString("ru-RU", options);
  }

  static async encodeFileToBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    await new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });

    return reader.result.split(",")[1];
  }

  // static async getUserById(id) {
  //   let request = {
  //     uri: "",
  //     options: {

  //     }
  //   }
  // }
}
