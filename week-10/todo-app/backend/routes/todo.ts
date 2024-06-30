const {Router} = require('express')
import zod from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma= new PrismaClient()

const createTodoBody=zod.object({
    title:zod.string(),
    description: zod.string(),
})

const editTodoBody=zod.object({
    title: zod.string(),
    description: zod.string(),
    done: zod.boolean()
})

const router=Router()

router.post('/create', async (req:any, res:any)=>{
    const {success} = createTodoBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
              message: "Incorrect inputs",
            });
          }
    const todo = await prisma.todo.create({
        data:{
            title:req.body.title,
            description:req.body.description,
            userId: req.body.userId
        }
    })
    res.status(200).json({message: 'item created', todo})
})

router.get('/', async (req:any, res: any)=>{
    const todos = await prisma.todo.findMany({
        where:{
            userId: req.body.userId
        }
    })
    return res.status(200).json({
      todos 
    })
})

router.post('/edit', async (req:any, res: any)=>{
    const {success} = editTodoBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
          message: "Incorrect inputs",
        });
      }
const todo = await prisma.todo.update({
    where:{
        userId: req.body.userId,
        id:req.body.todoId
    },
    data:{
        title:req.body.title,
        description:req.body.description,
        done:req.body.done
    }
})
return res.status(200).json({message: 'success', todo})
})

router.delete('/delete', async (req:any,res: any)=>{
    const todo = await prisma.todo.delete({
        where:{
            userId: req.body.userId,
            id: req.body.todoId
        }
    })
    return res.status(200).json({message: 'success'})
})

module.exports=router




