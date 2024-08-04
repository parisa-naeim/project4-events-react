import { useContext, useEffect, useState } from "react";
import { AuthedUserContext } from "../App";

const SearchBar = (props) => {
  const [text, setText] = useState("");

  const user = useContext(AuthedUserContext);

  useEffect(() => {
    setText("");
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSearch(text);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="container-fluid">
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control col-lg mx-3"
          type="search"
          placeholder="what event you are looking for?"
          aria-label="Search"
          value={text}
          onChange={handleChange}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
