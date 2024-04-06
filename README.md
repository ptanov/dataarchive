# Data archive

- Cherni vrah's archive meteo data is available here: <https://ptanov.github.io/dataarchive/webapp/meteo/>

- Cherni vrah's archive meteo raw data is available here: <https://github.com/ptanov/dataarchive/tree/pages/data/meteo/>, <https://ptanov.github.io/dataarchive/data/meteo/vitosha/measurement/2024.html>, <https://ptanov.github.io/dataarchive/data/meteo/vitosha/comfort/2024.html>, <https://ptanov.github.io/dataarchive/data/meteo/vitosha/ground_temperature/2024.html>, <https://ptanov.github.io/dataarchive/data/meteo/vitosha/snow/2024.html>

# Motivation

Various sources of data doesn't keep track of the old values, but only information for the current moment, e.g. NIMH provides information about the current situation at their meteo stations (e.g. Cherni vrah) but you can't find information about any past moments (e.g. what was the weather on the previous day).

This project (in a hackish way) uses github workflows to poll and save this data in github.

Actual workflow is <https://github.com/ptanov/dataarchive/blob/master/.github/workflows/meteo-vitosha.yml> and collected data is stored in github pages: <https://github.com/ptanov/dataarchive/tree/pages/data/>.

Also there is some ugly visualization of the available data here: <https://ptanov.github.io/dataarchive/> (source code is here: <https://github.com/ptanov/dataarchive/tree/pages/webapp/>)

# Project Data License

The code is licensed under Apache License Version 2.0, check LICENSE in the root folder of `master` branch. However the owner of the actually downloaded data (folder `data/`) is National Institute of Meteorology and Hydrology (NIMH):

This project, including but not limited to the data utilized within, is not intended for commercial use. The data incorporated herein is obtained from National Institute of Meteorology and Hydrology (NIMH) - publicly available sources such as https://weather.bg/index.php?koiFail=tekushti&lng=0 and https://hydro.bg/bg/t1.php?ime=&gr=data/&gn=sniag. It is important to note that I do not claim ownership of this data, and I do not guarantee its accuracy or reliability.

Users or individuals interested in utilizing the data from this project are required to seek permission directly from the sources of the aforementioned data. It is the responsibility of the users to ensure compliance with the terms and conditions set forth by the data sources.

Furthermore, please find the link to the source code of this project: https://github.com/ptanov/dataarchive

DISCLAIMER OF WARRANTY: The data provided in this project is provided "as is," without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. The entire risk as to the quality and accuracy of the data is with the user.

LIMITATION OF LIABILITY: In no event shall the author be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the use or performance of the data or this project.

By accessing, using, or interacting with this project or its associated data, you agree to abide by the terms and conditions outlined above.

DataArchive, https://github.com/ptanov/dataarchive
08.01.2023
