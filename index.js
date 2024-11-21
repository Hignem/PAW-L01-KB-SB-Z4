"use strict";

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
// define endpoint for exercise 1 here
app.get("/math/circle/:r", (req, res) => {
  const radius = parseFloat(req.params.r);

  if (isNaN(radius) || radius <= 0) {
    return res
      .status(400)
      .send({ error: "Proszę podać poprawny promień (liczba większa od 0)." });
  }

  const area = (Math.PI * Math.pow(radius, 2)).toFixed(2); // Obliczanie pola (π * r²)
  const circumference = (2 * Math.PI * radius).toFixed(2); // Obliczanie obwodu (2 * π * r)

  // Zwracanie wyników w formacie JSON
  res.send({
    area: area,
    circumference: circumference,
  });
});

//TODO2
app.get("/math/rectangle/:a/:b", (req, res) => {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);

  if (a <= 0 || b <= 0) {
    return res
      .status(400)
      .send({ error: "Proszę podać poprawne wymiary (liczby większe od 0)." });
  }

  const area = a * b;
  const perimeter = 2 * a + 2 * b;

  res.send({
    area: area,
    perimeter: perimeter,
  });
});

//TODO3
app.get("/math/power/:base/:exponent", (req, res) => {
  const base = parseFloat(req.params.base);
  const exponent = parseFloat(req.params.exponent);
  const root = req.query.root === "true";

  if (isNaN(base)) {
    return res.status(400).send({ error: "Base musi być liczbą." });
  }

  const powerResult = Math.pow(base, exponent).toFixed(2);
  if (root) {
    if (base < 0) {
      return res.status(400).send({
        error:
          "Pierwiastek kwadratowy nie jest zdefiniowany dla liczb ujemnych.",
      });
    }

    const sqrtResult = Math.sqrt(base).toFixed(2);
    return res.send({
      base: base,
      exponent: exponent,
      powerResult: powerResult,
      sqrtResult: sqrtResult,
    });
  }

  res.send({
    base: base,
    exponent: exponent,
    powerResult: powerResult,
  });
});

let categories = ["funnyJoke", "lameJoke"];

let funnyJoke = [
  {
    joke: "Dlaczego komputer poszedł do lekarza?",
    response: "Bo złapał wirusa!",
  },
  {
    joke: "Dlaczego komputer nie może być głodny?",
    response: "Bo ma pełen dysk!",
  },
  {
    joke: "Co mówi jeden bit do drugiego?",
    response: "„Trzymaj się, zaraz się przestawiamy!”",
  },
];

let lameJoke = [
  {
    joke: "Dlaczego programiści preferują noc?",
    response: "Bo w nocy jest mniej bugów do łapania!",
  },
  {
    joke: "Jak nazywa się bardzo szybki programista?",
    response: "Błyskawiczny kompilator!",
  },
];

const jokesMap = {
  funnyJoke: funnyJoke,
  lameJoke: lameJoke,
};

app.get("/jokebook/categories", (req, res) => {
  res.send({ categories });
});

app.get("/jokebook/joke/:category", (req, res) => {
  const category = req.params.category;

  if (!jokesMap[category]) {
    return res.status(404).send({ error: `no jokes for category ${category}` });
  }

  const jokes = jokesMap[category];
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

  res.send(randomJoke);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
