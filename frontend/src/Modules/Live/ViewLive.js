import { useContext, useEffect, useState, useRef } from "react";
import styles from "../Live/live.module.css";
import { useParams } from "react-router-dom";
import playerdefault from "../../assets/defaultPlayer.png";
import teamlogo from "../../assets/color-logo.png";
import {
  RiSendPlane2Fill,
  RiChatSmile3Line,
  RiArrowLeftFill,
} from "react-icons/ri";
import { auctionDetails } from "../Context/AuctionContext";

import { socketDetails } from "../Context/WebSocketContext";
import { Context } from "../User/Components/AlertContext";
import Alert from "../User/Components/Alert";

const ViewLive = (props) => {
  const calculateTimeRemaining = (targetDate) => {
    if(!targetDate){
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      }
    }
    const currentDate = new Date().getTime();
    const eventDate = new Date(targetDate).getTime();
    const timeRemaining = eventDate - currentDate;

    if (timeRemaining <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    const days = String(
      Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
    ).padStart(2, "0");
    const hours = String(
      Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    ).padStart(2, "0");
    const minutes = String(
      Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, "0");
    const seconds = String(
      Math.floor((timeRemaining % (1000 * 60)) / 1000)
    ).padStart(2, "0");

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };
  const { auctionData, isLoading, setAuctionData } = useContext(auctionDetails);
  const [auctionValue, setAuctionValue] = useState('')
  const { auction } = useParams();
  const ref = useRef();
  const { setAlert, visible, setVisible } = useContext(Context);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [value, setValue] = useState("");
  const [unread, setUnread] = useState(null);
  const [User, setUser] = useState("");
  const [player, setPlayer] = useState({});
  const [team, setTeam] = useState({});
  const [point, setPoint] = useState(0);
  const [room, setRoom] = useState('');
  const [timeRemaining, setTimeRemaining] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [message, setMessage] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isRoom, setIsRoom] = useState();
  useEffect(() => {
    if (!isRoom) {
      const timer = setInterval(() => {
        const newTimeRemaining = calculateTimeRemaining(
          auctionData && auctionValue?.auctiondate
        );
        setTimeRemaining(newTimeRemaining);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [auctionData,room])
  useEffect(() => {
    if (message.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [message.length]);

  useEffect(() => {
    setUnread(null);
  }, [isChatVisible]);

  useEffect(() => {
    if(auctionData){
      console.log(auctionData[auctionData.findIndex((item)=>item.auctionid === +auction)])
      setAuctionValue(auctionData[auctionData.findIndex((item)=>item.auctionid === +auction)])
      setRoom(auctionData[auctionData.findIndex((item)=>item.auctionid === +auction)].auctionname)
      // setTimeRemaining(calculateTimeRemaining(auctionValue.auctiondate))
    }
  }, [isLoading]);

  useEffect(() => {
    if (auctionValue?.auctiondate) {
      console.log("Auction Date:", auctionValue.auctiondate);
      const newTimeRemaining = calculateTimeRemaining(auctionValue.auctiondate);
      console.log("New Time Remaining:", newTimeRemaining);
      setTimeRemaining(newTimeRemaining);
    }
  }, [auctionValue]);


  const { socket } = useContext(socketDetails);
  console.log(socket);

  const userCheck = (username) => {
    console.log("fom server" + username, "from now" + User);
    if (username === User) {
      return true;
    }
    return false;
  };

  socket.on("onMessage", (data) => {
    if (data.roomName == room) {
      setMessage((message) => [
        ...message,
        { username: data.body.userName, message: data.body.message },
      ]);
      if (data.userName == "HOST") setIsRoom(true);
      if (data.userName !== User) setUnread(unread + 1);
    }
  });
  socket.on("room-created", (data) => {
    if (data.roomName == room && data.message === "success") {
      socket.emit("joinRoom", { roomName: room, userName: User });
      setIsRoom(true);
    }
  });
  socket.on("room-join-success", (data) => {
    console.log("data:" + data.userName + " state:" + User);
    if (userCheck && data.roomName === room && data.message === "error") {
      setIsConnected(true);
    } else if (
      data.roomName === room &&
      userCheck &&
      data.message === "success"
    ) {
      setIsConnected(true);
      setIsRoom(true);
      console.log("yessssssss");
    }
  });
  socket.on("sold-data", (data) => {
    if (data.roomName === room) {
      console.log(data);
      setAlert({ message: `Player got ${data.message}`, status: "success" });
      setVisible(true);
      setPlayer([]);
      setTeam([]);
      setPoint(0);
    }
  });
  socket.on("auction-data", (data) => {
    if (data.roomName == room) setPlayer(data.player);
    setTeam(data.team);
    setPoint(data.points);
  });
  socket.on("end-live", (data) => {
    if (data.message == "success" && data.roomName == room) {
      isConnected(false);
    }
  });

  useEffect(() => {
    socket.on("connect", () => {});
    return () => {
      socket.off("connect");
      socket.off("onMessage");
      socket.off("room-created");
      socket.off("room-join-success");
      socket.off("live-data");
      socket.off("end-live");
    };
  }, [socket]);
  const joinRoom = (e) => {
    e.preventDefault();
    if(room)
      socket.emit("joinRoom", { roomName: room, userName: User });
  };
  const onSubmitText = (e) => {
    e.preventDefault();
    socket.emit("newMessage", {
      message: value,
      userName: User,
      roomName: room,
    });
    setValue("");
  };
  if (isLoading && auctionData && auctionValue.auctionname) {
    return <div data-testid="loading">loading...</div>;
  }
  return (
    <>
      {auctionData && (
        <div className={styles.header}>
          <h2 className={styles.auctionName}>
            {auctionValue?.auctionname}
          </h2>
          <p>------------Auction------------</p>
        </div>
      )}
      {isConnected ? (
        isRoom ? (
          <div className={styles.container}>
            <div className={styles.AuctionArea}>
              {player && player.playername && (
                <div className={styles.playerCard}>
                  <h1>Player : {player.playername}</h1>
                  <img
                    width="100px"
                    height="100px"
                    src={
                      player.playerimage
                        ? process.env.REACT_APP_IMAGE_CDN + player.playerimage
                        : playerdefault
                    }
                  ></img>
                  <p className={styles.playerDetails}>
                    <label>Role {player.playerrole}</label>
                    <label>Mobile {player.playermobile}</label>
                    <label>Status {player.status}</label>
                  </p>
                </div>
              )}
              {team && team.teamname && (
                <div className={styles.playerCard}>
                  <h1>Team : {team.teamname}</h1>
                  <img
                    width="100px"
                    height="100px"
                    src={
                      team.image
                        ? process.env.REACT_APP_IMAGE_CDN + team.image
                        : teamlogo
                    }
                  ></img>
                  <p>
                    <label>
                      teamPoints:
                      {team.teampoints}
                    </label>
                  </p>
                </div>
              )}
              {point > 0 && (
                <div className={styles.bidPoints}>
                  <h2 className={styles.auctionName}>Points: {point}</h2>
                </div>
              )}
            </div>
            {/* <div className={styles.backIcon} title="Back">
              <RiArrowLeftFill />
            </div> */}

            <div
              data-testid="chatbutton"
              className={styles.chatIcon}
              onClick={() => setIsChatVisible(!isChatVisible)}
              title="Live Chat"
            >
              <RiChatSmile3Line />
              {!isChatVisible && unread !== null ? (
                <div className={styles.unread}>{unread}</div>
              ) : (
                <></>
              )}
            </div>

            <div
              className={styles.LiveChatContainer}
              style={{ display: isChatVisible ? "flex" : "none" }}
            >
              <div className={styles.ChatBox}>
                {message.map((msg) => {
                  return (
                    <div
                      className={
                        msg.username == User
                          ? styles.MyMessage
                          : msg.username === "HOST"
                          ? styles.host
                          : styles.OtherMessage
                      }
                    >
                      <label className={styles.username}>{msg.username}</label>
                      <label className={styles.message}>{msg.message}</label>
                    </div>
                  );
                })}
                <div ref={ref} />
              </div>
              <form onSubmit={onSubmitText} className={styles.SendMessage}>
                <input
                  className={styles.MessageBox}
                  type="text"
                  placeholder="Type Your Message"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                ></input>
                <button className={styles.MessageButton} type="submit">
                  <RiSendPlane2Fill
                    className={styles.MessageIcon}
                  ></RiSendPlane2Fill>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className={styles.liveNotStarted}>
            {timeRemaining.days === "00" &&
            timeRemaining.hours === "00" &&
            timeRemaining.minutes === "00" &&
            timeRemaining.seconds === "00" ? (
              <h1>Wait For the Host to Start Live</h1>
            ) : (
              <>
                <h1>Live Not Yet Started</h1>
                <div className={styles.countDown}>
                  <div>
                    <h3>DAYS</h3>
                    <div className={styles.timeOuter}>
                      <span className={styles.timeInner}>
                        {timeRemaining.days[0]}
                      </span>
                      <span className={styles.timeInner}>
                        {timeRemaining.days[1]}
                      </span>
                      :
                    </div>
                  </div>
                  <div>
                    <h3>HOURS</h3>
                    <div className={styles.timeOuter}>
                      <span className={styles.timeInner}>
                        {timeRemaining.hours[0]}
                      </span>
                      <span className={styles.timeInner}>
                        {timeRemaining.hours[1]}
                      </span>
                      :
                    </div>
                  </div>
                  <div>
                    <h3>MINUTES</h3>
                    <div className={styles.timeOuter}>
                      <span className={styles.timeInner}>
                        {timeRemaining.minutes[0]}
                      </span>
                      <span className={styles.timeInner}>
                        {timeRemaining.minutes[1]}
                      </span>
                      :
                    </div>
                  </div>
                  <div>
                    <h3>SECONDS</h3>
                    <div className={styles.timeOuter}>
                      <span className={styles.timeInner}>
                        {timeRemaining.seconds[0]}
                      </span>
                      <span className={styles.timeInner}>
                        {timeRemaining.seconds[1]}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div></div>
          </div>
        )
      ) : (
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <span className={styles.card__title}>Join Live</span>
            <p className={styles.card__content}>
              {auctionData &&
                "Auction: " + auctionValue?.auctionname + "'s Live"}
            </p>
            <div className={styles.card__form}>
              <input
                id="username"
                type="text"
                onChange={(e) => setUser(e.target.value)}
                placeholder="username"
                value={User}
              ></input>
              <button
                data-testid="loginbutton"
                name="Login"
                onClick={joinRoom}
                className={styles.livebtn}
              >
                Join Live
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewLive;