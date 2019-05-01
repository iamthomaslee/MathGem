//Define an angular module for our app
var app = angular.module('mathApp', []).constant('_', window._);
app.controller('appController', function ($scope, $http, $window, $timeout) {
    var _ = $window._;
    $scope.model = {
        firstDigit: 3,
		secondDigit: 2,
		numberOfQuestions: 100,
		operator: "Multiplication",
		questions: [],
		answers: [],
		maximumFirst: 5,
		maximumSecond: 5,
		isPositive: false
    };

    //functions
	$scope.onClickGenerate = onClickGenerate;
    activate();
	
	// limit the length of the first digit up to 5
	$scope.$watch("model.firstDigit", function (newValue, oldValue) {
        if (newValue && newValue != oldValue) {
			if (newValue <= 5) {
				//onClickGenerate ();	
			} else {
				$scope.model.firstDigit = $scope.model.maximumFirst;
			}
        } else if (newValue <= 0) {
			$scope.model.firstDigit = 1;
		}
    });
	
	// limit the length of the second digit up to 5
	$scope.$watch("model.secondDigit", function (newValue, oldValue) {
        if (newValue && newValue != oldValue) {
			if (newValue <= 5) {
				//onClickGenerate ();	
			} else {
				$scope.model.secondDigit = $scope.model.maximumSecond;
			}
        } else if (newValue <= 0) {
			$scope.model.secondDigit = 1;
		}
    });
	
	// limit the number of questions between 1 to 1000
	$scope.$watch("model.numberOfQuestions", function (newValue, oldValue) {
        if (newValue && newValue != oldValue) {
			if (newValue <= 1000) {
				//onClickGenerate ();	
			} else {
				$scope.model.numberOfQuestions = oldValue;
			}
        } else if (newValue <= 0) {
			$scope.model.numberOfQuestions = 1;
		}
    });
	
	$scope.$watch("model.operator", function (newValue, oldValue) {
        if (newValue != oldValue) {
					getAnswer();
        }
		});

    function activate() {
		for (var i = 0; i<$scope.model.numberOfQuestions; i++) {
			generate();	
		}
		getAnswer();
    };
	
	function onClickGenerate() {
		$scope.model.questions = [];
		for (var i = 0; i<$scope.model.numberOfQuestions; i++) {
			generate();	
		}
		getAnswer();
	}
	
	function generate() {
		var number_1 = 0;
		do {
			number_1 = Math.round(Math.random()*Math.pow(10,$scope.model.firstDigit));	
		}
		while(number_1 >= Math.pow(10,$scope.model.firstDigit) || number_1 < Math.pow(10,$scope.model.firstDigit-1))
		
		var number_2 = 0;
		do {
			number_2 = Math.round(Math.random()*Math.pow(10,$scope.model.secondDigit));
		}
		while(number_2 >= Math.pow(10,$scope.model.secondDigit) || number_2 < Math.pow(10,$scope.model.secondDigit-1))

		if ($scope.model.isPositive == true && number_1 < number_2) {
			var temp_num = number_1;
			number_1 = number_2;
			number_2 = temp_num;
		}
		
		$scope.model.questions.push({
			number_1: number_1,
			number_2: number_2
		});		
	}
	
	function getAnswer() {
		$scope.model.answers = [];
		var result = 0;
		var divResult = 0;
		var divMod = 0;
		for (var i = 0; i < $scope.model.questions.length; i++) {
			if ($scope.model.operator == "Addition") {
				result = $scope.model.questions[i].number_1 + $scope.model.questions[i].number_2;
			} else if ($scope.model.operator == "Subtraction") {
				result = $scope.model.questions[i].number_1 - $scope.model.questions[i].number_2;
			} else if ($scope.model.operator == "Multiplication") {
				result = $scope.model.questions[i].number_1 * $scope.model.questions[i].number_2;
			} else if ($scope.model.operator == "Division") {
				result = $scope.model.questions[i].number_1 / $scope.model.questions[i].number_2;
				divResult = Math.floor(result);
				divMod = $scope.model.questions[i].number_1 % $scope.model.questions[i].number_2;
			}

			var resultString = ($scope.model.operator == "Division") ? result.toLocaleString() + " (" + divResult + "..." + divMod + ")" : result.toLocaleString();
			$scope.model.answers.push({
				answer: resultString
			});
		}
	}
});