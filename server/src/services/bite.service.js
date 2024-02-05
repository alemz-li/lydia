import Bite from "../models/bite.model.js";
import User from "../models/user.model.js";

export const createBite = async (data, userId) => {
  const { title, language, code, description, isPublic } = data;

  const newBite = new Bite({
    title,
    language,
    code,
    description,
    isPublic,
    user: userId,
  });

  return await newBite.save();
};

export const getBites = async (startIndex = 1, limit = 10, userId) => {
  return await Bite.find({ user: userId }).limit(limit).skip(startIndex);
};

export const getPublicBites = async (startIndex = 1, limit = 10, username) => {
  const user = await User.findOne({ username });

  if (!user) throw { code: 404, message: ["No user found"] };

  return await Bite.find({ user: user._id, isPublic: true })
    .limit(limit)
    .skip(startIndex);
};

export const getBiteById = async (biteId, userId) => {
  const bite = await Bite.findById(biteId).populate("user").exec();
  if (!bite) throw { code: 404, message: ["Bite not found"] };

  if (bite.user._id.toHexString() !== userId)
    throw {
      code: 401,
      message: ["Bite does not belong to the current user"],
    };

  return bite;
};

export const getTotalBites = async (userId) => {
  return await Bite.countDocuments({ user: userId });
};

export const getTotalPublicBites = async (userId) => {
  return await Bite.countDocuments({ user: userId, isPublic: true });
};

export const updateBite = async (id, data) => {
  const bite = await Bite.findByIdAndUpdate(id, data);
  if (!bite) throw { code: 404, message: ["Bite not found"] };

  return bite;
};

export const deleteBite = async (id) => {
  const bite = await Bite.findByIdAndDelete(id);
  if (!bite) throw { code: 404, message: ["Bite not found"] };

  return bite;
};
