const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route  GET api/items
// @desc   GET all Items
// @access PUBLIC
router.get('/', (req, res) => {
    Item.find()
        .sort('-date')
        .then(item => {
            res.json(items);
        }).catch(err => {
            console.log("err: ", err);
        })
});

// @route  Post api/items
// @desc   Create an Item
// @access PUBLIC
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })

    newItem.save()
        .then(item => {
            res.json(item)
        })
        .catch(err => console.log(err))
});

// @route  Delete api/item
// @desc   Delete an Item
// @access PUBLIC
router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            item.remove().then(() => {
                res.json({
                    success: true,
                    message: `Item "${req.body.name}" was removed`
                });
            });
        })
        .catch(err => {
            res
                .status(404)
                .json({
                    success: false,
                    message: `Item ${req.params.id} not found`
                });
        });
});
module.exports = router;