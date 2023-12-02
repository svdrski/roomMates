//function to print map on room page
function createmap ( lats, lngs) {

    const  coordinates = {lat: lats, lng: lngs}

    //init map
    const map = new google.maps.Map(document.getElementById('maproom'), {
        center: coordinates,
        zoom:12,
        disableDefaultUI: true,
    })

    //set marker
    new google.maps.Marker({
        position: coordinates,
        map: map,
        icon: '/static/mappin.svg'
});
}


