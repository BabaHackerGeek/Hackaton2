document.getElementById('search-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const type = document.getElementById('type').value;

    const response = await fetch(`/api/${type}?location=${location}`);
    const results = await response.json();

    displayResults(results);
    displayMap(results);
});

function displayResults(results) {
    const resultList = document.getElementById('result-list');
    resultList.innerHTML = '';

    results.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.address}, ${item.city}`;
        resultList.appendChild(li);
    });
}

function displayMap(results) {
    const mapContainer = document.getElementById('map-container');
    mapContainer.innerHTML = '';  // Réinitialiser la carte

    const map = new google.maps.Map(mapContainer, {
        zoom: 12,
        center: { lat: results[0].latitude, lng: results[0].longitude }
    });

    results.forEach(item => {
        new google.maps.Marker({
            position: { lat: item.latitude, lng: item.longitude },
            map: map,
            title: item.name
        });
    });
}
