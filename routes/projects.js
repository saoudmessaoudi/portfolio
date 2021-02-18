const express = require('express')
const router = express.Router()
const Project = require('../models/project')


//Getting all projects
router.get('/', async (req, res) => {

    try{
            const projects = await Project.find()
            res.json(projects)
    } catch{
        res.status(500).json({message: err.message})
    }

})
//Getting one
router.get('/:id', getProject, (req, res) => {
    res.json(res.project)

})
//Creating one 
router.post('/', async (req, res) => {
  const project = new Project({
      title : req.body.title, 
      description : req.body.description, 
      type : req.body.type,
      publishedYear : req.body.publishedYear
  })

    try{
        const newProject = await project.save()
        res.status(201).json(newProject)
    } catch {
        res.status(400).json({message :err.message})
    }
    
})
//Updating one
router.patch('/:id', getProject, async (req, res) => {
    if(req.body.title != null) {
        res.project.title = req.body.title 
    }
    if(req.body.description != null) {
        res.project.description = req.body.description
    }
    if(req.body.type != null) {
        res.project.type = req.body.type
    }
    if(req.body.publishedYear != null) {
        res.project.publishedYear = req.body.publishedYear
    }
    try{
            const updatedProject = await res.project.save()
            res.json(updatedProject)
    } catch(err){
        res.status(400).json({message : err.message})
    }
})
//Deleting one
router.delete('/:id', getProject, async (req, res) => {
    try{
        await res.project.remove()
        res.json({message: 'Deleted project'})
    } catch(err){
        res.status(500).json({message : err.message})
    }
})

async function getProject(req, res, next) {
    try{
        project = await Project.findById(req.params.id)
        if(project == null) {
            return res.status(404).json({message : "Cannot find project"})
        }
    } catch(err) {
        return res.status(500).json({message : err.message})
    }
    res.project = project
    next()
}

module.exports = router