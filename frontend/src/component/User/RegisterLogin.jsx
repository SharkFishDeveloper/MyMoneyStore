import React, { useEffect, useRef,useState } from 'react';
import { Link } from 'react-router-dom';
import "./RegisterLogin.css";
import { useDispatch, useSelector } from 'react-redux';
import { login,register } from '../../actions/userActions';
import { toast } from 'react-toastify';
import { clearErrors } from '../../actions/productActions';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const RegisterLogin = () => {
    const dispatch = useDispatch();
    const {error,isLoading,isAuthenticated} = useSelector(state=>state.user);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const navigate = useNavigate();
    const loginTab = useRef(null);
    const signupTab = useRef(null);
    const switcherTab = useRef(null);
    const location = useLocation();

    const redirect = location.search ? "/" + location.search.split("=")[1] : "/products";
    useEffect(()=>{
      if(error){
        console.log("Current error:", error);
        toast.error(error);
        dispatch(clearErrors());
      }
      if(isAuthenticated===true){
        toast.success("Registered or logged in");
        navigate(redirect);
      }
    },[toast,dispatch,isAuthenticated,error]);



    const switchTabs = (e, tabName) => {
        if (tabName === "Login") {
          switcherTab.current.classList.add("shiftToNeutral");
          switcherTab.current.classList.remove("shiftToRight");
    
          signupTab.current.classList.remove("shiftToNeutralForm");
          loginTab.current.classList.remove("shiftToLeft");
        }
        if (tabName === "Sign up") {
          switcherTab.current.classList.add("shiftToRight");
          switcherTab.current.classList.remove("shiftToNeutral");
    
          signupTab.current.classList.add("shiftToNeutralForm");
          loginTab.current.classList.add("shiftToLeft");
        }
      };
      const [user,setUser] = useState({
        name:"",
        email:"",
        password:""
      });

      const {name,email,password} =user;
      const [avatar, setAvatar] = useState("");
      const [avatarPreview, setAvatarPreview] = useState("");



      const registerDataChange =(e)=>{
        if(e.target.name==='avatar'){
          const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
        }
        else{
          setUser({...user,[e.target.name]:e.target.value});
        }
      }



      const loginSubmit = (e)=>{
        e.preventDefault();
        dispatch(login({email:loginEmail,password:loginPassword}));
        console.log("Clicked on Log in button !!!");
      }
      const registerSubmit =(e)=>{
        e.preventDefault();
        dispatch(register({email:email,name:name,password:password,avatar:avatar}));
        console.log("Clicked on Sign up button !!!");
      }
      
//,isAuthenticated
  return (
    <>{isLoading ? <Loader/> :
    <div className="registerContainer">
        <div className="signuploginBox">
            <div>
                <div className="toggle">
                  <p className='login' onClick={(e)=>switchTabs(e,"Login")}>Login</p>
                  <p className="Signup" onClick={(e)=>switchTabs(e,"Sign up")}>Sign up</p>
                </div>
                <button ref={switcherTab} className='switchButton'></button>
            </div>


            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  {/* <MailOutlineIcon /> */}
                  <input
                    type="email"
                    placeholder="Email"
                    
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  {/* <LockOpenIcon /> */}
                  <input
                    type="password"
                    placeholder="Password"
                    
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot" id='forgotPassword'>Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
            </form>

            {/* For sign up part */}
            <form
                className="signUpForm"
                ref={signupTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  {/* <FaceIcon /> */}
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  {/* <MailOutlineIcon /> */}
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  {/* <LockOpenIcon /> */}
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
        </div>
    </div>}</>
  )
}

export default RegisterLogin;