const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/ttchannel"

//connection creation and creating new db
const connectToMongo = () => {
    mongoose.connect(URI , () => {
        console.log("connection successfull...");
    })
}

const playlistSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    ctype : String,
    videos: Number,
    author: String,
    active: Boolean,
    date:{
        type:Date,
        default: Date.now
    }
})
// collection creation
const Playlist = new mongoose.model("Playlist",playlistSchema)

// CRUD operation
// create document or insert 
const createDocument = async () => {
    try{
        const jsPlaylist = new Playlist({
            name : "javascript",
            ctype : "Front End",
            videos: 150,
            author: "Technical",
            active: true,
        })
        const mongoPlaylist = new Playlist({
            name : "MongoDb",
            ctype : "Database",
            videos: 10,
            author: "Technical",
            active: true,
        })
        const mongosePlaylist = new Playlist({
            name : "Mongoose JS",
            ctype : "Database",
            videos: 4,
            author: "Technical",
            active: true,
        })
        const expressPlaylist = new Playlist({
            name : "Express JS",
            ctype : "Back End",
            videos: 20,
            author: "Technical",
            active: true,
        })
        const result = await Playlist.insertMany([jsPlaylist,mongoPlaylist, mongosePlaylist, expressPlaylist]);
        console.log(result)
    }catch(err){
        console.log(err)
    }
}
// createDocument()

// Read document or View 
const readDocument = async () =>{
   try{
        const result = await Playlist.find({ctype: "Front End"})
        .select({name:1}) // only show name type
        console.log(result)
   }catch(err){
       console.log(err)
   }
}
// readDocument();

// Update document 
const updateDocument = async (_id) =>{
    try{
      const result = await Playlist.updateOne({_id},{ $set : { name: "Javascriprt"}});
      console.log(result)
    }catch(err){
        console.log(err)
    }
}
// updateDocument("61ef9801fbbcb882761c9868")

// Delete the document
const deleteDocument = async (_id) =>{
    try{
        const result = await Playlist.deleteOne({_id})
        console.log(result)
    }catch(err){
        console.log(err)
    }
}

// deleteDocument("61ef9801fbbcb882761c9868")

module.exports = connectToMongo;