import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const EventList = (props) => {
  const eventListItems = props.events.map((event) => (
    <Link
      key={event._id}
      className="card position-relative"
      style={{ width: "18rem", minHeight: "400px" }}
      to={"/events/" + event._id}
    >
      <img
        src={event.image || "https://placehold.co/400x300.png"}
        className="card-img-top"
        alt="..."
      ></img>
      <div className="card-body">
        <h5 className="card-title">{event.title}</h5>
        <h6 className="card-title">{event.cost ? "$"+event.cost : "FREE"}</h6>
        <p className="card-text pb-4">{event.description}</p>
        <div className="position-absolute bottom-0">
          {event.attendees.length !== 0 ? (
            <p
              style={{
                backgroundImage: "url('flame-icon.svg')",
                backgroundPosition: "center left",
                backgroundRepeat: "no-repeat",
                paddingLeft: "25px",
              }}
            >
              {event.attendees.length + " going" }
            </p>
          ) : (
            <p>No attendees yet</p>
          )}
        </div>
      </div>
    </Link>
  ));

  return <main className="event-container">{eventListItems}</main>;
};

export default EventList;
