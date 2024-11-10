mapboxgl.accessToken = 'pk.eyJ1IjoiYmFpa3VuaXAxNCIsImEiOiJjbTM3ZjRoMHYwZGg3MmxyNnJ2Y2U0ZzRxIn0.jjzTr5UGycXAVWa8_bgt1w';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: [-74.5, 40], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 2, // starting zoom
    minZoom:2,
    maxZoom:2
});
// Add zoom and rotation controls to the map.
class HelloWorldControl {
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl';
        this._container.textContent = 'Hello, world';
        return this._container;
    }

    onRemove() {
        this._container.parentNode.removeChild(this._container);
        this._map = undefined;
    }
}
map.addControl(new mapboxgl.NavigationControl());
let hoveredPolygonId = null,hideFilter=true
map.on('load',()=>{
    map.addSource('continents',{
        'type': 'geojson',
        'data':'https://gist.githubusercontent.com/hrbrmstr/91ea5cc9474286c72838/raw/59421ff9b268ff0929b051ddafafbeb94a4c1910/continents.json'
    })
    map.addSource('datapoints',{
        'type':'geojson',
        'data':datapoints
    })
    map.addLayer({
        'id': 'continents-layer',
        'type': 'fill',
        'source': 'continents', // reference the data source
        'layout': {},
        'paint': {
                'fill-color': 'rgba(192, 192, 192, 0.151)',
                'fill-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    1,
                    0.5
                ]
            }
        })
    map.addLayer({
        'id': 'point-layer',
            'type': 'circle',
            'source': 'datapoints',
            'paint': {
                'circle-radius': 10,
                'circle-color': '#F84C4C' // red color
            }
    })
    map.on('click', 'continents-layer', (e) => {
        map.setProjection('mercator')
        map.setMaxZoom(18)
        map.zoomTo(5)
        map.setMinZoom(2)
    })
    // the mouse is over the states layer.
    map.on('mouseenter', 'continents-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
      // feature state for the feature under the mouse.
      map.on('mousemove', 'continents-layer', (e) => {
        if (e.features.length > 0) {
            if (hoveredPolygonId !== null) {
                map.setFeatureState(
                    { source: 'continents', id: hoveredPolygonId },
                    { hover: false }
                );
            }
            hoveredPolygonId = e.features[0].properties["CONTINENT"];
            map.setFeatureState(
                { source: 'continents', id: hoveredPolygonId },
                { hover: true }
            );
        }
    });
    // Change the cursor back to a pointer
    // when it leaves the states layer.
    map.on('mouseleave', 'continents-layer', () => {
        map.getCanvas().style.cursor = '';
        if (hoveredPolygonId !== null) {
            map.setFeatureState(
                { source: 'continents', id: hoveredPolygonId },
                { hover: false }
            );
        }
        hoveredPolygonId = null;
    });
})

$('#filter-button').on('click',()=>{
    if(hideFilter){
        $('#filter-content').css('display','none')
        $('#filter-button').html(`
            <div class="row g-0 text-center">
                <div class="cell-3"><i class="bi bi-chevron-compact-up"></i></div>
                <div class="cell-9"><span>FILTER</span></div>
            </div>
        `)
        hideFilter=false
    }else{
        $('#filter-content').css('display','flex')
        $('#filter-button').html(`
            <div class="row g-0 text-center">
                <div class="cell-3"><i class="bi bi-chevron-compact-down"></i></div>
                <div class="cell-9"><span>FILTER</span></div>
            </div>
        `)
        hideFilter=true
    }
})
$('input[type=radio][name=basemap]').change(function() {
    map.setStyle('mapbox://styles/mapbox/' +this.value)
})
// filters
$('#time-slider').on('change',(val)=>{
    console.log(val.detail.val)
    $('#slider-return-value').val(val.detail.val)
})