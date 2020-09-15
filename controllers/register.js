const handleRegister = (req,res ,db , bcrypt) => {
    const {email,name,password}=req.body;
    if(!email || !name || !password){
        return res.status(400).json('Incorrect form submission.');
    } 
    const hash =bcrypt.hashSync(password);

    // bcrypt.compareSync('veggies',hash);//false
    db.transaction(trx => {
        trx.insert({
            hash,email
        })
        .into('login')
        .returning('email')
        .then(loginEmail=> {
            return trx('users')
            //users insert user and retrun all columns
                .returning('*')
                .insert({
                    // id is automatic, no pwd here, entries is default 0
                    name:name,
                    email:loginEmail[0 ],
                    joined:new Date()
                })
                .then(user =>res.json(user[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
   
        .catch(err=> res.status(400).json('unable to register'));
}

module.exports={
    handleRegister : handleRegister
}