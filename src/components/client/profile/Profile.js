import {useContext, useEffect, useState} from 'react';
import UserProfile from './UserProfile';
import './profile.css';
import JwtKeyContext from "../../context/JwtKeyContext";
import ImportList from "../imports/importList";

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
    "Aurochs"
]

function randomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function randomName() {
    return "Anonymous " + animals[Math.floor(Math.random() * animals.length)]
}


function Profile({userId}) {

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
        fetch("http://127.0.0.1:8089/api/client/"+userId, {
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
                    tel: data.tel,
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
