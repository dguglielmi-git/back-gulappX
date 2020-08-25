var Dishes = require("../model/modelDish");
var Comments = require("../model/modelComment");
var NodeGeocoder = require("node-geocoder");
const rp = require("request-promise");

var options = {
  provider: "google",
  httpAdapter: "https", // Default
  apiKey: "AIzaSyA4bkTxhOCMEjj21IJdZIK-VlXdAdYlfEk",
  formatter: null, // 'gpx', 'string', ...
};

var geocoder = NodeGeocoder(options);

let getDishes = (req, res) => {
  console.log("Listado de Platos");
  //Listar resultados

  Dishes.find(function (err, listaPlatos) {
    res.status(200).send(listaPlatos);
    //si hay error
    (err) => {
      res.status(500).send(err);
      console.log(err);
    };
  });
};

const getDishesbyName = async (req, res) => {
  disharray = [];
  distance = String;
  console.log("lectura de platos por nombre");
  //Obtener id busqueda
  let name = {
    dishName: { $regex: ".*" + req.body.dishName + ".*", $options: "i" },
  };
  console.log("ahora viene la variable");
  console.log(name);
  //Listar resultados

  Dishes.find(name, (err, text) => {
    if (err) {
      console.log(err);

      return res.status(500).send(text);
    } else {
      console.log(req.body.address);
      console.log(req.body);
      if (req.body.address) {
        getDistance(req.body.address, text)
          .then(function (data) {
            return data;
          })
          .then(function (content) {
            console.log("Showing the Content:" + content);
            return res.status(200).send(content);
          });
      } else {
        return res.status(200).send(text);
      }
    }
  });
};

const getDishesbyId = async (req, res) => {
  disharray = [];
  distance = String;
  //Obtener id busqueda
  let id = { _id: req.body.dishId };

  //Listar resultados

  Dishes.find(id, (err, text) => {
    if (err) {
      return res.status(500).send(text);
    } else {
      if (req.body.address) {
        getDistance(req.body.address, text)
          .then(function (data) {
            return data;
          })
          .then(function (content) {
            console.log("ACA VIENE EL CONTENT:" + content);
            geocode(content).then(function (data) {
              console.log("ACA ADADSFDSFVIENE LA MAGIA" + data);
              res.status(200).send(data);
            });
          });
      } else {
        return res.status(200).send(text);
      }
    }
  });
};

async function geocode(text) {
  return geocoder
    .geocode(text[0].restaurantAddress)
    .then(function (res) {
      text[0].geo[0] = res[0].latitude;
      text[0].geo[1] = res[0].longitude;
      return text;
    })
    .catch(function (err) {
      console.log(err);
    });
}

let getDishesAutocomplete = (req, res) => {
  //Obtener id busqueda
  let name = {
    dishName: { $regex: ".*" + req.body.dishName + ".*", $options: "i" },
  };

  //Listar resultados

  Dishes.findOne(name, { dishName: true }, (err, text) => {
    if (err) {
      return res.status(500).send(text);
    } else {
      return res.status(200).send(text);
    }
  });
};

async function getDistance(firstAddr, text) {
  let promiseArray = text.map((value) => {
    return rp({
      uri:
        "https://maps.googleapis.com/maps/api/directions/json?origin=" +
        firstAddr +
        "&destination=" +
        value.restaurantAddress +
        "&key=AIzaSyA4bkTxhOCMEjj21IJdZIK-VlXdAdYlfEk",
      json: true,
    }).then(function (data) {
      var obj = data.routes[0].legs[0].distance.text;
      asd = value;
      asd.distance = obj;
      return asd;
    });
  });

  return Promise.all(promiseArray);
}

let getDistanceBetweenAddresses = (req, res) => {
  //Obtener id busqueda
  let originAddr = req.body.originAddr;
  let destAddr = req.body.destAddr;
  var url =
    "https://maps.googleapis.com/maps/api/directions/json?origin=" +
    originAddr +
    "&destination=" +
    destAddr +
    "&key=AIzaSyA4bkTxhOCMEjj21IJdZIK-VlXdAdYlfEk";
  let options = { json: true };

  rp({
    uri:
      "https://maps.googleapis.com/maps/api/directions/json?origin=" +
      originAddr +
      "&destination=" +
      destAddr +
      "&key=AIzaSyA4bkTxhOCMEjj21IJdZIK-VlXdAdYlfEk",
    json: true,
  })
    .then((data) => {
      obj = data.routes[0].legs[0].distance.text;
      res.status(200).send(obj);
    })
    .catch((err) => {
      console.log(err);
    });
};

let insertDish = (req, res) => {
  var newDish = Dishes({
    dishName: req.body.dishName,
    restaurantName: req.body.restaurantName,
    branchName: req.body.branchName,
    restaurantAddress: req.body.restaurantAddress,
    dishDescription: req.body.dishDescription,
    dishDetailedDesc: req.body.dishDetailedDesc,
    imageUrl: req.body.imageUrl,
    pricing: req.body.pricing,
  });
  newDish.save().then(
    (newDish) => {
      res.status(200).send(newDish); //devuelvo resultado query
    },
    (err) => {
      res.status(500).send(err);
    }
  );
};

let updateDish = (req, res) => {
  let id = {
    _id: req.body.dishId,
  };

  const updateQuery = {};

  if (req.body.dishName) {
    updateQuery.dishName = req.body.dishName;
  }
  if (req.body.dishDescription) {
    updateQuery.dishDescription = req.body.dishDescription;
  }
  if (req.body.dishDetailedDesc) {
    updateQuery.dishDetailedDesc = req.body.dishDetailedDesc;
  }
  if (req.body.imageUrl) {
    updateQuery.imageUrl = req.body.imageUrl;
  }
  if (req.body.pricing) {
    updateQuery.pricing = req.body.pricing;
  }
  Dishes.findOneAndUpdate(id, updateQuery, { new: true }, function (err) {
    res.status(200).send({ estado: "Plato modificado con exito" }); //devuelvo resultado query
    (err) => {
      res.status(500).send(err);
      console.log(err);
    };
  });
};

const getRestaurantMenu = async (req, res) => {
  let id = {
    restaurantName: req.body.restaurantName,
    branchName: req.body.branchName,
  };

  Dishes.find(id, (err, text) => {
    if (err) {
      console.log(err);

      return res.status(500).send(text);
    } else {
      return res.status(200).send(text);
    }
  });
};

//COMMENTS
let insertComment = (req, res) => {
  var newComment = Comments({
    dishId: req.body.dishId,
    fullName: req.body.fullName,
    priceStar: req.body.priceStar,
    locationStar: req.body.locationStar,
    sizeStar: req.body.sizeStar,
    attentionStar: req.body.attentionStar,
    presentationStar: req.body.presentationStar,
    title: req.body.title,
    body: req.body.body,
  });
  newComment.save().then(
    (newDish) => {
      res.status(200).send(newComment); //devuelvo resultado query
    },
    (err) => {
      res.status(500).send(err);
      console.log(err);
    }
  );
};

let getComments = (req, res) => {
  //Listar resultados
  Comments.find(function (err, listaComentarios) {
    res.status(200).send(listaComentarios);
    //si hay error
    (err) => {
      res.status(500).send(err);
      console.log(err);
    };
  });
};

let getDishAveragebyId = (req, res) => {
  let result = {};
  let id = { dishId: req.body.dishId };
  Comments.find(id, (err, text) => {
    if (err) {
      console.log(err);
      return res.status(500).send(text);
    } else {
      var qty = 0;
      var sumPrice = 0;
      var sumLocation = 0;
      var sumSize = 0;
      var sumAttention = 0;
      var sumPresentation = 0;
      text.forEach(function (table) {
        if (table.priceStar != null) {
          qty += 1;
          sumPrice += table.priceStar;
          sumLocation += table.locationStar;
          sumSize += table.sizeStar;
          sumAttention += table.attentionStar;
          sumPresentation += table.presentationStar;
        }
      });

      var avgPrice = sumPrice / qty;
      var avgLocation = sumLocation / qty;
      var avgSize = sumSize / qty;
      var avgAttention = sumAttention / qty;
      var avgPresentation = sumPresentation / qty;
      var avgTotal =
        (avgPrice + avgLocation + avgSize + avgAttention + avgPresentation) / 5;
      result.avgPrice = avgPrice;
      result.avgLocation = avgLocation;
      result.avgSize = avgSize;
      result.avgAttention = avgAttention;
      result.avgPresentation = avgPresentation;
      result.avgTotal = avgTotal;
      return res.status(200).send(result);
    }
  });
};

let getCommentsbyId = (req, res) => {
  //Obtener id busqueda
  let id = { dishId: req.body.dishId };
  //Listar resultados
  Comments.find(id, (err, text) => {
    if (err) {
      return res.status(500).send(text);
    } else {
      return res.status(200).send(text);
    }
  });
};

let deleteContacto = (req, res) => {
  let id = { dni: req.body.dniEliminado };
  Contactos.deleteOne(id, function (err) {
    res.status(200).send({ estado: "Registro eliminado" }); //devuelvo resultado
    (err) => {
      res.status(500).send(err);
      console.log(err);
    };
  });
};
module.exports = {
  getDishes,
  getDishesbyName,
  getDishesbyId,
  getDishesAutocomplete,
  insertDish,
  insertComment,
  getComments,
  getCommentsbyId,
  getDishAveragebyId,
  getRestaurantMenu,
  updateDish,
  deleteContacto,
  getDistanceBetweenAddresses,
};
