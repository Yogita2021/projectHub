const express = require("express");
const projectRouter = express.Router();
const { Projectlist } = require("../model/project.model");
// const { PlaylistMovieModel } = require("../model/playlistMovie.model");
const { authenticateUser, requireRole } = require("../middleware/auth");

// route for creating playlist

projectRouter.post(
  "/create",
  authenticateUser,
  requireRole(["Admin", "ProjectManager"]),
  async (req, res) => {
    try {
      const {
        name,
        description,
        startDate,
        endDate,
        projectManager,
        teamMembers,
      } = req.body;
      const ProjectList = new Projectlist({
        name,
        description,
        startDate,
        endDate,
        projectManager,
        teamMembers,
      });
      await ProjectList.save();
      res.status(200).json({
        isError: false,
        msg: "Projectlist created !",
        Projectlist: ProjectList,
      });
    } catch (error) {
      res.status(400).json({
        isError: true,
        message: error.message,
      });
    }
  }
);

projectRouter.get("/allProjects", async (req, res) => {
  try {
    const ProjectListData = await Projectlist.find();

    res.status(200).json({ isError: false, ProjectListData });
  } catch (error) {
    res.status(500).json({
      isError: true,
      message: "An error occurred while fetching playlists",
    });
  }
});
module.exports = { projectRouter };
