import jwt from 'jsonwebtoken';

const genererateTokenAndSetCookie = (userId, res) => {
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET, {
            expiresIn: '15d'
        })
        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prevents XSS cross-site scripting attacks
            sameSite: "strict", // prevents CSRF cross-site request forgery attacks
            secure: process.env.NODE_ENV !== 'development'
        })
    } catch (error) {
        console.log(error.message)
    }
}

export default genererateTokenAndSetCookie;