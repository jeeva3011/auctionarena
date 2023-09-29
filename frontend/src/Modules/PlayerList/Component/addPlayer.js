import React, { useState, useContext, useEffect } from 'react';
import styles from '../Style/addPlayer.module.css';
import imageLogo from '../../../assets/imagess.svg';
import { Context } from '../../User/Components/AlertContext';
import Alert from '../../User/Components/Alert';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { FaList } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useLazyQuery } from '@apollo/client';
import { CREATE_PLAYER } from '../../../Queries/Players/Mutation/CREATE_PLAYER';
import { UPDATE_PLAYER } from '../../../Queries/Players/Mutation/UPDATE_PLAYER';
import { GET_IMAGE_UPLOAD } from '../../../Queries/Image/Query/GET_IMAGE_UPLOAD';
import { loginContext } from '../../Context/UserContext';
import axios from 'axios';
import Loader from '../../Loader/Loader';

const today = new Date();
const schema = yup.object().shape({
  playername: yup
    .string()
    .required('Player Name Required')
    .matches(/^[a-zA-Z ]+$/, 'Invalid Player Name'),
  playermobile: yup
    .string()
    .required('Mobile Number Required')
    .matches(
      /^[6-9]\d{9}$/,
      'Mobile Number Start with 6-9 and 10 numbers Required'
    ),
  playerdob: yup
    .date()
    .required('Date of Birth is required')
    .max(today, 'Date Must Be Today or Earlier'),
  playerrole: yup.string().required('Player Role Required'),
  tshirtsize: yup.string().required('Select Tshirt Size'),
  trousersize: yup.string().required('Select Trouser Size'),
});

const Addplayer = (props) => {
  const { value, playerid } = useParams();
  const { setAlert, visible, setVisible } = useContext(Context);
  const [updatePlayerMutation] = useMutation(UPDATE_PLAYER);
  const { auctionData, loading, refreshData, refreshToken } =
    useContext(loginContext);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const [createPlayer] = useMutation(CREATE_PLAYER);
  console.log("52",value)
  const {
    control,
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  useEffect(() => {
    if (auctionData) {
      setPlayers(auctionData[value].players);
    }
  }, [loading, auctionData, value]);
  // console.log(auctionData[value].category);

  const [inputValue, setInputValue] = useState({
    photo: null,
    playerdob: '',
  });

  const [getSignerUrlForUpload] = useLazyQuery(GET_IMAGE_UPLOAD, {
    onCompleted: async (data) => {
      const res = data.getSignerUrlForUpload;
      try {
        const response = await axios.put(res, inputValue.photo, {
          headers: { 'Content-Type': 'application/octet-stream' },
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  });
  const formHandler = async (data) => {
    await refreshToken();
    let filename;
    if (!playerid && inputValue.photo) {
      filename = `images/${uuidv4()}-${inputValue.photo.name}`;
      const response = await getSignerUrlForUpload({
        variables: { filename: filename },
      });
      console.log(response);
    }

    const playerFormData = {};
    playerFormData.playerimage = filename;
    playerFormData.playermobile = data.playermobile;
    playerFormData.playername = data.playername;
    playerFormData.playerdob = data.playerdob;
    playerFormData.playerrole = data.playerrole;
    playerFormData.tshirtsize = data.tshirtsize;
    playerFormData.trousersize = data.trousersize;
    playerFormData.notes = data.notes;
    playerFormData.status = 'available';
    playerFormData.auctionid = auctionData[value].auctionid;
    if (playerid) {
      playerFormData.playerid = players[playerid].playerid;
    }
    console.log(playerFormData);
    setAlert({ message: 'Player Added Successfully', status: 'success' });
    setInputValue({
      photo: null,
      playerdob: '',
    });
    setAlert({
      message: playerid ? 'Player updated' : 'Player Added',
      status: 'success',
    });
    setVisible(true);
    try {
      if (!playerid) {
        await createPlayer({
          variables: {
            createPlayerInput: playerFormData,
          },
        });
      } else {
        await updatePlayerMutation({
          variables: {
            updatePlayerInput: playerFormData,
          },
        });
      }
    } catch (err) {
      console.log(err.message);
    }
    reset();
   
      await refreshData();
      navigate(`/dashboard/playerlist/${value}`);
  
  };

  useEffect(() => {
    if (playerid && !loading && players && players[playerid]) {
      setInputValue({
        photo: players[playerid].playerimage,
        playerdob: new Date(players[playerid].playerdob),
      });
      setValue('playermobile', players[playerid].playermobile);
      setValue('playername', players[playerid].playername);
      setValue('playerrole', players[playerid].playerrole);
      setValue('tshirtsize', players[playerid].tshirtsize);
      setValue('trousersize', players[playerid].trousersize);
      setValue('notes', players[playerid].notes);
      setValue('playerdob', new Date(players[playerid].playerdob));
      
    }
  }, [loading, players, playerid]);

  if (loading) {
    return (
      <div
        className={styles.addplayer}
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.addplayer}>
      <div className={styles.formHeader}>
        <h3>
          <Link to='/dashboard/myauction'>My Auction</Link> /
          <Link to={`/dashboard/auctiondetails/${value}`}>
            {auctionData[value].auctionname}
          </Link>{' '}
          /<Link to={`/dashboard/playerlist/${+value}`}>Player List</Link> /Add
          Player
        </h3>
        <Link to={`/dashboard/playerlist/${+value}`}>
          <FaList />
        </Link>
      </div>
      <form className={styles.playerForm} onSubmit={handleSubmit(formHandler)}>
        <div className={styles.inputcontainer}>
          <label>Photo</label>
          <input
            type='file'
            id='getfile'
            accept='image/*'
            name='photo'
            onChange={(e) =>
              setInputValue({
                ...inputValue,
                [e.target.name]: e.target.files[0],
              })
            }
          ></input>
        </div>
        <div className={styles.inputcontainer}>
          <label>Photo</label>
          <img
            className={styles.imageuploader}
            src={
              !playerid
                ? inputValue.photo
                  ? URL.createObjectURL(inputValue.photo)
                  : imageLogo
                : inputValue.photo
                ? process.env.REACT_APP_IMAGE_CDN + inputValue.photo
                : imageLogo
            }
            alt={inputValue.playerName}
            onClick={() => document.getElementById('getfile').click()}
          ></img>
          <p>{players.playerimage ? players.playerimage : null}</p>
        </div>
        <div className={styles.inputcontainer}>
          <label>Player Name</label>
          <input
            type='text'
            placeholder='Player Name'
            name='playername'
            {...register('playername')}
          ></input>
          <label className={styles.validate}>
            {errors?.playername?.message}
          </label>
        </div>
        <div className={styles.inputcontainer}>
          <label>Mobile Number</label>
          <input
            type='text'
            placeholder='Mobile Number'
            name='playermobile'
            {...register('playermobile')}
          ></input>
          <label className={styles.validate}>
            {errors?.playermobile?.message}
          </label>
        </div>
        <div className={styles.inputcontainer}>
          <label>Date Of Birth</label>
          <Controller
            control={control}
            name='playerdob'
            render={({ field }) => (
              <DatePicker
                placeholderText='Date Of Birth'
                onChange={(date) => field.onChange(date)}
                selected={field.value}
              />
            )}
          />
          <label className={styles.validate}>
            {errors?.playerdob?.message}
          </label>
        </div>
        <div className={styles.inputcontainer}>
          <label>Player Role</label>
          <select
            placeholder='Player Role'
            name='playerrole'
            {...register('playerrole')}
          >
            <option value=''>Select on Option</option>
            {auctionData[value].category.map((playerrole) => {
              return (
                <option value={playerrole.category} key={playerrole.categoryid}>
                  {playerrole.category}
                </option>
              );
            })}
          </select>
          <label className={styles.validate}>
            {errors?.playerrole?.message}
          </label>
        </div>
        <div className={styles.inputcontainer}>
          <label>Tshit Size</label>
          <select
            placeholder='Tshirt Size'
            name='tshirtsize'
            {...register('tshirtsize')}
          >
            <option value=''>Select on Option</option>
            <option value='S'>S</option>
            <option value='L'>L</option>
            <option value='XL'>XL</option>
            <option value='XXL'>XXL</option>
            <option value='XXXL'>XXXL</option>
            <option value='XXXXL'>XXXXL</option>
          </select>
          <label className={styles.validate}>
            {errors?.tshirtsize?.message}
          </label>
        </div>
        <div className={styles.inputcontainer}>
          <label>Trouser Size</label>
          <select
            placeholder='Trouser Size'
            name='trouserSize'
            {...register('trousersize')}
          >
            <option value=''>Select on Option</option>
            <option value='S'>S</option>
            <option value='L'>L</option>
            <option value='XL'>XL</option>
            <option value='XXL'>XXL</option>
            <option value='XXXL'>XXXL</option>
            <option value='XXXXL'>XXXXL</option>
          </select>
          <label className={styles.validate}>
            {errors?.trousersize?.message}
          </label>
        </div>
        <div className={styles.inputcontainer}>
          <label>Notes</label>
          <input
            type='text'
            placeholder='Notes'
            name='notes'
            {...register('notes')}
          ></input>
        </div>
        <div className={styles.addbutton}>
          <input
            type='submit'
            value={playerid ? 'Update Player' : 'Add Player'}
          />
        </div>
      </form>
    </div>
  );
};

export default Addplayer;
