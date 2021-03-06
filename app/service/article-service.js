angular.module('app').factory('articleService',function($http) {

    var articleService = {
        model: {
            list: [],
            item: null
        },
        create:function(data, cb){

            $http.post('http://localhost:3010/article', data)
                .then(function(res){
                    console.log(data);
                    if(cb){
                        cb();
                    }
                });

        },
        getAll:function(cb){

            var promise = $http.get('http://localhost:3010/articles');

            promise.then(function(res){

                articleService.model.list = res.data;

                if(cb){
                    cb(res.data);
                }

            });

            return promise;

        },
        getOne:function(id){

            var promise = $http.get('http://localhost:3010/article/'+id);

            promise.then(function(res){

                console.log(res);
                articleService.model.item = res.data;

            });

            return promise;

        },
        update:function(id, data){

            var promise = $http.put('http://localhost:3010/article/'+id, data);

            promise.then(function(res){

                console.log(res);

            });

            return promise;

        },
        delete:function(id){

            var confirmDelete = confirm('Are you sure?');

            if (confirmDelete === false){
                return false;
            }

            var promise = $http.delete('http://localhost:3010/article/'+id);

            promise.then(function(res){

                angular.forEach(articleService.model.list, function(article, i){

                    if(article._id === id){
                        articleService.model.list.splice(i,1);
                    }

                });
                console.log(res);

            });

        }
    };

    return articleService;
});
