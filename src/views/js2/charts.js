



(async () => {
	const query = await fetch('http://localhost:3000/backend/api/usersbycountry',);
	const data = await query.json();
	let arCountries=[];
	let arCountByCountry=[];
	data.forEach(element => {
		arCountByCountry.push(element.count);
		arCountries.push(element.nationality);
	});
	if (typeof data !== 'false') {
		const ctx = document.querySelector("#pieChart").getContext('2d');
		const myChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: arCountries,
				datasets: [{
					backgroundColor: [
						"#FFFF00",
						"#3498db",
						"#C70039",
						"#9b59b6",
						"#f1c40f",
						"#e74c3c",
						"#34495e"
					],
					data: arCountByCountry
				}]
			}
		});
	}

	const query2 = await fetch('http://localhost:3000/backend/api/publicationsbycategory',);
	const data2 = await query2.json();
	let arCategories=[];
	let arCountByCategory=[];
	data2.forEach(element => {
		console.log(element);
		console.log(element.count);
		console.log(element.cat_name);
		arCountByCategory.push(element.count);
		arCategories.push(element.cat_name);
	});
	if (typeof data !== 'false') {
		const ctx = document.querySelector("#pieChartCategory").getContext('2d');
		const myChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: arCategories,
				datasets: [{
					backgroundColor: [
						"#2ecc71",
						"#3498db",
						"#95a5a6",
						"#9b59b6",
						"#f1c40f",
						"#e74c3c",
						"#34495e"
					],
					data: arCountByCategory
				}]
			}
		});
	}
})()





var ctx2 = document.querySelector('#areaChart').getContext('2d');
var chart = new Chart(ctx2, {
	type: 'line', // also try bar or other graph types
	data: {
		labels: ["Jun 2023", "Jul 2023", "Aug 2023", "Sep 2023"],
		datasets: [{
			label: ["Social Event1"],
			backgroundColor: 'lightblue',
			borderColor: 'royalblue',
			data: [26.4, 39.8, 66.8, 60],
		}]
	},

	// Configuration options
	options: {
		layout: {
			padding: 10,
		},
		legend: {
			position: 'bottom',
		},
		title: {
			display: true,
			text: 'Popularity progression on a publication'
		},
		scales: {
			yAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Popuilarity Index Coeficient()'
				}
			}],
			xAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Month of the Year'
				}
			}]
		}
	}
});
