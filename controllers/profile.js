// we have a function that returns another function and runs this
const handleProfileGet=(db)=>(req,res) => {
    const { id } = req.params;
    // let found =false;
    // database.users.forEach(user=>{
    //     if(user.id === id){
    //         found= true;
    //         return res.json(user);
    //     } 
    // })
    db.select('*').from('users').where({id})
    .then(user=> {
        if(user.length){
            res.json(user[0]);
        } else {
            res.status(400).json('Not found');
        }
    })
    .catch(err=> res.status(400).json('error getting user'))
    // if (!found){
    //     res.status(400).json('not found')
    // }
}

module.exports={
    handleProfileGet
}