import Clarifai from 'clarifai';

const app = new Clarifai.App({apiKey: '3009df80e58c4486b54220c5a851fac1'});

const handleApiCall=(req,res)=>{
    app.models.predict(
    Clarifai.FACE_DETECT_MODEL, 
    req.body.input)
    .then(data=> res.json(data))
    .catch(err=> res.status(400).json('Unable to work with API'))
}
 
const handleImage=(req,res,db)=> {
    const { id } = req.body;
    // let found =false;
    // database.users.forEach(user=>{
    //     if(user.id === id){
    //         found= true;
    //         user.entries++;
    //         return res.json(user.entries);
    //     } 
    // })
    // if (!found){
    //     res.status(400).json('not found')
    // }

    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get count'))
}

module.exports={
    handleImage,
    handleApiCall
}