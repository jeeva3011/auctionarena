import logincss from '../styles/User.module.css';
import {FaUserAlt, FaPhoneAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {MdEmail} from 'react-icons/md';
import {Link} from 'react-router-dom';
import { useContext, useState} from 'react';
import { Context } from './AlertContext';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from './Alert';
import {AiFillCloseCircle} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { REGISTER_USER } from '../../../Queries/Users/Mutation/REGISTER_USER';
import { useMutation, useQuery } from '@apollo/client';
import { RESEND_OTP, VERIFY_OTP } from '../../../Queries/Users/Query/GET_USERS';

const schema = yup.object().shape({
  username: yup.string().required('Name is Mandatory').matches(/^[a-zA-Z ]+$/,'Invalid Name'),
  email: yup.string().required('Email Required').email('Enter valid Email'),
  phoneno: yup.string().required('Mobile number Required').matches(/^[6-9]\d{9}$/, 'Mobile Number Start with 6-9 and 10 numbers Required'),
  password: yup.string().required('Password Required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/,'Password should contain atleast one Capital letter, special characters and a numbers, should contain atleast 8 characters'),
})


const Register = (props) =>{
    const {setAlert, visible, setVisible} = useContext(Context);
    const [email, setEmail] = useState('');
    const [userOtp, setUserOtp] = useState('');
    const [verificationStep, setVerificationStep] = useState('register');
    const navigate = useNavigate();
    const [registerUser] = useMutation(REGISTER_USER);
    const {refetch: vetifyEmailQuery} = useQuery(VERIFY_OTP);
    const {refetch: resendOtpQuery} = useQuery(RESEND_OTP);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
      mode: 'onChange'
  });

      const handleResendOTP = async(datas) => {
        // e.preventDefault();
        console.log(datas.username)
        const {data} = await resendOtpQuery({
          email
        })
        setAlert({message:'OTP resent to mail',status:'success'});
        setVisible(true);
      };

    const handleVerifyOTP = async (datas) => {
        // e.preventDefault();
        console.log(datas.username);
        const { data } = await registerUser({
                variables: {
                createUserInput: {
                    name:datas.username,
                    email:datas.email,
                    phonenumber: datas.phoneno,
                    password:datas.password,
                    otp:userOtp,
                },
                },
            })
          if(data.createUser){
            setAlert({message:'User Registered Sucessfully',status:'success'});
            setVisible(true);
            navigate('/')
          }
          else{
            setAlert({message:'Invalid Email or OTP',status:'error'});
            setVisible(true);
          }
      }
    const collectData = async (datas) =>{
        console.log(datas.username)
          const {data} = await vetifyEmailQuery({
            email:datas.email,
            password:datas.password
          })
          if(data.verifyOtp){
            setVerificationStep('verifyOTP');
            setAlert({message:'OTP sent to mail',status:'success'});
            setVisible(true);
          }
          else{
            setAlert({message:'Invalid email',status:'error'});
            setVisible(true);
          }
        }
    return (
        <>
            {verificationStep === 'verifyOTP' && (
            <form className = {logincss.formContainer} onSubmit={handleSubmit(handleVerifyOTP)}>
            <div className={logincss.inputGrid}><RiLockPasswordFill className={logincss.labelIcon}></RiLockPasswordFill><input id='otp' className={logincss.formInput} onChange={(e)=>setUserOtp(e.target.value)} placeholder='OTP'/></div>
            <button className={logincss.formSubmit} data-testid='resendotp' onClick={handleSubmit(handleResendOTP)}>Resend OTP</button>
            <button className={logincss.formSubmit} data-testid='verifyotp' type='submit'>Verify OTP</button>
            </form>)}
            {verificationStep === 'register' && (
                <form className = {logincss.formContainer} onSubmit={handleSubmit(collectData)}>
                    <h1 className={logincss.formLabel}>Register</h1><AiFillCloseCircle data-testid="closebutton" className={logincss.formClose} onClick={()=>props.setLogin(false)}></AiFillCloseCircle>
                    <div className={logincss.inputGrid}><FaUserAlt className={logincss.labelIcon}></FaUserAlt><input id='name' className={logincss.formInput} type='text' {...register('username')} placeholder='Name'/></div>
                    <label className={logincss.validate}>{errors?.username?.message}</label>
                    <div className={logincss.inputGrid}><MdEmail className={logincss.labelIcon}></MdEmail><input id='email' className={logincss.formInput} type='text' {...register('email')} placeholder='Email'/></div>
                    <label className={logincss.validate}>{errors?.email?.message}</label>
                    <div className={logincss.inputGrid}><FaPhoneAlt className={logincss.labelIcon}></FaPhoneAlt><input id='phno' className={logincss.formInput} type='number' {...register('phoneno')} placeholder='Mobile Number'/></div>
                    <label className={logincss.validate}>{errors?.phoneno?.message}</label>
                    <div className={logincss.inputGrid}><RiLockPasswordFill className={logincss.labelIcon}></RiLockPasswordFill><input id='password' className={logincss.formInput} {...register('password')} type='password' placeholder='Password'/></div>
                    <label className={logincss.validate}>{errors?.password?.message}</label>
                    <input className={logincss.formSubmit} data-testid='registerbutton' type='submit' value='Register'/>
                    <p>Already a user? <Link to='/login' className={logincss.formLink} href='#'>Login Here</Link></p>
                </form>
            )}
        </>
    )
};

export default Register;
