import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthedUserContext } from "../App";
import * as eventService from "../../services/eventService";
import MapComponent from "../MapComponent/MapComponent";

const EventDetails = (props) => {
  const [event, setEvent] = useState(null);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);

  const user = useContext(AuthedUserContext);

  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await eventService.show(id);
      setEvent(event);
    };
    fetchEvent();
  }, [id]);

  const handleJoin = async () => {
    const newAttendee = await eventService.joinEvent(event._id);
    setEvent({ ...event, attendees: [...event.attendees, newAttendee] });
    setShowJoinForm(false);
  };

  const handleLeave = async () => {
    await eventService.leaveEvent(event._id);
    setEvent({
      ...event,
      attendees: event.attendees.filter((a) => a._id !== user._id),
    });
    setShowLeaveForm(false);
  };

  if (event === null) {
    return <main>Loading...</main>;
  }

  return (
    <main>
      <header>
        <p
          className="lead"
          style={{ textTransform: "uppercase", textDecoration: "underline" }}
        >
          {event.category}
        </p>
      </header>

      <section className="container">
        <div className="row justify-content-center">
          <div
            className="modal-div"
            style={{ display: showJoinForm ? "block" : "none" }}
          >
            <div className="modal-content-div">
              <span
                className="modal-close-btn"
                onClick={() => setShowJoinForm(false)}
              >
                &times;
              </span>
              <div>
                <p>confirm joining {event.title}</p>
                <div className="d-flex" style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-primary btn-m mx-3 px-3 mt-4"
                    onClick={handleJoin}
                  >
                    Join!
                  </button>

                  <button
                    className="btn btn-primary btn-m mx-3 px-3 mt-4"
                    onClick={() => setShowJoinForm(false)}
                  >
                    Not yet
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal-div"
            style={{ display: showLeaveForm ? "block" : "none" }}
          >
            <div className="modal-content-div">
              <span
                className="modal-close-btn"
                onClick={() => setShowLeaveForm(false)}
              >
                &times;
              </span>
              <div>
                <p>confirm leaving {event.title}</p>
                <div className="d-flex" style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-primary btn-m mx-3 px-3 mt-4"
                    onClick={handleLeave}
                  >
                    Leave now!
                  </button>

                  <button
                    className="btn btn-primary btn-m mx-3 px-3 mt-4"
                    onClick={() => setShowLeaveForm(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <img
              style={{ border: "1px solid #dfdedb", borderRadius: "0.5em" }}
              className="w-50 rounded mx-auto d-block "
              src={event.image || "https://placehold.co/400x300.png"}
            />
            <h2 className="display-6 py-2">{event.title}</h2>
            <h4 className="h4">{event.cost}</h4>
            <p style={{ color: "#aaaaaa" }}>
              Listed on {new Date(event.createdAt).toLocaleDateString()} by{" "}
              {event.organiser.username}
            </p>

            <div
              className="d-flex gap-5 justify-content-between mt-5"
              style={{ minWidth: "800px", maxWidth: "50%" }}
            >
              <div>
                <p>Description:</p>
                <p>{event.description}</p>
                <p>type: {event.type}</p>
              </div>

              <div>
                <p>Pick up postcode: {event.postcode}</p>
                <MapComponent postcode={event.postcode} />
              </div>
            </div>

            {/* Attendees */}
            <div className="mt-5">
              <h2>Attendees</h2>

              {event.attendees.length === 0 && <p>No attendees yet.</p>}

              {event.attendees.map((attendee) => (
                <article key={attendee._id}>
                  <img
                    src="/profile-icon.jpg"
                    alt={attendee.username}
                    title={attendee.username}
                    style={{ width: "50px", height: "50px" }}
                  />
                </article>
              ))}

              {event.organiser._id !== user._id && (
                <>
                  {event.attendees.some(
                    (attendee) => attendee._id == user._id
                  ) && (
                    <button
                      className="btn btn-primary btn-m mx-3 px-5 py-2 mt-2"
                      onClick={() => setShowLeaveForm(true)}
                      type="button"
                    >
                      Not attending
                    </button>
                  )}

                  {!event.attendees.some(
                    (attendee) => attendee._id == user._id
                  ) && (
                    <button
                      className="btn btn-primary btn-m mx-3 px-5 py-2 mt-2"
                      onClick={() => setShowJoinForm(true)}
                      type="button"
                    >
                      Join
                    </button>
                  )}
                </>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-5">
              {event.organiser._id === user._id && (
                <>
                  <button
                    className="btn btn-primary btn-m mx-3 px-5 py-2 mt-2"
                    onClick={() => props.handleEditEvent(event._id)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-primary btn-m mx-3 px-5 py-2 mt-2"
                    onClick={() => props.handleDeleteEvent(event._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventDetails;
