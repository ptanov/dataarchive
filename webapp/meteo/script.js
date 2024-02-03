const directionToDegrees = {
	"N" :   0,
	"E" :  90,
	"S" : 180,
	"W" : 270,
	"NE":  45,
	"SE": 135,
	"SW": 225,
	"NW": 315
};

const STATUS_MODIFIERS = [
	{
		check: (status) => ("<img src='https://info.meteo.bg/i/meteo/naborizm/image28.gif'>мъгла" === status),
		tableModifier: (status) => "<img src='https://info.meteo.bg/i/meteo/naborizm/image28.gif'>(лека) мъгла",
		graphModifier: (status, image) => {
			const canvas = document.createElement('canvas');
			canvas.width = image.width;
			canvas.height = image.height;
			const ctx = canvas.getContext('2d');
			ctx.drawImage(image, 0, 0, image.width, image.height);

			ctx.beginPath();
			ctx.moveTo(canvas.width / 2, 4);
			ctx.lineTo(canvas.width / 2, canvas.height - 2);
			ctx.lineWidth = 3;
			ctx.strokeStyle = '#ff0000';
			ctx.stroke();

			return canvas;
		}
	},
];

function modifyStatus(status) {
	for (modifier of STATUS_MODIFIERS) {
		if (modifier.check(status)) {
			return modifier.tableModifier(status);
		}
	}
	return status;
}

function modifyPointStyle(status, image) {
	for (modifier of STATUS_MODIFIERS) {
		if (modifier.check(status)) {
			return modifier.graphModifier(status, image);
		}
	}
	return image;
}

function chooseTemperature(temperature, temperatureFromMeasurement) {
	if (!temperature && !temperatureFromMeasurement) {
		return "";
	}
	if (temperature && !temperatureFromMeasurement) {
		return temperature;
	}
	if (!temperature && temperatureFromMeasurement) {
		return temperatureFromMeasurement;
	}
	if (Math.round(Math.abs(temperature)) == Math.abs(temperatureFromMeasurement)) {
		return temperature;
	}
	return `${temperatureFromMeasurement} (${temperature})`;
}

function populateTable(data, units) {
	const tableBody = document.getElementById('dataBody');
	document.getElementById('windHeader').innerHTML = `Вятър, ${units}`

	const sources = {
		"snow": "<a target='_blank' href='https://hydro.bg/bg/t1.php?ime=&gr=data/&gn=sniag'>НИМХ, снежна покривка</a>, <a target='_blank' href='https://hydro.bg/bg/t1.php?ime=&gr=data/&gn=sniag#:~:text=%D0%98%D0%B7%D0%BF%D0%BE%D0%BB%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%20%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D0%B8%20%D0%B7%D0%B0%20%D0%B2%D0%B8%D0%B4%20%D0%BD%D0%B0%20%D0%B2%D0%B0%D0%BB%D0%B5%D0%B6%20%D0%B2%20%D1%81%D1%80%D0%B5%D0%B4%D0%BD%D0%BE%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%BE%D0%BB%D0%B5'>легенда</a>",
		"measurement": "<a target='_blank' href='https://weather.bg/index.php?koiFail=tekushti&lng=0#:~:text=%D0%9F%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D0%B8%20%D0%B8%D0%B7%D0%BC%D0%B5%D1%80%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-,%D0%A2%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0%20%D1%81%20%D0%B4%D0%B0%D0%BD%D0%BD%D0%B8%D1%82%D0%B5,-%D0%9B%D0%B5%D0%B3%D0%B5%D0%BD%D0%B4%D0%B0%20%2D%20%D0%B8%D0%B7%D0%BC%D0%B5%D1%80%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F'>НИМX измервания</a>, <a target='_blank' href='https://weather.bg/index.php?koiFail=tekushti&lng=0#:~:text=%D0%9B%D0%B5%D0%B3%D0%B5%D0%BD%D0%B4%D0%B0%20%2D%20%D0%B8%D0%B7%D0%BC%D0%B5%D1%80%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F'>легенда</a>",
		"comfort": "<a target='_blank' href='https://weather.bg/index.php?koiFail=tekushti&lng=0#:~:text=%D0%A2%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0%20%D0%BD%D0%B0%20%D1%82%D0%B5%D0%BC%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D1%83%D1%80%D0%B0%D1%82%D0%B0%20%D0%BD%D0%B0%20%D1%83%D1%81%D0%B5%D1%89%D0%B0%D0%BD%D0%B5%20%D0%B2%20%D1%81%D0%B8%D0%BD%D0%BE%D0%BF%D1%82%D0%B8%D1%87%D0%BD%D0%B8%D1%82%D0%B5%20%D0%BD%D0%B8%20%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D0%B8'>НИМХ,  индекс на комфорт</a>, <a target='_blank' href='https://weather.bg/index.php?koiFail=tekushti&lng=0#:~:text=%D0%98%D0%BD%D0%B4%D0%B5%D0%BA%D1%81%20%D0%BD%D0%B0%20%D1%82%D0%BE%D0%BF%D0%BB%D0%B8%D0%BD%D0%B5%D0%BD%20%D0%BA%D0%BE%D0%BC%D1%84%D0%BE%D1%80%D1%82%20%D0%BD%D0%B0%20%D0%B1%D0%B0%D0%B7%D0%B0%D1%82%D0%B0%20%D0%BD%D0%B0%20%D1%82%D0%B5%D0%BC%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D1%83%D1%80%D0%B0%20%D0%BD%D0%B0%20%D1%83%D1%81%D0%B5%D1%89%D0%B0%D0%BD%D0%B5'>легенда</a>",
	};
	sources["measurement+comfort"] = sources["measurement"]+"<br />"+sources["comfort"];
	tableBody.innerHTML = '';
	data.forEach(entry => {
		const row = document.createElement('tr');
		const temperature = chooseTemperature(entry.temperature, entry.temperatureFromMeasurement);
		const windSpeed = (entry.windSpeed || entry.windSpeed == 0) ? (entry.windSpeed + (!entry.windSpeedFromComfort || (entry.windSpeed == entry.windSpeedFromComfort) ? "" : (" ("+entry.windSpeedFromComfort+")"))) : "";
		row.innerHTML = `<td><b>${entry.date.getHours() ? (entry.date.getHours() + ":00") : ""}</b><br />${entry.date.getFullYear()}-${entry.date.getMonth() + 1}-${entry.date.getDate()}</td><td>${temperature}</td><td>${entry.feelsLike || ""}</td><td>${entry.source == "snow" ? ("<b>нов валеж: " + entry.newSnow + "<br />тип: " + entry.newType + "<br />снежна покривка: " + (entry.snowCover || "0")) : modifyStatus(entry.status) || ""}<b/></td><td>${windSpeed}${entry.windDirection ? ", " + entry.windDirection + `<br /><span style="font-size: 30px; color: red; transform: rotate(${directionToDegrees[entry.windDirection] + 90}deg); display: inline-block;">${entry.windDirection != "тихо" ? "&#x27a3;" : "o"}</span>` : ""}</td>
		<td>${entry.humidity || ""}</td><td>${entry.pressure || ""}</td><td>${entry.cloud || ""}</td><td>${entry.comfortIndex || ""}</td>
		<td>${entry.recomendedEquipment || ""}</td><td>данни: <a href="../../data/meteo/vitosha/measurement/${entry.date.getFullYear()}.html" target="_blank">измервания</a>, <a href="../../data/meteo/vitosha/comfort/${entry.date.getFullYear()}.html" target="_blank">комфорт</a>, <a href="../../data/meteo/vitosha/snow/${entry.date.getFullYear()}.html" target="_blank">сняг</a><br />${sources[entry.source]}</td>`;
		tableBody.appendChild(row);
	});
}

function populateChart(data, units) {
	const shouldReverse = document.getElementById('sortOrder').value == "desc";
	const filtered = (shouldReverse?data.reverse():data).filter(a => a.source != "snow");
	filtered.forEach(entry => entry.x = `${entry.date.getFullYear()}-${entry.date.getMonth() + 1}-${entry.date.getDate()}${entry.date.getHours() ? (" " + entry.date.getHours() + ":00") : ""}`);
	
	const chartStatus = Chart.getChart("chart");
	if (chartStatus) {
		chartStatus.destroy();
	}
	new Chart(document.getElementById('chart').getContext('2d'), {
		type: 'line',
		data: {
			datasets: [
				{
					label: 'Temperature',
					data: filtered,
					borderColor: 'rgb(255, 99, 132)',
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					yAxisID: 'y-axis-temperature',
					pointRadius: 5,
					parsing: {
						yAxisKey: 'temperature'
					},
				},
				{
					label: 'Feels Like',
					data: filtered,
					borderColor: 'rgb(170, 0, 0)',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					yAxisID: 'y-axis-temperature',
					pointRadius: 5,
					parsing: {
						yAxisKey: 'feelsLike'
					},
				},
				{
					label: 'Wind',
					data: filtered,
					borderColor: 'rgb(0, 162, 0)',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					yAxisID: 'y-axis-windSpeed',
					pointRadius: 5,
					parsing: {
						yAxisKey: 'windSpeed'
					},
					// or via plugin https://jsfiddle.net/simonbrunel/cmL6agn0/
					pointStyle: element => {
						const result = document.createElement('canvas');
						const ctx = result.getContext('2d');
						const radius = 30;
						result.height = 2 * radius;
						result.width = 2 * radius;
						ctx.translate(radius - 2 ,radius);
						ctx.fillStyle = "white";
						ctx.beginPath();
						ctx.arc(0, 0, radius / 2, 0, 2 * Math.PI);
						ctx.fill();
						ctx.font = radius + "px Arial";
						ctx.fillStyle = "green";
						ctx.rotate(((directionToDegrees[element.raw.windDirection] + 90) * Math.PI) / 180);
						ctx.fillText(element.raw.windDirection != "тихо" ? '\u27a3' : 'o', -12, 10);

						return result;
					},
				},
				{
					label: 'Humidity',
					data: filtered,
					borderColor: 'rgb(54, 162, 235)',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					yAxisID: 'y-axis-humidity',
					pointRadius: 5,
					parsing: {
						yAxisKey: 'humidity'
					},
				},
				{
					label: 'Pressure',
					data: filtered,
					borderColor: '#FFA500',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					yAxisID: 'y-axis-pressure',
					pointRadius: 5,
					parsing: {
						yAxisKey: 'pressure'
					},
				},
				{
					label: 'Cloud',
					data: filtered,
					borderColor: 'rgb(128, 128, 128)',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					yAxisID: 'y-axis-cloud',
					pointRadius: 5,
					parsing: {
						yAxisKey: 'cloud'
					},
					pointStyle: element => {
						if (element.raw.status) {
							const result = /.*'([^']+)'.*/.exec(element.raw.status);
							var cloud = new Image();
							cloud.src = result[1];
							cloud.height = 30;
							cloud.width = 30*75/60;
							return modifyPointStyle(element.raw.status, cloud);
						}
						return "circle"
					},
				},
				{
					label: 'Comfort index',
					data: filtered,
					borderColor: '#000077',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					yAxisID: 'y-axis-cloud',
					pointRadius: 5,
					parsing: {
						yAxisKey: 'comfortIndex'
					},
					hidden: true,
				},
				{
					label: 'Recomended Equipment',
					data: filtered,
					borderColor: '#000000',
					backgroundColor: 'rgba(54, 162, 235, 0.2)',
					yAxisID: 'y-axis-cloud',
					pointRadius: 5,
					parsing: {
						yAxisKey: 'recomendedEquipment'
					},
					hidden: true,
				},
			],
		},
		options: {
			responsive: true,
			scales: {
				'y-axis-temperature': {
					position: 'right',
					display: "auto",
					title: {
						display: true,
						text: 'Temperature'
					},
					grid: {
						color: "red"
					},
					suggestedMin: -30,
					suggestedMax: 30,
				},
				'y-axis-windSpeed': {
					position: 'right',
					display: "auto",
					title: {
						display: true,
						text: 'Speed ' + units
					},
					grid: {
						color: "#00FF00"
					},
					suggestedMin: 0,
					suggestedMax: units == "kmh" ? 100 : 30,
				},
				'y-axis-humidity': {
					position: 'left',
					display: "auto",
					title: {
						display: true,
						text: 'Humidity'
					},
					suggestedMin: 0,
					suggestedMax: 100,
				},
				'y-axis-pressure': {
					position: 'left',
					display: "auto",
					title: {
						display: true,
						text: 'Pressure'
					},
					suggestedMin: 750,
					suggestedMax: 800,
				},
				'y-axis-cloud': {
					position: 'left',
					display: "auto",
					title: {
						display: true,
						text: 'Clouds'
					},
					min: -1,
					max: 11,
				},
			},
			tooltips: {
				mode: "label"
			},
			interaction: {
				intersect: false,
				mode: 'index',
			},
			plugins: {
				tooltip: {
					callbacks: {
						afterLabel: context=>{
							if (context.dataset.parsing.yAxisKey == "cloud") {
								const result = /.*>(.*)/.exec(modifyStatus(context.raw.status));
								return result[1];
							}
							if (context.dataset.parsing.yAxisKey == "windSpeed") {
								return context.raw.windDirection;
							}
						},
					}
				}
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
		windSpeed: convert(result[5], units),
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
		windSpeed: convert(result[5], units),
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

function padWithZero(number) {
	if (number > 9) {
		return number;
	}
	return "0" + number;
}

function parseSnow(html) {
	const result = /<tr><td>([^<]+)<\/td><td>([^<]*)<\/td><td>([^<]+)<\/td><td>([^<]*)<\/td><\/tr>/.exec(html);
	const dateRaw = /(\d\d?)\.(\d\d?)\.(\d+\d+\d+\d+)/.exec(result[1])
	// the date here is the day before but we want to see it like the reading is for "this morning"
	const datetime = new Date(new Date(`${dateRaw[3]}-${padWithZero(dateRaw[2])}-${padWithZero(dateRaw[1])}`).getTime() + 24 * 60 * 60 * 1000);
	return {date: datetime, newSnow: (result[2] || 0)/10, newType: convertType(result[3]) || result[3], snowCover: result[4], source: "snow"};
}

function compareEntry(a, b) {
	return (b.date - a.date) || (b.hour - a.hour) || (a.source == "snow" ? 1 : -1);
}

function filterSortAndGroupData(all, fromDate, toDate) {
	const sortOrder = document.getElementById('sortOrder').value;

	let filteredData = all.filter(entry => entry.date >= fromDate && entry.date <= toDate);
	if (sortOrder === 'asc') {
		filteredData.sort((a, b) => compareEntry(a, b) * -1);
	} else {
		filteredData.sort((a, b) => compareEntry(a, b));
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
			fromComfort.windSpeedFromComfort = fromComfort.windSpeed;
			fromComfort.windSpeed = fromMeasurement.windSpeed;
			fromComfort.source = "measurement+comfort";
			
			filteredData[i - 1] = fromComfort;
			filteredData.splice(i, 1);
			i--;
		}
	}
	return filteredData;
}

function setInterval(days) {
	const toDate = new Date();
	document.getElementById('toDate').value = toDate.toISOString().substr(0, 10);
	const fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
	document.getElementById('fromDate').value = fromDate.toISOString().substr(0, 10);
}

function loadData() {
	const units = document.getElementById('units').value;
	
	const toDate = new Date(document.getElementById('toDate').value || new Date());
	toDate.setHours(23, 59, 59);
	const fromDate = new Date(document.getElementById('fromDate').value || new Date(Date.now() - 5 * 24 * 60 * 60 * 1000));
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
		
		populateTable(result, units);
		populateChart(result, units);
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
