import "./App.css";
import { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Landing from "./Landing/Landing";
import SignupForm from "./SignupForm/SignupForm";
import SigninForm from "./SigninForm/SigninForm";

import * as authService from "../services/authService";
import * as eventService from "../services/eventService";
import EventDetails from "./EventDetails/EventDetails";
import EventList from "./EventList/EventList";
import EventForm from "./EventForm/EventForm";
import EventFilter from "./EventFilter/EventFilter";

export const AuthedUserContext = createContext(null);

const initialFilterData = {
  title: "",
  category: "",
  type: "",
  onlyFree: false,
};

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [events, setEvents] = useState([]);
  const [filterData, setFilterData] = useState(initialFilterData);

  const navigate = useNavigate();

  useEffect(() => {
    // if (user)
    fetchAllEvents();
  }, [user, filterData]);

  const fetchAllEvents = async () => {
    const allEvents = await eventService.index();
    setEvents(filterEvents(allEvents));
  };

  const handleSignout = () => {
    setFilterData(initialFilterData);
    authService.signout();
    setUser(null);
  };

  const handleSearch = (text) => {
    navigate("/");
    setFilterData({ ...filterData, title: text });
  };

  const handleAddEvent = async (eventFormData) => {
    const newEvent = await eventService.create(eventFormData);
    setEvents([...events, newEvent]);
    navigate("/events");
  };

  const handleUpdateEvent = async (eventFormData) => {
    const updatedEvent = await eventService.update(
      eventFormData._id,
      eventFormData
    );
    const updatedEventIndex = events.findIndex(
      (event) => event._id === eventFormData._id
    );

    const updatedEvents = [...events];
    updatedEvents[updatedEventIndex] = updatedEvent;
    setEvents(updatedEvents);

    navigate("/events/" + updatedEvent._id);
  };

  const handleEditEvent = async (eventId) => {
    navigate("/events/" + eventId + "/edit");
  };

  const handleDeleteEvent = async (eventId) => {
    await eventService.deleteEvent(eventId);
    const remainingEvents = events.filter((event) => event._id !== eventId);
    setEvents(remainingEvents);
    navigate("/events");
  };

  const filterEvents = (allEvents) => {
    if (filterData) {
      return allEvents.filter((event) => {
        if (
          filterData.title &&
          !event.title.toLowerCase().includes(filterData.title.toLowerCase())
        ) {
          return false;
        }

        if (filterData.category && event.category !== filterData.category) {
          return false;
        }

        if (filterData.type && event.type !== filterData.type) {
          return false;
        }

        if (filterData.onlyFree && event.cost > 0) {
          return false;
        }

        return true;
      });
    }
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar
          user={user}
          handleSignout={handleSignout}
          handleSearch={handleSearch}
          setUser={setUser}
        />
        <div
          className="d-flex justify-content-center"
          style={{ overflowX: "clip" }}
        >
          <div className="max-width w-100">
            <Routes>
              {user ? (
                <>
                  <Route path="/" element={<Navigate to="/events" />} />
                  <Route
                    path="/events"
                    element={
                      <div className="w-100 d-flex flex-column align-items-center">
                        <EventFilter
                          filterEvent={(filter) =>
                            setFilterData({ ...filterData, ...filter })
                          }
                          resetFilter={() => setFilterData(initialFilterData)}
                        />
                        <EventList events={events} />
                      </div>
                    }
                  />
                  <Route
                    path="/my-events"
                    element={
                      <EventList
                        events={events.filter(
                          (event) => event.organiser._id === user._id
                        )}
                      />
                    }
                  />
                  <Route
                    path="/events/:id"
                    element={
                      <EventDetails
                        handleDeleteEvent={handleDeleteEvent}
                        handleEditEvent={handleEditEvent}
                      />
                    }
                  />
                  <Route
                    path="/events/new"
                    element={<EventForm handleSubmit={handleAddEvent} />}
                  />
                  <Route
                    path="/events/:id/edit"
                    element={<EventForm handleSubmit={handleUpdateEvent} />}
                  />
                  <Route
                    path="*"
                    exact={true}
                    element={<Navigate to="/events" />}
                  />
                </>
              ) : (
                <Route path="/" element={<Landing events={events} />} />
              )}
              <Route
                path="/signup"
                element={<SignupForm setUser={setUser} />}
              />
              <Route
                path="/signin"
                element={<SigninForm setUser={setUser} />}
              />
              <Route path="*" exact={true} element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
