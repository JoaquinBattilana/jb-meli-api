const AUTHOR = {
  name: process.env.AUTHOR_NAME,
  surname: process.env.AUTHOR_SURNAME
};

exports.jsonWithAuthor = (req, res, next) => { 
  res.jsonWithAuthor = data => res.json({ author: AUTHOR, ...data });
  next();
};
