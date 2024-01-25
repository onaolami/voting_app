const express = require("express");
const yup = require("yup");
const connection = require("../config/db");
const router = express.Router();

//Create Candidate

router.post("", async (req, res) => {
  const voteSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    post: yup.string().required("Post is required"),
    election_id: yup.number().required("election_id is required"),
  });

  const body = req.body;
  try {
    await voteSchema.validate(body);
    const { name, post, election_id } = body;

    connection.query(
      "INSERT INTO candidate (name,post,election_id) VALUES(?,?,?)",
      [name, post, election_id],
      (err, result) => {
        if (err) return res.status(500).send("An error occured");
        console.log(result);
        return res
          .status(201)
          .json({ message: "Candidate updated successfully" });
      }
    );
  } catch (e) {
    return res.status(401).json(e);
  }
});
//update candidate

router.put("", async (req, res) => {
  const voteSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    post: yup.string().required("Post is required"),
    election_id: yup.number().required("Election_id is required"),
  });

  const body = req.body;
  try {
    await voteSchema.validate(body);

    const { name, post, election_id } = body;
    connection.query(
      "UPDATE candidate SET name = ?, post = ?, election_id = ?",
      [name, post, election_id],
      (err, result) => {
        if (err) return res.status(500).send("An Error Occured");
        console.log(result);
        return res
          .status(201)
          .json({ message: "Candidate updated successfully" });
      }
    );
  } catch (e) {
    
    return res.status(401).json(e);
  }
});

//Search for candidate
router.get("/search",(req, res) => {
  const query = req.query.query;
  connection.query(
    `SELECT * FROM candidate WHERE post LIKE '%${query}%'`,
    (err, result) => {
      return res.status(200).json(result);
    }
  );
});

//GET candidate
router.get("/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * FROM candidate WHERE id = ?",
    [id],
    (err, result) => {
      console.log(err)
      if (err) return res.status(500).send("An error occured");
      if (result.length === 0) {
        return res.status(404).json({ message: "Candidate not found" });
      } else {
        return res.status(200).json(result);
      }
    }
  );
});

//DELETE CANDIDATE

router.delete("/:id", (req, res) => {
  connection.query("DELETE candidate WHERE id = ?,"[id], (err, result) => {
    return res.status(200).json("Candidate deleted successfully");
  });
});



module.exports = router;
