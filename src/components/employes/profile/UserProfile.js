import { useState } from 'react';
import Group from './Group';

export default function EditableUserProfile({
    employeData,
    startEditCallback
}) {

    console.log()

    const buttonStyle = {
        backgroundColor: employeData.color,
        color: "black"
    };

    return <div>
        <Group>
            <h2>Id:</h2> {employeData.id}
        </Group>
        <Group>
            <h2>Name:</h2> {employeData.nom+" "+employeData.prenom}
        </Group>
        <Group>
            <h2>Telephone:</h2>  {employeData.tel}
        </Group>
        <Group>
            <h2>Email:</h2>  {employeData.email}
        </Group>
        <Group>
            <button className="userProfileBtn"
                style={buttonStyle}
                onClick={startEditCallback}
            >Edit</button>
        </Group>
    </div>
}