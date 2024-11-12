import React, {useState} from 'react';
import './Cards.css';
import CardCityItem from './CardCityItem';
import {useLazyWriteCypher, useReadCypher} from 'use-neo4j';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ButtonMU from '@mui/material/Button';

function Delete() {
	const [chargers, setChargers] = useState([]);
	const [startIndex, setStartIndex] = useState(0);
	const itemsPerPage = 5;

	const {cypher: readCypher, error: readError, loading: readLoading, result: readResult} = useReadCypher(
		'MATCH (n:Charger) RETURN n.name AS name'
	);

	const writeCypher = useLazyWriteCypher();

	const handleShowMore = () => {
		setStartIndex((prevIndex) => prevIndex + itemsPerPage);
	};

	const handleShowPrevious = () => {
		setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
	};

	const handleDelete = async (chargerName) => {
		try {
			await writeCypher(`MATCH (n:Charger {name: $chargerName}) DETACH DELETE n`, {chargerName});
			const updatedResult = await readCypher();
			const updatedChargers = updatedResult?.records?.map((record) => record.get('name')) || [];
			setChargers(updatedChargers);
		} catch (writeError) {
			console.error('Błąd podczas usuwania z bazy Neo4j:', writeError);
		}
	};

	if (readLoading) return <div>Loading...</div>;
	else {
		const records = readResult?.records;
		if (chargers.length === 0) {
			if (records !== undefined) {
				const newChargers = records.map((record) => (
					<tr key={record.get('name')}>
						<td>{record.get('name')}</td>
					</tr>
				));
				setChargers(newChargers);
			}
		}
	}

	return (
		<div className="cards">
			<h1>Wybierz miasto do usunięcia!</h1>
			<ul className="cards__items_small">
				{chargers.slice(startIndex, startIndex + itemsPerPage).map((city, index) => (
					<CardCityItem
						key={index}
						cityName={city.props.children.props.children}
						handleCityClick={() => handleDelete(city.props.children.props.children)}
						isStartCity
					/>
				))}
			</ul>
			{startIndex > 0 && (
				<ButtonMU
					onClick={handleShowPrevious}
					style={{marginLeft: '4%'}}
					variant="outlined"
				>
					<ArrowBackIcon/>
				</ButtonMU>
			)}
			{chargers.length > startIndex + itemsPerPage && (
				<ButtonMU
					onClick={handleShowMore}
					style={{float: 'right', marginRight: '1%'}}
					variant="outlined"
				>
					<ArrowForwardIcon/>
				</ButtonMU>
			)}
		</div>
	);
}

export default Delete;
