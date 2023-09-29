import styles from '../Style/price.module.css';
import Loader from '../../Loader/Loader';
import { useQuery } from '@apollo/client';
import { GET_PRICES } from '../../../Queries/Prices/Query/GET_PRICES';

const Price = () => {
    const { data, loading, error } = useQuery(GET_PRICES);
    if (loading) {
      return (
        <div
          className={styles.pricecontainer}
          style={{ justifyContent: 'center' }}
          data-testid={'loader'}
        >
          <Loader />
        </div>
      );
    }
    if (error) {
      return <div className={styles.pricecontainer}>{error.message}</div>;
    }
  const prices = data.getAllPrice
  return (
    <div id='price' className={styles.pricecontainer}>
        <p className={styles.header}>Prices</p>
      <div className={styles.allprices} data-testid={'price-item'}>
        {prices.map((items,index) => {
          return (
            <div key={index} className={styles.price}>
              <p>up to</p>
              <p>{items.count}</p>
              <p>Teams</p>
              <button>{items.amount===0?'Free':`Rs ${items.amount}`}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Price;
