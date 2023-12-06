const express = require("express");
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require("../db");

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next();
});

tagsRouter.get("/", async (req, res) => {
  const tags = await getAllTags();

  res.send({ tags });
});

tagsRouter.get("/:tagName/posts", async (req, res, next) => {
  const { tagName } = req.params;
  try {
    const posts = await getPostsByTagName(tagName);

    // use this method to get posts by tag name from the db
    if (posts.length) {
      res.send({ posts });
    } else {
      next({
        name: "UNKNOWNTAGERROR",
        message: "Unable to find any tags by that name",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;