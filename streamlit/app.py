import streamlit as st
from bs4 import BeautifulSoup
import pathlib


API_KEY = "<API_KEY>"  # Replace

# Usersnap installation snippet
usersnap_snippet = f"""
      window.onUsersnapLoad = function(api) {{
        api.init();
      }};
      var script = document.createElement('script');
      script.defer = 1;
      script.src = 'https://widget.usersnap.com/global/load/{API_KEY}?onload=onUsersnapLoad';
      document.getElementsByTagName('head')[0].appendChild(script);
"""

# Inserts the script in the head tag of the static template inside your virtual environement
index_path = pathlib.Path(st.__file__).parent / "static" / "index.html"
soup = BeautifulSoup(index_path.read_text(), "html.parser")  # Python HTML parser

if not soup.find(id="usersnap-snippet"):
    script_tag = soup.new_tag("script", id="usersnap-snippet")
    script_tag.string = usersnap_snippet
    soup.head.append(script_tag)
    index_path.write_text(str(soup))

st.title("Usersnap Streamlit example")
