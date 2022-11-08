import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const POSRT = 3005;

app.use(cors());
app.use(express.json());

app.get("/login", (req, res) => {
  res.send(`token - /login - POST`);
});

app.post("/login", (req, res) => {
  const user = req.body.user;
  const token = jwt.sign(user, "pepe", { expiresIn: "3m" });
  res.status(200).json({ token });
});

app.post("/pruebaDatos", (req, res) => {
  const token = req.headers["authorization"];

  jwt.verify(token, "pepe", (err, user) => {
    if (err) {
      res.status(403).json({ message: "No autorizado" });
    } else {
      console.log("Subiendo archivos");

      res.status(200).json({ message: "Exito", user });
    }
  });
});

app.listen(POSRT, () => {
  console.log(`Server running on port http://localhost:${POSRT}`);
});
