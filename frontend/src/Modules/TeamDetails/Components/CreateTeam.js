import React, { useContext, useState, useEffect } from 'react';
import Style from '../Styles/CreateTeam.module.css';
import imgLogo from '../../../assets/imagess.svg';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaList } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Alert from '../../User/Components/Alert';
import { Context } from '../../User/Components/AlertContext';
import { CREATE_TEAM } from '../../../Queries/Team/Mutation/CREATE_TEAM';
import { UPDATE_TEAM } from '../../../Queries/Team/Mutation/UPDATE_TEAM';
import { useMutation, useLazyQuery } from '@apollo/client';
import { loginContext } from '../../Context/UserContext';
import Loader from '../../Loader/Loader';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { GET_IMAGE_UPLOAD } from '../../../Queries/Image/Query/GET_IMAGE_UPLOAD';


const schema = yup.object().shape({
  teamname: yup
    .string()
    .required("Team Name Required")
    .matches(/^[a-zA-Z ]+$/, "Invalid Team Name"),
  shortname: yup.string().required("Short Name Required").matches(/^[a-zA-Z ]+$/, "Invalid Short Name"),
  shortcutkey: yup.string().required("Shortcutkey Required"),
});

const CreateTeam = () => {
  const { auctionData, loading, refreshData, refreshToken } =
    useContext(loginContext);
  const [team, setTeam] = useState([]);
  const [imgFile, setImgFile] = useState();
  const { visible, setVisible, setAlert } = useContext(Context);
  const { value, teamid } = useParams();
  window.Buffer = window.Buffer || require('buffer').Buffer;
  const {
    handleSubmit,
    reset,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    if (auctionData) {
      setTeam(auctionData[value].team);
    }
  }, [loading, auctionData, value]);
  const [createTeamMutation] = useMutation(CREATE_TEAM);
  const [updateTeamMutation] = useMutation(UPDATE_TEAM);

  const navigate = useNavigate();

  useEffect(() => {
    if (teamid && !loading && team && team[teamid]) {
      setImgFile(team[teamid].image);
      setValue('teamname',team[teamid].teamname);
      setValue('shortname',team[teamid].shortname);
      setValue('shortcutkey',team[teamid].shortcutkey);
    }
  }, [team, loading, teamid]);

  const [getSignerUrlForUpload] = useLazyQuery(GET_IMAGE_UPLOAD, {
    onCompleted: async (data) => {
      const res = data.getSignerUrlForUpload;
      if(res){
        console.log(imgFile)
        try {
          const response = await axios.put(res, imgFile, {
            headers: { 'Content-Type': 'application/octet-stream' },
          });
          console.log(response)
        } catch (error) {
          console.log(error);
        }
      }
      
    },
  });
 
  const imageUploadHandler = (e) => {
    setImgFile(e.target.files[0]);
  };

  const submitHandler = async (data) => {
    await refreshToken();

    if (
      teamid
        ? team.find((teams) => teams.teamname === data.teamname) &&
          team[teamid].teamname !== data.teamname
        : team.find((teams) => teams.teamname === data.teamname)
    ) {
      setAlert({
        message: 'Team Name Already Exits for this Auction',
        status: 'error',
      });
      setVisible(true);
    }else if (
      teamid
        ? team.find((teams) => teams.shortname === data.shortname) &&
          team[teamid].shortname !== data.shortname
        : team.find((teams) => teams.shortname === data.shortname)
    ){
      setAlert({
        message: 'Team ShortName Already Exits for this Auction',
        status: 'error',
      });
      setVisible(true);
    }else if (
      teamid
        ? team.find((teams) => teams.shortcutkey === data.shortcutkey) &&
          team[teamid].shortcutkey !== data.shortcutkey
        : team.find((teams) => teams.shortcutkey === data.shortcutkey)
    ) {
      setAlert({
        message: 'Team Shortcut Key Already Exits for this Auction',
        status: 'error',
      });
      setVisible(true);
    } else {
      try {
        if (!teamid) {
          let filename;
          if (imgFile) {
            filename = `images/${uuidv4()}-${imgFile?.name}`;
             await getSignerUrlForUpload({
              variables: { filename: filename },
            });
      
          }

          await createTeamMutation({
            variables: {
              createTeamData: {
                auctionid: auctionData[value].auctionid,
                image: filename,
                teamname: data.teamname,
                shortname: data.shortname,
                shortcutkey: data.shortcutkey,
              },
            },
          });
        } else {
          await updateTeamMutation({
            variables: {
              updateTeamData: {
                auctionid: auctionData[value].auctionid,
                teamid: team[teamid].teamid,
                teamname: data.teamname,
                shortname: data.shortname,
                shortcutkey: data.shortcutkey,
              },
            },
          });
        }
        reset()
        setImgFile();

        setAlert({
          message: teamid ? 'Team updated' : 'Team Added',
          status: 'success',
        });
        setVisible(true);
      } catch (err) {
        console.log(err.message);
      }
      setTimeout(async() => {        
       await refreshData();
       navigate(`/dashboard/team/${value}`);
      }, 1000);
     
    }
  };

  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const imageUrl = () =>{
    if(!teamid){
      if(imgFile){
        return URL.createObjectURL(imgFile);
      } else return imgLogo;
    } else {
      if(imgFile){
        return process.env.REACT_APP_IMAGE_CDN + imgFile;
      } else return imgLogo
    }
  }
  const teamImage = imageUrl();

  

  if (loading) {
    return (
      <div
        className={Style.CreateTeamContainer}
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Loader />
      </div>
    );
  }
  return (
    <div className={Style.CreateTeamContainer}>
      {visible && <Alert />}
      <div className={Style.formHeader}>
        <h3>
          <Link to='/dashboard/myauction'>My Auction</Link> /
          <Link to={`/dashboard/auctiondetails/${+value}`}>
            {auctionData[value].auctionname}
          </Link>{' '}
          /<Link to={`/dashboard/team/${+value}`}>Teams</Link> /
          {teamid ? 'Update Team' : 'Add Team'}
        </h3>
        <Link to={`/dashboard/team/${+value}`}>
          <FaList />
        </Link>
      </div>

      <div className={Style.formContainer}>
        <div className={Style.imageUploadConatiner}>
          <div>
            <img
              className={`${Style.imageUpload} ${
                teamid ? Style.disableHover : ''
              }`}
              src={teamImage}
              alt='Upload'
              title='Upload image'
              onClick={() => document.getElementById('imageUploader').click()}
            />
            <p>{imgFile ? imgFile.name : null}</p>
          </div>

          <input
            style={{ display: 'none' }}
            type='file'
            id='imageUploader'
            name='image'
            onChange={imageUploadHandler}
            accept='image/*'
          />
        </div>
        <div className={Style.formControl}>
          <div className={Style.inputs}>
            <label>Team Name</label>
            <input
              type='text'
              placeholder='Team Name'
              name='teamName'
              {...register('teamname')}
            />
          <label className={Style.validate}>
            {errors?.teamname?.message}
          </label>
          </div>
          <div className={Style.inputs}>
            <label>Team Short Name</label>
            <input
              type='text'
              name='shortName'
              placeholder='Team Short Name'
              {...register('shortname')}
            />
            <label className={Style.validate}>
            {errors?.shortname?.message}
          </label>
          </div>
          <div className={Style.inputs}>
            <label>Select a Shortcut Key</label>
            <select
              name='shortcut'
              placeholder='Select Shortcut Key'
              {...register('shortcutkey')}
            >
              <option value='none' hidden>
                Select Shortcut
              </option>
              {alphabets.map((letter) => (
                <option key={letter} value={letter}>
                  {letter}
                </option>
              ))}
            </select>
            <label className={Style.validate}>
            {errors?.shortcutkey?.message}
          </label>
          </div>
          <button
            type='submit'
            className={Style.addTeamBtn}
            onClick={handleSubmit(submitHandler)}
          >
            {teamid ? 'Update Team' : 'Add Team'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;