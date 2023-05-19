import * as React from 'react';

function PersonProp(props) {
    return (
        <>
            <ul>
                <li>FirstName: {props.firstName}</li>
                <li>Last Name: {props.lastName}</li>
                <li>Email: {props.email}</li>
            </ul>
        </>
    )
}

export default PersonProp;