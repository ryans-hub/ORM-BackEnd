const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        { model: Product, through:ProductTag, as: 'tagged_products' },
      ]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    const tagId = req.params.id;
    const tagData = await Tag.findByPk(tagId, {
      include: [
        {model: Product, through: ProductTag, as: 'tagged_products'},
      ]
    });

    if (!tagData) {
      res.status(404).json({ error: 'Tag not found' });
    }
  
    res.status(200).json(tagData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error'});
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedTag) {
      res.status(400).json({ message: 'No tag found' });
      return;
    }

    res.status(200).json(updatedTag);
  } catch (err) {
    console.error('Error updating tag:', err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
   const tagData = await Tag.destroy({
    where: {
      id: req.params.id,
    },
   });

   if(!tagData) {
    res.status(404).json({message: 'No tag found'});
    return;
   }

   res.status(200).json(tagData);
  } catch (err) {
    console.error('Error deleting tag:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
