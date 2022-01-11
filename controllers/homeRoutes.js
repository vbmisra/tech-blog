const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    let logged_in = req.session.logged_in

    let data = await Blog.findAll({
      include:[
        {model: User, as :"user"}
      ]
    })

    let serializedData = data.map(blog=> blog.get({plain:true}))

   res.render("blog", {data:serializedData, logged_in})
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/newuser', (req,res)=>{
  console.log("kjshdkjshd")
  res.render('newAccount')
})

router.get('/dashboard', withAuth, async (req, res)=>{ 

 let userBlogs = await Blog.findAll({where:{blogger_id:req.session.user_id},include:[
  {model: User, as :"user"}
]})

 let serializedData = userBlogs.map(blog=> {
   let obj = blog.get({plain:true})
   return { ...obj, canDelete:true}
  })

  res.render("dashboard", {logged_in: req.session.logged_in, blogs: serializedData})
})
module.exports = router;
