module.exports = function() {

  function index(req, res) {
    res.render('index.jade');
  }

  return {
    index: index
  }
}