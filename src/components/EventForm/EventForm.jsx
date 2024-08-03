import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import * as eventService from "../../services/eventService";

const EventForm = (props) => {
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Art & Culture",
    type: "Online",
    cost: 0,
    address: "",
    capacity: 30,
    date: "",
    image: "",
  });

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "react-cloudinary");
    data.append("cloud_name", "ddp2alrop");
    return fetch("https://api.cloudinary.com/v1_1/ddp2alrop/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await eventService.show(id);
      console.log(eventData);
      console.log(eventData.date.substring(0,10));
      eventData.date = eventData.date.substring(0,10);
      setFormData(eventData);
    };
    if (id) fetchEvent();
  }, [id]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (image) {
        const data = await uploadImage(image);
        console.log("data.url", data.url);
        setFormData({ ...formData, image: data.url });
        formData.image = data.url;
      }
      // else {
      //   setImage("");
      // }
      formData._id = id;
      props.handleSubmit(formData); // might be add! might be update!
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="h-100 d-flex justify-content-center">
      <form onSubmit={handleSubmit} style={{ minWidth: "600px" }}>
        <div className="mb-3">
          <label htmlFor="title-input" className="form-label">
            Title
          </label>
          <input
            required
            type="text"
            className="form-control"
            id="title-input"
            name="title"
            placeholder="Event title"
            value={formData.title}
            onChange={handleChange}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="description-input" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            name="description"
            id="description-input"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description of the event"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="category-input" className="form-label">
            Category
          </label>
          <select
            required
            className="form-control form-select"
            name="category"
            id="category-input"
            value={formData.category}
            onChange={handleChange}
          >
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
        <div className="mb-3">
          <label htmlFor="cost-input" className="form-label">
            Cost
          </label>
          <input
            required
            className="form-control"
            type="number"
            name="cost"
            id="cost-input"
            value={formData.cost}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="capacity-input" className="form-label">
            Capacity
          </label>
          <input
            required
            className="form-control"
            type="number"
            name="capacity"
            id="capacity-input"
            value={formData.capacity}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address-input" className="form-label">
            Address
          </label>
          <input
            required
            type="text"
            name="address"
            id="address-input"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date-input" className="form-label">
            Date
          </label>
          <input
            required
            type="date"
            name="date"
            id="date-input"
            value={formData.date}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="type-input" className="form-label">
            Type
          </label>
          <select
            required
            className="form-control form-select"
            name="type"
            id="type-input"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Online">Online</option>
            <option value="In person">In person</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            onChange={handleImageChange}
            type="file"
            name="image"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary mb-3">
            {id ? "Update Event" : "Create event"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default EventForm;
