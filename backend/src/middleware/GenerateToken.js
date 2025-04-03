const jwt = require('jsonwebtoken');
const User = require('../users/user.model.js');

const  generateToken = async (userId) =>{
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        
        
        const token = await jwt.sign({ userId: user._id, role:user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Token generation failed');
    }
}

module.exports = generateToken;