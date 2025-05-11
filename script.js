
    const quoteList = document.getElementById("quoteList");
    const searchInput = document.getElementById("searchInput");
    const errorMessage = document.getElementById("errorMessage");
  
    let quotes = [];
  
    fetch("https://dummyjson.com/quotes ")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        quotes = data.quotes; 
        displayQuotes(quotes); 
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
        errorMessage.textContent = "Failed to load quotes. Please try again later.";
      });
  
    function displayQuotes(quoteArray) {
      quoteList.innerHTML = "";
      if (quoteArray.length === 0) {
        quoteList.innerHTML = "<li>No matching quotes found.</li>";
        return;
      }
  
      quoteArray.forEach((quote) => {
        const li = document.createElement("li");
        li.textContent = `"${quote.quote}" — ${quote.author}`;
        quoteList.appendChild(li);
      });
    }
  
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredQuotes = quotes.filter((quoteItem) =>
        quoteItem.quote.toLowerCase().includes(searchTerm),
      );
      displayQuotes(filteredQuotes);
    });
