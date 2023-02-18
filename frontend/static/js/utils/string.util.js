export function truncateString(str, maxlength) {
    if (str.length > maxlength) {
        return str.slice(0, maxlength);
    } else {
        return str;
    }
}