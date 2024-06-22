const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{model:Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({error: 'Error fetching categories'});
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryId = req.params.id;
    const categoryData = await Category.findByPk(categoryId, {
      include: [{model:Product}],
    });

    if (!categoryData) {
      res.status(404).json({error: 'Category not found '});
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({error: 'Server Error'});
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createdCategory = await Category.create(req.body);
  
    res.status(200).json(createdCategory);
  } catch (err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!updatedCategory) {
      res.status(400).json({ message: 'No category found' });
      return;
    }

    res.status(200).json(updatedCategory);
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(400).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  try {
    const deletedCategory = await Category.destroy({
     where: {
       id: req.params.id,
     },
    });
 
    if(!deletedCategory) {
     res.status(404).json({message: 'No category found'});
     return;
    }
 
    res.status(200).json(deletedCategory);
   } catch (err) {
     console.error('Error deleting category:', err);
     res.status(500).json(err);
   }
});

module.exports = router;
