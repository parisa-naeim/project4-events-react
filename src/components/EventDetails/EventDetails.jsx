import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthedUserContext } from "../App";
import * as eventService from "../../services/eventService";
import MapComponent from "../MapComponent/MapComponent";
import Modal from "../Modal/Modal";

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
        <h2>{event.title}</h2>
        <p
          style={{
            textTransform: "uppercase",
            textDecoration: "underline",
            fontSize: "0.8em",
          }}
        >
          {event.category}
        </p>
      </header>

      <section>
        <div className="row justify-content-center">
          <Modal isOpen={showJoinForm} onClose={() => setShowJoinForm(false)}>
            <div
              className="min-width-400 d-flex flex-column justify-content-center align-items-center height-10vh p-4"
              style={{ backgroundColor: "white", borderRadius: "1rem" }}
            >
              <h4 className="my-5">Do you want to join "{event.title}"?</h4>
              <div className="d-flex" style={{ textAlign: "center" }}>
                <button
                  className="btn btn-primary btn-m mx-3 px-3 mt-4"
                  onClick={handleJoin}
                >
                  Sure, let's join!
                </button>

                <button
                  className="btn btn-primary btn-m mx-3 px-3 mt-4"
                  onClick={() => setShowJoinForm(false)}
                >
                  Not now.
                </button>
              </div>
            </div>
          </Modal>

          <Modal isOpen={showLeaveForm} onClose={() => setShowLeaveForm(false)}>
            <div
              className="min-width-400 d-flex flex-column justify-content-center align-items-center height-10vh p-4"
              style={{ backgroundColor: "white", borderRadius: "1rem" }}
            >
              <h4 className="my-5">Do you want to leave "{event.title}"?</h4>
              <div className="d-flex" style={{ textAlign: "center" }}>
                <button
                  className="btn btn-primary btn-m mx-3 px-3 mt-4"
                  onClick={handleLeave}
                >
                  Yes. I want to leave.
                </button>

                <button
                  className="btn btn-primary btn-m mx-3 px-3 mt-4"
                  onClick={() => setShowLeaveForm(false)}
                >
                  No. I decide later.
                </button>
              </div>
            </div>
          </Modal>

          <div className="d-flex gap-4">
            <div style={{ width: "60%" }}>
              <img
                className="event-image-top"
                src={event.image || "/sample-event-image-2.png"}
              />

              <div className="my-3">
                <h5>Details</h5>
                <p>{event.description}</p>
              </div>
            </div>
            <div style={{ width: "40%" }}>
              <p style={{ color: "#aaaaaa" }}>
                {new Date(event.date).toLocaleDateString("default", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}{" "}
                11:30AM
              </p>
              <p style={{ color: "#aaaaaa" }}>
                held by @{event.organiser.username}
              </p>
              <p style={{ color: "#aaaaaa" }}>
                This is an {event.type.toLowerCase()} event
              </p>

              <div
                className="d-flex gap-5 justify-content-between mt-5"
                style={{ minWidth: "800px", maxWidth: "50%" }}
              >
                <div>
                  <p>Location: {event.address}</p>
                  <MapComponent postcode={event.address} />
                </div>
              </div>

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
                    <span style={{ color: "#444444" }}>
                      {attendee.username}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        {event.organiser._id !== user._id ? (
          <>
            <button className="btn btn-secondary btn-m mx-3 px-5 py-2 mt-2 button-link-border">
              Share
            </button>
            {event.attendees.some((attendee) => attendee._id == user._id) && (
              <button
                className="btn btn-primary btn-m mx-3 px-5 py-2 mt-2"
                onClick={() => setShowLeaveForm(true)}
                type="button"
              >
                Leave
              </button>
            )}

            {!event.attendees.some((attendee) => attendee._id == user._id) && (
              <button
                className="btn btn-primary btn-m mx-3 px-5 py-2 mt-2"
                onClick={() => setShowJoinForm(true)}
                type="button"
              >
                Join
              </button>
            )}
          </>
        ) : (
          <div className="">
            {event.organiser._id === user._id && (
              <>
                <button className="btn btn-secondary btn-m mx-3 px-5 py-2 mt-2 button-link-border">
                  Share
                </button>

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
        )}
      </footer>
    </main>
  );
};

export default EventDetails;
