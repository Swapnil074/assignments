"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const signupBody = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string(),
    name: zod_1.default.string(),
});
const signinBody = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string(),
});
const router = Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        });
    }
    const userExists = yield prisma.user.findFirst({
        where: {
            username: req.body.username,
        },
    });
    if (userExists) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs",
        });
    }
    const user = yield prisma.user.create({
        data: {
            username: req.body.username,
            password: req.body.password,
            name: req.body.password,
        },
    });
    const userId = user.id;
    return res.status(200).json({
        userId,
    });
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs",
        });
    }
    const user = yield prisma.user.findFirst({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    });
    console.log(user);
    if (user)
        return res.status(200).json({ user });
    return res.status(411).json({
        message: 'Error while logging in'
    });
}));
module.exports = router;
