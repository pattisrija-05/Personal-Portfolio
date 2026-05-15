const Project = require('../models/Project');

function normalizeProjectInput(body) {
  return {
    title: body.title,
    description: body.description,
    imageUrl: body.imageUrl,
    techStack: Array.isArray(body.techStack)
      ? body.techStack
      : String(body.techStack || '')
          .split(',')
          .map((tech) => tech.trim())
          .filter(Boolean),
    githubUrl: body.githubUrl,
    liveUrl: body.liveUrl || '',
    featured: Boolean(body.featured)
  };
}

async function getProjects(_req, res, next) {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
}

async function createProject(req, res, next) {
  try {
    const project = await Project.create(normalizeProjectInput(req.body));
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
}

async function updateProject(req, res, next) {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      normalizeProjectInput(req.body),
      { new: true, runValidators: true }
    );

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
}

async function deleteProject(req, res, next) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    res.json({ message: 'Project deleted' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject
};
