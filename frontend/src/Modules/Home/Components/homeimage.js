import React from 'react';
import styles from '../Style/homeimage.module.css'
import { useState , useEffect } from 'react';
import logo1 from '../../../assets/homepage/dhoni.png';
import logo2 from '../../../assets/homepage/football.png';
import logo3 from '../../../assets/homepage/bascket.png';
import slogan from '../../../assets/homepage/slogan.png'

const Homeimage = () => {
    const images = [logo1,logo2,logo3]
    const [imageIndex,setImageIndex] = useState(0);
    const changeImage = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      };
    useEffect(() => {
        const interval = setInterval(changeImage, 2000); 
        return () => clearInterval(interval);
      });
    
  return (
    <div className={styles.homeimage}>
        <div className={styles.content}>
            <img src={slogan} alt='slogan'></img>
        </div>
        <div className={styles.imagecontainer}>
        <img src={images[imageIndex]} alt='home-set' className={styles.image}></img>
        </div>
    </div>
  )
};

export default Homeimage;
