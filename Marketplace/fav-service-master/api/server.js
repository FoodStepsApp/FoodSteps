const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Idea = require("./models/Idea");
const MONGOURI =
  "mongodb+srv://Admin:K2EVDutkj9V2Lam8@collaboratofav-7rukn.mongodb.net/FavDb?retryWrites=true&w=majority";
const PORT = process.env.PORT || 9000;
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});
mongoose.connection.on("error", () => {
  console.log("Error Connecting to the MongoDb");
});

app.post("/api/fav", (req, res) => {
  console.log("POST FAVORITE API : " +req.body.favorite._id);
  const idea = new Idea({
    _id: mongoose.Types.ObjectId(req.body.favorite._id),
    idea_owner: req.body.favorite.idea_owner,
    idea_owner_name: req.body.favorite.idea_owner_name,
    idea_genre: req.body.favorite.idea_genre,
    idea_field: req.body.favorite.idea_field,
    idea_headline: req.body.favorite.idea_headline,
    idea_description: req.body.favorite.idea_description,
    price: req.body.favorite.price,
  });
  idea
    .save()
    .then()
    .catch((err) => {
      console.log(err);
    });
  User.findByIdAndUpdate(
    req.body.user._id,
    {
      $push: { favorites: mongoose.Types.ObjectId(req.body.favorite._id) },
    },
    {
      new: true,
    }
  ).then((user) => {
    if (user) {
      return res.json(user);
    } else {
      const user = new User({
        _id: req.body.user._id,
      });
      user
        .save()
        .then(() => {
          User.findByIdAndUpdate(
            req.body.user._id,
            {
              $push: { favorites: mongoose.Types.ObjectId(req.body.favorite._id) },
            },
            {
              new: true,
            }
          ).then((user) => {
            return res.json(user);
          });
        })
        .catch((err) => console.log(err));
    }
  });
});

app.get("/api/favorites/:_id", (req, res) => {
  console.log("GET FAVORITE API : " +req.params._id);
  User.find({ _id: req.params._id })
    .populate(
      "favorites",
      "_id idea_owner idea_owner_name idea_genre idea_field idea_headline idea_description price"
    )
    .then((favorites) => {
      if (favorites == []) {
        return res.json({ favorites: "No Favourites" });
      } else {
        var uniqueArray = [...new Set(favorites[0].favorites)];
        return res.json(uniqueArray);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.put("/api/unfav", (req, res) => {;
  console.log("unfav : " +req.body.favorite._id);
  User.findByIdAndUpdate(
    req.body.user._id,
    {
      $pull: { favorites: req.body.favorite._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.json({ error: err });
    } else {
      res.json(result);
    }
  });
});

app.get("/api/favorites", (req, res) => {
  User.find({})
    .populate(
      "favorites",
      "_id idea_owner idea_owner_name idea_field idea_genre idea_headline idea_description price"
    )
    .then((favorites) => {
      if (favorites == []) {
        return res.json({ favorites: "No Favourites" });
      } else {
        return res.json(favorites);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(PORT, () =>
  console.log(`Server Started at : http://localhost:${PORT}`)
);
