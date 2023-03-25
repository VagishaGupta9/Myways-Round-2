app.post('/api/login', async(req,req) => {
    const {email,password} = req.body;
    try {
        //check if user with email is correct
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({message:'Invalid email or password'});
        }
        //check if password is correct
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) {
            return res.status(401).json({message: 'Invalid email or password'});
        }
        //Generates a JWT
        const token = jwt = jwt.sign({id:user._id},'secret',{expiresIn:'1h'});
        res.status(200).json({token});
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Server Error!'});
    }
});