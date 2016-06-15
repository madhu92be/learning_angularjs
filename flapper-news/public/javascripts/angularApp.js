var app = angular.module('flapperNews',['ui.router']);

app.controller('MainCtrl',['$scope','posts',function($scope,posts){
  $scope.test = 'Hello World';

  // $scope.post2=[
  //   {title: 'post 1', upvotes: 5},
  //   {title: 'post 2', upvotes: 3},
  //   {title: 'post 3', upvotes: 6},
  //   {title: 'post 4', upvotes: 10},
  // ];
  // $scope.addPost = function(){
  //   $scope.post2.push({title: 'post 5', upvotes: 11});
  // };
  // $scope.addPost2 = function(){
  //   if(!$scope.title || $scope.title==='') return;
  //   $scope.post2.push({title: $scope.title, upvotes: 11});
  //   $scope.title="";
  // };
  $scope.post2 = posts.posts;
  $scope.addPost2 = function(){
    if(!$scope.title || $scope.title==='') return;
    $scope.post2.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0,
      comments: [
        {author: 'Joe', body: 'Cool post!', upvotes: 0},
        {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
      ]
    });
    $scope.title= "";
    $scope.link= "";
  };
  $scope.incrementUpvotes = function(post){
      post.upvotes += 1;
  };


}]);

app.controller('PostsCtrl',['$scope','$stateParams','posts',function($scope,$stateParams,posts) {
  $scope.post =  posts.posts[$stateParams.id];
}]);

app.factory('posts',[function() {
  var o ={
    posts:[
    {title: 'post 1', upvotes: 5},
    {title: 'post 2', upvotes: 3},
    {title: 'post 3', upvotes: 6},
    {title: 'post 4', upvotes: 10},    ]
  };
  return o;
}]);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
    $stateProvider.state('home',{
      url:'/home',
      templateUrl:'/home.html',
      controller:'MainCtrl'
    }).state('posts',{
      url:'/posts/{id}',
      templateUrl:'/posts.html',
      controller:'PostsCtrl'
    });

    $urlRouterProvider.otherwise('home');
}]);

