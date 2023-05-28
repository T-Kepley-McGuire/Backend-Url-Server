const uses = require("../data/uses-data");

function useExists(req, res, next) {
  const useId = Number(req.params.useId);

  const foundUse = uses.find((use) => use.id === useId);
  if (foundUse) {
    res.locals.use = foundUse;
    return next();
  }
  next({
    status: 404,
    message: `Use ID not found: ${useId}`,
  });
}

function list(req, res, next) {
  const url = res.locals.url;
  if (url) {
    res.json({ data: uses.filter((use) => use.urlId === url.id) });
  } else {
    res.json({ data: uses });
  }
}

function read(req, res, next) {
  const url = res.locals.url;
  const use = res.locals.use;
  if (url) {
    if (use.urlId == url.id) {
      res.json({ data: use });
    } else {
      next({
        status: 404,
        message: `Use ID ${use.id} not assosicated with url ${url.href}`,
      });
    }
  } else {
    res.json({ data: use });
  }
}

function destroy(req, res, next) {
    const useId = res.locals.use.id;
    const index = uses.find((use) => use.id === useId);
    const deletedUse = uses.splice(index, 1);
    res.sendStatus(204);
}

module.exports = {
  list,
  read: [useExists, read],
  delete: [useExists, destroy],
};
