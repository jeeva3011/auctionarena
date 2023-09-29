import logincss from '../styles/User.module.css';
import {FaUserAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {BiSolidTimeFive} from 'react-icons/bi';
import {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Context } from './AlertContext';
import Alert from './Alert';
import {AiFillCloseCircle} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { CHANGE_USER_PASSWORD, FORGOT_PASSWORD_OTP, VERIFY_EMAIL } from '../../../Queries/Users/Mutation/CHANGE_USER_PASSWORD';
import { useMutation, useQuery } from '@apollo/client';
import { CognitoUser,CognitoUserPool } from 'amazon-cognito-identity-js';

const schema = yup.object().shape({
    email: yup.string().required('Email Required').email('Enter valid Email'),
    password: yup.string().required('Password Required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,'Password should contain atleast one Capital letter, special characters and a numbers, should contain atleast 8 characters'),
    retypepassword: yup.string().required('Password Required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,'Password should contain atleast one Capital letter, special characters and a numbers, should contain atleast 8 characters'),
    otp:yup.string().required('OTP Reuired')
  })

const ForgotPassword = (props) =>{
    const navigate = useNavigate();
    const {setAlert,visible,setVisible} = useContext(Context);
    const [email,setMail] = useState('');
    const [verify, setverify] = useState(true);
    const [forgotPassword] = useMutation(CHANGE_USER_PASSWORD);
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });

    const poolData = {
        UserPoolId: 'ap-south-1_S98zWaFXQ',
        ClientId: '6tuskh1b016vrgncmg13pd09l4',
        region: 'ap-south-1'
      }
      const userData = {
        Username: email,
        Pool: new CognitoUserPool(poolData),
    }
    const cognitoUser = new CognitoUser(userData);
    const { refetch: verifyEmailQuery } = useQuery(VERIFY_EMAIL);
    const {refetch: forgotPasswordOtpQuery} = useQuery(FORGOT_PASSWORD_OTP);
    const generateOTP = async (datas) => {
        if(email!==''){
            const varification = verifyEmailQuery({
                email
            })
         varification.then(result =>{
                const data = result.data
                if(data.verifyEmail){
                    const otpVerify = forgotPasswordOtpQuery({
                        email
                    })
                    console.log(otpVerify)
                    otpVerify.then(result=>{
                        if(!result.data.forgotOtpRequest){
                            setverify(false)
                            setAlert({ message: 'otp sent to mail', status: 'success' });
                            setVisible(true)
                        }
                    })
                }
                else{
                    setAlert({ message: 'Invalid mail', status: 'error' });
                    setVisible(true)
                }
            }).catch(err => {
                console.log(err)
                setAlert({ message: 'Invalid mail', status: 'error' });
                setVisible(true)
            })
        }
    }


    const collectData = async (datas) =>{
        console.log(datas.otp)
            if(datas.password === datas.retypepassword){
                try{
                        const { data } = await forgotPassword({
                            variables: {
                                updateUserInput: {
                                email:datas.email,
                                password:datas.password,
                                otp:datas.otp
                                },
                            },
                            })
                            console.log(data)
                        if(data.updateUser){
                            setAlert({ message: 'Password reset successful', status: 'success' });
                            setVisible(true);
                            navigate('/login');
                        }
                        else{
                            setAlert({ message: 'OTP Expired', status: 'error' });
                            setVisible(true);
                        }
                }catch(e){console.log(e);}
            }
            else{
                setAlert({message:'Passwords doesnot match', status:'error'});
                setVisible(true);
            }
    }
    return (
        <>
            <form className = {logincss.formContainer} onSubmit={handleSubmit(collectData)}>
                <h1 className={logincss.formLabel}>Forgot Password</h1><AiFillCloseCircle  data-testid="closebutton" className={logincss.formClose} onClick={()=>props.setLogin(false)}  data-testid="close-button" ></AiFillCloseCircle>
                
                    <div className={logincss.inputGrid}><FaUserAlt className={logincss.labelIcon}></FaUserAlt><input id='email' className={logincss.formInput} {...register('email')} onChange={(e)=>setMail(e.target.value)} value={email}  type='email' placeholder='Email'/></div>
                    <label className={logincss.validate}>{errors?.email?.message}</label>
                    <a className={logincss.formLink} href='#' onClick={generateOTP}>Request otp</a>
                    <div className={logincss.inputGrid}><BiSolidTimeFive className={logincss.labelIcon}></BiSolidTimeFive><input id='otp' className={logincss.formInput} type='text' {...register('otp')} placeholder='Enter Otp'/></div>
                    <label className={logincss.validate}>{errors?.otp?.message}</label>
                {verify?<></>:<><div className={logincss.inputGrid}><RiLockPasswordFill className={logincss.labelIcon}></RiLockPasswordFill><input id='password' {...register('password')} className={logincss.formInput} type='password' placeholder='Password'  /></div>
                <label className={logincss.validate}>{errors?.password?.message}</label>
                <div className={logincss.inputGrid}><RiLockPasswordFill className={logincss.labelIcon}></RiLockPasswordFill><input id='retypepassword' {...register('retypepassword')} className={logincss.formInput} type='password' placeholder='Retype password' /></div>
                </>}
                <label className={logincss.validate}>{errors?.retypepassword?.message}</label>
                <input className={logincss.formSubmit}  type='submit' value='Submit'/>
                <div  className={logincss.innerGrid}><Link to='/login' className={logincss.formLink} href='#'>Back to login</Link></div>
            </form>
        </>
    )
};

export default ForgotPassword;
