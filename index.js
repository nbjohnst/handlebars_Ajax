$(function() {
    var root = 'http://jsonplaceholder.typicode.com'
    
    var userTmpl = Handlebars.compile($('#user-template').html())
    var postTmpl = Handlebars.compile($('#post-template').html())

    $.get(root + '/users')
        .then(function(users){
            users.forEach(function (user){
                var user_context = {
                    author: user.name,
                    website: user.website,
                    id: 'user_' + user.id
                }
                $('main').append(userTmpl(user_context));
                $.get(root + '/users/' + user.id + '/posts')
                    .then(function (userPosts) {
                        userPosts.forEach(function (userPost) {
                            var post_context = {
                                title: userPost.title,
                                body: userPost.body
                            }
                            $('#user_' + user.id).append(postTmpl(post_context));
                        })
                    })  
                })
            })
            .fail(function (){
                console.log('I got an error!')
            })
})