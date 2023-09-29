import styles from '../Style/feature.module.css';
import { FaVideo, FaLaptop } from 'react-icons/fa';
import { FaPeopleGroup } from 'react-icons/fa6';
import { BsMicrosoftTeams } from 'react-icons/bs';
import { useQuery } from '@apollo/client';
import { GET_ALL_FEATURES } from '../../../Queries/Features/Query/GET_ALL_FEATURES';
import Loader from '../../Loader/Components/Loader';
import { useEffect, useState } from 'react';

const Feature = () => {
  const { refetch, loading, error } = useQuery(GET_ALL_FEATURES);
  const [data, setData] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await refetch();
      setData(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData()
}, [data]);

  if (loading) {
    return (
      <div
        className={styles.featurecontainer}
        style={{ justifyContent: 'center' }}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className={styles.featurecontainer}>{error.message}</div>;
  }

  const feature = data ? data.getAllFeatures : [];
  const logo = [<FaPeopleGroup data-testid='feature1' />, <FaVideo data-testid='feature2' />, <BsMicrosoftTeams data-testid='feature3' />, <FaLaptop data-testid='feature4' />];

  return (
    <div className={styles.featurecontainer}>
      <p className={styles.header}>Upcoming Features</p>
      <div className={styles.allfeature}>
        {feature.map((items, index) => {
          return (
            <div key={index} className={styles.feature}>
              <div className={styles.logo}> {logo[index]}</div>
              <div className={styles.description}>
                <h2>{items.name}</h2>
                <p>{items.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feature;
