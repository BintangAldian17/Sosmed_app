import Users from "../../models/UsersModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({ path: "./.env" })


export const getAllUser = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ["id", "username", "email"]
        })
        res.json(users)
    } catch (error) {
        res.status(400).json(error)
    }
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
        const user = await Users.findOne({
            where: {
                username: req.body.username
            }
        });
        const match = await bcrypt.compare(req.body.password, user.password)
        if (!match) return res.status(400).json({ msg: "wrong password" })

        const userId = user.id
        const email = user.email
        const username = user.username

        const token = jwt.sign({ id: userId, username: username }, process.env.SECRET_KEY)

        res.cookie("accsessToken", token, {
            secure: true,
            sameSite: 'none',
            httpOnly: true
        }).status(200).json({ id: userId, username: username, email: email })
    } catch (error) {
        res.status(404).json({ msg: "Username not found" })
    }
}

export const Logout = async (req, res) => {
    await res.clearCookie("accsessToken", {
        secure: true,
        sameSite: 'none',
        httpOnly: true
    }).status(200).json("User has been logged out")
}

