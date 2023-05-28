const urls = require("../data/urls-data");
const uses = require("../data/uses-data");

function bodyHasUrl(req, res, next) {
  const { data: { href } = {} } = req.body;
  if (href) return next();
  next({
    status: 400,
    message: `Must contain href property. Received ${href}`,
  });
}

function urlExists(req, res, next) {
  const urlId = Number(req.params.urlId);

  const foundUrl = urls.find((url) => url.id === urlId);
  //console.log(urlId, foundUrl);
  if (foundUrl) {
    res.locals.url = foundUrl;
    return next();
  }
  next({
    status: 404,
    message: `Url ID not found: ${urlId}`,
  });
}

function list(req, res, next) {
  res.json({ data: urls });
}

function read(req, res, next) {
    uses.push({
        id: uses.length + 1,
        urlId: res.locals.url.id,
        time: Date.now()
    })
  res.json({ data: res.locals.url });
}

function create(req, res, next) {
  const { data: { href } = {} } = req.body;

  const newUrl = {
    id: urls.length + 1,
    href,
  };
  urls.push(newUrl);
  res.status(201).json({ data: newUrl });
}

function update(req, res, next) {
  const { url } = res.locals;
  const { data: { href } = {} } = req.body;

  url.href = href;
  res.json({ data: url });
}

module.exports = {
  list,
  read: [urlExists, read],
  create: [bodyHasUrl, create],
  update: [urlExists, bodyHasUrl, update],
  urlExists,
};
