const User = require('./models/user');
add.post('./api/signup',async(req,res) => {
    const{name,email,password} = req.body;
    try{
        //check if user with email already exists
        const existinguser = await User.findOne({email});
        if(existinguser){
            return res.status(409).json({message:'User with email exists!'});
        }
        //Hash the password
        const hashedpassword = await bcrypt.hash(password, 10);
        //create a new user
        const user = new User({
            name,
            email,
            password: hashedpassword
        });
        await user.save();
        //generate a JWT
        const token = jwt.sign({id:user_id},'secret',{expiresIn:'1h'});
        res.status(201).json({token});
    }catch(error) {
        console.error(error);
        res.status(500).json({message:'Server Error'});
    }
});