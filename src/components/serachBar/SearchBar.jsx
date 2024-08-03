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
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={text}
          onChange={handleChange}
        />
        <button className="btn btn-outline-primary" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
