import pandas as pd

df=pd.read_excel('D:\Github\hind-map\data\FrameworkIDRO_clean.xlsx')
keyArray=list(dict.fromkeys(df["Relevant Issues"].to_list()))
# print(df)
obj={
    'Built Environment':{},
    'Economy':{},
    'Natural Environment':{},
    'People and Community':{}
}

# Iterate over the DataFrame and populate the obj
for _, row in df.iterrows():
    category = row["Category"]
    relevant_issue = row["Relevant Issues"]
    proposed_indicator = row["Proposed Measurable Indicator"]
    
    # Ensure the relevant issue is a key in the category
    if relevant_issue not in obj[category]:
        obj[category][relevant_issue] = set()  # Use a set to prevent duplicate indicators
    
    # Add the proposed indicator to the set
    obj[category][relevant_issue].add(proposed_indicator)

# Convert sets back to lists for the final object
for category in obj:
    for issue in obj[category]:
        obj[category][issue] = list(obj[category][issue])

# Display the resulting object
print(obj)