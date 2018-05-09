module.exports = (app, passport) => {

    let Asset = require('../app/models/Asset');


    // Home Page
    app.get('/', (req, res) =>  {
        res.render('index.ejs')
    });



    app.get('/assets', (req, res) =>{
        Asset.find({}, (err, assets) => {
            if(err){
                console.log(err);
            } else {
                res.render('assets.ejs', {
                    title:'Assets',
                    assets:assets
                });
            }
        });
    });

    app.post('/assets/add', (req, res) => {
        let asset = new Asset();
        asset.name = req.body.name;
        asset.buyprice = req.body.buyprice;
        asset.amount = req.body.amount;
        
        asset.save( (err) => {
            if(err){
                console.log(err);
                return;
            } else {
                res.redirect('/profile');
            }
        });
    });



    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // Profile section
    // we will want this protected so you have to be logged in to visit
    app.get('/profile', isLoggedIn, function(req, res) {
        Asset.find({}, (err, assets) => {
            if(err){
                console.log(err);
            } else {
                res.render('profile.ejs', {
                    title:'Assets',
                    assets:assets,
                    user:req.user
                });
            }
        });
    });


    // new page via id
    app.get('/asset/:id', (req, res) => {
        Asset.findById(req.params.id, function (err, asset) {
            console.log(req.params.id);
            if(err) {
                console.log(err);
            } else {
                res.render('asset.ejs', {
                    title: req.params.id,
                    asset: req.params.id
                });
            }
        });
    });


    // Logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};



// route middleware to make sure a user is logged in
let isLoggedIn = (req, res, next) => {

    // if user is authenticated in the session
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them
    res.redirect('/');
};
