function populateTable(data) {
	const tableBody = document.getElementById('dataBody');
	const sources = {
		"snow": "<a target='_blank' href='https://hydro.bg/bg/t1.php?ime=&gr=data/&gn=sniag'>НИМХ, снежна покривка</a>, <a target='_blank' href='https://hydro.bg/bg/t1.php?ime=&gr=data/&gn=sniag#:~:text=%D0%98%D0%B7%D0%BF%D0%BE%D0%BB%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%20%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D0%B8%20%D0%B7%D0%B0%20%D0%B2%D0%B8%D0%B4%20%D0%BD%D0%B0%20%D0%B2%D0%B0%D0%BB%D0%B5%D0%B6%20%D0%B2%20%D1%81%D1%80%D0%B5%D0%B4%D0%BD%D0%BE%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%BE%D0%BB%D0%B5'>легенда</a>",
		"measurement": "<a target='_blank' href='https://weather.bg/index.php?koiFail=tekushti&lng=0#:~:text=%D0%9F%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D0%B8%20%D0%B8%D0%B7%D0%BC%D0%B5%D1%80%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-,%D0%A2%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0%20%D1%81%20%D0%B4%D0%B0%D0%BD%D0%BD%D0%B8%D1%82%D0%B5,-%D0%9B%D0%B5%D0%B3%D0%B5%D0%BD%D0%B4%D0%B0%20%2D%20%D0%B8%D0%B7%D0%BC%D0%B5%D1%80%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F'>НИМX измервания</a>, <a target='_blank' href='https://weather.bg/index.php?koiFail=tekushti&lng=0#:~:text=%D0%9B%D0%B5%D0%B3%D0%B5%D0%BD%D0%B4%D0%B0%20%2D%20%D0%B8%D0%B7%D0%BC%D0%B5%D1%80%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F'>легенда</a>",
		"comfort": "<a target='_blank' href='https://weather.bg/index.php?koiFail=tekushti&lng=0#:~:text=%D0%A2%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0%20%D0%BD%D0%B0%20%D1%82%D0%B5%D0%BC%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D1%83%D1%80%D0%B0%D1%82%D0%B0%20%D0%BD%D0%B0%20%D1%83%D1%81%D0%B5%D1%89%D0%B0%D0%BD%D0%B5%20%D0%B2%20%D1%81%D0%B8%D0%BD%D0%BE%D0%BF%D1%82%D0%B8%D1%87%D0%BD%D0%B8%D1%82%D0%B5%20%D0%BD%D0%B8%20%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D0%B8'>НИМХ,  индекс на комфорт</a>, <a target='_blank' href='https://weather.bg/index.php?koiFail=tekushti&lng=0#:~:text=%D0%98%D0%BD%D0%B4%D0%B5%D0%BA%D1%81%20%D0%BD%D0%B0%20%D1%82%D0%BE%D0%BF%D0%BB%D0%B8%D0%BD%D0%B5%D0%BD%20%D0%BA%D0%BE%D0%BC%D1%84%D0%BE%D1%80%D1%82%20%D0%BD%D0%B0%20%D0%B1%D0%B0%D0%B7%D0%B0%D1%82%D0%B0%20%D0%BD%D0%B0%20%D1%82%D0%B5%D0%BC%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D1%83%D1%80%D0%B0%20%D0%BD%D0%B0%20%D1%83%D1%81%D0%B5%D1%89%D0%B0%D0%BD%D0%B5'>легенда</a>",
	};
	sources["measurement+comfort"] = sources["measurement"]+"<br />"+sources["comfort"];
	tableBody.innerHTML = '';
	data.forEach(entry => {
		const row = document.createElement('tr');
		row.innerHTML = `<td><b>${entry.date.getHours() ? (entry.date.getHours() + ":00") : ""}</b><br />${entry.date.getFullYear()}-${entry.date.getMonth() + 1}-${entry.date.getDate()}</td><td>${entry.temperature ? (entry.temperature + (Math.round(Math.abs(entry.temperature)) == Math.abs(entry.temperatureFromMeasurement) ? "" : (" ("+entry.temperatureFromMeasurement+")"))) : ""}</td><td>${entry.feelsLike || ""}</td><td>${entry.source == "snow" ? ("<b>нов валеж: " + entry.newSnow + "<br />тип: " + entry.newType + "<br />снежна покривка: " + (entry.snowCover || "0")) : entry.status || ""}<b/></td><td>${entry.wind ? (entry.wind + (entry.wind == entry.windFromComfort ? "" : (" ("+entry.windFromComfort+")"))) : ""}, ${entry.windDirection || ""}</td>
		<td>${entry.humidity || ""}</td><td>${entry.pressure || ""}</td><td>${entry.cloud || ""}</td><td>${entry.comfortIndex || ""}</td>
		<td>${entry.recomendedEquipment || ""}</td><td>данни: <a href="../../data/meteo/vitosha/measurement/${entry.date.getFullYear()}.html" target="_blank">измервания</a>, <a href="../../data/meteo/vitosha/comfort/${entry.date.getFullYear()}.html" target="_blank">комфорт</a>, <a href="../../data/meteo/vitosha/snow/${entry.date.getFullYear()}.html" target="_blank">сняг</a><br />${sources[entry.source]}</td>`;
		tableBody.appendChild(row);
	});
}

function populateChart(data) {
	const dates = data.filter(a => a.source != "snow").map(entry => `${entry.date.getFullYear()}-${entry.date.getMonth() + 1}-${entry.date.getDate()}${entry.date.getHours() ? (" " + entry.date.getHours() + ":00") : ""}`);
	const temperature = data.filter(a => a.source != "snow").map(entry => entry.temperature);
	const feelsLike = data.filter(a => a.source != "snow").map(entry => entry.feelsLike);
	const wind = data.filter(a => a.source != "snow").map(entry => entry.wind);
	const humidity = data.filter(a => a.source != "snow").map(entry => entry.humidity);
	const pressure = data.filter(a => a.source != "snow").map(entry => entry.pressure);
	const cloud = data.filter(a => a.source != "snow").map(entry => entry.cloud);
	// const comfortIndex = data.filter(a => a.source != "snow").map(entry => entry.comfortIndex);
	// const recomendedEquipment = data.filter(a => a.source != "snow").map(entry => entry.recomendedEquipment);

	const shouldReverse = document.getElementById('sortOrder').value == "desc";
	const chartStatus = Chart.getChart("chart");
	if (chartStatus) {
		chartStatus.destroy();
	}
	const ctx = document.getElementById('chart').getContext('2d');

	new Chart(ctx, {
		type: 'line',
		data: {
			labels: shouldReverse?dates.reverse():dates,
			datasets: [
				{
					label: 'Temperature',
					data: shouldReverse?temperature.reverse():temperature,
					borderColor: 'rgb(255, 99, 132)',
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					yAxisID: 'y-axis-temperature',
				},
				{
					label: 'Feels Like',
					data: shouldReverse?feelsLike.reverse():feelsLike,
					borderColor: 'rgb(170, 0, 0)',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					yAxisID: 'y-axis-temperature',
				},
				{
					label: 'Wind',
					data: shouldReverse?wind.reverse():wind,
					borderColor: 'rgb(0, 162, 0)',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					yAxisID: 'y-axis-wind',
				},
				{
					label: 'Humidity',
					data: shouldReverse?humidity.reverse():humidity,
					borderColor: 'rgb(54, 162, 235)',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					yAxisID: 'y-axis-humidity',
				},
				{
					label: 'Pressure',
					data: shouldReverse?pressure.reverse():pressure,
					borderColor: 'rgb(0, 0, 235)',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					yAxisID: 'y-axis-pressure',
				},
				{
					label: 'Cloud',
					data: shouldReverse?cloud.reverse():cloud,
					borderColor: 'rgb(128, 128, 128)',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					yAxisID: 'y-axis-cloud',
				},
				/*
				{
					label: 'Comfort index',
					data: shouldReverse?comfortIndex.reverse():comfortIndex,
					borderColor: 'rgb(54, 162, 235)',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					yAxisID: 'y-axis-comfort_index',
				},
				{
					label: 'Recomended Equipment',
					data: shouldReverse?recomendedEquipment.reverse():recomendedEquipment,
					borderColor: 'rgb(54, 162, 235)',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					yAxisID: 'y-axis-recommended-equipment',
				},
				*/
			],
		},
		options: {
			responsive: true,
			scales: {
				'y-axis-humidity': {
					position: 'right',
				},
				'y-axis-pressure': {
					position: 'right',
				},
				'y-axis-cloud': {
					position: 'right',
				},
			},
		},
	});
}

function parseMeasurement(html, units) {
	const result = /<tr>\s*<td>Черни връх<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>.*?(<img[^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>.*<\/tr>/.exec(html);
	const dateRaw = /(\d\d?)\.(\d\d?)\.(\d+\d+\d+\d+)/.exec(result[1]);
	// we have to use external library because we don't know whether it is +2 or +3 on the given date:
	const datetime = luxon.DateTime.fromObject({day:dateRaw[1], month:dateRaw[2], year: dateRaw[3], hour:result[2]}, {zone:"Europe/Sofia"}).toJSDate();
	return {
		date: datetime,
		hour: parseInt(result[2]),
		temperature: result[3],
		status: result[4],
		wind: convert(result[5], units),
		windDirection: result[6],
		pressure: result[7],
		source: "measurement"
	};

}

function convert(value, target) {
	if (target == "kmh") {
		return value * 3.6;
	}
	return parseInt(value);
}

function parseComfort(html, units) {
	const result = /<tr>\s*<td>Черни връх<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<\/tr>/.exec(html)
	const dateRaw = /(\d\d?)\.(\d\d?)\.(\d+\d+\d+\d+)/.exec(result[1])
	const datetime = new Date(`${dateRaw[3]}-${dateRaw[2]}-${dateRaw[1]}T${result[2]}:00:00.000Z`);
	return {
		date: datetime,
		hour: datetime.getHours(),
		temperature: result[3],
		humidity: result[4],
		wind: convert(result[5], units),
		cloud: result[6] + 0,
		feelsLike: result[7],
		comfortIndex: result[8],
		recomendedEquipment: result[9],
		source: "comfort"
	};
}

function convertType(type) {
	const types = {
		// from the legend here: https://hydro.bg/bg/t1.php?ime=&gr=data/&gn=sniag 
		".": ",няма явления",
		"n.a": ",няма данни",
		"p": ",роса",
		"o": ",дъжд",
		"=": ",мокреща мъгла",
		"\"": ",ръмеж",
		"[": ",слана",
		"v": ",скреж",
		"*": ",сняг",
		"~": ",поледица",
		"^": ",суграшица",
		"/": ",ледени игли",
		"x": ",снежни зърна",
		")": ",леден дъжд",
		"r": ",краткотраен дъжд",
		"s": ",краткотраен сняг",
		"G": ",град",
		"err": ",грешка",
	};

	result = type.trim();
	for (var key in types){
		result = result.replace(key, types[key]);
	}
	if (result.startsWith(",")) {
		result = result.substring(1);
	}

	return result;
}

function parseSnow(html) {
	const result = /<tr><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><\/tr>/.exec(html);
	const dateRaw = /(\d\d?)\.(\d\d?)\.(\d+\d+\d+\d+)/.exec(result[1])
	// the date here is the day before but we want to see it like the reading is for "this morning"
	const datetime = new Date(new Date(`${dateRaw[3]}-${dateRaw[2]}-${dateRaw[1]}`).getTime() + 24 * 60 * 60 * 1000);
	return {date: datetime, newSnow: result[2], newType: convertType(result[3]) || result[3], snowCover: result[4], source: "snow"};
}


function filterSortAndGroupData(all, fromDate, toDate) {
	const sortOrder = document.getElementById('sortOrder').value;

	let filteredData = all.filter(entry => entry.date >= fromDate && entry.date <= toDate);
	if (sortOrder === 'asc') {
		filteredData.sort((a, b) => (a.date > b.date ? 1 : (a.date == b.date ? (a.hour > b.hour ? 1 : -1) : -1)));
	} else {
		filteredData.sort((a, b) => (a.date < b.date ? 1 : (a.date == b.date ? (a.hour < b.hour ? 1 : -1) : -1)));
	}
	
	for (let i = filteredData.length - 1; i>0; i--) {
		next = filteredData[i];
		previous = filteredData[i - 1];
		if (next.date.getTime() == previous.date.getTime() && next.source != previous.source && next.source != "snow" && previous.source != "snow") {
			// merge them into previous, remove next
			fromMeasurement = (next.source == "measurement") ? next : previous;
			fromComfort = (next.source == "comfort") ? next : previous;
			
			fromComfort.status = fromMeasurement.status;
			fromComfort.windDirection = fromMeasurement.windDirection;
			fromComfort.pressure = fromMeasurement.pressure;
			fromComfort.temperatureFromMeasurement = fromMeasurement.temperature;
			fromComfort.windFromComfort = fromComfort.wind;
			fromComfort.wind = fromMeasurement.wind;
			fromComfort.source = "measurement+comfort";
			
			filteredData[i - 1] = fromComfort;
			filteredData.splice(i, 1);
			i--;
		}
	}
	return filteredData;
}

function loadData() {
	const units = document.getElementById('units').value;
	const windHeader = document.getElementById('windHeader');
	windHeader.innerHTML = `Вятър, ${units}`
	
	const toDate = new Date(document.getElementById('toDate').value || new Date());
	toDate.setHours(23, 59, 59);
	const fromDate = new Date(document.getElementById('fromDate').value || new Date(Date.now() - 14 * 24 * 60 * 60 * 1000));
	fromDate.setHours(0, 0, 0);

	const fromYear = fromDate.getFullYear();
	const toYear = toDate.getFullYear();
	const all = [];
	
	const years = Array(toYear - fromYear + 1).fill(0).map((x, y) => x + y + fromYear);
	const measurement = Promise.all(years.map(y => fetch(`../../data/meteo/vitosha/measurement/${y}.html`)))
		.then(ps => Promise.all(ps.filter(p => p.ok).map(p => p.text())))
		.then(responses => responses.flatMap(text => text.split(/\r?\n/)).filter(line => line.startsWith("<tr")).map(a => parseMeasurement(a, units)));

	const comfort = Promise.all(years.map(y => fetch(`../../data/meteo/vitosha/comfort/${y}.html`)))
		.then(ps => Promise.all(ps.filter(p => p.ok).map(p => p.text())))
		.then(responses => responses.flatMap(text => text.split(/\r?\n/)).filter(line => line.startsWith("<tr")).map(a => parseComfort(a, units)));

	const snow = Promise.all(years.map(y => fetch(`../../data/meteo/vitosha/snow/${y}.html`)))
		.then(ps => Promise.all(ps.filter(p => p.ok).map(p => p.text())))
		.then(responses => responses.flatMap(text => text.split(/\r?\n/)).filter(line => line.startsWith("<tr")).map(a => parseSnow(a)));

	Promise.all([measurement, comfort, snow]).then(function(valArray) {
		const result = filterSortAndGroupData(valArray.flat(), fromDate, toDate);
		
		populateTable(result);
		populateChart(result);
	});

}

function togglePanel(panelId) {
	const panelContent = document.getElementById(panelId);
	if (panelContent.style.display === "none" || panelContent.style.display === "") {
		panelContent.style.display = "block";
	} else {
		panelContent.style.display = "none";
	}
}

loadData();
