import { Router } from "express";
import {
  addUser,
  getUsers,
  softDeleteUser,
  updateUser,
  searchUsers,
  getSortedUsers
} from "../controllers/userController";

const router = Router();

router.post("/", addUser);
router.get("/", getUsers);
router.get("/search", searchUsers);
// router.get('/sorted', getSortedUsers);
// router.patch("/:username", updateUser);
// router.delete("/:username", softDeleteUser);

export default router;
