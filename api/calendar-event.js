

const findStatus = (event_date) => {
    let e = new Date(event_date);
    let now = new Date();

    if ( e.getFullYear()==now.getFullYear() && e.getMonth() == now.getMonth() && e.getDate() == now.getDate()) {
        return "Today"
    } else if (e - new Date() > 0) {
        return "Upcoming"
    } else {
        return "Already Passed"
    }
}

const formatDate = (event_date) => {
    let d = new Date(event_date);
    
    let year = d.getFullYear();
    let month = d.getMonth()+1 < 10 ? "0"+d.getMonth()+1 : d.getMonth()+1;
    let day = d.getDate() < 10 ? "0"+d.getDate() : d.getDate();
    let hour = d.getHours() < 10 ? "0"+d.getHours() : d.getHours();
    let min = d.getMinutes() < 10 ? "0"+d.getMinutes() : d.getMinutes();
    
    let formattedDateStr = year+"-"+month+"-"+day+"T"+hour+":"+min;

    return formattedDateStr
}

const formatDateAtTime = (event_date) => {
    let d = new Date(event_date);
    let dateAtTime = d.toLocaleDateString() + " @ " + d.toLocaleTimeString();
    let period = dateAtTime.substring(dateAtTime.length-2);
    dateAtTime = dateAtTime.substring(0, dateAtTime.length - 6) + period;

    return dateAtTime;
}

export { 
    findStatus,
    formatDate,
    formatDateAtTime
};