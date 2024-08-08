import EventList from "../EventList/EventList";

const Landing = (props) => {
  return (
    <main className="landing-main">
      <h1 className="text-brown">Welcome to our Events community</h1>
      <p className="mt-1 mb-5" style={{ fontSize: "1.5rem" }}>
        Join us to connect with like-minded individuals, explore new interests,
        and share your passions. Whether you're looking to learn something new,
        meet new friends, or network with professionals, our diverse range of
        events and activities has something for everyone.
      </p>
      <EventList events={props.events} />
    </main>
  );
};

export default Landing;
