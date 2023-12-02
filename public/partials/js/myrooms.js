const key = localStorage.getItem('key')
if(!key) {window.location.href = '/login'}


async function printMyRooms(){

    try{

    //fetching all id's of rooms of current user by token
    let data = await fetch('/myrooms',{
        method: 'POST',
        headers: {
            'Authorization': `${key}`,
            'Accept': 'application/json'}
    })

    data = await data.json()


    //printing all rooms from response to page
    for (item of data) {

            //fetching all data of current room 
            const response = await fetch(`/roomdata/${item.id}`)
            const roomdata = await response.json()
            console.log(roomdata)

            // extracting coordinates from request
            const coords = {lat: parseFloat(roomdata.room.attitude), lng: parseFloat(roomdata.room.longitude)}
    
            //creating div content
            const room = document.createElement('div')
            room.setAttribute('id', 'roomcard')
            room.innerHTML = `
            <img class="delimg" id="${item.id}" src="/static/delete.svg">
            <a class='blockhref' target='blanc'  href="/room/${item.id}">
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

            
          
            //push to page
            document.getElementById('rommscontent').appendChild(room)

            document.getElementById(item.id).addEventListener('click', async ()=>{
                try{
                    await fetch(`/myrooms/delete/${item.id}`, {
                        method:'POST'
                    }) 
                    window.location.reload()
                } catch (e) {console.log('Error ' + e)}
                
                
             })
    }


    } catch (e) {console.log('Error ' + e)}

}

printMyRooms()
