$(document).ready(function() {

  var quotes = [
    {
      quote: "When you give, at first you give from what you have, then, from a certain point, you give from what you are.",
      author: "Fr. Arsenie Boca",
      img:
    },
    {
      quote: "What is the man of today starving for? Love and meaning",
      author: "Fr. Nicolae Steinhardt",
      img:
    },
    {
      quote: "In the Mother of God we have in Heaven a mother's heart",
      author: "Fr. Dumitru Stăniloaie",
      img:
    },
    {
      quote: "We fast so that we feel hunger so that hunger becomes prayer, and through it, love for the Incarnate Word",
      author: "Nun Siluana Vlad",
      img:
    },
    {
      quote: "Love does not need many words. Love either is or isn't.",
      author: "Fr. Savatie Baștovoi",
      img:
    }
  ];

  $("#quote-button").on("click", function() {
      var index = Math.floor(Math.random() * quotes.length);
      console.log(index);
      var q = quotes[index];
      $("#quote-container").html(q.quote);
      $("#quote-author").html(q.author);
  });
});
