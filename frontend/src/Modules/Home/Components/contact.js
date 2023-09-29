import { useEffect, useState,useContext } from 'react';
import styles from '../Style/contact.module.css';
import { BiRefresh } from 'react-icons/bi';
import captchaimage from '../../../assets/homepage/captcha.jpeg';
import { Context } from '../../User/Components/AlertContext';
import Alert from '../../User/Components/Alert';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CREATE_MAIL } from '../../../Queries/Contact/Mutation/CREATE_MAIL';


const schema = yup.object().shape({
  name: yup.string().required('Name Required').matches(/^[a-zA-Z ]+$/,'Invalid Name'),
  email: yup.string().required('Email Required').email('Enter valid Email'),
  phoneno: yup.string().required('Mobile number Required').matches(/^[6-9]\d{9}$/, 'Mobile Number Start with 6-9 and 10 numbers Required'),
})

const Contact = (props) => {
  const [mailMutation] = useMutation(CREATE_MAIL);
const {setAlert,visible,setVisible} = useContext(Context);
  const [captcha, setCaptcha] = useState();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
});


  const captchaHandler = () => {
    const characters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      const index = Math.floor(Math.random() * characters.length);
      result += characters[index];
    }
    setCaptcha(result);
  };

  useEffect(() => {
    captchaHandler();
  }, []);

  const formHandler=async(datas)=>{
    captchaHandler();
    if(datas.captchas !== captcha){
      setAlert({message:'Invalid Captcha', status:'error'});
      setVisible(true);
    }
    else
    {
        try{
          const {data} = await mailMutation({
            variables:{
              createEmailInput:{
                name:datas.name,
                email:datas.email,
                phone:datas.phoneno,
                message:datas.message
              }
            }
          })
        }catch(err) {console.error(err.message)}
        setAlert({message:'Message Delivered Successfully',status:'success'});
        reset();
        setVisible(true);
    }
  }

  return (
    <div id='contact' className={styles.contactcontainer}>
      <p className={styles.header}>Contact Us</p>
      <div className={styles.container}>
        <div className={styles.detailscontainer}>
          <div className={styles.details}>
            <p>PHONE NUMBER</p>
            <p>{process.env.REACT_APP_CONTACT_1}</p>
            <p>{process.env.REACT_APP_CONTACT_2}</p>
          </div>
          <div className={styles.details}>
            <p>EMAIL</p>
            <p>{process.env.REACT_APP_ARENA_MAIL}</p>
          </div>
        </div>
        <form className={styles.inputcontainer} onSubmit={handleSubmit(formHandler)}>
          <input type='text' placeholder='Name' name='name'  {...register('name')} ></input>
          <input type='email' placeholder='Email' name='email'  {...register('email')} ></input>
          <input type='number' placeholder='Mobile No' name='phoneno'  {...register('phoneno')} ></input>
          <input type='text' placeholder='Message' name='message'  {...register('message')} ></input>
          <div className={styles.captchacontainer}>
            <input type='text' placeholder='Enter Captcha' name='captchas'  {...register('captchas')} ></input>
            <div className={styles.captcha}>
              <img src={captchaimage} alt='captcha'></img>
              <p>{captcha}</p>
              <div  onClick={captchaHandler} className={styles.refresh}>
                <BiRefresh></BiRefresh>
              </div>
            </div>
          </div>
          <input data-testid='emailsend' type='submit' value='Send Message' className={styles.button}></input>
        </form>
      </div>
    </div>
  );
};

export default Contact;
