function formatDateTime(dateTimeString) {
    let date
    if (dateTimeString !== null && dateTimeString !== undefined) {
      let timeStamp = dateTimeString.replace(/ /g, "+");
      date = new Date(timeStamp);
    } else {
      date = new Date(dateTimeString);
    }
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    };
    
    return date.toLocaleString('ru-RU', options);
}

export default formatDateTime;