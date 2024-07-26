import {Canvas} from "../../Canvas";
import React from 'react';
import {useReadCypher} from 'use-neo4j'
export default function Track({startCity, destinationCity, range})
{
    let [cities, setCities] = React.useState([]);
    let [chargers, _] = React.useState([]);
    let [route, b] = React.useState([]);
    let [distances, c] = React.useState([]);
    console.log(startCity, destinationCity, range)
    let {
        cypher,
        error,
        loading,
        result
    } = useReadCypher('MATCH (a:City{name: $startCity}), (b:City {name: $destinationCity}),\n' +
        'ps = shortestPath( (a)-[*]-(b) )\n' +
        'WHERE ALL (p in relationships(ps) WHERE p.distance < $range)\n' +
        'RETURN ps;',
        {startCity, destinationCity, range})
    console.log('MATCH (a:City{name:"'+startCity+'"}), (b:City {name:"'+destinationCity+'"}),\n' +
        'ps = shortestPath( (a)-[*]-(b) )\n' +
        'WHERE ALL (p in relationships(ps) WHERE p.distance < '+range+')\n' +
        'RETURN ps;')

    let view = (<div className="ui active dimmer">Loading...</div>)

    if ( loading ) return (<div>Loading...</div>)

    if (error) {
        view = (<div className="ui negative message">{error.message}</div>)
    } else if (!loading) {

            const records = result?.records
            console.log(result)
            console.log(records)
            let paths = records?.at(0).get('ps')
            console.log(paths)
            console.log(paths?.segments)

            //setTimeout(t => {
            if (paths !== undefined && paths.segments !== undefined) {
                for (let i = 0; i < paths?.segments.length; i++) {
                    let point = paths?.segments[i];
                    console.log(point.relationship.properties.distance)
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
            view = <div></div>

    }

    return (
        <div>
            <div style={{backgroundColor: "white"}}>
                <Canvas cities={cities} chargers={chargers} route={route} distances={distances}/>
            </div>
        </div>
    );
}