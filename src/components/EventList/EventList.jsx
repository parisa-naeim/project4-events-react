import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const EventList = (props) => {
  const eventListItems = props.events.map((event) => (
    <Link
      key={event._id}
      className="card position-relative card-div"
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
        <p>{event.description}</p>

        <p className="card-text mb-0">
          {new Date(event.date).toLocaleDateString("default", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
        {/* <p style={{ marginBottom: "0" }}>07 AUG 2024</p> */}
        <div className="card-footer-div">
          <div>
            <p
              style={
                {
                  // paddingLeft: "25px",
                }
              }
            >
              {event.attendees.length + " going"}
            </p>
          </div>
          <div>
            <p>{event.cost ? "$" + event.cost : "FREE"}</p>
          </div>
        </div>
      </div>
    </Link>
  ));

  return <main className="event-container">{eventListItems}</main>;
};

export default EventList;
