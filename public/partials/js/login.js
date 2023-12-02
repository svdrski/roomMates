const err = document.getElementById('reg_error')
const passField = document.getElementById('password')
const mail = document.getElementsByClassName('auth_email')
const loading = document.getElementById('loading')


//login form handler
document.getElementById('login').addEventListener('submit', async  (e)=> {
    e.preventDefault()
    const data = new FormData(e.target)

    try{
        //delete previous errors
        delError()

        //show loading animation
        loading.style.display = 'block'

        //request
        const respose = await fetch('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(Object.fromEntries(data))
        })
        
        //response
        if(respose.ok) {
            //hide errors and loading animation
            delError()
            loading.style.display = 'none'

            const resp = await respose.json()
            console.log(resp)
            //save jwt key to local storage
            localStorage.setItem('key', JSON.stringify(resp))
            //redirect to search page
            window.location.href ='/add/room'
        } else {
            // if error print error
            delError()
            loading.style.display = 'none'
            console.log(respose.status)
            const resp = await respose.json()
            printError(resp, respose.status)
        }
    } catch (e) {console.log('Error ' + e)}
})



// function delete errors from page
function delError(){
    try{
        err.style.display = 'none'
        mail[0].style.border = '1px solid #E3E3E3'
        passField.style.border = '1px solid #E3E3E3'
    } catch (e) {console.log('Error ' + e)}
}


// function to print errors 
function printError (message, status) {
    try{
        delError()
        err.style.display = 'flex'
        err.innerHTML = `
            <img src="/static/err.svg" style="height: 20px; margin-right:10px;">
            <span>${message}</span>
         `
        if(status === 410) {
            mail[0].style.border = '1px solid #EC3F3F'
        }
        if(status === 409) {
            passField.style.border = '1px solid #EC3F3F'
        }
    } catch (e) {console.log('Error ' + e)}
}