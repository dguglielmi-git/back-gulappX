# gulappX Backend

This is the backend API of gulappX, feel free to use it or improve it.

## Usage examples


### Get distances between 2 addresses (using gmaps api)

POST
```
/apiGulappX/getDistances

Body:
{
	"originAddr": "Avenida Corrientes 750, Buenos Aires, Argentina",
	"destAddr": "Avenida Corrientes 2500, Buenos Aires, Argentina"
}
```

### Insert a new dish

POST
```
/apiGulappX/insertDish

Body:
{
	"dishName": "Milanesa con Papas Fritas",
	"restaurantName": "El Palacio de la Papa Frita",
	"branchName": "Corrientes",
	"restaurantAddress": "Av. Corrientes 1612, Buenos Aires, Argentina",
	"dishDescription": "Milanesa de 27cm acompanada con papas",
	"dishDetailedDesc": "La milanesa es uno de los platos más populares en los que la guarnición son las patatas fritas, la comida que más gusta al ser humano de acuerdo con un estudio científico llevado a cabo por la revista científica Scientific Reports. La milanesa es un filete fino rebozado a base de huevo batido y pan rallado. Como se ve en la foto, suele acompañarse de unas rodajas de limón para servirse.",
	"imageUrl": "https://www.viajejet.com/wp-content/viajes/Plato-de-milanesa-con-papas-ti%CC%81pico-de-Argentina.jpg",
	"pricing": "285"

}

```

### Update restaurant name

POST
```
/apiGulappX/updateRestaurant

Body:
{
	"id": "5db4a7dd62d70c0ddcb72e10",
	"restaurantName": "La Armada 2"
}

```


### Get all dishes

GET
```
/apiGulappX/getDishes
```

### Get dishes by name (not necessarily the full name)
POST
```
/apiGulappX/getDishesbyName

Body:
{
	"dishName" : "milanesa"
}
```

### Get dishes by name AND Location (not necessarily the full name), returns the dish with the distance from the location pushed
POST
```
/apiGulappX/getDishesbyName

Body:
{
	"dishName" : "milanesa",
	"address" : "Avenida Rivadavia 7800, Buenos Aires, Argentina"
}
```


### Get dishes by ID (not necessarily the full name)
POST
```
/apiGulappX/getDishesbyId

Body:
{
	"dishId" : "5db4a75662d70c0ddcb72e0f"
}
```


### Get dishes by ID AND Location (not necessarily the full name), returns the dish with the distance from the location pushed
POST
```
/apiGulappX/getDishesbyId

Body:
{
	"dishId" : "5db4a75662d70c0ddcb72e0f",
	"address" : "Avenida Rivadavia 7800, Buenos Aires, Argentina"
}
```

### Get dish name (for autocompletion)
GET
```
/apiGulappX/getDishesAutocomplete

Body:
{
	"dishName" : "milanesa"
}
```

### Get Restaurant Menu
POST
```
/apiGulappX/getRestaurantMenu

Body:
{
	"restaurantName" : "La Armada",
	"branchName" : "Sucursal Almagro"
}
```

### Update Dish

## Note: You can choose what fields to update, the only required field is dishId
POST
```
/apiGulappX/updateDish

Body:
{
	"dishId" : "5dca25784cb66e0465cc96d2",
	"dishName" : "Milanesa con Papas Fritas", 
	"dishDescription" : "Milanesa de 27cm acompanada con papas",
	"dishDetailedDesc" : "La milanesa es uno de los platos más populares en los que la guarnición son las patatas fritas, la comida que más gusta al ser humano de acuerdo con un estudio científico llevado a cabo por la revista científica Scientific Reports. La milanesa es un filete fino rebozado a base de huevo batido y pan rallado. Como se ve en la foto, suele acompañarse de unas rodajas de limón para servirse.",
	"imageUrl" : "https://www.viajejet.com/wp-content/viajes/Plato-de-milanesa-con-papas-ti%CC%81pico-de-Argentina.jpg",
	"pricing" : 290
}
```


### Get all comments

GET
```
/apiGulappX/getComments
```

### Get comments of a specific dish (using mongodb _id native field)
GET
```
/apiGulappX/getCommentsbyId

Body:
{ 
	"dishId" : "5db4a7dd62d70c0ddcb72e10"
}
```

### Insert a new comment

POST
```
/apiGulappX/insertComment

Body:
{
	"dishId": "5db4a75662d70c0ddcb72e0f",
	"fullName": "Mauricio Macri",
	"priceStar": 4,
    "locationStar": 3,
    "sizeStar": 5,
    "attentionStar": 4,
    "presentationStar": 2,
	"avgStar": 2.4,
	"title": "Excelentes",
	"body": "Divinas!!!!"
}
```


### Get Averages of a dish (by dish Id)

POST
```
/apiGulappX/getDishAveragebyId

Body:
{ 
	"dishId" : "test1"
}
```
