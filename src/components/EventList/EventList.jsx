import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { useContext } from "react";
import { AuthedUserContext } from "../App";

const EventList = (props) => {
  const navigate = useNavigate();
  const user = useContext(AuthedUserContext);

  const handleClick = (event) => {
    user
      ? navigate("/events/" + event._id)
      : console.log("user is not logged in");
  };

  const eventListItems = props.events.map((event) => (
    <div
      key={event._id}
      className="card card-div"
      style={{ width: "18rem", minHeight: "400px", cursor: "pointer" }}
      onClick={() => handleClick(event)}
      // to={"/events/" + event._id}
    >
      <img
        src={event.image || "sample-event-image-2.png"}
        className="card-img-top"
        alt="..."
      ></img>
      <div className="card-body">
        <h5 className="card-title">
          {event.title.length > 50
            ? event.title.substring(0, 50) + "..."
            : event.title}
        </h5>
        <p>{event.category}</p>

        <p className="card-text mb-0">
          <img className="event-icon" src="calendar-event.svg"></img>
          {new Date(event.date).toLocaleDateString("default", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
        <div className="card-footer-div">
          <div>
            <p>
              <img src="person-raised-hand.svg" className="event-icon"></img>
              {event.attendees.length + " going"}
            </p>
          </div>
          <div>
            <p>
              <img src="coin.svg" className="event-icon"></img>
              {event.cost ? "$" + event.cost : "FREE"}
            </p>
          </div>
        </div>
      </div>
    </div>
  ));

  return <main className="event-container">{eventListItems}</main>;
};

export default EventList;
