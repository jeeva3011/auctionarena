import logincss from '../styles/User.module.css';
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {GrPowerReset} from 'react-icons/gr';
import {useState, useContext, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {Link} from 'react-router-dom';
import { Context } from './AlertContext';
import Alert from './Alert';
import {AiFillCloseCircle} from 'react-icons/ai';
import { loginContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import {useQuery, useMutation} from '@apollo/client';
import { LOGIN_USER } from '../../../Queries/Users/Query/GET_USERS';
import {useApolloClient} from '@apollo/client';
import { GetAccessToken } from '../../../Queries/JWT/Authorization';

const schema = yup.object().shape({
    email: yup.string().required('Email Required').email('Enter valid Email'),
    password: yup.string().required('Password Required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,'Password should contain atleast one Capital letter, special characters and a numbers, should contain atleast 8 characters'),
  })

const Login = (props) =>{
    const navigate = useNavigate();
  const { setAlert, visible, setVisible } = useContext(Context);
  const { setUser } = useContext(loginContext);
  const [captcha, setCaptcha] = useState('');
  const { refetch } = useQuery(LOGIN_USER);
  const { refetch: getAccessTokenQuery } = useQuery(GetAccessToken);
  const client = useApolloClient();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const captchaHandler = () =>{
        const characters =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            const index = Math.floor(Math.random() * characters.length);
            result += characters[index];
        }
        setCaptcha(result);
    }

    const GraphqlHandler = async (datas) =>{
        try{
            const Authentication = await getAccessTokenQuery({
                email: datas.email,
                password: datas.password
            })
              console.log(Authentication);
            if(Authentication.data.performLogin.AccessToken && Authentication.data.performLogin.RefereshToken){
                localStorage.setItem('token',JSON.stringify({AccessToken:Authentication.data.performLogin.AccessToken, RefereshToken:Authentication.data.performLogin.RefereshToken}))
                props.setToken(Authentication.data.performLogin.AccessToken)
                const { data } = await refetch({
                    email: datas.email, 
                    password: datas.password, 
                  })
                if(data.LoginUser.email === '-1'){
                    setAlert({message:'Wrong Credentials', status:'error'});
                    setVisible(true);
                }
                else{
                    setAlert({message:'login Successful', status:'success'});
                    setVisible(true);
                    setUser(data.LoginUser);
                    localStorage.setItem('user',JSON.stringify({userid:data.LoginUser.userid}));
                    navigate('/dashboard')
                }
            }
            else{
                setAlert({message:'Wrong Credentials', status:'error'});
                setVisible(true);
            }
          }catch(err) {
            setAlert({message:err.message, status:'error'});
            setVisible(true);
        }
    }
    const collectData = async (data) =>{
        const captchaValue = document.getElementById('captcha').value
        if(captcha !== captchaValue && props.capcha !== captchaValue){
            console.log(captcha);
            setAlert({message:'Wrong Captcha', status:'error'});
            setVisible(true);
        }
        else{
            GraphqlHandler(data);
        }
    }
    
    const resetCaptcha = () =>{
        captchaHandler();
    }

    useEffect(()=>{
        resetCaptcha();
    },[])
    return (
        <>
            <form className = {logincss.formContainer} onSubmit={handleSubmit(collectData)}>
            <h1 className={logincss.formLabel}>Login</h1><AiFillCloseCircle data-testid="closebutton" className={logincss.formClose} onClick={()=>props.setLogin(false)}></AiFillCloseCircle>
                <div className={logincss.inputGrid}><FaUserAlt className={logincss.labelIcon}></FaUserAlt><input id='username' className={logincss.formInput} type='email' {...register('email')} placeholder='Email'  autoComplete='off' /></div>
                <label className={logincss.validate}>{errors?.email?.message}</label>
                <div className={logincss.inputGrid}><RiLockPasswordFill className={logincss.labelIcon}></RiLockPasswordFill><input id='password' className={logincss.formInput} type='password' {...register('password')}  placeholder='Password'/></div>
                <label className={logincss.validate}>{errors?.password?.message}</label>
                <div className={logincss.inputGrid}>
            <label className={logincss.capLabel}>{captcha}</label>
            <input className={logincss.formInput} type='text' id='captcha' placeholder='Enter Answer' /><GrPowerReset className={logincss.resetIcon} onClick={resetCaptcha}></GrPowerReset>
          </div>
                <input className={logincss.formSubmit} name='Login' type='submit' value='Login'/>
                <div  className={logincss.innerGrid}>
                    <Link to='/forgotpassword' className={logincss.formLink}>Forgot Password</Link>
                    <Link to='/register' className={logincss.formLink}>Register Here</Link>
                </div>
            </form>
        </>
    )
};
//50FFB1, 4FB286 3c896d
export default Login;
