app.filter('range', function(){
   return function(input,total){
      total = parseInt(total);
      for(var i = 1; i<total+1;i++)
         input.push(i);
      return input;
   }
});

// app.service('customersList', function(CustomersFactory){
// 	var customers = [];
// 	return {
// 		getCustomers: function(){
// 			CustomersFactory.getCustomers(function(customers){
// 				that.customers = customers;
// 			});
// 		}
// 	};
// })