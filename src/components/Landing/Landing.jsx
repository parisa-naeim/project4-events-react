import { useEffect, useState } from "react";
import EventList from "../EventList/EventList";
import * as eventService from "../../services/eventService";

const Landing = (props) => {
  // const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   fetchAllEvents();
  // }, []);

  // const fetchAllEvents = async () => {
  //   const allEvents = await eventService.index();
  //   setEvents(allEvents);
  // };

  return (
    <main className="landing-main">
      <h1 style={{ color: "#1697E8" }}>Welcome to our Events community</h1>
      <h3 className="mt-1">
        Join us to connect with like-minded individuals, explore new interests,
        and share your passions. Whether you're looking to learn something new,
        meet new friends, or network with professionals, our diverse range of
        events and activities has something for everyone.
      </h3>
      <EventList events={props.events} />
    </main>
  );
};

export default Landing;
