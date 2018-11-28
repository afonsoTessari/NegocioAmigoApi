const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Poster = require('../models/poster');
const router = express.Router();

router.use(authMiddleware);
/*
router.get('/', async (req, res) => {
    try{
      
        
        const {page = 1 } = req.query;
        const posters = await Poster.paginate({}, { page, limit:10});


        return res.send(posters);
    } catch(err){
        return res.status(400).send({ error: 'Error loading new poster'});
    }
});*/

router.get('/', async (req, res) => {
    try{
      
        
        const { page, perPage } = req.query;
        const options = {
          page: parseInt(page, 30) || 1,
          limit: parseInt(perPage, 30) || 30,
          populate: 'user',
        };
        const posters = await Poster.paginate({}, options);
        return res.json(posters);


       // return res.send(posters); 
       
    } catch(err){
        return res.status(400).send({ error: 'Error loading new poster'});
    }
});

router.get('/:posterId', async (req, res) => {
    res.send({ user: req.userId});
});

router.post('/', async (req, res) => {
    
    try{
        const poster = await Poster.create({...req.body, user: req.userId});

        const posterPopulated = await Poster.findOne({_id: poster._id}).populate('user');

        return res.send({poster: posterPopulated});
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new poster'});
    }
});

router.put('/:posterId', async (req, res) => {
    
});

router.delete('/:posterId', async (req, res) => {
    try{
        await Poster.findByIdAndRemove(req.params.posterId);

        return res.send();
    } catch(err) {
        return res.status(400).send({ error: 'Error deleting poster'});
    }
});
module.exports = app => app.use('/projects', router);