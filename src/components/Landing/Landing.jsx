import EventList from "../EventList/EventList";

const Landing = (props) => {
  return (
    <main className="landing-main">
      <h1 style={{ color: "#1697E8" }}>Welcome to our Events community</h1>
      <h3 className="mt-1 mb-5">
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
