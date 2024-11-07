mapboxgl.accessToken = 'pk.eyJ1IjoiYmFpa3VuaXAxNCIsImEiOiJjbTM3ZjRoMHYwZGg3MmxyNnJ2Y2U0ZzRxIn0.jjzTr5UGycXAVWa8_bgt1w';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [-74.5, 40], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 2, // starting zoom
    minZoom:2,
    maxZoom:2
});
map.on('load',()=>{
    map.addSource('continents',{
        'type': 'geojson',
        'data':'https://gist.githubusercontent.com/hrbrmstr/91ea5cc9474286c72838/raw/59421ff9b268ff0929b051ddafafbeb94a4c1910/continents.json'
    })
    map.addLayer({
        'id': 'continents-layer',
        'type': 'fill',
        'source': 'continents', // reference the data source
        'layout': {},
        'paint': {
            'fill-color': 'red', // blue color fill
            'fill-opacity': 0.5
        }})
})
// map.once('zoomstart',()=>{
//     map.setProjection('mercator')
//     map.zoomTo(4)
//     map.setMinZoom(3)
// })