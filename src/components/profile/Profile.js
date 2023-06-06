import {useContext, useEffect, useState} from 'react';
import UserProfile from './UserProfile';
import './profile.css';
import JwtKeyContext from "../context/JwtKeyContext";
import ImportList from "../employes/imports/importList";

const animals = [
    "Aardvark",
    "Albatross",
    "Alpaca",
    "Alligator",
    "Anchovie",
    "Angelfish",
    "Ant",
    "Antelope",
    "Armadillo",
    "Aurochs",
    "Axolotl"
]

function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function randomName() {
    return "Anonymous " + animals[Math.floor(Math.random() * animals.length)]
}


function Profile() {
    const now = new Date(Date.now());
    const defaultBirthday = new Date(now.getTime() + 86400000);


    const [employeData, setEmployeData] = useState({
        id: "44",
        nom: "Test",
        prenom: randomName(),
        email: "test",
        tel: "eeeee",
        color: randomColor()
    });

    const jwtKey = useContext(JwtKeyContext);
    const fetchData = () => {
        fetch("https://127.0.0.1:8089/api/employe/10", {
            method: "get",
            headers: {
                'Authorization': `Bearer ${jwtKey}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setEmployeData(prevData => ({
                    ...prevData,
                    id: data.id,
                    email: data.email,
                    nom: data.nom,
                    prenom: data.prenom,
                    tel: data.tel,
                    roles: data.roles
                }));
            });
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container_l">
            <div className="profileContainer">
                <div className="profileWrapper">
                    {

                        <UserProfile
                            employeData={employeData}
                            startEditCallback={() => alert("You can't edit your info , please contact your admin for more info")}
                        />

                    }
                </div>
            </div>
        </div>

    );
}

export default Profile;
