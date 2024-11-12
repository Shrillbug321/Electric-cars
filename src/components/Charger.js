import React, {useState} from 'react';
import {useLazyWriteCypher} from 'use-neo4j'

export default function Charger() {
	const [name, setName] = useState('');
	const [leftCity, setLeftCity] = useState('');
	const [leftDistance, setLeftDistance] = useState('');
	const [rightCity, setRightCity] = useState('');
	const [rightDistance, setRightDistance] = useState('');

	const [addCharger, {loading, first}] = useLazyWriteCypher(
		`CREATE (${name}: Charger {name: '${name}'} )`)

	const [addLeftConnection, {ll, fl}] = useLazyWriteCypher(
		`MATCH (a:City), (b:Charger)
                WHERE a.name = '${leftCity}' AND b.name = '${name}'
                MERGE (a)-[r1:ROUTE{distance:${leftDistance}}]-(b);`)

	const [addRightConnection, {lr, fr}] = useLazyWriteCypher(
		`MATCH (a:Charger), (b:City)
                WHERE a.name = '${name}' AND b.name = '${rightCity}'
                MERGE (a)-[r2:ROUTE{distance:${rightDistance}}]-(b);`)

	const cities = ['Władysławowo', 'Zakopane', 'Warszawa', 'Siedlce']
	const handleSubmit = (event) => {
		event.preventDefault()
		addCharger().then(r => alert(r))
		addLeftConnection().then(r => alert(r))
		addRightConnection().then(r => alert(r))
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<select id='leftCity' name='leftCity'
						value={leftCity} onChange={(e) => setLeftCity(e.target.value)}>
					{cityOptions()}
				</select>
				<input id='leftDistance' name='leftDistance' type="number"
					   value={leftDistance} onChange={(e) => setLeftDistance(e.target.value)}/>
				<input id='name' name='name'
					   value={name} onChange={(e) => setName(e.target.value)}/>
				<input id='rightDistance' name='rightDistance' type="number"
					   value={rightDistance} onChange={(e) => setRightDistance(e.target.value)}/>
				<select id='rightCity' name='rightCity'
						value={rightCity} onChange={(e) => setRightCity(e.target.value)}>
					{cityOptions()}
				</select>
				<input type="submit" value="Wyślij"/>
			</form>
		</div>

	);

	function cityOptions() {
		let options = [];
		for (let city of cities)
			options.push(<option value={city}>{city}</option>)
		return options;
	}
}