import React, {useState} from "react";
import bcrypt from "bcryptjs";
import '../stylesheets/authpage.css';


export const Register = (props) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [confpass, setConfpass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (pass !== confpass) {
            console.log("Passwords do not match");
            return;
          }

        
         // eslint-disable-next-line no-undef
         const hashedPassword = await bcrypt.hash(pass, 10);
         console.log(hashedPassword);
         console.log(username);
       
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        };
        
        const handlePasswordChange = (e) => {
        setPass(e.target.value);
        };
        
        const handleConfirmPasswordChange = (e) => {
        setConfpass(e.target.value);
        };
        
        const handleFormSwitch = (formType) => {
        props.onFormSwitch(formType);
        };
        
    return(
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="username"> Username</label>
            <input value={username} name="username" onChange={(e) => setUsername(e.target.value)} id="username" placeholder=" Username" />
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <label htmlFor="password">Confirm Password</label>
            <input value={confpass} onChange={(e) => setConfpass(e.target.value)} type="password" placeholder="********" id="confpassword" name="confpassword" />

            <button className="submit-btn" type = "submit">Register</button>
            </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here</button>
    </div>
    )

}






