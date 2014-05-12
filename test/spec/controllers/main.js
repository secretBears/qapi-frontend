'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('qapiFrontendApp'));

  var MainCtrl,
      scope,
      httpBackend,
      url = 'http://qapi.herokuapp.com/api/';

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });

    httpBackend = $injector.get('$httpBackend');
    httpBackend.when('GET', url).respond({'id':18,'question':'Frage 18','place':'Salzburg','answers':[{'answer':'18 answer 1','is_true':false},{'answer':'18 answer 2','is_true':true},{'answer':'18 answer 3','is_true':false},{'answer':'18 answer 4','is_true':false}]});
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should send GET to QAPI', function(){
    httpBackend.expectGET(url);
    httpBackend.flush();
  });

  it('should respond a question with 4 answers', function(){
    httpBackend.flush();
    expect(angular.isUndefined(scope.qapi)).toBe(false);
    expect(typeof(scope.qapi) === 'object').toBe(true);
    expect(scope.qapi.answers.length).toBe(4);
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
