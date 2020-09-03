import React, {useState} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import './style.sass'


function SignUp() {

    const [userName, setUserName] = useState("@gmail.com");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [isError, setIsError] = useState(false);

    function postSignup(e) {
        e.preventDefault();

        axios.post("http://localhost:3001/api/v1/users", {
            email: userName,
            password: password
        }).then(result => {
            if (result.status === 200) {
                setIsError(false);
            } else {
                setIsError(true);
            }
            }).catch(e => {
            setIsError(true);
        })
    }

    return (
        <div className='card'>
            <form className='formSignup'
               onSubmit={password===passwordAgain? postSignup:<p>Registration error: check if the password was entered correctly</p>}>
                <input
                    className='inputSignup'
                    type="username"
                    value={userName}
                    onChange={e => {
                        setUserName(e.target.value);
                    }}
                    placeholder="email"
                    required={true}
                />
                <input
                    className='inputSignup'
                    type="password"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value);
                    }}
                    placeholder="password"
                    required={true}
                />
                <input type="password"
                       placeholder="password again"
                       className='inputSignup'
                       required={true}
                       value={passwordAgain}
                       onChange={e => {
                           setPasswordAgain(e.target.value);
                       }}
                />
                <button className='buttonSignup'>Sign Up</button>
            </form>
            <Link to="/signin">Already have an account?</Link>
            { isError &&<p>Registration error: check the correctness of the login and password</p> }

        </div>
    );
}

export default SignUp;

//!isError &&<p>You have successfully registered!</p>