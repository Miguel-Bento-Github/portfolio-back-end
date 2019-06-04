const express = require("express");
const router = express.Router();
const ProjectModel = require("../models/project");

async function create(data) {
  return await ProjectModel.create(data);
}

async function getAll() {
  return await ProjectModel.find().limit(10);
}

async function updateOne(id, data) {
  return await ProjectModel.updateOne({ _id: id }, data);
}

async function deleteOne(id) {
  return await ProjectModel.deleteOne({ _id: id });
}

router.get("/", (req, res) => {
  getAll()
    .then(dbRes => res.status(200).send(dbRes))
    .catch(dbErr =>
      res.status(500).send({ message: "Database error", err: dbErr.message })
    );
});

router.post("/new", (req, res) => {
  create(req.body)
    .then(result => res.send(result))
    .catch(err =>
      res.status(500).send({ message: "Database error", err: err.message })
    );
});

router.put("/:id", (req, res) => {
  updateOne(req.params.id, req.body)
    .then(result => res.status(200).send(result))
    .catch(err =>
      res.status(500).send({ message: "Database error", err: err.message })
    );
});

router.delete("/:id", (req, res) => {
  deleteOne(req.params.id)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send({ message: "Database error", err }));
});

module.exports = { router, create, getAll, updateOne, deleteOne };
