const get404 = (req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page not Fount' });
};

module.exports = {get404};
