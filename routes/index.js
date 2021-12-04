var express = require('express');
var router = express.Router();

var articleModel = require('../models/articles');
var orderModel = require('../models/orders');
var userModel = require('../models/users')

/* GET home page. */
router.get('/', async function(req, res, next) {
  var outOfStock = await articleModel.find({stock: 0});
  console.log(outOfStock);
  
  var admin = await userModel.find({status: 'admin'});
  console.log(admin[0].messages)

  var unread = admin[0].messages.filter(msg => msg.read == false);
  console.log(unread.length)

 var isDue = admin[0].tasks.filter(task => task.dateCloture == null)
 console.log(isDue.length)

  res.render('index', {outOfStock, unread, isDue});
});

/* GET tasks page. */
router.get('/tasks-page', async function(req, res, next) {
  var admin = await userModel.find({status: 'admin'});
  
  var adminTasks = admin[0].tasks;
  console.log('admin tasks are: ' + adminTasks)


  res.render('tasks', {adminTasks});
});

/* GET Messages page. */
router.get('/messages-page', async function(req, res, next) {

  var admin = await userModel.find({status: 'admin'});
  var adminId = admin[0]._id;
  console.log('admin id is : ' + adminId);

  var adminMsg = admin[0].messages
  console.log('my messages : ' + adminMsg)

  res.render('messages', {adminMsg});
});

/* GET Users page. */
router.get('/users-page', async function(req, res, next) {
  var users = await userModel.find();
  console.log(users);

  res.render('users', {users});
});

/* GET Catalog page. */
router.get('/catalog-page', async function(req, res, next) {
  var articles = await articleModel.find();
  console.log(articles)
  res.render('catalog', {articles});
});

/* GET Orders-list page. */
router.get('/orders-list-page', async function(req, res, next) {
  var orders = await orderModel.find();
  console.log(orders)
  res.render('orders-list', {orders});
});

/* GET Order detail page. */
router.get('/order-page', async function(req, res, next) {
  var orderId = req.query.cmdId;
  console.log(`Order id is ${orderId}`);
  var detailledOrder = await orderModel
    .findById(orderId)
    .populate('articles')
    .exec();

  console.log('detailled order is : ' + detailledOrder);  

  res.render('order', {detailledOrder});
});

/* GET chart page. */
router.get('/charts', async function(req, res, next) {
  var users = await userModel.find();

  var genderUsers = await userModel.aggregate([
    {
      $group: {
    _id: "$gender",
    userCount: { $sum: 1}
    }
  },

]);

  var maleUsers = genderUsers.filter(user => user._id == 'male');
  var femaleUsers = genderUsers.filter(user => user._id == 'female');
  

  var admin = await userModel.find({status: 'admin'});;
  var messages = admin[0].messages;
  console.log(messages);
  
  var isRead = messages.filter(msg => msg.read == true);
  console.log('is read: ' + isRead);
  var isUnread = messages.filter(msg => msg.read == false);

  var orders = await orderModel.find();

  var paidAndShipped = orders.filter(order => order.status_payment == 'validated' && order.status_shipment == true);
  console.log(`there is ${paidAndShipped.length} orders paid and shipped`);

  var paidAndUnshipped = orders.filter(order => order.status_payment == 'validated' && order.status_shipment == false);
  console.log(`there is ${paidAndUnshipped.length} orders paid and unshipped`);

  var data = await orderModel.aggregate(
    [
      {
        '$match': {
          'status_payment': 'validated'
        }
      }, {
        '$group': {
          '_id': {
            'month': {
              '$month': '$date_payment'
            }, 
            'total': {
              '$sum': '$total'
            }
          }
        }
      }, {
        '$sort': {
          '_id': 1
        }
      }
    ]
  );

console.log(data)
  res.render('charts', {maleUsers, femaleUsers, isRead, isUnread, paidAndShipped, paidAndUnshipped });
});



module.exports = router;
