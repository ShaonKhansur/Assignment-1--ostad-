const getButton = document.getElementById("getButton");
const locationField = document.getElementById("locationField");

const updateWeatherData = (data) => {
  const cardTitle = document.querySelector(".card-title");
  const cardText = document.querySelector(".card-text");

  cardTitle.textContent = data.location.name;
  cardText.textContent = `Temperature: ${data.current.temp_c}°C`;
};

const displayErrorMessage = (message) => {
  const cardTitle = document.querySelector(".card-title");
  const cardText = document.querySelector(".card-text");

  cardTitle.textContent = "Error";
  cardText.textContent = message;
};

const getWeatherData = (location) => {
  try {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=5f4f2a081eca4cd2a85145341232106&q=${location}&aqi=no`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Location not found");
        }
      })
      .then((res) => updateWeatherData(res))
      .catch((err) => displayErrorMessage(err.message));
  } catch (err) {
    displayErrorMessage("An error occurred");
  }
};

getButton.addEventListener("click", () => {
  getWeatherData(locationField.value);
});

