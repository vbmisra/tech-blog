const router = require('express').Router();
const { Blog } = require('../../models');

router.post('/createblog', async (req,res)=> { 
  try { 
      
    let newBlog = { 
      ...req.body, 
      blogger_id: req.session.user_id
    }

    let newBlogData = await Blog.create(newBlog)
      res.json({ newBlogData, message: 'Blog Created!' });

} catch (err) {
  res.status(400).json(err);
}
})

router.delete('/deleteblog', async (req,res)=>{
    await Blog.destroy({
      where:{
        id: req.body.blogId,
      }
    })
    res.json({message:"Deleted"})
})

router.get('/getblog/:id', async (req,res)=>{
  let blogData= await Blog.findByPk(req.params.id)
  res.json(await blogData.get({plain:true}))
})

router.put('/editblog', async (req,res)=> { 
  try { 

    let updatedBlog = await Blog.update({
      title:req.body.title, 
      content: req.body.content
    }, {where:{id:req.body.id}})


      res.json({ newBlogData: updatedBlog, message: 'Blog Created!' });

} catch (err) {
  res.status(400).json(err);
}
})

module.exports = router