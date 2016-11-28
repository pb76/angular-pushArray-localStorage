var minaControllers  = angular.module('minaControllers', []);

minaControllers.controller('AppController', function AppController($scope, $http, $log, localStorageService){
    
    console.log('AppController');
    
    //Funktion för att hämta data
    $scope.getData = function(){
	    //Skapar en variabel genom att hämta informationen sparad i LocalStorage. Variabeln i koden döps till localStorageValue, värdet som hämtas har fått nyckeln/id:t localStorageKey.
	    var localStorageValue = localStorageService.get('localStorageKey');
	    //Kontrollerar om om localStorage innehåll någon information.
	    if (localStorageValue!=null){
		    //Om den gör det. Spara det till retur_data i $scope
		    $scope.retur_data = localStorageValue;
	    } else {
		    //Om localStorageValue är tomt hämta från json-fil. Spara det till retur_data i $scope
		    $http.get('data.json').success(function(data){
		        $log.debug(data);
		        $scope.retur_data = data;
		    });
	    }
    }

	//Funktion för att lägga till text från formuläret
    $scope.addText = function() {
    	console.log("Namn: "+ $scope.frmNamn);
    	console.log("Ort: "+ $scope.frmOrt);
    	//Skapar en temporär Array med informationen från formuläret
    	var arrTemp = {"namn": $scope.frmNamn,
    					"ort" : $scope.frmOrt}
    	//Detta skickas in i retur_data (som är en array) via funktionen push.
    	$scope.retur_data.push(arrTemp);
    	console.log($scope.retur_data);
    	//Då return_data nu då innehåller både vår gamla inläsning och det som stod i forumläret. Så kan vi spara allt till LocalStorage
    	//Sparar till LocalStorage
    	localStorageService.set('localStorageKey',$scope.retur_data);

		//Rensar formuläret
    	$scope.frmNamn = '';
    	$scope.frmOrt = '';
    }
    
    //Funktion för att tömma LocalStorage. Mest för att demonstrera hur hämtningen fungerar.
    $scope.reset = function() {
	    //Tömmer LocalStorage med nyckeln/id:t localStorageKey
		localStorageService.remove('localStorageKey');
		//Anropar funktionen för att hämta data.
		$scope.getData();
    }
    //Anropar funktionen för att hämta data.
    $scope.getData();

});