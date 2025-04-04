export let trackingItem = JSON.parse(localStorage.getItem('trackingItem'))
if(!trackingItem){
    trackingItem = []
}
export function trackingReset(){
    trackingItem = []
} 

