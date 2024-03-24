import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@jaikp/medium-common";

const blogRouter = new Hono<{
	Bindings : {
		DATABASE_URL : string
		JWT_SECRET : string
	},
	Variables : {
		userId : string
	}
}>();;

blogRouter.use('*', async (c, next) => {
    
	const jwt = c.req.header('Authorization');
	if(!jwt){
		c.status(401);
		return c.json({error : "unauthorized"});
	}

	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);

	if(!payload){
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id);
	await next();
})

blogRouter.post('/post', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate())
    console.log("helllo");
	const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message : "Inputs not correct"
        })
    }
    const blog = await prisma.post.create({
        data : {
            title : body.title,
            content : body.content,
            published : body.published,
            authorId : c.get('userId')

        }
    })
    return c.json({
        id : blog.id
    })
})

blogRouter.put('/update', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate())
	
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message : "Inputs not correct"
        })
    }
    const blog = await prisma.post.update({
        where : {
            id : body.id
        },
        data : {
            title : body.title,
            content : body.content,
            published : body.published
        }
    })
    return c.json({
        blog
    })
})

blogRouter.get('post/:id', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate())
    try{
        const id = c.req.param("id");
        const blog = await prisma.post.findFirst({
            where : {
                id : id
            },
            select : {
                id : true,
                title : true,
                content : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })
        return c.json({
            blog
        })
    }catch(e){
        c.status(411);
        return c.json({
            message : "error while fetching data"
        })
    }


})

blogRouter.get('/bulk', async (c) => {

	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate())

    const blogs = await prisma.post.findMany({
        select : {
            title : true,
            content : true,
            id : true,
            author : {
                select : {
                    name : true
                }
            }
        }
    })
    return c.json({
        blogs
    })

})

export default blogRouter;