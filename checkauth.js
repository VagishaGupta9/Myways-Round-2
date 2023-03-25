app.get('/api/checkAuth',(req,res) => {
    const token = req.headers.authorization?.split(' ')[1];
});