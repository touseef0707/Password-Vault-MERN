import bcrypt from 'bcryptjs';

// Define the number of salt rounds for hashing (10 is a reasonable default)
const saltRounds = 10;


const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw new Error('Error hashing password: ' + error.message);
    }
};

const comparePassword = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        throw new Error('Error comparing passwords: ' + error.message);
    }
};

export { hashPassword, comparePassword };
