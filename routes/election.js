const express = require("express");
const yup = require("yup");
const connection = require("../config/db");
const router = express.Router();

//Create Election
router.post("", async (req, res) => {
  const electionSchema = yup.object().shape({
    name: yup.string().required("Required"),
    class_name: yup.string().required("Required"),
    start_date: yup.date.string().required("Required"),
    end_date: yup.date.string().required("Required"),
  });

  const body = req.body;
  try {
    await electionSchema.validate(body);

    const { name, class_name, start_date, end_date } = body;
    connection.query(
      "INSERT INTO election (name,class,start_date,end_date,created_at) VALUES(?,?,?,?,?)",
      [name, class_name, start_date, end_date, new Date()],
      (err, result) => {
        if (err) return res.status(500).send("An error Occurred");
        console.log(result);
        return res
          .status(200)
          .json({ message: "Election Updated Succesfully" });
      }
    );
  } catch (e) {
    return res.status(400).json(e);
  }
});

//UPDATE ELECTION
router.put("", async (req, res) => {
  const electionSchema = yup.Object().shape({
    name: yup.string().required("Required"),
    class_name: yup.string().required("Required"),
    start_date: yup.date().required("Required"),
    end_date: yup.date().required("Required"),
  });

  const body = req.body;
  try {
    await electionSchema.validate(body);
    const { name, class_name, start_date, end_date } = body;

    connection.query(
      "UPDATE election SET name = ?, class_name = ?, start_date = ?,end_date = ? ",
      [name, class_name, start_date, end_date],
      (err, result) => {
        if (err) return res.status(500).send("An error occurred");
        console.log(result);
        return res
          .status(201)
          .json({ message: "Election Updated Successfully" });
      }
    );
  } catch (e) {
    return res.status(400).json(e);
  }
});

//SEARCH FOR ELECTION

router.get("/search", (req, res) => {
  const query = req.query.query;
  connection.query(
    `SELECT * FROM election WHERE class_name LIKE '%${query}%'`,
    (err, result) => {
      if (err) return res.status(200).json(result);
    }
  );
  

  //GET ELECTION

  router.get()

});

module.exports = router;
