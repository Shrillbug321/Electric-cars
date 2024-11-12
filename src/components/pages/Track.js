import {Canvas} from "../../Canvas";
import React from 'react';
import {useReadCypher} from 'use-neo4j'

export default function Track({startCity, destinationCity, range}) {
	let [cities] = React.useState([]);
	let [chargers] = React.useState([]);
	let [route] = React.useState([]);
	let [distances] = React.useState([]);
	console.log(startCity, destinationCity, range)
	let {
		error,
		loading,
		result
	} = useReadCypher('MATCH (a:City{name: $startCity}), (b:City {name: $destinationCity}),\n' +
		'ps = shortestPath( (a)-[*]-(b) )\n' +
		'WHERE ALL (p in relationships(ps) WHERE p.distance < $range)\n' +
		'RETURN ps;',
		{startCity, destinationCity, range})

	if (loading) return <div>Loading...</div>

	else {
		const records = result?.records
		let paths = records?.at(0).get('ps')

		if (paths !== undefined && paths.segments !== undefined) {
			for (let i = 0; i < paths?.segments.length; i++) {
				let point = paths?.segments[i];
				if (point.start.properties.name.includes('_'))
					chargers.push(point.start.properties.name);
				else
					cities.push(point.start.properties.name);
				route.push(point.start.properties.name)
				distances.push(point.relationship.properties.distance)
			}
			cities.push(paths?.segments.at(-1).end.properties.name);
			route.push(paths?.segments.at(-1).end.properties.name)
			distances.push(paths?.segments.at(-1).relationship.properties.distance)
		}
		cities = [...new Set(cities)]
		route = [...new Set(route)]
		distances = [...new Set(distances)]
	}

	return (
		<div>
			<div style={{backgroundColor: "white"}}>
				<Canvas cities={cities} route={route} distances={distances}/>
			</div>
		</div>
	);
}