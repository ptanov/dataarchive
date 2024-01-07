function populateTable(data) {
	const tableBody = document.getElementById('dataBody');
	const sources = {
		"snow": "<a target='_blank' href='https://hydro.bg/bg/t1.php?ime=&gr=data/&gn=sniag'>НИМХ, снежна покривка</a>, <a target='_blank' href='https://hydro.bg/bg/t1.php?ime=&gr=data/&gn=sniag#:~:text=%D0%98%D0%B7%D0%BF%D0%BE%D0%BB%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%20%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB%D0%B8%20%D0%B7%D0%B0%20%D0%B2%D0%B8%D0%B4%20%D0%BD%D0%B0%20%D0%B2%D0%B0%D0%BB%D0%B5%D0%B6%20%D0%B2%20%D1%81%D1%80%D0%B5%D0%B4%D0%BD%D0%BE%20%D0%BF%D0%BE%D0%B4%D0%BF%D0%BE%D0%BB%D0%B5'>легенда</a>",
		"measurement": "<a target='_blank' href='https://weather.bg/index.php?koiFail=tekushti&lng=0#:~:text=%D0%9F%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D0%B8%20%D0%B8%D0%B7%D0%BC%D0%B5%D1%80%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F-,%D0%A2%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0%20%D1%81%20%D0%B4%D0%B0%D0%BD%D0%BD%D0%B8%D1%82%D0%B5,-%D0%9B%D0%B5%D0%B3%D0%B5%D0%BD%D0%B4%D0%B0%20%2D%20%D0%B8%D0%B7%D0%BC%D0%B5%D1%80%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F'>НИМX измервания</a>, <a target='_blank' href='https://weather.bg/index.php?koiFail=tekushti&lng=0#:~:text=%D0%9B%D0%B5%D0%B3%D0%B5%D0%BD%D0%B4%D0%B0%20%2D%20%D0%B8%D0%B7%D0%BC%D0%B5%D1%80%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F'>легенда</a>",
		"comfort": "<a target='_blank' href='https://weather.bg/index.php?koiFail=tekushti&lng=0#:~:text=%D0%A2%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0%20%D0%BD%D0%B0%20%D1%82%D0%B5%D0%BC%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D1%83%D1%80%D0%B0%D1%82%D0%B0%20%D0%BD%D0%B0%20%D1%83%D1%81%D0%B5%D1%89%D0%B0%D0%BD%D0%B5%20%D0%B2%20%D1%81%D0%B8%D0%BD%D0%BE%D0%BF%D1%82%D0%B8%D1%87%D0%BD%D0%B8%D1%82%D0%B5%20%D0%BD%D0%B8%20%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D0%B8'>НИМХ,  индекс на комфорт</a>, <a target='_blank' href='https://weather.bg/index.php?koiFail=tekushti&lng=0#:~:text=%D0%98%D0%BD%D0%B4%D0%B5%D0%BA%D1%81%20%D0%BD%D0%B0%20%D1%82%D0%BE%D0%BF%D0%BB%D0%B8%D0%BD%D0%B5%D0%BD%20%D0%BA%D0%BE%D0%BC%D1%84%D0%BE%D1%80%D1%82%20%D0%BD%D0%B0%20%D0%B1%D0%B0%D0%B7%D0%B0%D1%82%D0%B0%20%D0%BD%D0%B0%20%D1%82%D0%B5%D0%BC%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D1%83%D1%80%D0%B0%20%D0%BD%D0%B0%20%D1%83%D1%81%D0%B5%D1%89%D0%B0%D0%BD%D0%B5'>легенда</a>",

	};
	tableBody.innerHTML = '';
	data.forEach(entry => {
		const row = document.createElement('tr');
		row.innerHTML = `<td>${entry.date.getFullYear()}-${entry.date.getMonth() + 1}-${entry.date.getDate()} ${entry.date.getHours() || ""} </td><td>${entry.temperature || ""}</td><td>${entry.feelsLike || ""}</td><td>${entry.status || ""}</td><td>${entry.wind || ""}</td>
		<td>${entry.windDirection || ""}</td><td>${entry.newSnow || ""}</td><td>${entry.newType || ""}</td><td>${entry.snowCover || ""}</td>
		<td>${entry.humidity || ""}</td><td>${entry.pressure || ""}</td><td>${entry.cloud || ""}</td><td>${entry.comfortIndex || ""}</td>
		<td>${entry.recomendedEquipment || ""}</td><td>${sources[entry.source] || entry.source || ""}</td>`;
		tableBody.appendChild(row);
	});
}

function parseMeasurement(html, units) {
	const result = /<tr>\s*<td>Черни връх<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>.*?(<img[^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>\s*<td[^>]*>([^<]*)<\/td>.*<\/tr>/.exec(html);
	const dateRaw = /(\d\d?)\.(\d\d?)\.(\d+\d+\d+\d+)/.exec(result[1])
	const datetime = new Date(`${dateRaw[3]}-${dateRaw[2]}-${dateRaw[1]}T${result[2]}:00:00`);
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
	return value;
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
		cloud: result[6],
		feelsLike: result[7],
		comfortIndex: result[8],
		recomendedEquipment: result[9],
		source: "comfort"
	};
}

function parseSnow(html) {
	const type = {
		// from the legend here: https://hydro.bg/bg/t1.php?ime=&gr=data/&gn=sniag 
		" . ": "няма явления",
		"n.a": "няма данни",
		" p ": "роса",
		" o ": "дъжд",
		" = ": "мокреща мъгла",
		" \" ": "ръмеж",
		" [ ": "слана",
		" v ": "скреж",
		" * ": "сняг",
		" ~ ": "поледица",
		" ^ ": "суграшица",
		" / ": "ледени игли",
		" x ": "снежни зърна",
		" ) ": "леден дъжд",
		" r ": "краткотраен дъжд",
		" s ": "краткотраен сняг",
		" G ": "град",
		"err": "грешка",
	};

	const result = /<tr><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><td>([^<]+)<\/td><\/tr>/.exec(html);
	const dateRaw = /(\d\d?)\.(\d\d?)\.(\d+\d+\d+\d+)/.exec(result[1])
	const datetime = new Date(`${dateRaw[3]}-${dateRaw[2]}-${dateRaw[1]}`);
	return {date: datetime, newSnow: result[2], newType: type[result[3]] || result[3], snowCover: result[4], source: "snow"};
}


function filterAndSortData(all, fromDate, toDate) {
	const sortOrder = document.getElementById('sortOrder').value;

	let filteredData = all.filter(entry => entry.date >= fromDate && entry.date <= toDate);
	if (sortOrder === 'asc') {
		filteredData.sort((a, b) => (a.date > b.date ? 1 : (a.date == b.date ? (a.hour > b.hour ? 1 : -1) : -1)));
	} else {
		filteredData.sort((a, b) => (a.date < b.date ? 1 : (a.date == b.date ? (a.hour < b.hour ? 1 : -1) : -1)));
	}
	return filteredData;
}

function loadData() {
	const units = document.getElementById('units').value;
	const windHeader = document.getElementById('windHeader');
	windHeader.innerHTML = `Вятър-скорост, ${units}`
	
	const toDate = document.getElementById('toDate').value || new Date();
	toDate.setHours(23, 59, 59);
	const fromDate = document.getElementById('fromDate').value || new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
	fromDate.setHours(0, 0, 0);

	const fromYear = fromDate.getFullYear();
	const toYear = toDate.getFullYear();
	const all = [];
	
	const years = Array(toYear - fromYear + 1).fill(0).map((x, y) => x + y + fromYear);
	const measurement = Promise.all(years.map(y => fetch(`data/meteo/vitosha/measurement/${y}.txt`)))
		.then(ps => Promise.all(ps.filter(p => p.ok).map(p => p.text())))
		.then(responses => responses.flatMap(text => text.split(/\r?\n/)).filter(notempty => notempty).map(a => parseMeasurement(a, units)));

	const comfort = Promise.all(years.map(y => fetch(`data/meteo/vitosha/comfort/${y}.txt`)))
		.then(ps => Promise.all(ps.filter(p => p.ok).map(p => p.text())))
		.then(responses => responses.flatMap(text => text.split(/\r?\n/)).filter(notempty => notempty).map(a => parseComfort(a, units)));

	const snow = Promise.all(years.map(y => fetch(`data/meteo/vitosha/snow/${y}.txt`)))
		.then(ps => Promise.all(ps.filter(p => p.ok).map(p => p.text())))
		.then(responses => responses.flatMap(text => text.split(/\r?\n/)).filter(notempty => notempty).map(a => parseSnow(a)));

	Promise.all([measurement, comfort, snow]).then(function(valArray) {
		const result = filterAndSortData(valArray.flat(), fromDate, toDate);
		
		populateTable(result);
		//populateChart(result);
	});

}

loadData();
