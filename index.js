"use strict";

const express = require("express");
const app = express();

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
    // Jeśli root = true, oblicz również pierwiastek kwadratowy
    if (base < 0) {
      return res.status(400).send({
        error:
          "Pierwiastek kwadratowy nie jest zdefiniowany dla liczb ujemnych.",
      });
    }

    const sqrtResult = Math.sqrt(base).toFixed(2); // Oblicz pierwiastek kwadratowy
    return res.send({
      base: base,
      exponent: exponent,
      powerResult: powerResult,
      sqrtResult: sqrtResult,
    });
  }

  // Jeśli root = false, zwróć tylko wynik potęgowania
  res.send({
    base: base,
    exponent: exponent,
    powerResult: powerResult,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
