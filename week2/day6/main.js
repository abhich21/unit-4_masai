const express=require('express');
const mongoose=require('mongoose');

const app=express();

app.use(express.json());

// step 1 :- connect to mongodb
// const connect= ()=>{
//     return mongoose.connect(
//         "mongodb+srv://abhi:abhi_123@cluster0.xmkb8.mongodb.net/unit4?retryWrites=true&w=majority"
//     );
// };


mongoose.connect("mongodb+srv://abhi:abhi_123@cluster0.6ggju.mongodb.net/unit4?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("error", err => {
  console.log("Connection Error", err);
});
mongoose.connection.on("connected", (err, res) => {
    console.log("Connected successfully to Mongoose.");
});


// step 2 :- create a schema

const sectionSchema= new mongoose.Schema(
    {
        name:{ type: String, required: true, unique: true},
        author_ids:[{ type: mongoose.Schema.Types.ObjectId, ref: "author"}],
    },
    {
        versionKey: false, // removed __v
        timestamps: true, // createdAt, updatedAt
    }
);

// step 3 :- create a model

const Section = mongoose.model("section", sectionSchema);

// relation section to books:- 1 to many
//foreign keys

// ------------------ BOOKS MODEL ----------------------------------------------------


// schema of books
const bookSchema= new mongoose.Schema(
    {
       name: { type: String, required: true},
       body: { type: String, required: true},
       section_id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "section"
       },
       author_ids:[{ type: mongoose.Schema.Types.ObjectId, ref: "author"}],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

// model of books

const Book= mongoose.model("book", bookSchema)

// ------------------ AUTHOR MODEL ----------------------------------------------------

// schema of author
const authorSchema= new mongoose.Schema(
    {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true}
    },
    {
        versionKey: false,
        timestamps: true,
    }
); 
// model of author
const Author= mongoose.model("author", authorSchema);

/*
  work with section collection
  GET => get /section
  POST => post /section
  GET SINGLE ITEM => get /section/:id
  UPDATE SINGLE ITEM => patch /section/:id
  DELETE SINGLE ITEM => delete /section/:id
*/

// ----------------------------- SECTIONS CRUD -----------------------------------

app.post("/sections", async (req,res)=>{
    try{
        const section = await Section.create(req.body);

        return res.status(201).send(section);
    }catch (err) {
        return res.status(500).send(err.message);
      }
});


app.get("/sections", async (req,res)=>{
    try{
        const sections= await Section.find()
        .populate({ path: 'author_ids', select:['first_name',"last_name"]})
        .lean().exec();



        return res.send(sections);

    }catch (err) {
        return res.status(500).send(err.message);
      }
});

app.get("/sections/:id", async (req,res)=>{
    try{
        const section = await Section.find(req.params.id).lean().exec();

        return res.status(201).send(section);
    }catch (err) {
        return res.status(500).send(err.message);
      }
});

app.patch("/sections/:id", async (req,res)=>{
    try{
        const section = await Section.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
        }).lean().exec();

        return res.status(201).send(section);
    }catch (err) {
        return res.status(500).send(err.message);
      }
});

app.delete("/sections/:id", async (req,res)=>{
    try{
        const section = await Section.findByIdAndDelete(req.params.id).lean().exec();

        return res.send(section);
    }catch (err) {
        return res.status(500).send(err.message);
      }
});

/*
  work with books collection
  GET => get /books
  POST => post /books
  GET SINGLE ITEM => get /books/:id
  UPDATE SINGLE ITEM => patch /books/:id
  DELETE SINGLE ITEM => delete /books/:id
*/

// ----------------------------- BOOKS CRUD -----------------------------------
app.post("/books", async (req,res)=>{
    try{

        const book= await Book.create(req.body);

        return res.status(201).send(book)

    }catch (err) {
        return res.status(500).send(err.message);
      }
});
app.get("/books",async(req,res)=>{
    try{
        const books= await Book.find().populate({path:"section_id", select: "name"})
        .populate({path: "author_ids", select:["first_name","last_name"]}).lean().exec();

        return res.status(201).send(books)
    }catch (err) {
        return res.status(500).send(err.message);
      }
});

app.get("/books/:id", async (req,res)=>{
    try{
        const book= await Book.findById(req.params.id).populate({ path:"section_id",select:"name"})
        .populate({path:"author_ids", select:["first_name","last_name"]})
        .lean().exec();

        return res.status(201).send(book);
    }catch (err) {
        return res.status(500).send(err.message);
      }
});

app.patch("/books/:id", async (req,res)=>{
    try{
        const book= await Book.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
        }).populate({path: "section_id", select:"name"})
        .populate({path: "author_ids", select:["first_name","last_name"]})

        return res.status(201).send(book);
    }catch (err) {
        return res.status(500).send(err.message);
      }

});

app.delete("/books/:id", async (req,res)=>{
    try{
        const book= await Book.findByIdAndDelete(req.params.id).lean().exec();

        return res.send(book)
    }catch (err) {
        return res.status(500).send(err.message);
      }
});


/*
  work with author collection
  GET => get /author
  POST => post /author
  GET SINGLE ITEM => get /author/:id
  UPDATE SINGLE ITEM => patch /author/:id
  DELETE SINGLE ITEM => delete /author/:id
*/

// ----------------------------- AUTHOR CRUD -----------------------------------

app.post("/author", async(req,res)=>{
    try{
        const author= await Author.create(req.body);

        return res.status(201).send(author);
    }catch (err) {
        return res.status(500).send(err.message);
      }
})

app.get("/author", async(req,res)=>{
    try{
        const authors= await Author.find().lean().exec();

        res.status(201).send(authors);
    }catch (err) {
        return res.status(500).send(err.message);
      }
});

app.get("/author/:id", async (req,res)=>{
    try{
        const author= await Author.find(req.params.id).lean().exec();

        return res.status(201).send(author);
    }catch (err) {
        return res.status(500).send(err.message);
      }
});

app.patch("/author/:id", async(req,res)=>{
    try{
        const author= await Author.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
        })
        
        return res.status(201).send(author);
    }catch (err) {
        return res.status(500).send(err.message);
      }
});

app.delete("/author/:id", async(req,res)=>{
    try{
        const author= await Author.findByIdAndDelete(req.params.id);

        res.send(author);
    }catch (err) {
        return res.status(500).send(err.message);
      }
});

app.listen(2345, function(){
    console.log('listening on port 2345')
})
