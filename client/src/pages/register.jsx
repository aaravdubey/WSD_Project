import "./login.scss";
import axios from 'axios';
import Logo from "../assets/codecampus-logo/png/logo-black.png";
import CodeIcon from "../assets/code.png";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [cpass, setCPass] = useState();
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log({name, email, pass});

    const response = await axios.post('http://localhost:3000/register',{name, email, pass});
    if (response.status == 201) navigate('/login');
    else if(response.status == 203) setError(true);
    console.log(response);
  }

  return <div className="flex-cenetered vh100">
    <form className="card px-6 py-5 border-0 shadow" onSubmit={handleSubmit}>
      <img className="mb-4" src={Logo} alt="" width="72" height="57" />
        {/* <h1 className="h3 mb-3 fw-normal">Please sign in</h1> */}

        <div className="form-floating mb-4">
          <input type="text" className="form-control" id="floatingInput" placeholder="abc xyz" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="form-floating mb-4">
          <input type="email" className="form-control" id="floating" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating mb-4">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} />
            <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="form-floating mb-5">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={cpass} onChange={(e) => setCPass(e.target.value)} />
            <label htmlFor="floatingPassword">Confirm Password</label>
        </div>

        {error && <p className="acc-error">This email ID is already registered.</p>}

        <button className="w-100 btn btn-lg mb-4" type="submit">Register</button>

        <a href="#" className="link-primary text-center text-decoration-none"onClick={() => navigate('/login')}>Sign In</a>
    </form>

    <img src={CodeIcon} alt="" className="bg-icon" />
  </div>
}

export default Register;