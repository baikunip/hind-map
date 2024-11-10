mapboxgl.accessToken = 'pk.eyJ1IjoiYmFpa3VuaXAxNCIsImEiOiJjbTM3ZjRoMHYwZGg3MmxyNnJ2Y2U0ZzRxIn0.jjzTr5UGycXAVWa8_bgt1w';

// Filter variables
    let timeFrame=[1900,2025],
    issues=['Infrastructure Systems', 'Urban Areas', 'Adaptation Measures', 'Equity Considerations', 'Vulnerability and Risk', 'Community Awareness', 'Resilient Infrastructure', 'Urban Green Spaces', 'Water-Efficient Design', 'Costs and Resilience', 'Forecast-Based Financing', 'Impact on Economic Growth', 'Socioeconomic Drought', 'Economic Impacts of Drought', 'Resource Allocation', 'Trade-offs and Decision-Making', 'Ecosystem Resilience', 'Mitigation Strategies', 'Ecological Drought', 'Human-Environment Interaction', 'Nature-Based Solutions', 'Ecosystems and Drought', 'Watersheds and Wetlands', 'Community Resilience and Adaptation', 'Economic Channel', 'Immediate and Medium-Term Impacts', 'Communities', 'Households', 'Individuals', 'Economic Consequences', 'Health and Well-Being', 'Social Impacts', "nan"],
    categories=['Built Environment',"Natural Environment","Economy","People and Community"],
    strategyPreparation=null,strategyAnticipation=null,strategyAdaptation=null
// End of filter variables
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
function loadLayers(){
    map.addSource('continents',{
        'type': 'geojson',
        'data':'https://r2.datahub.io/clvyjaryy0000la0cxieg4o8o/main/raw/data/countries.geojson'
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
}
map.on('load',()=>{
    loadLayers()
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
    $('input[type=radio][name=basemap]').change(function() {
        map.setStyle('mapbox://styles/mapbox/' +this.value)
    })
    // filters
    $('#strategy-checkboxes').on('change',(val)=>{
        if(val.isTrusted){
            switch (val.target.dataset.caption) {
                case "Adapt":
                    strategyAdaptation=="Adapt"?strategyAdaptation=null:strategyAdaptation="Adapt"
                    break;
                case "Prepare":
                    strategyPreparation=="Prepare"?strategyPreparation=null:strategyPreparation="Prepare"
                    break;
                default:
                    strategyAnticipation=="Anticipate"?strategyAnticipation=null:strategyAnticipation="Anticipate"
                    break;
            }
            console.log("Adapt: "+strategyAdaptation)
            console.log("Prepare: "+strategyPreparation)
            console.log("Anticipate: "+strategyAnticipation)
            applyFilters()
        }
    })
    $('#category-checkboxes').on('change',(val)=>{
        if(val.isTrusted){
            if(categories.includes(val.target.dataset.caption))categories=categories.filter((e)=>{ return e !== val.target.dataset.caption })
            else categories.push(val.target.dataset.caption)
            console.log(categories)
            applyFilters()
        }
    })
    $('#relevant-issue-checkboxes').on('change',(val)=>{
        if(val.isTrusted){
            if(issues.includes(val.target.dataset.caption))issues=issues.filter((e)=>{ return e !== val.target.dataset.caption })
            else issues.push(val.target.dataset.caption)
            applyFilters()
        }
    })
    function applyFilters(){
        let timeFrame1st=[">=", ['to-number', ["get", 'time']], parseInt(timeFrame[0])],
        timeFrame2nd=["<=", ['to-number', ["get", 'time']], parseInt(timeFrame[1])],
        issueFilter=["in", ["get","Issues"],["literal", issues]],
        categoryFilter=["in", ["get","Category"],["literal", categories]],
        adaptationFilter=["==",["get","Drought Resilience Strategy Adaptation"],strategyAdaptation],
        anticipationFilter=["==",["get","Drought Resilience Strategy Anticipation"],strategyAnticipation],
        preparationFilter=["==",["get","Drought Resilience Strategy Preparation"],strategyPreparation],
        queryFilter=['all',timeFrame1st,timeFrame2nd,issueFilter,categoryFilter]
        if(strategyAdaptation==null&&strategyAnticipation==null&&strategyPreparation==null){}
        else queryFilter.push(adaptationFilter,anticipationFilter,preparationFilter)
        map.setFilter('point-layer',queryFilter)
    }
    map.on('style.load',()=>{
        loadLayers()
        applyFilters()
    })
    $('#time-slider').on('change',(val)=>{
        timeFrame=val.detail.val.split(',')
        $('#slider-return-value').val(val.detail.val)
        applyFilters()
    })
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
