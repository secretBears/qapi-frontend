'use strict';

function addFunctionToNavigator(){
  navigator.geolocation = {
    getCurrentPosition: function(success){
      var lat = 47.80949;
      var lon = 13.05501;
      success({coords: {latitude: lat, longitude: lon}});
    }
  };
}

describe('Controller: PlayCtrl', function () {

  // load the controller's module
  beforeEach(module('qapiFrontendApp'));

  var PlayCtrl,
      scope,
      httpBackend,
      url = /http:\/\/qapi\.herokuapp\.com\/api\/47\.80949\/13\.05501\?token=42beedb22b46732fc57c88a6b31424a0&_=\d+/;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    //TODO: find a better way
    addFunctionToNavigator();
    //Try it with spyOn
    //spyOn(navigator, 'geolocation.getCurrentPosition').andReturn({coords: {latitude: 47.809490, longitude: 13.055010}});

    scope = $rootScope.$new();
    PlayCtrl = $controller('PlayCtrl', {
      $scope: scope
    });

    httpBackend = $injector.get('$httpBackend');
    httpBackend.when('GET', url).respond({'id':18,'question':'Frage 18','place':'Salzburg','answers':[{'answer':'18 answer 1','isTrue':false},{'answer':'18 answer 2','isTrue':true},{'answer':'18 answer 3','isTrue':false},{'answer':'18 answer 4','isTrue':false}]});
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should create an instance of Game', function(){
    httpBackend.flush();
    expect(angular.isUndefined(scope.game)).toBe(false);
  });

  it('should respond a question with 4 answers', function(){
    httpBackend.flush();
    var question = scope.game.question;
    expect(angular.isUndefined(question)).toBe(false);
    expect(typeof(question) === 'object').toBe(true);
    expect(question.answers.length).toBe(4);
  });

  it('should set menuhidden to true at start', function(){
    httpBackend.flush();
    expect(scope.menuhidden).toBe(true);
  });

  it('should toggle menuhidden', function(){
    httpBackend.flush();
    expect(scope.menuhidden).toBe(true);
    scope.toggleMenu();
    expect(scope.menuhidden).toBe(false);
    scope.toggleMenu();
    expect(scope.menuhidden).toBe(true);
  });

});
