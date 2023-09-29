import React, { useContext, useEffect, useState } from 'react';
import CAstyle from './CreateAuction.module.css';
import DatePicker from 'react-datepicker';
import imageLogo from '../../assets/imagess.svg';
import 'react-datepicker/dist/react-datepicker.css';
import { Context } from '../User/Components/AlertContext';
import Alert from '../User/Components/Alert';
import { loginContext } from '../Context/UserContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/client';
import { CREATE_AUCTION } from '../../Queries/Auction/Mutation/CREATE_AUCTION';
import { UPDATE_AUCTION } from '../../Queries/Auction/Mutation/UPDATE_AUCTION';
import { GET_IMAGE_UPLOAD } from '../../Queries/Image/Query/GET_IMAGE_UPLOAD';
import {CREATE_CATEGORY} from '../../Queries/Category/Mutation/CREATE_CATEGORY';
import {UPDATE_CATEGORY} from '../../Queries/Category/Mutation/UPDATE_CATEGORY';
import { v4 as uuidv4 } from 'uuid';
import Loader from '../Loader/Loader';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';

const today = new Date();
today.setHours(0, 0, 0, 0);
const schema = yup.object().shape({
  auctionname: yup
    .string()
    .required('Auction Name Required')
    .matches(/^[a-zA-Z ]+$/, 'Invalid Auction Name'),
  auctiontype: yup
    .string()
    .required('Select Auction Type')
    .notOneOf([''], 'Please select a valid auction type'),
  auctiondate: yup
    .date()
    .required('Auction Date is required')
    .min(today, 'Auction Date Must Be Today or Later'),
  pointsperteam: yup
    .number()
    .required('Pointsperteam Required')
    .positive('Points Per Team Must Be Greater Than 0'),
  minimumbid: yup
    .number()
    .required('Minimum Bid Required')
    .positive('Minimum Bid Must Be Greater Than 0'),
  bidincreaseby: yup
    .number()
    .required('Bid Increase Required')
    .positive('Bid Increase By Must Be Greater Than 0'),
  playercount: yup
    .number()
    .required('Player Count Required')
    .positive('Player Count Must Be Greater Than 0'),
});

const CreateAuction = () => {
  window.Buffer = window.Buffer || require('buffer').Buffer;
  const [avatar, setAvatar] = useState();
  const [nextPage, setNextPage] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [createCategoryMutation] = useMutation(CREATE_CATEGORY);
  const [updateCategoryMutation] = useMutation(UPDATE_CATEGORY);
  const {
    user,
    auctionData,
    loading: isLoading,
    refreshData,
    refreshToken,
  } = useContext(loginContext);
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

  const [getSignerUrlForUpload] = useLazyQuery(GET_IMAGE_UPLOAD, {
    onCompleted: async (data) => {
      const res = data.getSignerUrlForUpload;
      try {
        const response = await axios.put(res, avatar, {
          headers: { 'Content-Type': 'application/octet-stream' },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });


  const [createAuctionMutation] = useMutation(CREATE_AUCTION, {
    onCompleted: async () => {
      setAlert({
        message: params.value ? 'Auction Updated' : 'Auction Created',
        status: 'success',
      });
      setVisible(true);
      reset();
     
        await refreshData();
        navigate('/dashboard/myauction');
     
    },
    onError: (error) => {
      setAlert({ message: error.message, status: 'error' });
      setVisible(true);
      console.log('error', error);
    },
  });
  const [updateAuctionMutation] = useMutation(UPDATE_AUCTION, {
    onCompleted: async () => {
      setAlert({
        message: params.value ? 'Auction Updated' : 'Auction Created',
        status: 'success',
      });
      setVisible(true);
      reset();
    
       await refreshData();
        navigate('/dashboard/myauction');
    
    },
    onError: (error) => {
      setAlert({ message: error.message, status: 'error' });
      setVisible(true);
      console.log('error', error);
    },
  });
  const navigate = useNavigate();
  const params = useParams();
  const auctionIndex = params.value;

  const CategoryChange = (newValue, auctionMeta) => {
    setSelectedCategories(newValue);
    console.log(selectedCategories);
  };
  const handleCreateOption = (inputValue) => {
    if (selectedCategories.some((category) => category.label === inputValue)) {
      setAlert({message:'Category Already exists!',status:'error'});
      setVisible(true);
      console.log('eer');
    } else {
      const newOption = { value: inputValue, label: inputValue };
      setSelectedCategories([...selectedCategories, newOption]);
      console.log(newOption);
    }
  };
  useEffect(() => {
    if (auctionIndex && auctionData) {
      setValue('auctionname', auctionData[auctionIndex].auctionname);
      setValue('auctiontype', auctionData[auctionIndex].auctiontype);
      setValue('pointsperteam', auctionData[auctionIndex].pointsperteam);
      setValue('auctiondate', new Date(auctionData[auctionIndex].auctiondate));
      setValue('minimumbid', auctionData[auctionIndex].minimumbid);
      setValue('bidincreaseby', auctionData[auctionIndex].bidincreaseby);
      setValue('playercount', auctionData[auctionIndex].playersperteam);
      let data = [];
      auctionData[auctionIndex].category.forEach((cate) => {
        data = [
          ...data,
          {
            label: cate.category,
            value: cate.category,
            categoryid:cate.categoryid
          },
        ]
      });
      setSelectedCategories(data);
    } else {
      reset();
      setSelectedCategories([]);
    }
  }, [auctionIndex, auctionData]);
  const { setAlert, visible, setVisible } = useContext(Context);

  const ImageUploadHanlder = (e) => {
    setAvatar(e.target.files[0]);
  };

  const CreateAuctionFormSubmitHandler = async (data) => {
    await refreshToken();
    if(selectedCategories.length === 0){
      setAlert({message:'Category Required!',status:'error'})
      setVisible(true);
    }else{
    try {
      if (!params.value) {
        let filename;
        if (avatar) {
          filename = `images/${uuidv4()}-${avatar?.name}`;
          const response = await getSignerUrlForUpload({
            variables: { filename: filename },
          });
        }

        const auction = await createAuctionMutation({
          variables: {
            createAuctionData: {
              image: filename,
              auctionname: data.auctionname,
              auctiontype: data.auctiontype,
              auctiondate: data.auctiondate,
              pointsperteam: +data.pointsperteam,
              minimumbid: +data.minimumbid,
              bidincreaseby: +data.bidincreaseby,
              playersperteam: +data.playercount,
              userid: user.userid,
            },
          },
        });
        selectedCategories.forEach(async (category) => {
          await createCategoryMutation({
            variables: {
              createCategoryInput: {
                auctionid: auction.data.createAuction.auctionid,
                category: category.value.toLowerCase().trim(),
                minimumbid: +data.minimumbid
              },
            },
          });
        });
        
        reset();
        setSelectedCategories([]);

      } else {
        await updateAuctionMutation({
          variables: {
            auctionUpdateData: {
              auctionid: auctionData[auctionIndex].auctionid,
              auctionname: data.auctionname,
              auctiontype: data.auctiontype,
              auctiondate: data.auctiondate,
              userid: user.userid,
            },
          },
        });
        reset();
        setSelectedCategories([]);
      }
    } catch (error) {
      console.log(error);
    }}
  };
  if (isLoading && !auctionData) {
    return (
      <div
        className={CAstyle.CreateAuctionContainer}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Loader />
      </div>
    );
  }
  return (
    <div className={CAstyle.CreateAuctionContainer}>
      <h2 className={CAstyle.header}>
        {!params.value ? 'Create Auction' : 'Update Auction'}
      </h2>
      <form
        className={CAstyle.formContainer}
        onSubmit={handleSubmit(CreateAuctionFormSubmitHandler)}
      >
        <div className={CAstyle.formControl + ' ' + CAstyle.left}>
          <div className={CAstyle.avatarContainer}>
            <img
              className={`${CAstyle.avatarImage} ${
                params.value ? CAstyle.disableHover : ''
              }`}
              src={
                !params.value
                  ? avatar
                    ? URL.createObjectURL(avatar)
                    : imageLogo
                  : auctionData[auctionIndex].image
                  ? process.env.REACT_APP_IMAGE_CDN +
                    auctionData[auctionIndex].image
                  : imageLogo
              }
              alt='avatar'
              onClick={() => document.getElementById('getFile').click()}
            />
            <input
              disabled={auctionIndex}
              className={CAstyle.imgUpload}
              type='file'
              id='getFile'
              name='image'
              onChange={ImageUploadHanlder}
              accept='image/*'
            />
          </div>
          <div className={CAstyle.selectContainer}>
            <label>Type</label>
            <select name='auctiontype' placeholder='Auction Type' {...register('auctiontype')}>
              <option value='' hidden>
                Select Type
              </option>
              <option value='cricket'>Cricket</option>
              <option value='football'>Football</option>
              <option value='volleyball'>Volleyball</option>
              <option value='tennis'>Tennis</option>
            </select>
            {errors.auctiontype && (
              <p className={CAstyle.validate}>{errors.auctiontype.message}</p>
            )}
          </div>
          <div className={CAstyle.inputField}>
            <label>Auction Name</label>
            <input
              type='text'
              placeholder='Auction Name'
              {...register('auctionname')}
            />
            <label className={CAstyle.validate}>
              {errors?.auctionname?.message}
            </label>
          </div>
          <div className={CAstyle.dateContainer}>
            <label>Auction Date</label>
            <Controller
              control={control}
              name='auctiondate'
              render={({ field }) => (
                <DatePicker
                  placeholderText='Auction Date'
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
            <label className={CAstyle.validate}>
              {errors?.auctiondate?.message}
            </label>
          </div>
        </div>
        <div className={CAstyle.formControl + ' ' + CAstyle.right}>
          <div
            className={CAstyle.insideLeft}
            style={{
              transition: 'transform .5s',
              transform: `translateX(${!nextPage ? 0 : -100}%)`,
              display: nextPage ? 'none' : 'flex',
            }}
          >
            <div className={CAstyle.inputField}>
              <label>Points Per Team</label>
              <input
                type='number'
                disabled={auctionIndex}
                placeholder='Points Per Team'
                {...register('pointsperteam')}
              />
              <label className={CAstyle.validate}>
                {errors?.pointsperteam?.message}
              </label>
            </div>
            <div className={CAstyle.inputField}>
              <label>Minimum Bid</label>
              <input
                type='number'
                disabled={auctionIndex}
                placeholder='Minimum Bid'
                {...register('minimumbid')}
              />
              <label className={CAstyle.validate}>
                {errors?.minimumbid?.message}
              </label>
            </div>
            <div className={CAstyle.inputField}>
              <label>Bid Increase By</label>
              <input
                type='number'
                disabled={auctionIndex}
                placeholder='Bid Increase By'
                {...register('bidincreaseby')}
              />
              <label className={CAstyle.validate}>
                {errors?.bidincreaseby?.message}
              </label>
            </div>
            <div className={CAstyle.inputField}> 
              <label>Player Per Team</label>
              <input
                type='number'
                disabled={auctionIndex}
                placeholder='Player Per Team'
                {...register('playercount')}
              />
              <label className={CAstyle.validate}>
                {errors?.playercount?.message}
              </label>
            </div>
            <button
              className={CAstyle.auctionBtn}
              onClick={(e) => {
                e.preventDefault();
                setNextPage(!nextPage);
              }}
            >
              Next
            </button>
          </div>
          <div
            className={CAstyle.insideRight}
            style={{
              display: nextPage ? 'flex' : 'none',
            }}
          >
            <div className={CAstyle.categoryField}>
              <label>Category</label>
              <CreatableSelect
                className={CAstyle.selectCategory}
                isMulti
                data-testid='Enter Category'
                value={selectedCategories}
                onChange={CategoryChange}
                isDisabled={auctionIndex}
                placeholder={'Enter Category'}
                formatCreateLabel={(value) => 'Create Category: ' + value}
                noOptionsMessage={()=>'Enter Category'}
                styles={{
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    display: 'none', 
                  }),
                }}
              />
            </div>
            <div className={CAstyle.buttons}>
              <button
                className={CAstyle.auctionBtn}
                onClick={(e) => {
                  e.preventDefault();
                  setNextPage(!nextPage);
                }}
              >
                Back
              </button>
              <button data-testid='button' className={CAstyle.auctionBtn} type='submit'>
                {!params.value ? 'Add Auction' : 'Update Auction'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAuction;
