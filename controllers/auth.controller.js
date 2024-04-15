import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //Save user to database
    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });

    console.log(newUser);
};

export const login = (req, res) => {
    console.log("Logging in...");
};

export const logout = (req, res) => {
    console.log("Logging out...");
};