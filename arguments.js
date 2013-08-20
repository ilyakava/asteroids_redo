var sum = function () {
  var sum = 0;
  console.log(arguments)
  for (var i = 0; i < arguments.length; i++) {
     sum += arguments[i];
   }
   return sum;
};

// console.log(sum(4,3));

Function.prototype.myBind = function (obj) {
  var that = this;
  var kewl = function () {
    return that.apply(obj, arguments);
  };
  return kewl;
};

var cat = {
  fluff: "yes",
  name: "Curly"
};

var giveName = function () {
  return this.name + " says hi, and " + arguments;
};

// console.log(giveName.bind(cat, 1, 2)());
// console.log(giveName.myBind(cat, 1, 2)());
// console.log(cat)

var curriedSum = function (lim) {
  var count = 0;
  var total = 0;

  var sum = function (arg) {
    total += arg;
    count++;
    if (count < lim) {
      return sum;
    } else {
      return total;
    }
  };
  return sum;
}
// sum = curriedSum(4);
// console.log(sum(1)(1)(3)(5));

var curry = function (funktion, lim) {
  var count = 0;
  var args = [];

  var middleFunction = function (arg) {
    count++;
    args.push(arg);
    if (count < lim) {
      return middleFunction;
    } else {
      return funktion.apply(null,args);
    }
  }
  return middleFunction;
}

// var sum = function() {
//   var total = 0;
//   console.log(arguments)
//   for(var i = 0; i < arguments.length; i++){
//     total += arguments[i];
//   }
//   return total;
// }
//
// var summer = curry(sum,3);
//
// console.log(summer(1)(5)(4));