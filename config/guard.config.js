ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    //console.log(req.user.local.email);
    next();
  } else {
    res.redirect('/auth/signin/form');
  }
}

module.exports = ensureAuthenticated;
