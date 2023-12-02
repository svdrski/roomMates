//default coordinates to focus map
const  coordinates = {lat: 32.0853, lng: 34.781768}

    //create map 
    const map = new google.maps.Map(document.getElementById('mapblock'), {
        center: coordinates,
        zoom:12,
        disableDefaultUI: true,
    })


    //arrays to save temporary data of markers
    const infoWindows = [];
    const markers = []
    
    //function to create marker and listener to show extra info
    function createpin(coordinates, content){
        const marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            icon: '/static/mappin.svg'
        });

        const infoWindow = new google.maps.InfoWindow({
            content
        });
        
        marker.addListener("click", () => {
            infoWindows.forEach((iw) => {
                iw.close();
            });
    
            infoWindow.open(map, marker);
            infoWindows.push(infoWindow);
        });
        markers.push(marker)
    }



  // check current link of this page to find query after
  const link = window.location.href


//function to add all search results to page
const getlist = async () => {

let  idList  = []

    //check if link have query get list of rooms only with search request, else get list of all rooms
    if(link.includes('value')){

        try{
            //destructing link to find response word
            const index = link.indexOf('=')
            const req = link.slice(index + 1, 100)
            console.log(req)
            
            //fetching list of rooms matching the request
            const response = await fetch(`/find?value=${req}`)
            idList = await response.json()
            document.getElementById('searcharea').innerText = idList[0].city
            console.log(idList)
        } catch (e) {console.log('Error ' + e)}

    } else{

        try{
        //fetching all rooms
        const response = await fetch ('/search/getlist')
        idList = await response.json()
        document.getElementById('searcharea').innerText = 'Israel'
        } catch (e) {console.log('Error ' + e)}

    }


    // printing all rooms from response to page
    for(id of idList) {

        try{
            const response = await fetch(`/roomdata/${id.id}`)
            roomdata = await response.json()
            console.log(roomdata)
            
            // parsing coordinates from request
            const coords = {lat: parseFloat(roomdata.room.attitude), lng: parseFloat(roomdata.room.longitude)}

                    //create room card
                    const room = document.createElement('div')
                    room.setAttribute('id', 'roomcard')
                    room.innerHTML = `
                        <a class='blockhref' target='blanc'  href="/room/${id.id}">
                        <img class="cardimg" src="${roomdata.photos[0].url}">
                        <div class='cardinf df'>
                            <div class='cardline'>
                                <img class="profavatar" src="${roomdata.profileimg[0].url}">
                                <p class='cardname'>${roomdata.room.name}, ${roomdata.room.age}</p>
                            </div>

                            <div class='cardline cardpers'>
                                    <img class="pers" src="/static/person.svg">
                                    <p class='cardname mcard'>${roomdata.room.people_in_household}</p>
                            </div>
                        </div>

                        <div class='secondline'>
                            <p class='pricecard'>₪${roomdata.room.rate}</p>
                            <p class='roomtype'>${roomdata.room.type}</p>
                            <img class="checkin" src="/static/checkin.svg">
                            <p class='roomtype fs14'>${roomdata.room.availability}</p>
                        </div>
                    `
                    //print to page
                    document.getElementById('contents').appendChild(room)

                    // content of card on the map
                    const content = `
                        <a class='blockhref' target='blanc'  href="/room/${id.id}">
                        <div>
                            <img class="cardimg" src="${roomdata.photos[0].url}">
                            <div class='dfc'>
                                <p class='pricecard scard'>₪${roomdata.room.rate}</p>
                                <p class='roomtype scard'>${roomdata.room.type}</p>
                            </div>
                        </div>
                    </a>
                    `
                    //print marker
                    const marker = createpin(coords, content)

                    //add listener to marker to show card on map
                    room.addEventListener('mouseover', () => {
                        map.setCenter(coords);
                    });
        } catch (e) {console.log('Error ' + e)}
    }
}
getlist()

