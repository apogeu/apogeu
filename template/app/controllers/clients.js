module.exports = {

  foo: (req, res, next) => {
    res.send(`ClientModel.foo: ${ClientModel.foo}\n`);
  },

  bar: (req, res, next) => {
    res.send(`ClientModel.bar: ${ClientModel.bar}\n`);
  },

};
