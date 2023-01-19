let cards = document.getElementById("cards");
let URL = `http://localhost:3000/students`;

// Add
let form = document.getElementById("form");
let nameInput = document.getElementById("nameInput");
let surnameInput = document.getElementById("surnameInput");
let ageInput = document.getElementById("ageInput");
let aboutInput = document.getElementById("aboutInput");
let imgInput = document.getElementById("imgInput");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target);

  let obj = {
    name: nameInput.value,
    surname: surnameInput.value,
    age: ageInput.value,
    about: aboutInput.value,
    img: imgInput.value,
  };

  if (
    !obj.name.trim() ||
    !obj.surname.trim() ||
    !obj.age.trim() ||
    !obj.about.trim() ||
    !obj.img.trim()
  ) {
    alert("Cannot be blank");
    return;
  }

  fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(obj),
  })
    .then((response) => response.json())
    .then((studentsData) => {
      cards.innerHTML += `
        <div class="card" style="width: 18rem;">
					<img class="card-img-top" src="${studentsData.img}" alt="Card image cap">
					<div class="card-body">
            <h4>${studentsData.name}</h4>
            <h5>${studentsData.surname}</h5>
            <h6>${studentsData.age}</h6>
						<p class="card-text">${studentsData.about}</p>
						<button class="btn edit" onclick="editCard(this)" data-bs-toggle="modal" data-bs-target="#form">Изменить</button>
						<button class="btn delete" id=${studentsData.id}>Удалить</button>
					</div>
				</div>
      `;
    });

  nameInput.value = "";
  surnameInput.value = "";
  ageInput.value = "";
  aboutInput.value = "";
  imgInput.value = "";
});

// Edit;
let edit = document.querySelectorAll("edit");

// Render
render();
async function render() {
  fetch(URL)
    .then((response) => response.json())
    .then((studentsData) =>
      studentsData.forEach(function (student) {
        // allBooks = bookData;
        cards.innerHTML += `
      <div class="card" style="width: 18rem;">
					<img class="card-img-top" src="${student.img}" alt="Card image cap">
					<div class="card-body">
						<h4 class="card-name">${student.name}</h4>
						<h5 class="card-surname">${student.surname}</h5>
						<h6 class="card-age">${student.age}</h6>
						<p class="card-text">${student.about}</p>
						<button class="btn edit" onclick="editCard(this)" data-bs-toggle="modal" data-bs-target="#form">Изменить</button>
						<button class="btn delete" id="${student.id}">Удалить</button>
					</div>
			</div>
      `;
      })
    );
}

// Delete
// let deleteCard = (e) => {
//   // let selectedCard = e.parentElement.parentElement;

//   // fetch(`${URL}/${e.id}`, {
//   //   method: "DELETE",
//   //   headers: {
//   //     "Content-Type": "application/json; charset=utf-8",
//   //   },
//   // }).then((response) => response.json());
//   // selectedCard.remove();

//   if (e.target.classList.contains("deleteCard")) {
//     let id = e.target.id;
//     fetch(`${URL}/${id}`, {
//       method: "DELETE",
//     }).then(() => render());
//   }
// };

// Delete from DB
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let id = e.target.id;
    fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
  }
});

// Edit
let editCard = (e) => {
  let selectedCard = e.parentElement;

  nameInput.value = selectedCard.children[0].innerHTML;
  surnameInput.value = selectedCard.children[1].innerHTML;
  ageInput.value = selectedCard.children[2].innerHTML;
  aboutInput.value = selectedCard.children[3].innerHTML;
  imgInput.value = selectedCard.children[4].innerHTML;

  deleteCard(e);
};

fetch(`${URL}`)
  .then((response) => response.json())
  .then((studentsData) => console.log(studentsData));
