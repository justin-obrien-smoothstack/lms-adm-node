let routes = require("express").Router();
let service = require("../service/genreCrudService");

routes.get("/lms/admin/genre", (req, res) => {
  service
    .readAllGenres()
    .then((result) => {
      res.status(result.status).send(result.body);
    })
    .catch((err) => {
      res.status(500).send("Internal server error.");
    });
});

routes.get("/lms/admin/genre/:id", (req, res) => {
  service
    .readGenre(req.params.id)
    .then((result) => {
      res.status(result.status).send(result.body);
    })
    .catch((err) => {
      res.status(500).send("Internal server error.");
    });
});

routes.post("/lms/admin/genre", (req, res) => {
  service.createGenre(req.body, res);
});

routes.put("/lms/admin/genre", async (req, res) => {
  let response = await service.updateGenre(req.body);
  res.status(response.status).send(response.body);
});

routes.delete("/lms/admin/genre/:id", (req, res) => {
  service
    .deleteGenre(req.params.id)
    .then((result) => {
      res.status(result.status).send(result.body);
    })
    .catch((err) => {
      res.status(500).send("Internal server error.");
    });
});

module.exports = routes;
