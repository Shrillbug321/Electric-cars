import React, {useState} from 'react';
import {
	TextField,
	Box,
	FormControl,
	OutlinedInput,
	InputLabel,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Stack,
	Select,
	MenuItem,
	Dialog
} from '@mui/material';
import {Link} from "react-router-dom"
import {useLazyWriteCypher, useReadCypher} from 'use-neo4j'

const RegisterForm = () => {
	const [cities, _] = useState([]);
	const [name, setName] = useState('');
	const [leftCity, setLeftCity] = useState('Lewy węzeł');
	const [leftDistance, setLeftDistance] = useState('');
	const [rightCity, setRightCity] = useState('');
	const [rightDistance, setRightDistance] = useState('');
	const [open, setOpen] = useState(false);
	const [open2, setOpen2] = useState(false);

	const [addCharger, {l2, first}] = useLazyWriteCypher(
		`CREATE (${name}: Charger {name: '${name}'} )`)

	const [addLeftConnection, {ll, fl}] = useLazyWriteCypher(
		`MATCH (a:City), (b:Charger)
                WHERE a.name = '${leftCity}' AND b.name = '${name}'
                MERGE (a)-[r1:ROUTE{distance:${leftDistance}}]-(b);`)

	const [addRightConnection, {lr, fr}] = useLazyWriteCypher(
		`MATCH (a:Charger), (b:City)
                WHERE a.name = '${name}' AND b.name = '${rightCity}'
                MERGE (a)-[r2:ROUTE{distance:${rightDistance}}]-(b);`)

	const handleSubmit = (event) => {
		event.preventDefault()
		addCharger().then()
		addLeftConnection().then()
		addRightConnection().then(r => alert('Dodano ładowarkę'))
	}

	let {
		loading,
		result
	} = useReadCypher('MATCH (n:City) RETURN n.name AS name')

	if (loading) return <div>Loading...</div>
	else {
		const records = result?.records
		if (cities.length === 0) {
			if (records !== undefined) {
				for (let i = 0; i < records.length; i++) {
					let record = records[i].get('name');
					cities.push(<tr>
						<td>{record}</td>
					</tr>)
				}
			}
		}
	}

	function cityOptions() {
		let options = [];
		for (let city of cities)
			options.push(<MenuItem
				value={city.props.children.props.children}>{city.props.children.props.children}</MenuItem>)
		return options;
	}

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpen2 = () => {
		setOpen2(true);
	};

	const handleClose2 = () => {
		setOpen2(false);
	};

	const handleSelectChange = (e) => {
		setLeftCity(e.target.value);
	};
	const handleSelectRightChange = (e) => {
		setRightCity(e.target.value);
	};
	return (
		<div className='cards'>
			<h2>Dodaj ładowarkę</h2>
			<form onSubmit={handleSubmit} action={<Link to="/login"/>}>
				<TextField sx={{marginBottom: 4}}
						   variant='outlined'
						   color='primary'
						   label="Nazwa"
						   onChange={e => setName(e.target.value)}
						   value={name}
						   fullWidth
						   required
				/>
				<Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
					<Button onClick={handleClickOpen} variant="outlined">Wybierz połączenie początkowe</Button>
					<Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
						<DialogTitle>Wybierz miasto</DialogTitle>
						<DialogContent>
							<FormControl sx={{m: 1, minWidth: 200, padding: '10px'}}>
								<InputLabel id="demo-dialog-select-label">Miasto początkowe</InputLabel>
								<Select
									labelId="demo-dialog-select-label"
									id="leftCity"
									name="leftCity"
									value={leftCity}
									onChange={handleSelectChange}
									input={<OutlinedInput label="Left City"/>}
								>
									<MenuItem disabled value="Miasto startowe">
										<em>Miasto startowe</em>
									</MenuItem>
									{cityOptions()}
								</Select>
							</FormControl>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>Anuluj</Button>
							<Button onClick={handleClose}>Ok</Button>
						</DialogActions>
					</Dialog>
					<TextField
						disabled
						type="text"
						variant='outlined'
						color="primary"
						sx={{m: 1, width: '200px'}}
						label="Miasto"
						value={leftCity}
						fullWidth
					/>
					<TextField
						type="number"
						variant='outlined'
						color='primary'
						label="Odległość"
						onChange={e => setLeftDistance(e.target.value)}
						value={leftDistance}
						fullWidth
						required
					/>
				</Stack>

				<Stack spacing={2} direction="row" sx={{marginBottom: 4}}>
					<Button onClick={handleClickOpen2} variant="outlined">Wybierz połączenie końcowe</Button>
					<Dialog disableEscapeKeyDown open={open2} onClose={handleClose2}>
						<DialogTitle>Wybierz miasto</DialogTitle>
						<DialogContent>
							<FormControl sx={{m: 1, minWidth: 200, padding: '10px'}}>
								<InputLabel id="demo-dialog-select-label">Miasto końcowe</InputLabel>
								<Select
									labelId="demo-dialog-select-label"
									id="rightCity"
									name="rightCity"
									value={rightCity}
									onChange={handleSelectRightChange}
									input={<OutlinedInput label="Left City"/>}
								>
									<MenuItem disabled value="Miasto startowe">
										<em>Miasto startowe</em>
									</MenuItem>
									{cityOptions()}
								</Select>
							</FormControl>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose2}>Anuluj</Button>
							<Button onClick={handleClose2}>Ok</Button>
						</DialogActions>
					</Dialog>
					<TextField
						disabled
						type="text"
						variant='outlined'
						color="primary"
						sx={{m: 1, width: '200px'}}
						label="Miasto"
						value={rightCity}
						fullWidth
					/>
					<TextField
						type="number"
						variant='outlined'
						color='primary'
						label="Odległość"
						onChange={e => setRightDistance(e.target.value)}
						value={rightDistance}
						fullWidth
						required
					/>
				</Stack>
				<Box textAlign="center">
					<Button size="large" variant="outlined" color="success" type="submit" onClick={handleSubmit}>
						Dodaj
					</Button>
				</Box>
			</form>
		</div>
	)

}

export default RegisterForm;