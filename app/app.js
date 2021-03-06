angular.module('app', ['ui.bootstrap','ui.router','ngAnimate', 'ngFileUpload']);

angular.module('app').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('articles', {
        url: '/articles',
        templateUrl: 'partial/articles/articles.html',
        controller: 'ArticlesCtrl',
        resolve:{
            articles:function(articleService){
                return articleService.getAll();
            }
        }
    });
    $stateProvider.state('projects', {
        url: '/projects',
        templateUrl: 'partial/projects/projects.html',
        controller: 'ProjectsCtrl',
        resolve:{
              projects:function(projectService){
                return projectService.getAll();
            }
        }
    });
    $stateProvider.state('new-article', {
        url: '/new-article',
        templateUrl: 'partial/new-article/new-article.html',
        controller:'NewArticleCtrl'
    });
    $stateProvider.state('edit-article', {
        url: '/edit-article/:id',
        templateUrl: 'partial/edit-article/edit-article.html',
        controller: 'EditArticleCtrl',
        resolve:{
            article:function(articleService, $stateParams){
                return articleService.getOne($stateParams.id);
            }
        }
    });
    $stateProvider.state('new-project', {
        url: '/new-project',
        templateUrl: 'partial/new-project/new-project.html',
        controller:'NewProjectCtrl'
    });
    $stateProvider.state('edit-project', {
        url: '/edit-project/:id',
        templateUrl: 'partial/edit-project/edit-project.html',
        controller: 'EditProjectCtrl',
        resolve:{
            project:function(projectService, $stateParams){
                return projectService.getOne($stateParams.id);
            }
        }
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

angular.module('app').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
