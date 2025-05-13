const quoteList = document.getElementById("quoteList");
const searchInput = document.getElementById("searchInput");
const errorMessage = document.querySelector(".error-message");

const URL = "https://dummyjson.com/quotes";

let quotesContainer = [];

async function getQuotes(link = URL) {
  try {
    const response = await fetch(link);
    if (!response.ok) {
      throw new Error(`HTTP error:${response.status}`);
    }
    const data = await response.json();
    quotesContainer = await data.quotes;
    displayData(quotesContainer);
  } catch (err) {
    errorMessage.textContent =
      "Error fetching data. Please check your internet connection.";
  }
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
    let value = searchInput.value.toLowerCase(); 
    let quotes = quotesContainer.filter((el) => {
      return el.quote.toLowerCase().includes(value);
    });
  
    displayData(quotes);
  });

getQuotes();
