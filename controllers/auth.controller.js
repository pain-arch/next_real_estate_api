import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
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
        res.status(201).json({ message: "User created successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create user" });
    }    
};

export const login = (req, res) => {
    console.log("Logging in...");
};

export const logout = (req, res) => {
    console.log("Logging out...");
};