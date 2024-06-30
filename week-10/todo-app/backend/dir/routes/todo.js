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
const { Router } = require('express');
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTodoBody = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
});
const editTodoBody = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    done: zod_1.default.boolean()
});
const router = Router();
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = createTodoBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs",
        });
    }
    const todo = yield prisma.todo.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            userId: req.body.userId
        }
    });
    res.status(200).json({ message: 'item created', todo });
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield prisma.todo.findMany({
        where: {
            userId: req.body.userId
        }
    });
    return res.status(200).json({
        todos
    });
}));
router.post('/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = editTodoBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs",
        });
    }
    const todo = yield prisma.todo.update({
        where: {
            userId: req.body.userId,
            id: req.body.todoId
        },
        data: {
            title: req.body.title,
            description: req.body.description,
            done: req.body.done
        }
    });
    return res.status(200).json({ message: 'success', todo });
}));
router.delete('/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = yield prisma.todo.delete({
        where: {
            userId: req.body.userId,
            id: req.body.todoId
        }
    });
    return res.status(200).json({ message: 'success' });
}));
module.exports = router;
