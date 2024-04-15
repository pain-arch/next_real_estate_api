import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

      

        //Save user to database
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });


    

        res.status(201).json({ message: "User created successfully"});
    } catch (error) {
        res.status(500).json({ message: "Failed to create user" });
    }    
};



export const login = async (req, res) => {
    const { username, password } = req.body;

   

    try {
        
        // Check if the user exists
        const user = await prisma.user.findUnique({
            where:{username}
        })
        if (!user) res.status(401).json({ message: "Invalid credentials" });
        
        // Check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) res.status(401).json({ message: "Invalid credentials" });

        //generate cookie token and send it to the user
        // res.setHeader("Set-Cookie", "test=" + "myValue").json({ message: "Logged in" });  ---- Test purpose

        const age = 1000 * 60 * 60 * 24 * 7; // 1 week
        const token = jwt.sign({
            id: user.id,
        }, process.env.JWT_SECRET_KEY, { expiresIn: age });

        res.cookie("token", token, {
            httponly: true,
            secure: true,
            maxAge: age,
        }).status(200).json({ message: "Log in Successful" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to login" });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logged out" });
};