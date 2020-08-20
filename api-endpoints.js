// Initialize express router
let router = require('express').Router();
let apiController = require('./controllers/apiControllers');

// Set default API response
router.get('/', function (req, res) 
{
    res.json(
    {
       status: 'Rest',
       message: 'RESTful API for gulappX',
    });
});

//EndPoint para leer toda la base
router.get('/getDishes',function(req,res)
{
    console.log("leer");
    apiController.getDishes(req,res);
});


router.post('/getDishesbyName',async function(req,res)
{
    console.log("leer");
    await apiController.getDishesbyName(req,res);
});


router.post('/getDishesbyId',async function(req,res)
{
    console.log("leer");
    await apiController.getDishesbyId(req,res);
});


router.post('/getDishesAutoComplete',function(req,res)
{
    console.log("autocomplete");
    apiController.getDishesAutocomplete(req,res);
});

//EndPoint para leer con filtro
router.post('/getDistances',function(req,res)
{
    console.log("calcular distancias entre 2 direcciones");
    apiController.getDistanceBetweenAddresses(req,res);
});
//EndPoint para insertar en la BD
router.post('/insertDish',function(req,res)
{
    console.log(req.body);
    apiController.insertDish(req,res);
});

//EndPoint para modificar en la BD
router.post('/insertComment',function(req,res)
{
    apiController.insertComment(req,res);
});

router.get('/getComments',function(req,res)
{
    apiController.getComments(req,res);
});

router.post('/getCommentsbyId',function(req,res)
{
    apiController.getCommentsbyId(req,res);
});


router.post('/getDishAveragebyId',function(req,res)
{
    apiController.getDishAveragebyId(req,res);
});

//EndPoint para modificar en la BD
router.post('/updateDish',function(req,res)
{
    apiController.updateDish(req,res);
});


router.post('/getRestaurantMenu',function(req,res)
{
    apiController.getRestaurantMenu(req,res);
});

//EndPoint para eliminar en la BD
router.delete('/deleteContacto/Contacto',function(req,res)
{
    apiController.deleteContacto(req,res);
});
// Export API routes
module.exports = router;
