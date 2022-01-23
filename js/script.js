let elResult = document.querySelector(".movies-result");
let elList = document.querySelector(".movies__list");
let elSelect = document.querySelector(".select");
let elForm = document.querySelector(".form");
let elBookmark = document.querySelector(".booked-films");

elResult.textContent = movies.length;

const generateCategories = function (movies) {
  let uniqMovies = [];

  movies.forEach((movie) => {
    movie.categories.forEach((genre) => {
      if (!uniqMovies.includes(genre)) {
        uniqMovies.push(genre);
      }
    });
  });

  uniqMovies.forEach((genre) => {
    let newMoviesOpt = document.createElement("option");

    newMoviesOpt.value = genre;
    newMoviesOpt.textContent = genre;

    elSelect.appendChild(newMoviesOpt);
  });
};

let film = (movies) => {
  let bookedArray = [];

  for (let movie of movies) {
    // CREATE
    let newItem = document.createElement("li");
    let newCard = document.createElement("div");
    let newImage = document.createElement("img");
    let newCardBody = document.createElement("div");
    let newCardTitle = document.createElement("h5");
    let newCardDate = document.createElement("p");
    let newCardRating = document.createElement("p");
    let newCardText = document.createElement("p");
    let newCardBox = document.createElement("div");
    let newCardLink = document.createElement("a");
    let newCardButton = document.createElement("button");
    let newCardList = document.createElement("ul");

    movie.categories.forEach((genre) => {
      let newCardItem = document.createElement("li");

      newCardItem.textContent = genre;

      newCardList.appendChild(newCardItem);
    });

    newCardButton.dataset.btn = movie.imdbId;

    //   CLASS
    newItem.setAttribute("class", "movies__item");
    newCard.setAttribute("class", "card movies__card h-100");
    newImage.setAttribute("class", "card-img-top");
    newImage.setAttribute("src", movie.smallThumbnail);
    newCardBody.setAttribute("class", "card-body d-flex flex-column");
    newCardTitle.setAttribute("class", "card-title");
    newCardBox.setAttribute("class", "mt-auto d-flex justify-content-around");
    newCardLink.setAttribute("class", "btn btn-outline-primary mt-auto");
    newCardButton.setAttribute(
      "class",
      "btn btn-outline-success bookmark  mt-3"
    );
    newCardLink.setAttribute(
      "href",
      "https://www.youtube.com/watch?v=" + movie.youtubeId
    );

    //   TEXTCONTENT
    newCardTitle.textContent = movie.title;
    newCardDate.textContent = movie.year;
    newCardRating.textContent = movie.imdbRating;
    newCardText.textContent = movie.language;
    newCardLink.textContent = "Watch Trailer";
    newCardButton.textContent = "Bookmark";

    //   APPENDCHILD
    elList.appendChild(newItem);
    newItem.appendChild(newCard);
    newCard.appendChild(newImage);
    newCard.appendChild(newCardBody);
    newCardBody.appendChild(newCardTitle);
    newCardBody.appendChild(newCardDate);
    newCardBody.appendChild(newCardRating);
    newCardBody.appendChild(newCardText);
    newCardBody.appendChild(newCardBox);
    newCardBox.appendChild(newCardLink);
    newCardBox.appendChild(newCardButton);

    newCardBox.addEventListener("click", (evt) => {
      if (evt.target.matches(".bookmark")) {
        let bookBtnId = evt.target.dataset.btn;
        if (!bookedArray.includes(movie)) {
          if (movie.imdbId == bookBtnId) {
            bookedArray.push(movie);
          }
        }
      }
      elBookmark.innerHTML = "";
      renderBookmark(bookedArray, elBookmark);
    });
  }
  elBookmark.addEventListener("click", (evt) => {
    if (evt.target.matches(".btn-remove")) {
      let bookedFilmId = evt.target.dataset.idBookedItem;
      let bookedRemoveId = evt.target.dataset.idBookedRemove;
      const bookMarkIndex = bookedArray.findIndex(
        () => bookedFilmId == bookedRemoveId
      );
      bookedArray.splice(bookMarkIndex, 1);
      elBookmark.innerHTML = null;
      renderBookmark(bookedArray, elBookmark);
    }
  });
};

let renderBookmark = (bookedFilms, element) => {
  for (let bookmark of bookedFilms) {
    let newBookedItem = document.createElement("li");
    let newBookedRemoveBtn = document.createElement("button");

    newBookedRemoveBtn.setAttribute("class", "btn btn-danger mt-2 btn-remove");
    newBookedItem.setAttribute(
      "class",
      "list-group-item d-flex flex-column align-items-start"
    );
    newBookedItem.textContent = bookmark.title;

    newBookedItem.dataset.idBookedItem = bookmark.imdbId;
    newBookedRemoveBtn.dataset.idBookmarkRemove = bookmark.imdbId;

    newBookedRemoveBtn.textContent = "Remove";
    element.appendChild(newBookedItem);
    newBookedItem.appendChild(newBookedRemoveBtn);
  }
};

film(movies);

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  elList.innerHTML = null;
  let selectValue = elSelect.value;

  const filteredArray = movies.filter(
    (movie) =>
      movie.categories.includes(selectValue) || elSelect.value === "All"
  );

  film(filteredArray);

  elResult.textContent = filteredArray.length;
});

generateCategories(movies);
