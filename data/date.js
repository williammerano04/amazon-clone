// Date //
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]


export function dateDelivery(input){
    let d = new Date()
    d.setDate(d.getDate()+ input)
    let deliverytime = new Date()
    let day = days[d.getDay()]
    let month = months[d.getMonth()]
    let date = d.getDate()
    let year = d.getFullYear()
    let result = ''

   
    result = `${day} ${month}, ${date} ${year}`
    return result
}
export function dateDeliveryProgress(input){
    let d = new Date()
    d.setDate(d.getDate()+ input)
    let deliverytime = new Date()
    let day = days[d.getDay()]
    let month = months[d.getMonth()]
    let date = d.getDate()
    let year = d.getFullYear()
    let result = ''

   // deliverytime.setDate(date)
    result = `${day} ${month}, ${date} ${year}`
    return result
}

