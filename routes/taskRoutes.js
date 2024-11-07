
const express = require("express");
const router = express.Router(); // Create a new router

const { getAllTasks,
        createTasks,
        getSingleTasks,
        updateTasks,
        deleteTask } = require("../controllers/tasks"); // Import all the functions from contraller/tasks.js

router.get("/", getAllTasks);
router.post("/", createTasks);
router.get("/:id", getSingleTasks);
router.patch("/:id", updateTasks);
router.delete("/:id", deleteTask);

module.exports = router;
