const express = require("express");
const { verifyToken } = require("../controllers/userController");
const {
  getAllVegetables,
  getVegetable,
  createVegetable,
  updateVegetable,
  deleteVegetable,
} = require("../controllers/vegetableController");

const router = express.Router();

router.route("/").get(getAllVegetables).post(createVegetable);
router
  .route("/:id")
  .get(getVegetable)
  .patch(updateVegetable)
  .delete(deleteVegetable);

module.exports = router;
