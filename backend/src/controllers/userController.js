import { User } from '../models/user/user.model.js';

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-__v');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
