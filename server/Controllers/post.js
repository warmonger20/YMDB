import PostMessage from '../Models/postMessage.js';
import Category from '../Models/Category.js';

export const createPost = async (req, res) => {
    const body = req.body;
    const newPost = new PostMessage(body);
        console.log("post")
       const id = req.body.title_id;
       newPost.authorId = req.user.id;
       await PostMessage.find({title_id: id, authorId: req.user.id})
                .then(data => {
                    if(data.length === 0) {
                        newPost.save();
                    } else {
                        return res.status(201).json({message: `${req.body.title} already saved!`});
                    }
                })
                .catch(error => {
                        return res.status(404).json({message: error.message});
                });
        // await Category.find()
        //     .then(data => {
        //         let type = req.body.category;
        //         let isTypePresent = data.findIndex(cat => cat===type);
        //         if(isTypePresent === -1) {
        //             let newData = [...data];
        //             newData.push(type);
        //             Category.updateOne({category: data}, {category: newData});
        //         }
        //     })
        //     .catch(error => {
        //         return res.status(409).json({message: error.message});
        //     })
        return res.status(201).json({message: `${req.body.title} added!`});
}