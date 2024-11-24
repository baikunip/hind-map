let arrayCountries=[
    {
      continent: "Africa",
      countries: [
        "Algeria",'Eswatini','Niger','Angola','Ethiopia','Nigeria','Benin','Gabon','Rwanda','Botswana',
        'Ghana','Sao Tome and Principe','Burkina Faso','Guinea','Burundi','Guinea-Bissau','Senegal','Cabo Verde','Kenya','Seychelles',
        'Cameroon','Lesotho','Sierra Leone','Central Africal Republic','Liberia','South Africa','Chad','Madagascar','South Sudan',
        'Comoros','Malawi','Gambia','Congo','Mali','Togo',"Ivory Coast","Mauritania","Democratic Republic of Congo","Mauritius",'Uganda',
        'Equatorial Guinea','Mozambique','United Republic of Tanzania','Eritrea','Namibia','Zambia','Zimbabwe'
        // Add more countries as needed
      ]
    },
    {continent: "Central Asia",
      countries:['Uzbekistan','Kazakhstan','Tajikistan','Turkmenistan','Kyrgyzstan']
    },
    {continent: "Eastern Asia",
      countries:['China','Japan','South Korea','North Korea','Mongolia']
    },
    {continent: "South-Eastern Asia",
      countries:['Indonesia','Philippines','Vietnam','Thailand','Myanmar','Malaysia','Cambodia','Laos','Singapore','Timor-Leste','Brunei']
    },
    {continent: "Southern Asia",
      countries:['India','Pakistan','Bangladesh','Iran','Afghanistan','Nepal','Sri Lanka','Bhutan','Maldives']
    },
    {continent: "Western Asia",
      countries:['Turkey','Iraq','Yemen','Saudi Arabia','Syria','Jordan','United Arab Emirates','Azerbaijan','Israel',
        'Lebanon','Palestine','Oman','Kuwait','Georgia','Qatar','Armenia','Bahrain','Cyprus']
    },
    {
      continent: "Europe",
      countries: [
        "Russia", "Germany", "United Kingdom", "France", "Italy",
        "Spain", "Ukraine", "Poland", "Romania", "Netherlands","Belgium",'Czech Republic','Sweden','Portugal','Greece',
        'Hungary','Austria','Belarus','Switzerland','Bulgaria','Serbia','Denmark','Finland','Norway','Slovakia','Ireland','Croatia',
        'Bosnia and Herzegovina','Moldova','Lithuania','Albania','Slovenia','Latvia','North Macedonia','Estonia','Luxembourg','Montenegro','Malta','Iceland','Andorra','Liechtenstein',
        'Monaco','San Marino','Holy See'
        // Add more countries as needed
      ]
    },
    {
      continent: "North America",
      countries: [
        "United States", "Canada", "Jamaica","Puerto Rico","Trinidad and Tobago","Guadeloupe","Martinique",
        "Greenland","Mexico", "Guatemala", "Cuba","Guatemala","Panama","Costa Rica","Belize","Bahamas",
        "Haiti", "Dominican Republic", "Honduras", "Nicaragua", "El Salvador","Turks and Caicos Islands",
        "Dominica","Saint Lucia","Curaçao","Antigua and Barbuda","Barbados","Saint Vincent and the Grenadines",
        "US Virgin Islands","Grenada","Caribbean Netherlands","Cayman Islands","Saint Kitts and Nevis","Saint Pierre and Miquelon",
        "Aruba","British Virgin Islands","Montserrat","Anguilla","Bermuda","Sint Maarten","Saint Barthelemy",
        "Clipperton Island"
        // Add more countries as needed
      ]
    },
    {
      continent: "South America",
      countries: [
        "Argentina","Bolivia","Brazil","Chile","Colombia","Ecuador","Falkland Islands","French Guiana","Guyana",
        "Paraguay","Peru","South Georgia and South Sandwich Islands","Suriname","Uruguay","Venezuela"
        // Add more countries as needed
      ]
    },
    {
      continent: "Oceania",
      countries: [
        "Australia", "Papua New Guinea", "New Zealand", "Fiji", "Solomon Islands",
        "Vanuatu", "Samoa", "Kiribati", "Tonga", "Micronesia",
        // Add more countries as needed
      ]
    }
  ]
let filterOptions={'Built Environment': 
  {'Community Awareness': ['Composite Vulnerability Index (0-100 scale)', 'Percentage of Drought-Affected Population Accessing Social Protection Programs'], 
    'Adaptation Measures': ['Compliance with Drought-Related Policies (%)', 'Frequency of Stakeholder Coordination Meetings per Quarter', 'Adoption Rate of Climate-Adapted Technologies (%)'], 'Vulnerability and Risk': ['Soil Moisture Deficit (% deviation from baseline)', 'Population Displacement Due to Drought (number per drought event)', 'Drought-Induced Unemployment Rate (% of total workforce)', 'Agricultural Insurance Coverage (% of Agricultural Area)'], 'Resilient Infrastructure': ['Rate of Groundwater Storage Depletion (cubic meters/month)', 'Percentage of Population with Access to Backup Water Supply Systems'], 'Equity Considerations': ['Percentage of Households with Documented Land and Resource Rights', 'Percentage of Women in Resource Management and Decision-Making Roles'], 'Urban Green Spaces': ['Urban Green Space per Capita (sq. meters per person)'], 'Infrastructure Systems': ['Infrastructure Capacity per Capita (cubic meters/person)', 'Reservoir Storage Variability (% Full Capacity by Season)'], 'Urban Areas': ['Coverage of Drought-Resilient Infrastructure (facilities/sq. km)'], 'Water-Efficient Design': ['Reduction in Water Use Due to Conservation Practices (% reduction)']}, 'Economy': {'Trade-offs and Decision-Making': ['Low-Flow Index Value (0-1 scale)', '5-Year Average Yield Loss Rate Due to Drought (% loss)', 'Average Travel Distance to Market (km)'], 'Resource Allocation': ['Water Requirement Satisfaction Index (WRSI) Value (% of crop water needs met)', 'Usage Rate of Alternative Water Sources (%)'], 'Costs and Resilience': ['Community Resilience Index (0-100 scale)'], 'Socioeconomic Drought': ['Income Deciles in Drought-Affected Populations (for economic profiling)', 'SMDI Standardized Value (range -4 to +4)', 'Drought Exposure Rate (% of population in drought-affected areas)'], 'Economic Impacts of Drought': ['Food Insecurity Prevalence Rate in Drought-Prone Areas (%)'], 'Impact on Economic Growth': ['Poverty Headcount Ratio in Drought-Affected Regions (%)', 'Percentage of Population Below Poverty Line in Drought-Prone Areas (%)']}, 'Natural Environment': {'Ecological Drought': ['Groundwater Recharge Rate (mm/year)', 'Vegetation Health Index (VHI) Value (range 0-100)', 'Soil Organic Carbon Content (gC/kg)', 'Grass Species Count per 1000 m²', 'Vegetation Drought Response Index (VegDRI) Value (0-100 scale)', 'Rainfall Deficiency (%) relative to monthly average', 'Water Retention Capacity of Forest Soil (mm)', 'Monthly Rainfall Deviation (mm)', 'Plant Species Diversity Index (Shannon Index)', 'Soil Aggregate Stability (%)', 'Soil Erosion Potential (t/ha/year)', 'Monthly Precipitation Anomaly (mm)', 'Multivariate Standardized Drought Index (MSDI) Value (range -3 to +3)', 'Soil pH Level'], 'Urban Areas': ['Standardized Streamflow Index (SSFI) Value (range -3 to +3)', 'Average Timing of Snowmelt (date of year)', 'Annual Change in Water Storage (mm/year)', 'Groundwater Level Changes (m)', 'Keetch–Byram Drought Index (KBDI) Value (0-800)', 'Area of Water Bodies (% of total area)', 'Daily Rainfall Amount (mm)', 'Standardized Water Supply Index (SWSI) Monthly Value (range -4 to +4)', 'Standardized Precipitation Evapotranspiration Index (SPEI) Value (range -3 to +3)', 'Aridity Anomaly Index (AAI) Monthly Value (0-1 scale)', 'Monthly Temperature Anomaly (°C)', 'Standardized Precipitation Index (SPI) Value (range -3 to +3)', 'Palmer Drought Severity Index (PDSI) Score (range -4 to +4)', 'Aggregate Dryness Index (ADI) Monthly Value'], 'Mitigation Strategies': ['Number of Awareness Campaigns Conducted Annually', 'Farmers with Extension Access (%)'], 'Ecosystem Resilience': ['Combined Drought Indicator (CDI) Composite Score (range 0-5)', 'Ecosystem water use efficiency (WUE)(gC/kg H₂O)', 'Monthly ESI Value (0-1 scale)', 'Enhanced Vegetation Index (EVI) Value (range -1 to +1)', 'Mean Monthly Land Surface Temperature (LST) (°C)', 'Average Root Depth (cm) and Biomass Density (kg/m²)', 'Percentage Change inChange in gross primary productivity (GPP) (gC/m²/year)', 'Percentage of Sand, Silt, and Clay', 'Normalized Difference Vegetation Index (NDVI) Value (range -1 to +1)', 'Vegetation Condition Index (VCI) Score (0-100)'], 'Ecosystems and Drought': ['Crop Species Diversity Index (Shannon Index)', 'Average Time for NDVI Recovery (days)', 'Tree Species Count per 1000 m²', 'Hectares of Ecosystem Restored or Protected Annually', 'Shrub Species Count per 1000 m²'], 'Human-Environment Interaction': ['Governance Quality Index (0-100 scale)', 'Number of Governance Structures for Drought Management', 'Number of Drought-Specific Policies Implemented Annually'], 'Nature-Based Solutions': ['Number of Training Programs Delivered Annually', 'Soil Water Storage Capacity (mm)', 'Storm Water Runoff (m³/s)', 'Soil Adjusted Vegetation Index (SAVI) Value (range -1 to +1)', 'Soil Water Infiltration Capacity (cm³/cm³)', 'Soil Infiltration Rate (cm/hr)', 'Percentage of Soil Organic Matter Content (%)', 'Reforested/Afforested Area (ha/year)'], 'Watersheds and Wetlands': ['Streamflow Volume (m³/s)', 'Water Quality Index (WQI) (0-100 scale)', 'Snowpack Depth (cm) and Snow Water Equivalent (SWE) (mm)']}, 'People and Community': {'Communities': ['Percentage of Population with Access to Drought-Specific Loans or Credits', 'Percentage of community members actively engaged in local knowledge-sharing for drought preparedness'], 'Community Resilience and Adaptation': ['Percentage of Local Stakeholders Involved in Planning'], 'Economic Channel': ['Annual Expenditure on Drought Resilience ($)'], 'Economic Consequences': ['Direct Economic Losses from Drought (% of National GDP)', 'Annual Economic Losses from Drought as Percentage of GDP', 'Diversity Index of Economic Activities (Simpson Index)'], 'Individuals': ['Drought-Related Morbidity and Mortality Rates (per 10,000 people)'], 'Health and Well-Being': ['Percentage of households with diversified income sources', 'Freshwater Withdrawal as Percentage of Total Renewable Water Resources'], 'Households': ['Livelihood Asset Index (0-1 scale)'], 'Social Impacts': ['Total Number of Casualties and Displaced Individuals per Drought Event', 'Percentage of Affected Population Restoring Livelihoods within 1 Year Post-Drought'], 'Immediate and Medium-Term Impacts': ['Streamflow Drought Index (SDI) Values by Month']}}