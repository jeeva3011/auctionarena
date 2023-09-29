import {
  useState,
  useCallback,
  useEffect,
  createContext,
} from 'react';

import { useQuery } from '@apollo/client';
import { GET_AUCTION } from '../../Queries/Auction/Query/GET_AUCTION';

export const auctionDetails = createContext();

const AuctionContext = (props) => {
  const [auctionData, setAuctionData] = useState();
  const [err, setErr] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { refetch } = useQuery(GET_AUCTION);

  const fetchData = useCallback(async () => {
    const {data, error, loading} = await refetch()
    if (data) {
      setAuctionData(data.getAllAuction);
    }
    setIsLoading(loading);
    setErr(error);
  });

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <auctionDetails.Provider
      value={{ auctionData,fetchData, setAuctionData, isLoading, err }}
    >
      {props.children}
    </auctionDetails.Provider>
  );
};

export default AuctionContext;
