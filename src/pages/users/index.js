import React from "react";
import './style.sass'
import {useAuth} from "../../context/auth";

function Users() {

    /*const [users, setUsers] = useState([]);
    const [check, setCheck] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/v1/users')
            .then(response => response.json())
            .then(json => setUsers(json))
    }, []);*/

    const { users, check, setCheck } = useAuth();

    return (
        <div>
            <h2>Users list</h2>
            <ul className="checkUsers">
                <li className = "userListRadio">
                    <input
                        type="radio"
                        id="All"
                        name="list"
                        checked = {check === ''}
                        onChange = {() => setCheck('')}
                    />
                    <label htmlFor="All">All</label>
                </li>
                {users.map(function(elem) {
                    return <li key = {elem._id + "radio"} className = "userListRadio">
                        <input
                            type="radio"
                            id={elem._id}
                            name="list"
                            checked = {check === elem._id}
                            onChange = {() => setCheck(elem._id)}
                        />
                        <label htmlFor={elem._id}>{elem.email}</label>
                    </li>})}
            </ul>
            <ul>
                {users.filter(elem => check? elem._id === check : true).map(function(elem) {
                    return <li key = {elem._id + "check"} className = "userList">
                        email: {elem.email}<br/>
                        id: {elem._id}<br/>
                    </li>})}
            </ul>
        </div>
    )
}

export default Users;