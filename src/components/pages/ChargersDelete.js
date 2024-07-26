import {useWriteCypher} from "use-neo4j";

export default function ChargersDelete({name})
{
	useWriteCypher(
		`MATCH (n:Charger {name: '${name}'}) 
				DETACH DELETE n`)
	return <div></div>
}