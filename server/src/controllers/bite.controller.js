import * as biteService from "../services/bite.service.js";

export const createBite = async (req, res) => {
  try {
    const bite = await biteService.createBite(req.body, req.userId);

    res.json(bite);
  } catch (error) {
    const code = error.code || 500;
    res.status(code).json({ message: error.message });
  }
};

export const getBites = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const bites = await biteService.getBites(startIndex, limit, req.userId);

    const totalDocuments = await biteService.getTotalBites(req.userId);
    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).json({
      bites,
      info: {
        total: totalDocuments,
        pages: totalPages,
        hasNextPage: endIndex < totalDocuments,
        hasPreviousPage: startIndex > 0,
        limit,
      },
    });
  } catch (error) {
    const code = error.code || 500;
    res.status(code).json({ message: error.message });
  }
};

export const getUserPublicBites = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const bites = await biteService.getPublicBites(
      startIndex,
      limit,
      req.params.username,
    );

    const totalDocuments = await biteService.getTotalPublicBites(bites[0].user);
    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).json({
      bites,
      info: {
        total: totalDocuments,
        pages: totalPages,
        hasNextPage: endIndex < totalDocuments,
        hasPreviousPage: startIndex > 0,
        limit,
      },
    });
  } catch (error) {
    const code = error.code || 500;
    res.status(code).json({ message: error.message });
  }
};

export const getBite = async (req, res) => {
  try {
    const bite = await biteService.getBiteById(req.params.id, req.userId);
    res.json(bite);
  } catch (error) {
    const code = error.code || 500;
    res.status(code).json({ message: error.message });
  }
};

export const updatebite = async (req, res) => {
  try {
    const bite = await biteService.updateBite(req.params.id, req.body);
    res.json(bite);
  } catch (error) {
    const code = error.code || 500;
    res.status(code).json({ message: error.message });
  }
};

export const deleteBite = async (req, res) => {
  try {
    const bite = await biteService.deleteBite(req.params.id);
    res.json(bite);
  } catch (error) {
    const code = error.code || 500;
    res.status(code).json({ message: error.message });
  }
};
