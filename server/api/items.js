const router = require("express").Router();

const Item = require("../models/Item");

const QUERY_DISTANCE = 10000; // Query distance in meters

// Get all reports
router.get("/", (req, res) => {
  Item.find((err, reports) => res.status(200).send(reports));
});

// Get all reports around a point in QUERY_DISTANCE distance
/*router.get("/:lat/:long", (req, res) => {
  Report.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(req.params.long), parseFloat(req.params.lat)]
        },
        distanceField: "dist.calculated",
        maxDistance: QUERY_DISTANCE,
        minDistance: 0,
        key: "location",
        spherical: true
      }
    }
  ])
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => console.log(err));
});*/
// Add new report
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    location: {
      type: "Point",
      coordinates: [req.body.lon, req.body.lat]
    },
    description: req.body.description
  });
  newItem
    .save()
    .then(() => console.log(`Added report ${newItem.name}`))
    .catch(err => {
      console.log(err);
      res.status(400).send({ msg: "ERROR" });
    })
    .then(() => res.status(200).send({ msg: "OK" }));
});

module.exports = router;
