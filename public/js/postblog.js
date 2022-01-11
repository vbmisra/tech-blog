console.log("on posting JS")

const form = document.querySelector("#postblog")

const deleteBtns = document.querySelectorAll(".deleteBtn")
const editBtns = document.querySelectorAll(".editBtn")

form.addEventListener("submit", (e)=> { 
  e.preventDefault();
  let title = form[0].value.trim()
  let content = form[1].value.trim()

  if(!title  || !content) return ;
  
  let blogEditId =form.getAttribute("data-id")
  if(blogEditId){

    fetch('/api/blog/editblog',{
      method:'PUT',
      body: JSON.stringify({title,content, id:blogEditId}),
      headers: { 'Content-Type': 'application/json' },
    }).then((res)=>res.json())
    .then((data)=>{
      document.location.replace('/dashboard');
    })

  } else { 
    fetch('/api/blog/createblog',{
      method:'POST',
      body: JSON.stringify({title,content}),
      headers: { 'Content-Type': 'application/json' },
    }).then((res)=>res.json())
    .then((data)=>{
      document.location.replace('/dashboard');
    })
  }
  form[0].value = ""
  form[1].value = ""
})

deleteBtns.forEach(btn => btn.addEventListener('click', (e)=> {
  let el = e.target.getAttribute("data-item")

  fetch('/api/blog/deleteblog',{
  method:'DELETE',
  body: JSON.stringify({blogId:el}),
  headers: { 'Content-Type': 'application/json' },
}).then((res)=>res.json())
.then((data)=>{
  document.location.replace('/dashboard');
})
}));

editBtns.forEach(btn => btn.addEventListener('click', (e)=> {
  let id = e.target.getAttribute("data-item")

  fetch(`/api/blog/getblog/${id}`).then((res)=>res.json())
.then((data)=>{
  form[0].value = data.title
  form[1].value = data.content
  form.setAttribute("data-id", id)
  form[2].textContent = "Edit Post"
})
}));