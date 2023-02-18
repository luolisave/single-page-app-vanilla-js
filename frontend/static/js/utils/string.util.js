export function truncateString(str, maxlength) {
    if (str.length > maxlength) {
        return str.slice(0, maxlength);
    } else {
        return str;
    }
}

export function generateRandomString(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
  
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
}
