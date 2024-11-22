mapboxgl.accessToken = 'pk.eyJ1IjoiYmFpa3VuaXAxNCIsImEiOiJjbTM3ZjRoMHYwZGg3MmxyNnJ2Y2U0ZzRxIn0.jjzTr5UGycXAVWa8_bgt1w';
let tilesetID='baikunip14.14a7rsdu'
// Filter variables
    let timeFrame=[1900,2030],
    categories=[],
    issues=[],checkedIssues=[],
    indicators=[],
    strategyPreparation=null,strategyAnticipation=null,strategyAdaptation=null
// End of filter variables
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-streets-v12',
    center: [20.50691460904781,
          34.2434864884906
    ], // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 2, // starting zoom
    minZoom:2,
    maxZoom:2
});
map.addControl(new mapboxgl.NavigationControl());
let hoveredPolygonId = null,hideFilter=true
function loadLayers(){
    map.addSource('continents',{
        'type': 'geojson',
        'data':'https://r2.datahub.io/clvyjaryy0000la0cxieg4o8o/main/raw/data/countries.geojson',
        'generateId': true //This ensures that all features have unique IDs 
    })
    map.addSource('gw-2015',{
        type:'vector',
        url:'mapbox://'+tilesetID
    })
    map.addSource('pe-2020',{
        type:'vector','url':'mapbox://baikunip14.6f3btmqw'
    })
    map.addSource('datapoints',{
        'type':'geojson',
        'data':caseStudies,
        'generateId': true //This ensures that all features have unique IDs 
    })
    
    map.addLayer({
        'id':'gw-layer-2015','source':'gw-2015','source-layer':'GLOBAL_DAnew2_GroundwaterStor-70w6uu',
        'type': 'circle',
        'paint':{
            'circle-radius': {
                base: 1.7,
                stops: [
                  [12, 3],
                  [22, 80]
                ]
            },
            'circle-color':'#002140',
            'circle-opacity':
            ['step',
                ["to-number",['get', 'value']],
                1,       
                4765.67,.1,
                4850.03,.3, 
                4884.63,.7,
                4905.60,1
            ]
        }
    })
    map.addLayer({
        'id':'pe-layer-2020','source':'pe-2020','source-layer':'2020_GLOBAL_IMERG_Precipitati-37a9yr',
        'type': 'circle',
        'paint':{
            'circle-radius': {
              base: 1.7,
              stops: [
                [12, 3],
                [22, 80]
              ]
            },
            'circle-color':'#5990C0',
            'circle-opacity':
            ['step',
                ["to-number",['get', 'value']],
                1, 
                266.27 ,.1,     
                469.87,.3,
                1146.87 ,.7,
                7842.44,1
            ]
        }
    })
    map.addLayer({
        'id': 'continents-layer',
        'type': 'fill',
        'source': 'continents', // reference the data source
        'layout': {},
        'paint': {
                'fill-color': '#72AA9F',
                'fill-opacity': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    .4,
                    0.015
                ]
            }
        })
    map.addLayer({
            'id': 'point-layer',
            'type': 'circle',
            'source': 'datapoints',
            'paint': {
                'circle-radius': 10,
                'circle-color': 'rgb(88, 182, 150)' // red color
            }
    })   
}
map.on('load',()=>{
    loadLayers()
    map.setLayoutProperty(
        'pe-layer-2020',
        'visibility','none'
    )
    map.on('idle',()=>{
        map.once('click', 'continents-layer', () => {
            if(map.getZoom()<3){ 
                map.setProjection('mercator')
                map.setMaxZoom(18)
                map.zoomTo(5)
                map.setMinZoom(2)
            }           
            map.on('click',(e) => {
                let features = map.queryRenderedFeatures(e.point, { layers: ['point-layer']});
                // if (!features.length) {
                //     return;
                // }
                map.panTo(e.lngLat)
                $('.mapboxgl-popup').css('max-width','auto')
                let shortText=features[0].properties.spei.split(' ').splice(0,17).join(" ")
                new mapboxgl.Popup({closeButton: false,width:'auto',anchor:'left',maxWidth:'none'})
                        .setLngLat(e.lngLat)
                        .setHTML(`
                                <div class="cases-popup-container row no-gap">
                                    <div class="cell-12">
                                        <span><h3><b>`+features[0].properties.title+`</b></h3></span>
                                        <hr>
                                    </div>
                                    <div class="cell-12 mt-1 popup-title">
                                        <b>Drought Resilience</b>
                                    </div>
                                    <div class="cell-12 popup-text">
                                        `+features[0].properties.spei+`
                                    </div>
                                    <div class="cell-12 mt-1 popup-title">
                                        <span><b>Indicator</b></span>
                                    </div>
                                    <div class="cell-12 popup-text-sm">
                                        <span>Standardized Precipitation Evapotranspiration Index (SPEI)</span>
                                    </div>
                                    <div class="cell-12 mt-1 popup-title">
                                        <span><b>Relevant Issue</b></span>
                                    </div>
                                    <div class="cell-12 popup-text-sm">
                                        <span>Drought Monitoring and Water Balance</span>
                                        <span>Natural Environment</span>
                                    </div>
                                    <div class="cell-12 mt-1 popup-title">
                                        <span><b>Data Source</b></span>
                                    </div>
                                    <div class="cell-12 popup-text-sm">
                                        <ol style="padding:0;margin:0;">
                                            <li>NASA</li>
                                            <li>LCSG: Climatology & Climate Services Laboratory</li>
                                        </ol>
                                    </div>
                                    <div class="cell-12 mt-1 popup-title">
                                        <hr>
                                        <span><i class="bi bi-search"></i><b> IDRO<span style="font-style:italic;">ki</span></b> Historical Data</span>
                                    </div>
                                </div>
                            `).addTo(map);
                function readLess(){
                    $('#spei-container').html(shortText+`...
                        <br>
                        <button type="button" class="button" id="read-more-popup">read more</button>
                    `)
                    $('#read-more-popup').on('click',()=>{
                        $('#spei-container').html(features[0].properties.spei+`
                            <br>
                            <button type="button" class="button" id="read-less-popup">read less</button>
                        `)
                        $('#read-less-popup').on('click',readLess())
                    })
                }
                function readMore(){
                    $('#spei-container').html(features[0].properties.spei+`
                        <br>
                        <button type="button" class="button" id="read-less-popup">read less</button>
                    `)
                    $('#read-less-popup').on('click',readLess())
                }
                $('#read-more-popup').on('click',readMore())
            })
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
                hoveredPolygonId = e.features[0].id;
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
        $('input[type=radio][name=indicator]').change(function() {
            if (this.value == 'Precipitation') {
                map.setLayoutProperty(
                    'gw-layer-2015',
                    'visibility','none'
                )
                map.setLayoutProperty(
                    'pe-layer-2020',
                    'visibility','visible'
                )
                $('#legend-container').removeClass('gw-legend').addClass('pe-legend')
                $('#legend-value').html('Presipitation Values')
                $('#max-legend-value').html('7,842')
                $('#min-legend-value').html('0.07')
            }
            else if(this.value=='Ground Water Storage'){
                map.setLayoutProperty(
                    'gw-layer-2015',
                    'visibility','visible'
                )
                map.setLayoutProperty(
                    'pe-layer-2020',
                    'visibility','none'
                )
                $('#legend-container').removeClass('pe-legend').addClass('gw-legend')
                $('#legend-value').html('Ground Water Values')
                $('#max-legend-value').html('5,569')
                $('#min-legend-value').html('-0.406')
            }else{
                map.setLayoutProperty(
                    'gw-layer-2015',
                    'visibility','none'
                )
                map.setLayoutProperty(
                    'pe-layer-2020',
                    'visibility','none'
                )
                // $('#legend-container').removeClass('pe-legend').addClass('gw-legend')
                $('#legend-value').html(this.value)
                $('#max-legend-value').html('-')
                $('#min-legend-value').html('-')
            }
        });
        function initialIndicatorAdd(){
            $('#indicator-radios').empty().append(`
                <li class="filter-colors filter-text"><input type="radio" name="indicator" data-role="radio" value="Precipitation" data-caption="Precipitation"></li>
                <li class="filter-colors filter-text"><input type="radio" name="indicator" data-role="radio" value="Ground Water Storage" data-caption="Ground Water Storage"></li>
            `)
            //<li class="filter-colors filter-text"><input type="radio" name="indicator" data-role="radio" value="Urban Green Space per Capita (sq. meters per person)" data-caption="Urban Green Space per Capita (sq. meters per person)"></li>
            // <li class="filter-colors filter-text"><input type="radio" name="indicator" data-role="radio" value="Compliance with Drought-Related Policies (%)" data-caption="Compliance with Drought-Related Policies (%)"></li>
            // <li class="filter-colors filter-text"><input type="radio" name="indicator" data-role="radio" value="Frequency of Stakeholder Coordination Meetings per Quarter" data-caption="Frequency of Stakeholder Coordination Meetings per Quarter"></li>
            // <li class="filter-colors filter-text"><input type="radio" name="indicator" data-role="radio" value="Adoption Rate of Climate-Adapted Technologies (%)" data-caption="Adoption Rate of Climate-Adapted Technologies (%)"></li>
            checkedIssues.forEach(issue => {
                categories.forEach(category => {
                    let filterIssues=Object.keys(filterOptions[category])
                    if(filterIssues.includes(issue)){
                        filterOptions[category][issue].forEach(indicator => {
                            $('#indicator-radios').append(`
                                <li class="filter-colors filter-text"><input type="radio" name="indicator" data-role="radio" value="`+indicator+`" data-caption="`+indicator+`"></li>
                            `)
                        });
                        
                    }
                });  
            })
            $('input[type=radio][name=indicator][value="Ground Water Storage"]').prop('checked', true);
            map.setLayoutProperty(
                'gw-layer-2015',
                'visibility','visible'
            )
            map.setLayoutProperty(
                'pe-layer-2020',
                'visibility','none'
            )
            $('#legend-container').removeClass('pe-legend').addClass('gw-legend')
            $('#legend-value').html('Ground Water Values')
            $('#max-legend-value').html('5,569')
            $('#min-legend-value').html('-0.406')
        }
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
                applyFilters()
            }
        })
        
        $('#category-checkboxes').off('change', 'input[type="checkbox"]').on('change', 'input[type="checkbox"]',(val)=>{
            if(val.isTrusted){
                if(categories.includes(val.target.dataset.caption))categories=categories.filter((e)=>{ return e !== val.target.dataset.caption })
                else categories.push(val.target.dataset.caption)
                issues=[]
                for (let index = 0; index < categories.length; index++) {
                    const element = categories[index];
                    Object.keys(filterOptions[element]).forEach(issue => {
                        if(issues.includes(issue))issues=issues.filter((e)=>{ return e !== issue })
                        else{issues.push(issue)}
                    });            
                }
                $('#relevant-issue-checkboxes').empty()
                issues.forEach(issue => {
                    $('#relevant-issue-checkboxes').append(`
                        <li class="filter-colors filter-text"><input name="relevant-issue-checkboxes" type="checkbox" data-role="checkbox" data-caption="`+issue+`"></li>
                    `)
                });
                checkedIssues=[]
                initialIndicatorAdd()
            }
        })
        $('#relevant-issue-checkboxes').off('change', 'input[type="checkbox"]').on('change', 'input[type="checkbox"]',(val)=>{
            if(val.isTrusted){
                if(checkedIssues.includes(val.target.dataset.caption))checkedIssues=checkedIssues.filter((e)=>{ return e !== val.target.dataset.caption })
                else checkedIssues.push(val.target.dataset.caption)
                initialIndicatorAdd() 
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
            // map.setFilter('point-layer',queryFilter)
        }
        map.once('style.load',()=>{
            loadLayers()
            applyFilters()
        })
        $('#time-slider').on('change',(val)=>{
            timeFrame=val.detail.val.split(',')
            $('#slider-return-value').val(timeFrame[0]+' - '+timeFrame[1])
            applyFilters()
        })
    })
    
})

$('#filter-button').on('click',()=>{
    if(hideFilter){
        $('#filter-content').css('display','none')
        $('#filter-container').css({'display':'none'})
        $('#map').css('height','100vh')
        map.resize();
        $('#filter-button').html(`
            <div class="row g-0 text-center">
                <div class="cell-3"><i class="bi bi-chevron-compact-up"></i></div>
                <div class="cell-9"><span>FILTER</span></div>
            </div>
        `)
        hideFilter=false
    }else{
        $('#filter-content').css('display','flex')
        $('#filter-container').css({'display':'block'})
        $('#map').css('height','73vh')
        map.resize();
        $('#filter-button').html(`
            <div class="row g-0 text-center">
                <div class="cell-3"><i class="bi bi-chevron-compact-down"></i></div>
                <div class="cell-9"><span>FILTER</span></div>
            </div>
        `)
        hideFilter=true
    }
})
$(document).ready(()=>{
    for (let index = 0; index < categories.length; index++) {
        const element = categories[index];
        console.log($('input:checkbox'))      
    }
    // $('#relevant-issue-checkboxes').empty()
    // issues.forEach(issue => {
    //     $('#relevant-issue-checkboxes').append(`
    //         <li class="filter-colors filter-text"><input name="relevant-issue-checkboxes" type="checkbox" data-role="checkbox" data-caption="`+issue+`"></li>
    //     `)
    // });
    // checkedIssues=[]
    // initialIndicatorAdd()
})
function checkAll(container){
    $('#'+container+' li').each((issuecheckbox)=>{
        let thecheckbox=$('#'+container+' li input')[issuecheckbox]
        if(!thecheckbox.checked){
            thecheckbox.click() 
        }
    })
}
