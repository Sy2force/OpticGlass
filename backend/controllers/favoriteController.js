import User from '../models/User.js';
import Product from '../models/Product.js';

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');

    res.status(200).json({
      success: true,
      data: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addToFavorites = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Produit non trouvé',
      });
    }

    const user = await User.findById(req.user._id);

    if (user.favorites.includes(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Produit déjà dans les favoris',
      });
    }

    user.favorites.push(productId);
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Produit ajouté aux favoris',
      data: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    if (!user.favorites.includes(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Produit non trouvé dans les favoris',
      });
    }

    user.favorites = user.favorites.filter(
      (fav) => fav.toString() !== productId
    );
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Produit retiré des favoris',
      data: user.favorites,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
