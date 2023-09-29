import React, { useState, useEffect, useContext } from 'react';
import Style from '../../MyAuction/styles/MyAuction.module.css';
import { BiPlusMedical, BiSolidEditAlt, BiXCircle } from 'react-icons/bi';
import { RiFileTransferLine } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import { loginContext } from '../../Context/UserContext';
import { REMOVE_TEAM } from '../../../Queries/Team/Mutation/REMOVE_TEAM';
import { useMutation } from '@apollo/client';
import Loader from '../../Loader/Loader';
const TeamTable = () => {
  const { value } = useParams();
  const { auctionData, loading, refreshData, refreshToken } = useContext(loginContext);
  const [removeTeamMutation] = useMutation(REMOVE_TEAM);
  const [team, setTeam] = useState();

  useEffect(() => {
    if (auctionData) setTeam(auctionData[value].team);
  }, [auctionData,value]);
  const deleteHandler = async (teamid) => {
    await refreshToken()
       await removeTeamMutation({
        variables: {
          id: teamid,
        },
      });
      refreshData();
  };
  if (loading) {
    return (
      <div
        data-testid='loading-spinner'
        className={Style.auctioncontainer}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className={Style.auctioncontainer}>
      <div className={Style.auctionHeader}>
        <h3>
          <Link to='/dashboard/myauction'>My Auction</Link> /
          <Link to={`/dashboard/auctiondetails/${value}`}>
            {' '}
            {auctionData[value].auctionname}
          </Link>{' '}
          / Teams
        </h3>
        <Link to={`/dashboard/team/${value}/add`}>
          <BiPlusMedical
            className={Style.addauction}
            title='Add Team'
          ></BiPlusMedical>
        </Link>
      </div>
      <table className={Style.auctiontable}>
        <thead>
          <tr className={Style.tableheader}>
            <th>ID</th>
            <th>Team</th>
            <th>Short</th>
            <th>Key</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Transfer</th>
          </tr>
        </thead>
        <tbody>
          {(team ?? []).map((data) => {
              return (
                <tr key={data.teamid}>
                  <td>{data.teamid}</td>
                  <td>{data.teamname}</td>
                  <td>{data.shortname}</td>
                  <td>{data.shortcutkey}</td>
                  <td>
                    <Link
                      to={`/dashboard/team/${value}/add/${(team ?? []).indexOf(data)}`}
                    >
                      <BiSolidEditAlt
                        className={Style.addAuction + ' ' + Style.pointer}
                      ></BiSolidEditAlt>
                    </Link>
                  </td>
                  <td>
                    <BiXCircle
                      data-testid='deleteHandler'
                      className={Style.addAuction + ' ' + Style.pointer}
                      onClick={() => deleteHandler(data.teamid)}
                    ></BiXCircle>
                  </td>
                  <td><Link to={`/dashboard/transfer/${value}/teamid=${(team ?? []).indexOf(data)}`}><RiFileTransferLine /></Link></td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;
