import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PersonProp from './PersonProp';

const GET_PEOPLE = "https://localhost:7130/api/Person/GetPeople"

function PersonList() {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            const result = await axios(GET_PEOPLE);
            console.log(result)
            setData(result.data);
        };

        fetchData();
    }, []);

    return (
        <>
            {data.map(p => (
                <Link to={`/person/${p.id}`} id={p.key}>
                    <PersonProp
                        firstName={p.firstName}
                        lastName={p.lastName}
                        email={p.email} />
                </Link>
            ))}
        </>
    )
}

export default PersonList;