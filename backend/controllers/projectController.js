
const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch project' });
  }
};

exports.updateProject = async (req, res) => {
  const { name, code } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.name = name || project.name;
    project.code = code || project.code;
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update project' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    await project.remove();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project' });
  }
};
