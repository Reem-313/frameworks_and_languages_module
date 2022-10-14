const express = require('express')
const app = express()
const port = 8000
app.use(express.json())

//items= {1:["foo"], 2:["fee",],3: ["faa"]}
items=[{"id": 123, "name": "test", "notes": "some notes"}]
myItems=[]
deletedItem=[]

app.get('/', (req, res) => {
  res.status(200).send('<html><body>Your HTML text</body></html>')
})
  
app.get('/items', (req,res)=>{
  res.send(items)
  res.status(200).json(items)
})

app.get('/item/:id',(req,res, next)=>{
  myItems= items.filter(obj => obj.id === parseFloat(req.params.id))
  if (myItems.length ===0)
  {
    console.log("I didn't get my item")
    res.status(404).send("Item not found")
  }
  else
  {
    res.status(200).send(json(myItems))
    console.log("I got my item")
  }
  /*
  if (items.filter(obj=> obj.id===parseFloat(req.params.itemId)))
  {
  res.status(200).send(json(items.filter(obj=> obj.id===parseFloat(req.params.itemId))))
  console.log("I got my item")

  }
  else
  {
      console.log("I didn't got my item")
    res.status(404).send(json())

  }
  */
})
app.post('/item', (req,res)=>{
    items.push(req.body)
    res.status(201).json(items)
})

app.delete('/item/:id',(req,res)=>{
  deletedItem= items.filter(obj => obj.id === parseFloat(req.params.id))
  if (deletedItem.length===0)
  {
    res.status(404).json("Item not found")
    console.log("not Found")
  }
  else{
    items= items.filter(obj => obj.id !== parseFloat(req.params.id))
      res.status(204).json("OK")
      console.log(" found")
  }

/*
    if(items.filter(obj => obj.id === parseFloat(req.params.id)))
    {
      items= items.filter(obj => obj.id !== parseFloat(req.params.id))
      res.status(204).json("OK")
      console.log(" found")
    }
    else if (items.filter(obj => obj.id !== parseFloat(req.params.id)))
    {
      res.status(404).json("Item not found")
      console.log("not Found")
    }

  */
})
/*
app.all('*', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});
*/
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Docker container exit handler - https://github.com/nodejs/node/issues/4182
process.on('SIGINT', function() {process.exit()})