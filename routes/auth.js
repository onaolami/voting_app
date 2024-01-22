const express = require("express");
const yup = require("yup");
const router = express.Router();
const connection = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  const body = req.body;
  const userSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    class: yup.string().required("Class is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "password should not be less than  6")
      .max(10, "password should not be more than 10")
      .required("password is required"),
  });
  try {
    await validate.userSchema(body);
    connection.query(
      "SELECT COUNT (id) as count From users WHERE email = ?"[body.email],
      (err, result) => {
        console.log(err);
        if (err) return res.status(500).send("An error occurred");
        if (result[0].count !== 0) {
          return res.status(400).json({ message: "Email is already used" });
        }
        const hashedPassword = bcrypt.hashSync(body.password, 10);

        connection.query(
          "INSERT INTO user (name,class,email,password) VALUES (?,?,?)",
          [body.name, body.class, body.email, body.hashedPassword],
          (err, result) => {
            if (err) return res.status(500).send("An error Occured");

            return res
              .status(200)
              .json({ message: "User signed up successfully" });
          }
        );
      }
    );
  } catch (e) {
    return res.status(400).json
  }
});

module.exports = router;
