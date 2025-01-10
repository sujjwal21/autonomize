import { Request, Response } from "express";
import axios from "axios";
import User from "../models/user";

// Add User
export const addUser = async (req: Request, res: Response) => {
  const { username } = req.body;

  try {
    let user = await User.findOne({ username, soft_deleted: false });

    if (!user) {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const data = response.data;

      user = new User({
        username: data.login,
        name: data.name,
        location: data.location,
        bio: data.bio,
        blog: data.blog,
        avatar_url: data.avatar_url,
        public_repos: data.public_repos,
        public_gists: data.public_gists,
        followers: data.followers,
        following: data.following,
      });

      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch or save user" });
  }
};

// Soft Delete a User
export const softDeleteUser = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { username, soft_deleted: false },
      { soft_deleted: true },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found or already deleted" });
    }

    res
      .status(200)
      .json({ message: `User ${username} soft deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: "Failed to soft delete user" });
  }
};

// Update User
export const updateUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  const updates = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { username, soft_deleted: false },
      updates,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found or deleted" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Search Users
export const searchUsers = async (req: Request, res: Response) => {
  const { username, location } = req.query;

  try {
    const query: any = { soft_deleted: false };
    if (username) query.username = { $regex: username, $options: "i" };
    if (location) query.location = { $regex: location, $options: "i" };

    const users = await User.find(query);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to search users" });
  }
};

// Get All Users Sorted
export const getSortedUsers = async (req: Request, res: Response) => {
  const { sortBy } = req.query;

  try {
    const validSortFields = [
      "public_repos",
      "public_gists",
      "followers",
      "following",
      "created_at",
    ];

    if (!sortBy || !validSortFields.includes(sortBy as string)) {
      return res.status(400).json({ error: "Invalid sort field" });
    }

    const users = await User.find({ soft_deleted: false }).sort({
      [sortBy as string]: 1,
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sorted users" });
  }
};

// Get All Users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ soft_deleted: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
