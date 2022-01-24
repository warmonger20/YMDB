import PostMessage from '../Models/postMessage.js';
import User from '../Models/User.js'
// {author: {id: req.user.id}}
export const allData = (req, res) => {
    PostMessage.find({authorId: req.user.id})
        .then(data => {
            console.log('then');
            res.status(200).json(data);
        })
        .catch(error => {
            console.log('catch');
            res.status(404).json({message: error.message});
        })
}

export const allMovies = (req, res, category) => {
    PostMessage.find({type: category, authorId: req.user.id})
        .then((data) => {
            res.status(200).json(data);
        }) 
        .catch(error => {
            res.status(404).json({message: error.message});
        })
}

export const search = (req, res) => {
    // console.log(req.body);
    const search = req.body.search;
    User.find({username: search}).select(['-password'])
        .then((data) => {
            if(data.length===0)
            return res.status(200).json({
                msg : "user not found"
            })
            PostMessage.find({authorId: data[0]._id})
                .then((userData) => {
                    return res.status(200).json({
                        userData: userData
                    })
                })
        })
        .catch(err => res.status(400).json({msg :err.message}))

}
