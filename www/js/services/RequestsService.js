(function(){

	angular.module('starter')
	.service('RequestsService', ['$http', '$q', '$ionicLoading',  RequestsService]);

	function RequestsService($http, $q, $ionicLoading){

		//for server
		var base_url = 'your-server.com';

		function register(device_token){

			var deferred = $q.defer();
			$ionicLoading.show();

			$http.post(base_url + '/register', {'device_token': device_token})
				.success(function(response){
					
					$ionicLoading.hide();
					deferred.resolve(response);
					
				})
				.error(function(data){
					deferred.reject();	
				});
			

			return deferred.promise;			

		};


		return {
			register: register
		};
	}
})();