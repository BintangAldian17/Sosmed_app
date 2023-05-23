import Users from "../../models/UsersModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { Op } from "sequelize"

dotenv.config({ path: "./.env" })


export const findUser = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10
    const search = req.query.search || ""
    const totalRows = await Users.count({
        where: {
            username: { [Op.like]: `%${search}%` }
        }
    })
    const results = await Users.findAll({
        where: {
            username: { [Op.like]: `%${search}%` }
        },
        attributes: ['id', 'username', 'avatar'],
        limit: limit,
    })
    res.json({
        results: results,
        limit: limit,
        totalRows: totalRows
    })
}



export const Register = async (req, res) => {
    const { username, email, password, confPassword } = req.body;
    const findUserByEmail = await Users.findOne({ where: { email: email } })
    const findUserByName = await Users.findOne({ where: { username: username } })
    if (password !== confPassword) return res.status(400).json({ msg: "Password and confirm Password no match" })
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt)
    if (findUserByEmail && findUserByName) {
        return res.status(400).json({ msg: "Email and Name already exist" })
    }
    if (findUserByEmail) {
        return res.status(400).json({ msg: "Email already exist" })
    } if (findUserByName) {
        return res.status(400).json({ msg: "Name already exist" })
    } else {
        try {
            await Users.create({
                username: username,
                email: email,
                password: hashPassword
            });
            res.status(200).json({ msg: "Register sucsessfuly" })
        } catch (error) {
            console.log(error);
        }
    }
}


export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Users.findOne({ where: { username } });

        if (!user) {
            return res.status(404).json({ msg: 'Username not found' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ msg: 'Wrong password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY);

        res.cookie('accsessToken', token, {
            // secure: true,
            httpOnly: true,
            // sameSite: 'none',
            // domain: "https://sosmed-app-client.vercel.app",
            maxAge: 2 * 24 * 60 * 60 * 1000
        }).status(200).json({ id: user.id, username: user.username, email: user.email, avatar: user.avatar });
    } catch (error) {
        res.status(500).json({ msg: 'Server Error' });
    }
}

export const Logout = async (req, res) => {
    await res.clearCookie("accsessToken", {
        secure: true,
        sameSite: 'Strict',
        httpOnly: true
    }).status(200).json("User has been logged out")
}

