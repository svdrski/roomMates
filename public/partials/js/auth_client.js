const key22 = localStorage.getItem('key')

// if key not found redirect to login
if(!key22) {window.location.href = '/login'}
console.log(key22)



getHeader ()

//fetching personal data to show name in header
async function getHeader () {

    try{
        //request
        let data = await  fetch('/headers',{
            method: 'GET',
            headers: {
                'Authorization': `${key22}`,
                'Content-type': 'application/json'
                }
        })
        data  = await data.json()


        //printing name to page
        document.getElementById('profname').innerText = data[0].first_name
    } catch (e) {console.log('Error ' + e)}

   
}

