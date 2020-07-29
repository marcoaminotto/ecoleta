const buttonSearch = document.querySelector("#page-home main a");
const modal = document.querySelector("#modal");
const close = document.querySelector("#modal .header a");
const countrySelect = document.querySelector("select[name=country]");
const regionSelect = document.querySelector("select[name=region]");
const citySelect = document.querySelector("select[name=city]");
const countryOptions = document.querySelectorAll(
  "select[name=country] > option"
);

buttonSearch.addEventListener("click", () => {
  modal.classList.remove("hide");
});

close.addEventListener("click", () => {
  modal.classList.add("hide");
});

for (const option of countryOptions) {
  option.addEventListener("click", function (event) {
    const selectedOption = document.querySelector(
      "select[name=country] .selected"
    );
    selectedOption ? selectedOption.classList.remove("selected") : null;
    const option = event.target;
    option.classList.add("selected");
  });
}

countrySelect.addEventListener("change", (event) => {
  regionSelect.innerHTML = '<option value="">Select a region</option>';
  citySelect.innerHTML = '<option value="">Select a city</option>';
  regionSelect.disabled = true;
  citySelect.disabled = true;

  if (event.target.value) {
    fetch(`/create-point/${event.target.value}`, { method: "get" }).then(
      (response) => {
        response.json().then((regions) => {
          for (const data of regions) {
            regionSelect.innerHTML += `<option value="${data.region}">${data.region}</option>`;
          }
        });
        regionSelect.disabled = false;
      }
    );
  }
});

regionSelect.addEventListener("change", (event) => {
  citySelect.innerHTML = '<option value="">Select a city</option>';
  citySelect.disabled = true;

  const countrySelected = document.querySelector(
    "select[name=country] > .selected"
  ).value;

  if (countrySelected && event.target.value) {
    fetch(`/create-point/${countrySelected}/${event.target.value}`, {
      method: "get",
    }).then((response) => {
      response.json().then((cities) => {
        for (const data of cities) {
          citySelect.innerHTML += `<option value="${data.city}">${data.city}</option>`;
        }
      });
      citySelect.disabled = false;
    });
  }
});
