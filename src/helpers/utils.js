export const formatDateAndTime = (dateString) => {
    if(dateString) {
        const date = new Date(dateString);
        if(date.toDateString() !== "Invalid Date") {
            let hours = date.getHours() % 12;
            hours = hours === 0 ? 12 : hours;
            const minutes = date.getMinutes() < 10 ? date.getMinutes() + "0" : date.getMinutes();
            return date.toLocaleDateString("en-US") + " " +
                hours + ":" + minutes + " " + (date.getMinutes() > 12 ? "PM" : "AM");
        }
        return "Invalid Date";
    }
};