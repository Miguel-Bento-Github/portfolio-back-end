const express = require("express");
const router = express.Router();
const ProjectModel = require("../models/project");

const create = data => ProjectModel.create(data);
const getAll = () => ProjectModel.find();
const updateOne = id => ProjectModel.updateOne({ _id: id });
const deleteOne = id => ProjectModel.deleteOne({ _id: id });

router.get("/", (req, res) => {
  getAll()
    .then(dbRes => res.status(200).send(dbRes))
    .catch(dbErr => res.status(500).send({ message: "Database error", dbErr }));
});

router.post("/new", (req, res) => {
  create(req.body)
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ message: "Database error", err }));
});

router.put("/:id", (req, res) => {
  updateOne(req.param.id, req.body)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send({ message: "Database error", err }));
});

router.delete("/:id", (req, res) => {
  deleteOne(req.param.id)
    .then(result => res.status(200).send(result))
    .catch(err => res.status(500).send({ message: "Database error", err }));
});

module.exports = { router, create, getAll, updateOne, deleteOne };
