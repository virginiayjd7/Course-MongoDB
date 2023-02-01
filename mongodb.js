db.accounts.insertOne({
  "account_id": 111333,
  "limit": 12000,
  "products": [
    "Commodity",
    "Brokerage"
    ],
  "last_updated": new Date()
})


db.accounts.insertMany({

  "account_id": 111333,
  "limit": 12000,
  "products": [
  "Commodity",
  "Brokerage"
  ],
  "last_updated": new Date()
},
{
  "account_id": 678943,
  "limit": 8000,
  "products": [
  "CurrencyService",
  "Brokerage",
  "InvestmentStock"
  ],
  "last_updated": new Date()
},
{
  "account_id": 321654,
  "limit": 10000,
  "products": [
  "Commodity",
  "CurrencyService"
  ],
  "last_updated": new Date()
},)

db.sales.find({ _id: { $in: [ObjectId("5bd761dcae323e45a93ccff4")] } })

//Cree una consulta que devuelva todas las ventas de las tiendas de Londres y Nueva York.
db.sales.find({ storeLocation: { $in: ["London", "New York"] } })

//:  $gt,  $lt,  $ltey  $gte ->db.sales.find({ "items.price": { $gt: 50}})
//encontrar documentos que contengan artículos con un precio superior a $200
db.sales.find({ "items.price": { $gt: 200}})
//Find all documents that contain an item that is priced less than $25 inferior a 25
db.sales.find({ "items.price": { $lt: 25}})
//mayor = que 
db.sales.find({ "items.quantity": { $gte: 10}})
//menor = que
db.sales.find({ "customer.age": { $lte: 45 } })

//
db.accounts.find({ products: "CurrencyService" })
//
db.transactions.find({
  transactions: {
    $elemMatch: { amount: { $lte: 4500 }, transaction_code: "sell" },
  },
})

//$and,  $ory  $and.
//name: 'pens',
/*_id: ObjectId("5bd761dcae323e45a93ccff5"),
    saleDate: ISODate("2015-11-15T18:08:12.414Z"),
    items: [
      {
        name: 'laptop',
        tags: [ 'electronics', 'school', 'office' ],
        price: Decimal128("644.76"),
        quantity: 3
      },
      {
        name: 'notepad',
        tags: [ 'office', 'writing', 'school' ],
        price: Decimal128("24.4"),
        quantity: 3
      },
      {
        name: 'envelopes',
        tags: [ 'stationary', 'office', 'general' ],
        price: Decimal128("9.22"),
        quantity: 2
      },
      {
        name: 'backpack',
        tags: [ 'school', 'travel', 'kids' ],
        price: Decimal128("83.27"),
        quantity: 2
      },
      {
        name: 'pens',
        tags: [ 'writing', 'office', 'school', 'stationary' ],
        price: Decimal128("66.73"),
        quantity: 3
      },
      {
        name: 'notepad', 3*/

db.sales.find({
  $or: [
    { "items.name": "pens" }, { "items.tags":"writing" }
  ],
})
//customer: { gender: 'F', age: 34, email: 'keigutip@vaw.tc', satisfaction: 4 },
/*storeLocation: 'Seattle',
    customer: { gender: 'M', age: 18, email: 'co@no.li', satisfaction: 3 },
    couponUsed: true,
    purchaseMethod: 'Online' */
db.sales.find({ purchaseMethod: 'Online', couponUsed: true ,"customer.age": { $lte: 25 } })

/*
db.birds.replaceOne(
  { _id: ObjectId("6286809e2f3fa87b7d86dccd") },
  {
    common_name: "Morning Dove",
    scientific_name: "Zenaida macroura",
    wingspan_cm: 37.23,
    habitat: ["urban areas", "farms", "grassland"],
    diet: ["seeds"],
  }
)
*/
db.birds.find({"common_name": "Northern Cardinal"})
//replace
db.birds.replaceOne(
  {_id:ObjectId("6286809e2f3fa87b7d86dccd")},
  {
  common_name: "Northern Cardinal",
  scientific_name: "Zenaida macroura",
  wingspan_cm: 37.23,
  habitat: ["urban areas", "farms", "grassland"],
  diet: ["seeds"],
})
//$setupsert$push

db.birds.find({"common_name": "Canada Goose"})
/*[
  {
    _id: ObjectId("6268413c613e55b82d7065d2"),
    common_name: 'Canada Goose',
    scientific_name: 'Branta canadensis',
    wingspan_cm: 152.4,
    habitat: 'wetlands',
    diet: [ 'grass', 'algae' ],
    last_seen: ISODate("2022-05-19T20:20:44.083Z")
    
  }
] */ 
//agrega un nuevo campo
db.birds.updateOne(
  { 
    common_name: "Canada Goose"
  },
  
  { 
    $set: { 
      tags: ["geese", "herbivore","migration"] } 
  },
  
)

/// volver a la vrsion anterios de la dat 
load("/app/restoreData.js")

//Use el modificador $each para agregar múltiples elementos a la matriz.
db.birds.updateOne(
  { _id: ObjectId("6268471e613e55b82d7065d7") },
  {
    $push: {
      diet: { $each: ["newts", "opossum", "skunks", "squirrels"] },
    },
  }
)
/*
{
  _id: ObjectId("6268471e613e55b82d7065d7"),
  common_name: 'Great Horned Owl',
  scientific_name: 'Bubo virginianus',
  wingspan_cm: 111.76,
  habitat: [ 'grasslands', 'farmland', 'tall forest' ],
  diet: [
    'mice',
    'small mammals',
    'rabbits',
    'shrews',
    'newts',
    'opossum',
    'skunks',
    'squirrels'
  ],
*/
// si no existe el documento agrega //$set`, `$push`, `$pop`, `$unset` o `$inc`.
db.birds.updateOne(
  {
    common_name: "Robin Redbreast",
  },
  {
    $inc: {
      "sightings": 1,
    },
    $set: {
      last_updated: new Date(),
    },
  },
  {
    upsert: true,
  }
)
//

db.birds.findAndModify({
  query: { common_name: "Blue Jay" },
  update: { $inc: { sightings_count: 1 }},
  new: true,
})
//
db.birds.updateMany(
  { 
    common_name:{
    $in: ["Blue Jay","Grackle" ],
    },
  },
  {
    $set: {
      last_seen:ISODate("2022-01-01") ,
    },
  }
 
)
//deleteone and many
db.birds.deleteOne({_id:ObjectId("62cddf53c1d62bc45439bebf")})//eliminar por id

//eliminar datos de  docmumentos con un datos respetivo 
db.birds.deleteMany({sightings_count:{$lte:10 } })
//Devolver los resultados de la consulta en orden ascendente 1
db.sales.find({}).sort({saleDate: 1})
//Devolver los resultados de la consulta en orden descendente -1
db.sales.find({purchaseMethod: 'Online',couponUsed: true}).sort({saleDate: -1})
//Devolver un número limitado de resultados ordenados
db.sales.find({ "storeLocation": "London","items.name":{$in:[ "laptop", "backpack", "printer paper"]}}).sort({saleDate: -1}).limit(3)
db.sales.find({ "items.name": { $in: ["laptop", "backpack", "printer paper"] }, "storeLocation": "London", }).sort({ saleDate: -1, }).limit(3)
//
db.sales.find({storeLocation: 'Denver',},{storeLocation: 1,saleDate:1,purchaseMethod:1,})
/* {
    _id: ObjectId("5bd761dcae323e45a93cd025"),
    saleDate: ISODate("2017-03-04T12:20:24.104Z"),
    storeLocation: 'Denver',
    purchaseMethod: 'Online'
  },
  {
    _id: ObjectId("5bd761dcae323e45a93cd022"),
    saleDate: ISODate("2015-05-30T23:42:37.076Z"),
    storeLocation: 'Denver',
    purchaseMethod: 'Online'
  },
  {
    _id: ObjectId("5bd761dcae323e45a93cd02a"),
    saleDate: ISODate("2015-08-15T12:11:23.712Z"),
    storeLocation: 'Denver',
    purchaseMethod: 'Online'
  } */

  //Devolver campos seleccionados, excluyendo el campo _id
  db.sales.find({ "customer.age": { $lt: 30 }, "customer.satisfaction": { $gt: 3}, }, {"customer.satisfaction":1,"customer.age":1,"storeLocation": 1,"saleDate":1,"_id":0,});
  /*},
  {
    saleDate: ISODate("2013-08-04T10:38:33.219Z"),
    storeLocation: 'San Diego',
    customer: { age: 21, satisfaction: 5 }
  },
  {
    saleDate: ISODate("2013-06-03T15:42:49.232Z"),
    storeLocation: 'Denver',
    customer: { age: 29, satisfaction: 4 }
  }
] */
//devolver todos los campos excepto aquellos explícitamente excluidos

db.sales.find({ storeLocation: { $in: ["Seattle", "New York"] },}, {"customer":0,"couponUsed": 0,"purchaseMethod":0,});

///contar
db.sales.countDocuments({})
5000
//

db.sales.countDocuments({storeLocation: "Denver",couponUsed: true})
157
//
/*
items: [
  {
    name: 'pens',
    tags: [ 'writing', 'office', 'school', 'stationary' ],
    price: Decimal128("26.64"),
    quantity: 2
  },
  {
    name: 'laptop',
    tags: [ 'electronics', 'school', 'office' ],
    price: Decimal128("1217.84"),
    quantity: 1
  },
*/
  db.sales.countDocuments({items: {$elemMatch:{name: "laptop",price:{$lt:600}}}})
  397
  //

