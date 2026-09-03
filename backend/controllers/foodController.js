import Food from '../models/Food.js';
import { getIsConnected } from '../config/db.js';
import { inMemoryDB } from '../config/store.js';

// @desc    Get all foods (optional search and category filter)
// @route   GET /api/foods
// @access  Public
export const getFoods = async (req, res) => {
  try {
    const { category, search } = req.query;

    if (getIsConnected()) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }

      const foods = await Food.find(query).sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: foods.length,
        data: foods,
      });
    } else {
      let foods = [...inMemoryDB.foods];

      if (category && category !== 'All') {
        foods = foods.filter((item) => item.category.toLowerCase() === category.toLowerCase());
      }
      if (search) {
        const queryTerm = search.toLowerCase();
        foods = foods.filter(
          (item) =>
            item.name.toLowerCase().includes(queryTerm) ||
            item.description.toLowerCase().includes(queryTerm)
        );
      }

      return res.json({
        success: true,
        count: foods.length,
        data: foods,
      });
    }
  } catch (error) {
    console.error('getFoods error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch foods',
    });
  }
};

// @desc    Get single food item by ID
// @route   GET /api/foods/:id
// @access  Public
export const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const food = await Food.findById(id);
      if (!food) {
        return res.status(404).json({
          success: false,
          message: 'Food item not found',
        });
      }
      return res.json({
        success: true,
        data: food,
      });
    } else {
      const food = inMemoryDB.foods.find((f) => f._id.toString() === id);
      if (!food) {
        return res.status(404).json({
          success: false,
          message: 'Food item not found',
        });
      }
      return res.json({
        success: true,
        data: food,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch food details',
    });
  }
};

// @desc    Create new food item
// @route   POST /api/foods
// @access  Private/Admin
export const createFood = async (req, res) => {
  try {
    const { name, description, category, price, image, rating, available } = req.body;

    if (!name || !description || !category || price === undefined || !image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: Name, Description, Category, Price, and Image',
      });
    }

    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice < 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid non-negative price',
      });
    }

    if (getIsConnected()) {
      const newFood = await Food.create({
        name: name.trim(),
        description: description.trim(),
        category,
        price: numPrice,
        image: image.trim(),
        rating: rating ? Number(rating) : 4.5,
        available: available !== undefined ? Boolean(available) : true,
      });

      return res.status(201).json({
        success: true,
        message: 'Food item created successfully',
        data: newFood,
      });
    } else {
      const newFood = {
        _id: 'food_' + Date.now(),
        name: name.trim(),
        description: description.trim(),
        category,
        price: numPrice,
        image: image.trim(),
        rating: rating ? Number(rating) : 4.5,
        available: available !== undefined ? Boolean(available) : true,
        createdAt: new Date(),
      };

      inMemoryDB.foods.unshift(newFood);

      return res.status(201).json({
        success: true,
        message: 'Food item created successfully',
        data: newFood,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create food item',
    });
  }
};

// @desc    Update food item
// @route   PUT /api/foods/:id
// @access  Private/Admin
export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, image, rating, available } = req.body;

    if (getIsConnected()) {
      const food = await Food.findById(id);
      if (!food) {
        return res.status(404).json({
          success: false,
          message: 'Food item not found',
        });
      }

      if (name) food.name = name.trim();
      if (description) food.description = description.trim();
      if (category) food.category = category;
      if (price !== undefined) food.price = Number(price);
      if (image) food.image = image.trim();
      if (rating !== undefined) food.rating = Number(rating);
      if (available !== undefined) food.available = Boolean(available);

      const updatedFood = await food.save();
      return res.json({
        success: true,
        message: 'Food item updated successfully',
        data: updatedFood,
      });
    } else {
      const index = inMemoryDB.foods.findIndex((f) => f._id.toString() === id);
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Food item not found',
        });
      }

      const food = inMemoryDB.foods[index];
      const updatedFood = {
        ...food,
        name: name !== undefined ? name.trim() : food.name,
        description: description !== undefined ? description.trim() : food.description,
        category: category !== undefined ? category : food.category,
        price: price !== undefined ? Number(price) : food.price,
        image: image !== undefined ? image.trim() : food.image,
        rating: rating !== undefined ? Number(rating) : food.rating,
        available: available !== undefined ? Boolean(available) : food.available,
      };

      inMemoryDB.foods[index] = updatedFood;

      return res.json({
        success: true,
        message: 'Food item updated successfully',
        data: updatedFood,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update food item',
    });
  }
};

// @desc    Delete food item
// @route   DELETE /api/foods/:id
// @access  Private/Admin
export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const food = await Food.findById(id);
      if (!food) {
        return res.status(404).json({
          success: false,
          message: 'Food item not found',
        });
      }
      await food.deleteOne();
      return res.json({
        success: true,
        message: 'Food item deleted successfully',
      });
    } else {
      const index = inMemoryDB.foods.findIndex((f) => f._id.toString() === id);
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Food item not found',
        });
      }
      inMemoryDB.foods.splice(index, 1);
      return res.json({
        success: true,
        message: 'Food item deleted successfully',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete food item',
    });
  }
};
