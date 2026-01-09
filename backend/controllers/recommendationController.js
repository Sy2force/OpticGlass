import Recommendation from '../models/Recommendation.js';

export const getAllRecommendations = async (req, res) => {
  try {
    const { category, isActive } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    
    const recommendations = await Recommendation.find(filter)
      .populate('products', 'name price images brand')
      .populate('createdBy', 'name email')
      .sort({ priority: -1, createdAt: -1 });
    
    res.json({
      success: true,
      count: recommendations.length,
      data: recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des recommandations',
      error: error.message
    });
  }
};

export const getRecommendationById = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id)
      .populate('products', 'name price images brand description')
      .populate('createdBy', 'name email');
    
    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommandation non trouvée'
      });
    }
    
    res.json({
      success: true,
      data: recommendation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la recommandation',
      error: error.message
    });
  }
};

export const createRecommendation = async (req, res) => {
  try {
    const recommendationData = {
      ...req.body,
      createdBy: req.user.id
    };
    
    const recommendation = await Recommendation.create(recommendationData);
    
    const populatedRecommendation = await Recommendation.findById(recommendation._id)
      .populate('products', 'name price images brand')
      .populate('createdBy', 'name email');
    
    res.status(201).json({
      success: true,
      message: 'Recommandation créée avec succès',
      data: populatedRecommendation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la création de la recommandation',
      error: error.message
    });
  }
};

export const updateRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('products', 'name price images brand')
      .populate('createdBy', 'name email');
    
    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommandation non trouvée'
      });
    }
    
    res.json({
      success: true,
      message: 'Recommandation mise à jour avec succès',
      data: recommendation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la recommandation',
      error: error.message
    });
  }
};

export const deleteRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findByIdAndDelete(req.params.id);
    
    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: 'Recommandation non trouvée'
      });
    }
    
    res.json({
      success: true,
      message: 'Recommandation supprimée avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la recommandation',
      error: error.message
    });
  }
};

export const getActiveRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find({ isActive: true })
      .populate('products', 'name price images brand')
      .sort({ priority: -1, createdAt: -1 })
      .limit(10);
    
    res.json({
      success: true,
      count: recommendations.length,
      data: recommendations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des recommandations actives',
      error: error.message
    });
  }
};
