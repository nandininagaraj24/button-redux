export const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours() % 12;
    hours = hours === 0?12: hours;
    return date.toLocaleDateString("en-US") +" "+
        hours + ":"+ date.getMinutes()+" "+ (date.getMinutes() > 12? "PM": "AM");
};