import pandas as pd

df=pd.read_excel('D:\Github\hind-map\data\IDROframework.xlsx')
keyArray=list(dict.fromkeys(df["Issues"].to_list()))
print(keyArray)