function fetchCatFacts() {
  const response = fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=Phnom Penh&appid=bd4c0ce5ac1812b2567955d2a4fed394"
  );

  console.log(response);
  response
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching cat facts:", error);
    });
}
// function renderCatFacts(facts) {
//   let catFacts = document.getElementBuId("fact-text");
//   facts.map((fact) => {
//     const p = document.createElement("p");
//     p.setAttribute("id", "actual-fact");
//     p.innerHTML = fact.fact;
//     catFacts.appendChile(p);
//   });
// }
document.addEventListener("DOMContentLoaded", function () {
  fetchCatFacts();
});
let currentUnit = "metric";
setInterval(() => {
  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();
  document.getElementById("clock").textContent = `🕒 ${date} ${time}`;
}, 1000);
document.querySelectorAll('input[name="unit"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    currentUnit = e.target.value === "celsius" ? "metric" : "imperial";
    getWeather();
  });
});
function getWeather() {
  const city = document.getElementById("cityInput").value || "Phnom Penh";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd4c0ce5ac1812b2567955d2a4fed394&units=${currentUnit}`
  )
    .then((res) => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then((data) => {
      renderWeather(data);
    })
    .catch((error) => {
      alert("Error fetching weather. Please check the city name.");
      console.error("Fetch error:", error);
    });
}
function renderWeather(data) {
  document.getElementById(
    "location"
  ).textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById(
    "icon"
  ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById(
    "description"
  ).textContent = `Description: ${data.weather[0].description}`;
  document.getElementById("temperature").textContent = `Temperature: ${
    data.main.temp
  }°${currentUnit === "metric" ? "C" : "F"}`;
  document.getElementById("feels_like").textContent = `Feels Like: ${
    data.main.feels_like
  }°${currentUnit === "metric" ? "C" : "F"}`;
  document.getElementById(
    "humidity"
  ).textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById("wind").textContent = `Wind: ${data.wind.speed} ${
    currentUnit === "metric" ? "m/s" : "mph"
  }`;
}
document.addEventListener("DOMContentLoaded", () => {
  getWeather();
});
