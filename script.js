const quoteList = document.getElementById("quoteList");
const searchInput = document.getElementById("searchInput");
const errorMessage = document.querySelector(".error-message");

const URL = "https://dummyjson.com/quotes";

let quotesContainer = [];

async function getQuotes(link = URL) {
  const response = await fetch(link);
  if (!response.ok) {
    return (errorMessage.innerHTML =
      "Error With Fetching Data Please check your internet");
  }

  const data = await response.json();
  quotesContainer = await data.quotes;
  displayData(quotesContainer);
}

function displayData(quotes) {
  quoteList.textContent = "";
  quotes.forEach((quoteObject) => {
    let li = document.createElement("li");
    li.textContent = quoteObject.quote;
    quoteList.appendChild(li);
  });
}

searchInput.addEventListener("input", () => {
  let value = searchInput.value;
  let quotes = quotesContainer.filter((el) => {
    return el.quote.includes(value);
  });

  displayData(quotes);
});

getQuotes();
