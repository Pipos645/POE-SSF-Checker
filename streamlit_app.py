import pandas as pd
import streamlit as st
import requests
from bs4 import BeautifulSoup

st.title("POE SSF CHECKER")

unique_list = pd.read_csv("poe_uniques_3.25.csv")

user_link = st.text_input("Paste your pobb.in link below")

if user_link != "":
    r = requests.get(user_link)
    soup = BeautifulSoup(r.text, "lxml")
    inventory = soup.select("div.inventory > img")
    inventory_list = []

    for items in inventory:
        inventory_list.append(items["alt"])

    match = unique_list[unique_list["Name"].isin(inventory_list)]
    match["Wiki link"] = "https://www.poewiki.net/wiki/" + match["Name"]
  
    st.markdown(f":orange[{len(match)} unique items detected]")
    st.markdown("**Table containing their names, rarity tier and link to wiki :**")
  
    st.dataframe(
        match,
        column_config={
            "Wiki link": st.column_config.LinkColumn(
                display_text="wiki"
            )
        },
        hide_index=True
    )
    st.markdown(":gray[Made by Philippe Brand 2025, this website is not affiliated with GGG by any means.]")
