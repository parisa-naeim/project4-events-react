const BASE_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL + "/events";

const index = async () => {
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const show = async (id) => {
  try {
    const response = await fetch(BASE_URL + "/" + id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const create = async (newEvent) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const update = async (id, eventFormData) => {
  try {
    const response = await fetch(BASE_URL + "/" + id, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventFormData),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const deleteEvent = async (id) => {
  try {
    const response = await fetch(BASE_URL + "/" + id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const joinEvent = async (eventId) => {
  try {
    const response = await fetch(`${BASE_URL}/${eventId}/join`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const leaveEvent = async (eventId) => {
  try {
    const response = await fetch(`${BASE_URL}/${eventId}/leave`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    // return response.json();
  } catch (error) {
    console.error(error);
  }
};

const uploadImage = async (formData) => {
  try {
    console.log("trying to send formdata: ", formData);
    const response = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        // "Content-Type": "multipart/form-data",
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export {
  index,
  show,
  create,
  update,
  deleteEvent,
  joinEvent,
  leaveEvent,
  uploadImage,
};
