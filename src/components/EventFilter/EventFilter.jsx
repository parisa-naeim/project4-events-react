import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";

const initialFilterData = {
  category: "",
  type: "",
  onlyFree: false,
};

const EventFilter = (props) => {
  const [filterData, setFilterData] = useState(initialFilterData);

  useEffect(() => {
    props.filterEvent(filterData);
  }, [filterData]);

  const handleChange = (event) => {
    if (event.target.name === "onlyFree") {
      setFilterData({
        ...filterData,
        [event.target.name]: !filterData.onlyFree,
      });
    } else {
      setFilterData({ ...filterData, [event.target.name]: event.target.value });
    }
  };

  return (
    <div className="nav d-flex gap-5 mb-4">
      <div className="d-flex align-items-center gap-3">
        <label htmlFor="category-input" className="form-label">
          Category
        </label>
        <select
          className="form-control form-select"
          name="category"
          id="category-input"
          value={filterData.category}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="Science & Education">Science & Education</option>
          <option value="Technology">Technology</option>
          <option value="Health & Wellbeing">Health & Wellbeing</option>
          <option value="Art & Culture">Art & Culture</option>
          <option value="Career & Business">Career & Business</option>
          <option value="Sports & Fitness">Sports & Fitness</option>
          <option value="Travel & Outdoor">Travel & Outdoor</option>
          <option value="Social Activities">Social Activities</option>
        </select>
      </div>
      <div className="d-flex align-items-center gap-3">
        <label htmlFor="type-input" className="form-label">
          Type
        </label>
        <select
          className="form-control form-select"
          name="type"
          id="type-input"
          value={filterData.type}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="Online">Online</option>
          <option value="In person">In person</option>
        </select>
      </div>
      <div className="d-flex align-items-center gap-3">
        <div class="form-check form-switch">
          <input
            role="button"
            className="form-check-input"
            type="checkbox"
            id="only-free-input"
            name="onlyFree"
            checked={filterData.onlyFree}
            onChange={handleChange}
          ></input>
          <label className="form-check-label" htmlFor="only-free-input">
            Show free events only
          </label>
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
