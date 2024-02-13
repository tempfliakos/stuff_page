export function getYear(date) {
    if(date) {
        return date.split("-")[0];
    }
    return "";
}