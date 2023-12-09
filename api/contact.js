
const getRelColor = (rel) => {
    switch (rel) {
        case "Family":
            return "green.400"

        case "Friend":
            return "yellow.400"
    
        default:         //assume Work
            return "red.400"
    }
}


export { getRelColor};