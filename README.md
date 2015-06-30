# GA Camping Store

This is a simple Camping Store app built with the *MEAN* stack via the Yeoman
*angular-fullstack* generator.

## Steps to Reproduce This Project

### Step 1 - Setup The Project

1a. Install the [Angular Fullstack](https://github.com/DaftMonk/generator-angular-fullstack) Yeoman generator.

```bash
npm install -g generator-angular-fullstack
```

1b. Create a new directory for this project and run the Yeoman Generator.

```bash
mkdir ga-camping-store
cd ga-camping-store
yo angular-fullstack
```

1c. When prompted, you can choose all of the default values except:

* You will not need any of the additional oAuth strategies.
* You can choose `n` (no) for `socket.io`.

1d. Initialize Git repo and commit all changes:

```bash
git init
git add -A
git commit -m "Created the project."
git tag step1
```

### Step 2 - Install Additional Bower Components

2a. Install the `angular-animate` and `animate.css` components:

```bash
bower install --save angular-animate
# Note: use animate-css instead of animate.css to make grunt wiredep happy
bower install --save animate-css
```

2b. Edit `client/app/app.js` and add the 'ngAnimate' module to our app module's dependencies:

```javascript
angular.module('gaCampingStoreApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',       // add trailing comma
  'ngAnimate'           // add this line
])
```



2c. Commit changes:

```bash
git add -A
git commit -m "Added some bower components."
git tag step2
```

### Step 3 - Create a RESTful API Endpoint and Seed Data for Items

In this step we will create a new RESTful API endpoint and some seed data for
our camping store items.

3a. Use the Yeoman generator to create a new RESTful endpoint:

```bash
yo angular-fullstack:endpoint item
```

Accept the default value for the url.

3b. Edit the file `server/api/item/item.model.js` and set the schema to:

```javascript
var ItemSchema = new Schema({
  name:        String,
  category:    String,
  price:       { type: Number, min: 0, max: 9999.99 },
  qty:         { type: Number, min: 0, max: 999 },
  rating:      { type: Number, min: 0, max: 5.0 },
  description: String,
  imageFile:   String
});
```

Add the following to the `server/config/seed.js` file:

```javascript
var Item = require('../api/item/item.model');

Item.find().remove(function() {
  Item.create(
    {
      category: 'Tents',
      name: '1-person Tent',
      price: 119.99,
      qty: 1,
      rating: 3.8,
      description: 'A very small tent.',
      imageFile: '1_person_tent.jpg'
    },
    {
      category: 'Tents',
      name: '2-person Tent',
      price: 169.99,
      qty: 1,
      rating: 4.4,
      description: 'Just right for 2 people.',
      imageFile: '2_person_tent.jpg'
    },
    {
      category: 'Tents',
      name: '3-person Tent',
      price: 249.99,
      qty: 1,
      rating: 3.5,
      description: '3 is a crowd!',
      imageFile: '3_person_tent.jpg'
    },
    {
      category: 'Tents',
      name: '4-person Tent',
      price: 319.99,
      qty: 1,
      rating: 4.7,
      description: 'Fit for a family.',
      imageFile: '4_person_tent.jpg'
    },
    {
      category: 'Flashlights',
      name: 'Small Flashlight',
      price:   6.99,
      qty: 1,
      rating: 4.0,
      description: 'A very small flashlight.',
      imageFile: 'small_flashlight.jpg'
    },
    {
      category: 'Flashlights',
      name: 'Large Flashlight',
      price:  12.99,
      qty: 1,
      rating: 4.3,
      description: 'A big, powerful flashlight.',
      imageFile: 'large_flashlight.jpg'
    },
    {
      category: 'Water Bottles',
      name: 'Small Water Bottle',
      price:   2.99,
      qty: 1,
      rating: 2.7,
      description: 'Holds 16 ounces.',
      imageFile: 'small_water_bottle.jpg'
    },
    {
      category: 'Water Bottles',
      name: 'Large Water Bottle',
      price:   2.99,
      qty: 1,
      rating: 3.1,
      description: 'Holds 32 ounces.',
      imageFile: 'large_water_bottle.jpg'
    },
    {
      category: 'Stoves',
      name: 'Small Stove',
      price:  29.99,
      qty: 1,
      rating: 3.5,
      description: 'Has 1 burner.',
      imageFile: 'small_stove.jpg'
    },
    {
      category: 'Stoves',
      name: 'Large Stove',
      price:  39.99,
      qty: 1,
      rating: 4.7,
      description: 'Has 2 burners.',
      imageFile: 'large_stove.jpg'
    },
    {
      category: 'Sleeping Bags',
      name: 'Simple Sleeping Bag',
      price:  49.99,
      qty: 1,
      rating: 4.4,
      description: 'A simple mummy bag.',
      imageFile: 'simple_sleeping_bag.jpg'
    },
    {
      category: 'Sleeping Bags',
      name: 'Deluxe Sleeping Bag',
      price:  79.99,
      qty: 1,
      rating: 4.8,
      description: 'Will keep you warm in very cold weather!',
      imageFile: 'deluxe_sleeping_bag.png'
    },
    function() {
      Item.find(function (err, items) {
        if (err) { console.log(err); }
        else {
          console.log('Finished populating ' + items.length + ' items.');
        }
      });
    }
  );
});
```

If you have `grunt serve` running and you save the `seed.js` file you should
see the message "Finished populating 12 items."
You can also verify that the seed data was saved to `mongodb` using a tool
like [mongo-express](http://andzdroid.github.io/mongo-express/).

3c. Commit your work

```bash
git add -A
git commit -m "Created a RESTful API Endpoint and Seed Data for Items."
git tag step3
```

### Step 4 - Create a New Client Route for Items

4a. Use the Yeoman generator to create a new client route for our items view:

```bash
yo angular-fullstack:route items
```

4b. Edit the file `client/components/navbar/navbar.controller.js` and set the
menu items to the following:

```javascript
  $scope.menu = [
    {
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'Items',
      'link': '/items'
    }
  ];
```

4c. Remove the navbar include from the following files:

  * client/app/account/login/login.html
  * client/app/account/settings/settings.html
  * client/app/account/signup/signup.html
  * client/app/admin/admin.html
  * client/app/main/main.html

and add it to `client/index.html` just above the line that reads `<div ui-view=""></div>`:

```html
<div ng-include="'components/navbar/navbar.html'"></div>
<div ui-view=""></div>
```

4d. Commit your work

```bash
git add -A
git commit -m "Created a new Client Route for Items."
git tag step4
```

### Step 5 - Create ItemService and CartService

5a. Use the Yeoman generator to create two new client services:

```bash
yo angular-fullstack:service itemService
? Where would you like to create this service? client/app/items

yo angular-fullstack:service cartService
? Where would you like to create this service? client/app/
```

5b. Edit `client/app/items/itemService/itemService.service.js` and set its contents to:

```javascript
'use strict';

angular.module('gaCampingStoreApp')
.service('itemService', function() {

  var that = this;

  that.findItemById = function(id) {
    var itemId = parseInt(id);
    return _.find(that.inventory, function(item) {
      return item._id === parseInt(itemId);
    });
  };

  // TODO: eventually we want to fetch the inventory from the server.
  that.inventory = [
   {
     _id: 1,
     category: 'Tents',
     name: '1-person Tent',
     price: 119.99,
     qty: 1,
     rating: 3.8,
     description: 'A very small tent.',
     imageFile: '1_person_tent.jpg'
   },
   {
     _id: 2,
     category: 'Tents',
     name: '2-person Tent',
     price: 169.99,
     qty: 1,
     rating: 4.4,
     description: 'Just right for 2 people.',
     imageFile: '2_person_tent.jpg'
   },
   {
     _id: 3,
     category: 'Tents',
     name: '3-person Tent',
     price: 249.99,
     qty: 1,
     rating: 3.5,
     description: '3 is a crowd!',
     imageFile: '3_person_tent.jpg'
   },
   {
     _id: 4,
     category: 'Tents',
     name: '4-person Tent',
     price: 319.99,
     qty: 1,
     rating: 4.7,
     description: 'Fit for a family.',
     imageFile: '4_person_tent.jpg'
   },
   {
     _id: 5,
     category: 'Flashlights',
     name: 'Small Flashlight',
     price:   6.99,
     qty: 1,
     rating: 4.0,
     description: 'A very small flashlight.',
     imageFile: 'small_flashlight.jpg'
   },
   {
     _id: 6,
     category: 'Flashlights',
     name: 'Large Flashlight',
     price:  12.99,
     qty: 1,
     rating: 4.3,
     description: 'A big, powerful flashlight.',
     imageFile: 'large_flashlight.jpg'
   },
   {
     _id: 7,
     category: 'Water Bottles',
     name: 'Small Water Bottle',
     price:   2.99,
     qty: 1,
     rating: 2.7,
     description: 'Holds 16 ounces.',
     imageFile: 'small_water_bottle.jpg'
   },
   {
     _id: 8,
     category: 'Water Bottles',
     name: 'Large Water Bottle',
     price:   2.99,
     qty: 1,
     rating: 3.1,
     description: 'Holds 32 ounces.',
     imageFile: 'large_water_bottle.jpg'
   },
   {
     _id: 9,
     category: 'Stoves',
     name: 'Small Stove',
     price:  29.99,
     qty: 1,
     rating: 3.5,
     description: 'Has 1 burner.',
     imageFile: 'small_stove.jpg'
   },
   {
     _id: 10,
     category: 'Stoves',
     name: 'Large Stove',
     price:  39.99,
     qty: 1,
     rating: 4.7,
     description: 'Has 2 burners.',
     imageFile: 'large_stove.jpg'
   },
   {
     _id: 11,
     category: 'Sleeping Bags',
     name: 'Simple Sleeping Bag',
     price:  49.99,
     qty: 1,
     rating: 4.4,
     description: 'A simple mummy bag.',
     imageFile: 'simple_sleeping_bag.jpg'
   },
   {
     _id: 12,
     category: 'Sleeping Bags',
     name: 'Deluxe Sleeping Bag',
     price:  79.99,
     qty: 1,
     rating: 4.8,
     description: 'Will keep you warm in very cold weather!',
     imageFile: 'deluxe_sleeping_bag.png'
   }
  ];
});
```

5c. Edit `client/app/cartService/cartService.service.js` and set its contents to:

```javascript
'use strict';

angular.module('gaCampingStoreApp')
.service('cartService', function() {

  var that = this;

  that.cart = [];

  function findItemById(items, id) {
    return _.find(items, function(item) {
      return item._id === id;
    });
  }

  that.addItem = function(item) {
    var found = findItemById(that.cart, item._id);
    if (found) {
      found.qty += item.qty;
    }
    else {
      that.cart.push(angular.copy(item));
    }
  };

  that.removeItem = function(item) {
    var index = that.cart.indexOf(item);
    that.cart.splice(index, 1);
  };

  that.getCost = function(item) {
    return item.qty * item.price;
  };

  that.getTotal = function() {
    return _.reduce(that.cart, function(sum, item) {
      return sum + that.getCost(item);
    }, 0);
  };

  that.clearCart = function() {
    that.cart.length = 0;
  };
});
```

5d. Commit your work

```bash
git add -A
git commit -m "Created ItemService and CartService."
git tag step5
```

### Step 6 - Implement the Items Controller and Items Filter

6a. Edit `client/app/items/items.controller.js` and set its content to:

```javascript
'use strict';

angular.module('gaCampingStoreApp')
.controller('ItemsCtrl', function($state, itemService, cartService) {

  this.searchText = '';
  this.inventory = itemService.inventory;
  this.cart = cartService.cart;

  this.addItem = function(item) {
    cartService.addItem(item);
  };

  this.removeItem = function(item) {
    cartService.removeItem(item);
  };

  this.getCost = function(item) {
    return cartService.getCost(item);
  };

  this.getTotal = function() {
    return cartService.getTotal();
  };

  this.clearCart = function() {
    return cartService.clearCart();
  };

  this.goItem = function (item) {
    console.log('goItem: ' + item._id);
    $state.go( 'itemDetail', { itemId : item._id } );
  };
});
```

6b. Use the Yeoman generator to create a new AngularJS filter for our Item Search feature.

```bash
$ yo angular-fullstack:filter itemFilter
? Where would you like to create this filter? client/app/items
```

6c. Put the following code into `client/app/items/itemFilter/itemFilter.filter.js`:

```javascript
'use strict';

angular.module('gaCampingStoreApp')
.filter('itemFilter', function () {
  function isMatch(str, pattern) {
    return str.toLowerCase().indexOf(pattern.toLowerCase()) !== -1;
  }

  return function(inventory, searchText) {
    var items = {
        searchText: searchText,
        out: []
    };
    angular.forEach(inventory, function (item) {
      if (isMatch(item.category   , this.searchText) ||
          isMatch(item.name       , this.searchText) ||
          isMatch(item.description, this.searchText) ) {
        this.out.push(item);
      }
    }, items);
    return items.out;
  };
});
```

6d. Commit your work

```bash
git add -A
git commit -m "Implemented the Items Controller and Items Filter."
git tag step6
```

### Step 7 - Implement the Items View

7a. Edit `client/app/items/items.html` and replace its contents with:

```html
<section class="container search">
  <form class="navbar-form" role="search">
    <div class="form-group">
      <input type="text" class="form-control" name="search" ng-model="ctrl.searchText" placeholder="Search">
    </div>
    <button type="clear" class="btn btn-warning"
            ng-click="ctrl.searchText = ''">Reset</button>
  </form>
</section>

<section class="container items">
  <div class="list-group">
    <div class="row">
      <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 animate-inventory"
           ng-repeat="item in filteredItems = ( ctrl.inventory | itemFilter : ctrl.searchText | orderBy: ['category', 'price'] )">
        <a ng-click="ctrl.goItem(item)" class="list-group-item">
          <h3>{{ item.name }}</h3>
          <article class="row">
            <div class="col-xs-5">
              <img class="middle" width=96px ng-src="/assets/images/{{item.imageFile}}"/>
            </div>
            <div class="col-xs-7">
              <dl class="dl-horizontal">
                <dt>Category:</dt>
                <dd>{{ item.category }}</dd>
                <dt>Price:</dt>
                <dd>{{ item.price | currency }}</dd>
                <dt>Rating:</dt>
                <dd>{{ item.rating }} / 5</dd>
              </dl>
            </div>
          </article>
        </a>
        <div class="text-center">
          <button class="btn btn-sm btn-success" ng-click="ctrl.addItem(item)">Add to Cart</button>
        </div>
      </div>
      <div class="animate-inventory text-center" ng-hide="filteredItems.length">
        <h3>No items match your search.</h3>
      </div>
    </div>
  </div>
</section>

<section class="cart text-center">
  <h2>Your Cart:</h2>
  <ul>
    <li class="cart animate-cart" ng-repeat="item in ctrl.cart">
      <span>{{ item.qty + ' x ' + item.description + ' = ' + (ctrl.getCost(item) | currency) }}</span>
      <button class="btn btn-danger btn-xs" ng-click="ctrl.removeItem(item)">Remove Item</button>
    </li>
  </ul>
  <h3>Total: {{ ctrl.getTotal() | currency }}</h3>
  <br>
  <button class="btn btn-danger" ng-click="ctrl.clearCart()">Clear Cart</button>
</section>
```

7b. Edit `client/app/app.scss` and add the following after the `browsehappy` rule:

```css
.thumbnail {
  height: 200px;

  img.pull-right {
    width: 50px;
  }
}

/* Space out content a bit */
body {
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Everything but the jumbotron gets side spacing for mobile first views */
.header,
.marketing,
.footer {
  padding-left: 15px;
  padding-right: 15px;
}

/* Custom page header */
.header {
  border-bottom: 1px solid #e5e5e5;

  /* Make the masthead heading the same height as the navigation */
  h3 {
    margin-top: 0;
    margin-bottom: 0;
    line-height: 40px;
    padding-bottom: 19px;
  }
}

/* Custom page footer */
.footer {
  padding-top: 19px;
  color: #777;
  border-top: 1px solid #e5e5e5;
}

.container-narrow > hr {
  margin: 30px 0;
}

/* Main marketing message and sign up button */
.jumbotron {
  text-align: center;
  border-bottom: 1px solid #e5e5e5;

  .btn {
    font-size: 21px;
    padding: 14px 24px;
  }
}

/* Supporting marketing content */
.marketing {
  margin: 40px 0;

  p + h4 {
    margin-top: 28px;
  }
}

/* Responsive: Portrait tablets and up */
@media screen and (min-width: 768px) {
  .container {
    max-width: 900px;
  }

  /* Remove the padding we set earlier */
  .header,
  .marketing,
  .footer {
    padding-left: 0;
    padding-right: 0;
  }
  /* Space out the masthead */
  .header {
    margin-bottom: 30px;
  }
  /* Remove the bottom border on the jumbotron for visual effect */
  .jumbotron {
    border-bottom: 0;
  }
}
```

7c. Edit `client/app/items/items.scss` and add the following content:

```css
.cart {
  padding: 10px;

  ul {
    list-style-type: none;
  }
}

.on-sale {
  color: red;
}

.qty {
  width: 60px;
}

$animation-duration: 0.25s;

.animate-inventory {
  &.ng-enter {
    animation: zoomInUp 0.5s;
  }
  &.ng-leave {
    animation: zoomOutDown 0.5s;
  }
}

.animate-cart {
  &.ng-enter {
    animation: fadeInRight 1s;
  }
  &.ng-leave {
    animation: fadeOutLeft 1s;
  }
}

/* =========================== */
/* Twitter Bootstrap Overrides */
/* =========================== */
.jumbotron {
  text-align: center;
  padding: 2px 0;
  margin-bottom: 0;
}

.list-group-item {
  border: none;
}

.dl-horizontal dt {
    text-align: left;
    /*margin-bottom: 1em;*/
    /*width: auto;*/
    padding-right: 1em;
}

.dl-horizontal dd {
    margin-left: 0;
    margin-bottom: 1em;
}
/* ================================== */
/* End of Twitter Bootstrap Overrides */
/* ================================== */

.items {
  padding-left: 0;
  padding-right: 30px;
}

.items p {
  font-size: 2.0rem;
  margin-left: 20px;
}

.items h3 {
  color: #337ab7;
}

.item {
  margin-top: 30px;
}

.item h2 {
  margin-bottom: 20px;
}

.item-image {
  margin-top: 0px;
  margin-left: 20px;
}

.item-image img {
}

.back {
  margin-top: 40px;
}

.search {
  text-align: center;
}
```

7d. Copy the camping store images for our items into this project:

Open a new terminal window and run the following from your project directory:

```bash
pushd <clone_of_fork_of_student_repo>
git pull upstream master
cd labs/mean/camping_store_images
image_dir=`pwd`
popd
cd client/assets/images
cp $image_dir/* .
cd ../../..
```

7e. Commit your work

```bash
git add -A
git commit -m "Implemented the Items Views and CSS."
git tag step7
```

### Step 8 - Create a New Route for the Items Detail View

8a. Use the Yeoman generator to create a new client route for our items view:

```bash
yo angular-fullstack:route itemDetail
```

8b. Edit `client/app/itemDetail/itemDetail.js` and set the content to:

```javascript
'use strict';

angular.module('gaCampingStoreApp')
.config(function ($stateProvider) {
  $stateProvider
  .state('itemDetail', {
      url: '/items/:itemId',
      templateUrl: 'app/itemDetail/itemDetail.html',
      controller: 'ItemDetailCtrl as ctrl',
      onEnter: function() {
        console.log('Entering itemDetail');
      },
      onExit: function() {
        console.log('Leaving itemDetail');
      }
    });
});
```

8c. Edit `client/app/itemDetail/itemDetail.controller.js` and set the content to:

```javascript
'use strict';

angular.module('gaCampingStoreApp')
.controller('ItemDetailCtrl', function($stateParams, itemService) {
  var id = $stateParams.itemId;
  this.item = itemService.findItemById(id);
});
```

8d. Edit `client/app/itemDetail/itemDetail.html` and set the content to:

```html
<section class="container-fluid item">
  <div class="row">
    <h2 class="text-center">{{ ctrl.item.name }}</h2>
    <div class="col-md-4 col-md-offset-2">
      <dl class="dl-horizontal">
        <dt>Category:</dt>
        <dd>{{ ctrl.item.category }}</dd>
        <dt>Price:</dt>
        <dd>{{ ctrl.item.price | currency }}</dd>
        <dt>Rating:</dt>
        <dd>{{ ctrl.item.rating }} / 5</dd>
        <dt>Description:</dt>
        <dd>{{ ctrl.item.description }}</dd>
      </dl>

      <div class="back">
        <button type="button"
                class="btn btn-primary"
                onclick="window.history.back()">Back</button>
      </div>
    </div>

    <div class="col-md-4 item-image">
      <img class="middle" width=200px ng-src="/assets/images/{{ctrl.item.imageFile}}"/>
    </div>
  </div>
</section>
```

8e. Commit your work:

```bash
git add -A
git commit -m "Implemented the Items Detail View."
git tag step8
```

### Step 9 - Call the Server to get the Items

9a. Edit `client/app/items/itemService/itemService.service.js` and remove the
inventory. Then re-implement the `findItemById` method and add the `getItems` method:

```javascript
  that.findItemById = function(id) {
    return $http.get('/api/items/' + id);
  };

  that.getItems = function() {
    return $http.get('/api/items');
  };
```

9b. Edit `client/app/items/items.controller.js` and replace the line

`this.inventory = itemService.inventory;`

with:

```javascript
itemService.getItems().then(function(json) {
  that.inventory = json.data;
});
```

9c. Edit `client/app/itemDetail/itemDetail.controller.js` and change the line

`that.item = itemService.findItemById(id);`

to:

```javascript
itemService.findItemById(id).then(function(json) {
  that.item = json.data;
});
```

9d. Commit your work:

```bash
git add -A
git commit -m "Integrated the client with the server for getting the items."
git tag step9
```

### Step 10 - Add RESTful endpoints and model for Shopping Cart.

In this step we will be saving the user's shopping cart to the MongoDB
database.  Each time a user adds or removes an item from the shopping cart
an update will occur to keep the cart up to date in the database.

We will begin by creating a set of RESTful endpoints along with a server
controller, model, and schema. The RESTful endpoints will be:

```
GET    /api/users/:userid/cart/            # Get the cart
POST   /api/users/:userid/cart/            # Add an item to the cart
DELETE /api/users/:userid/cart/:itemid     # Remove an item from the cart
DELETE /api/users/:userid/cart/            # Remove all items from the cart
```

10a. Use the Yeoman generator to create the new RESTful endpoint for our cart:

```bash
yo angular-fullstack:endpoint cart
```

For the url of the endpoint, enter: `/api/users/:userId/cart`.

10b. Edit `server/api/cart/index.js` and replace the routes with the following:

```javascript
router.get   ('/:userid/cart/',        controller.get);
router.post  ('/:userid/cart/:itemid', controller.addItem);
router.delete('/:userid/cart/:itemid', controller.removeItem);
router.delete('/:userid/cart/',        controller.removeAllItems);
```

10c. Rename `server/api/cart/cart.model.js` to `server/api/cart/cartitem.model.js`
and sets its contents to:

```javascript
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CartItemSchema = new Schema({
  item : {
    type : Schema.Types.ObjectId,
    ref: 'Item'
  },
  qty : Number
});

module.exports = mongoose.model('CartItem', CartItemSchema);
```

10d. Edit `server/api/user/user.model.js` and add the lines:

```javascript
// add this near the top:
var CartItem = require('../cart/cartitem.model');

...
  // add this to the UserSchema:
  cart: [CartItem.schema]
```

10e. Replace the contents of `server/api/cart/cart.controller.js` with:

```javascript
'use strict';

var _ = require('lodash');
var CartItem = require('./cartitem.model');
var Item = require('../item/item.model');
var User = require('../user/user.model');

function findItemInCart(user, id) {
  // _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
  return _.find(user.cart, function(cartItem) {
    // return cartItem.item === id;    // does not work!
    console.log('Comparing ' + cartItem.item + ' to ' + id);
    return cartItem.item.equals(id) || cartItem._id.equals(id);
  });
}

// Get the cart from the DB.
exports.get = function(req, res) {
  console.log('get, url = ' + req.url);
  var userId = req.params.userid;
  console.log('userId: ' + userId);

  User.findById(userId)
  .populate('cart.item')
  .exec(function(err, user) {
    console.log('user: ' + user.name);
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }
    console.log('returning cart: ' + JSON.stringify(user.cart));
    res.json(200, user.cart);
  });
};

// Add a new item to the cart or update the qty and return the cart.
exports.addItem = function(req, res) {
  console.log('addItem, url = ' + req.url);
  var userId = req.params.userid.trim();
  var itemId = req.params.itemid.trim();
  console.log('userId: ' + userId + ', itemId: ' + itemId);

  Item.findById(itemId, function(err, item) {
    if (err) { return handleError(res, err); }
    if (!item) { return res.send(404); }
    User.findById(userId, function(err, user) {
      if (err) { return handleError(res, err); }
      if (!user) { return res.send(404); }

      // Check if item is already in cart
      var found = findItemInCart(user, item._id);
      if (found) {
        console.log('Found item ' + item.name + ' in cart, therefore incrementing qty');
        found.qty = found.qty + 1;
      }
      else {
        console.log('Adding item to cart: ' + item.name);
        user.cart.push( new CartItem( { item: item, qty: 1 } ) );
      }
      user.save(function() {
        user.populate('cart.item', function(err, user) {
          return res.json(201, user.cart );
        });
      });
    });
  });
};

// Remove an item from the cart and return the cart.
exports.removeItem = function(req, res) {
  console.log('removeItem, url = ' + req.url);
  var userId = req.params.userid;
  var cartItemId = req.params.itemid;
  console.log('userId: ' + userId + ', cartItemId: ' + cartItemId);

  // Remove the item, get the updated cart, and return the cart
  User.findById(userId, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }

    // Check if item is already in cart
    var found = findItemInCart(user, cartItemId);
    if (found) {
      console.log('Removing item from cart');
      user.cart.pull(found._id);               // pull is a feature of MongooseArray!
    }
    else {
      return res.send(404);
    }
    user.save(function() {
      user.populate('cart.item', function(err, user) {
        return res.json(201, user.cart );
      });
    });
  });
};

// Remove all items from the cart in the DB.
exports.removeAllItems = function(req, res) {
  console.log('removeAllItems, url = ' + req.url);
  var userId = req.params.userid;
  console.log('userId: ' + userId);

  // remove all items from cart and return the cart
  User.findById(userId, function(err, user) {
    if (err) { return handleError(res, err); }
    if (!user) { return res.send(404); }

    user.cart = new Array();
    user.save(function() {
      user.populate('cart.item', function(err, user) {
        return res.send(204, user.cart);
      });
    });
  });
}

function handleError(res, err) {
  return res.send(500, err);
}
```

10f. Edit `server/routes.js` and replace the line:

`app.use('/api/users/:userId/cart', require('./api/cart'));`

with:

`app.use('/api/users',  require('./api/cart'));`

10g. Commit your work:

```bash
git add -A
git commit -m "Added RESTful endpoints and model for Shopping Cart."
git tag step10
```

## Step 11 - Integrate the Client Cart with the Server Cart

11a. Edit `client/app/cartService/cartService.service.js` and set its contents to:

```javascript
'use strict';

angular.module('gaCampingStoreApp')
.service('cartService', function($http, Auth) {

  var that = this;

  that.getCart = function() {
    var userId = Auth.getCurrentUser()._id;
    return $http.get('/api/users/' + userId + '/cart/');
  };

  that.addItem = function(item) {
    var userId = Auth.getCurrentUser()._id;
    return $http.post('/api/users/' + userId + '/cart/' + item._id);
  };

  that.removeItem = function(cartItem) {
    var userId = Auth.getCurrentUser()._id;
    return $http.delete('/api/users/' + userId + '/cart/' + cartItem._id);
  };

  that.getCost = function(cartItem) {
    return cartItem.qty * cartItem.item.price;
  };

  that.getTotal = function(cart) {
    var total = _.reduce(cart, function(sum, cartItem) {
      return sum + that.getCost(cartItem);
    }, 0);
    return total;
  };

  that.clearCart = function() {
    var userId = Auth.getCurrentUser()._id;
    return $http.delete('/api/users/' + userId + '/cart/');
  };
});
```

11b. Edit `client/app/items/items.controller.js` and set its contents to:

```javascript
'use strict';

angular.module('gaCampingStoreApp')
.controller('ItemsCtrl', function($state, itemService, cartService) {

  var that = this;

  that.searchText = '';
  that.total = 0;

  that.getInventory = function() {
    itemService.getItems().then(function(json) {
      that.inventory = json.data;
    });
  };

  cartService.getCart().then(function(json) {
    that.cart = json.data;
    that.total = cartService.getTotal(that.cart);
  });

  that.getInventory();

  that.addItem = function(item) {
    cartService.addItem(item).then(function(json) {
      that.cart = json.data;
      that.total = cartService.getTotal(that.cart);
    }, function(err) {
      console.log('ERROR: addItem post: ' + JSON.stringify(err));
    });
  };

  that.removeItem = function(item) {
    cartService.removeItem(item).then(function(json) {
      that.cart = json.data;
      that.total = cartService.getTotal(that.cart);
    }, function(err) {
      console.log('ERROR: removeItem delete: ' + JSON.stringify(err));
    });
  };

  that.getCost = function(item) {
    return cartService.getCost(item);
  };

  that.clearCart = function() {
    return cartService.clearCart().then(function(json) {
      that.cart = json.data;
      that.total = cartService.getTotal(that.cart);
    }, function(err) {
      console.log('clearCart delete ERROR: ' + JSON.stringify(err));
    });
  };

  that.goItem = function (item) {
    $state.go( 'itemDetail', { itemId : item._id } );
  };

});
```

11c. Edit `client/app/items/items.html` and replace the last section (the
cart section) with:

```html
<section class="cart text-center">
  <h2>Your Cart:</h2>
  <ul>
    <li class="cart animate-cart2" ng-repeat="cartItem in ctrl.cart">
      <span>{{ cartItem.qty + ' x ' + cartItem.item.name + ' = ' + (ctrl.getCost(cartItem) | currency) }}</span>
      <button class="btn btn-danger btn-xs" ng-click="ctrl.removeItem(cartItem)">Remove Item</button>
    </li>
  </ul>
  <h3>Total: {{ ctrl.total | currency }}</h3>
  <br>
  <button class="btn btn-danger" ng-click="ctrl.clearCart()">Clear Cart</button>
</section>
```

11d. Test it all out:

* Use mongo-express or a similar tool to inspect the `user.cart` documents.
* Try loggin in as the `test` user, add some items to the cart, then logout
  and repeat for the `admin` user. Ensure that both users have different carts
  and that the carts are persistent across logins.

11e. Commit your work:

```bash
git add -A
git commit -m "Integrate the Client Cart with the Server Cart."
git tag step11
```

## Step 12 - Deploying to Heroku

In this step we will deploy our app to Heroku. We generated this project with
the `angular-fullstack` *Yeoman* generator and it provides us with a Yeoman
*subgenerator* for registering our project with Heroku and a `Grunt` task
for deploying to Heroku. Since we will be deploying an app that uses `MongoDB`,
we will need to use the `mongolab` Heroku addon, which at this time requires
a Credit Card to be on file with Heroku. I have not tried using Compose
(formerly MongoHQ) but the file `config/environment/production.js` does appear
to support it. You can read more about Heroku's support of Compose at
[Heroku and MongoHQ](https://devcenter.heroku.com/articles/mongohq).

12a. Register a Credit Card with Heroku to enable the use of the `mongolab`
Heroku addon (you will not be billed):

Use a browser to navigate to [Heroku Verify](https://heroku.com/verify) and enter
your credit card information.

12b. Register this app as an Heroku app using the `heroku` subgenerator:

```bash
yo angular-fullstack:heroku
```

12c. Complete a `grunt build` to ensure that the `dist` directory is up to date:

```bash
grunt build
```

12d. Add the `mongolab:sandbox` Heroku addon:

> Note: You will need to run all `heroku` commands from the `dist` directory:

```bash
cd dist
heroku addons:create mongolab:sandbox
cd ..
```

12e. Deploy the app to Heroku:

Run the following command from the main project directory:

```bash
grunt buildcontrol:heroku
```

Congratulations, you have deployed your app to Heroku!

12f. How to push updates to Heroku:

To push your latest changes to Heroku, simply run the following:

```bash
grunt build    (or you can simply run "grunt")
grunt buildcontrol:heroku
```

### Notes on Deploying to Heroku

> Note A: Running the seed.js file in `production`:

To get your seed.js file to run in the `production` environment, you will
need to edit the file `server/config/environment/index.js` and search for
"seedDB" and set its value to true:

```
...
seedDB: true,       // change this value from false to true
...
```

Then simply rebuild and redeploy via:

```bash
grunt build
grunt buildcontrol:heroku
```

> Note B: Turning off revision / renaming of image files:

I had to disable the `rev` task for images so that the image paths in the
DB data would match the names of the files in the `dist` folder.

> Note C: Additional instructions for configuring OAuth providers:

After running `yo angular-fullstack:heroku` you will get the following message
which includes instructions on configuring the OAuth providers:

```
Because you're using mongoose, you must add mongoDB to your heroku app.
  from `/dist`: heroku addons:add mongohq

You will need to set environment variables for facebook auth. From `/dist`:
  heroku config:set FACEBOOK_ID=appId
  heroku config:set FACEBOOK_SECRET=secret

You will need to set environment variables for google auth. From `/dist`:
  heroku config:set GOOGLE_ID=appId
  heroku config:set GOOGLE_SECRET=secret

You will need to set environment variables for twitter auth. From `/dist`:
  heroku config:set TWITTER_ID=appId
  heroku config:set TWITTER_SECRET=secret


Your app should now be live. To view it run
  cd dist && heroku open

You may need to address the issues mentioned above and restart the server for the app to work correctly.
After app modification run
  grunt build
Then deploy with
  grunt buildcontrol:heroku
```
