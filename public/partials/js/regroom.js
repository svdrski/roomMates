// init map 
function initAutocomplete() {

    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 32.0853, lng: 34.781768 },
      zoom: 13,
      language: "en",
      mapTypeId: "roadmap",
      disableDefaultUI: true,
    });
  
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pacinput");
    const searchBox = new google.maps.places.SearchBox(input);
  
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
  
    let markers = [];
  
    // Function to add a marker at a location
    function addMarker(location) {
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: '/static/mappin.svg'
      });
      markers.push(marker);
    }
  
    // Function to clear all markers from the map
    function clearMarkers() {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
    }
  
    
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) {
        return;
      }
      // Clear out the old markers.
      clearMarkers();
      // For each place, get the icon, name, and location.
      const bounds = new google.maps.LatLngBounds();
  
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
        // Create a marker for each place.
        addMarker(place.geometry.location);
        
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
      
    });
  
  
    // clicking on map functionality
    map.addListener('click', function(event) {
  
        // get coordinates after clicking
        const clickedLocation = event.latLng;
        // change coords to address
        const geocoder = new google.maps.Geocoder();
        // geocoding
        geocoder.geocode({ location: clickedLocation }, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    const address = results[0].formatted_address;
                    input.value = address;
                    clearMarkers()
                    addMarker(clickedLocation)
  
                    const event = new Event('places_changed', {
                        bubbles: true,
                        cancelable: true,
                    });
                    input.dispatchEvent(event);
                } else {alert('Adress not found.');}
                } else { alert('Error geocoding: ' + status);}
        });
    });
  
  
  
  
    const geocoder = new google.maps.Geocoder();
  
  
      // form event listener to send all data to server
      document.forms[1].addEventListener('submit', async (e)=>{
        e.preventDefault()

        try{
                let formData = new FormData(e.target)
    
                /// create array of comforts and send as array
                const comfort = []
                const comforts = ['Conditioning', 'Storage', 'Laundry', 'Dishwasher', 'Pool', 'Bathroom', 'Parking', 'Elevator', 'Entrance']
                const search = Object.fromEntries(formData)
                for (a in search) {
                if(comforts.includes(a)){
                    comfort.push(a)
                    delete search[a]}
                }
                formData.append('comforts', comfort);
                
                /// send full location data as array
                await geocoder.geocode({ address: search.address }, function  (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results.length > 0) {
                    console.log([results[0]])
                    formData.append('address', JSON.stringify(results[0]));
                    }
                } else {console.error("Error: " + status); }
                });
        
                //get jwt key from local storaage
                let key = localStorage.getItem('key')
                console.log('KEY => ' + key)
                const response = await fetch('/add/room', {
                method:'POST',
                headers: {
                    'Authorization': `${key}`,
                },
                body: formData
                })
        
                //get url as response and redirect to new listing
                const url =  await response.json()
                window.location.href = `/room/${url}`

        } catch (e) {console.log('Error ' + e)}

    })
        
  }


  
  //show and hide form sections
  let currentSection = 1
  document.getElementById('shownext').addEventListener('click', showNext)
  document.getElementById('showprev').addEventListener('click', showPrev)
  function showNext(){
      if(currentSection === 6) {
          document.getElementById('shownext').style.display = 'none'
          document.getElementById('finreg').style.display = 'block'
      }
      document.getElementById(`section${currentSection}`).style.display = 'none'
      currentSection += 1
      document.getElementById('regstatus').innerText = `${currentSection}/7`
      document.getElementById(`section${currentSection}`).style.display = 'flex'
  }
  
  function showPrev(){
      if(currentSection === 7) {
          document.getElementById('shownext').style.display = 'block'
          document.getElementById('finreg').style.display = 'none'
      }
      document.getElementById(`section${currentSection}`).style.display = 'none'
      currentSection -= 1
      document.getElementById('regstatus').innerText = `${currentSection}/7`
      document.getElementById(`section${currentSection}`).style.display = 'flex'
  }
  
  const fileInput = document.getElementById('fileInput');
  const previewImage = document.getElementById('previewImage');
  
  
  //image controller
  fileInput.addEventListener('change', function () {
      const file = fileInput.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
              previewImage.src = e.target.result;
          };
          reader.readAsDataURL(file);
      } else {
          previewImage.src = '';
      }
  });
  
  
  //range input 
  const range = document.getElementById("maxpeople");
  const rangeValue = document.getElementById("rangeValuepl");
  range.addEventListener("input", () => {
      rangeValue.textContent = range.value;
  });
  
  //range input 2
  const range2 = document.getElementById("age");
  const rangeValue2 = document.getElementById("rangeValueal");
  range2.addEventListener("input", () => {
      rangeValue2.textContent = range2.value;
  });
  
  
  //image controller
  function preview(elem, output = '') {
      Array.from(elem.files).map((file) => {
          const blobUrl = window.URL.createObjectURL(file)
          output+=`<img src=${blobUrl}>`
      })
      elem.nextElementSibling.innerHTML = output
  }
  
  
  
  
  window.initAutocomplete = initAutocomplete;
  
  
  