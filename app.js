$(function() {
  let currentUserId = 1;
  const totalUsers = 30;

  
  function loadUser(userId) {
    // user info 
    $.ajax({
      url: `https://dummyjson.com/users/${userId}`,
      method: 'GET',
      success: function(user) {
        $('.info__image img').attr('src', user.image);
        $('.info__content').html(`
          <h2>${user.firstName} ${user.lastName}</h2>
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
          <p>Age: ${user.age}</p>
        `);
      }
    });

    // Posts
    $.ajax({
      url: `https://dummyjson.com/users/${userId}/posts`,
      method: 'GET',
      success: function(data) {
        const ul = $('.posts ul');
        ul.empty();
        $('.posts h3').text('Posts');
        data.posts.forEach(post => {
          ul.append(`<li data-postid="${post.id}"><h4>${post.title}</h4></li>`);
        });
      }
    });

    // TODOS
    $.ajax({
      url: `https://dummyjson.com/users/${userId}/todos`,
      method: 'GET',
      success: function(data) {
        const ul = $('.todos ul');
        ul.empty();
        $('.todos h3').text('To-Dos');
        data.todos.forEach(todo => {
          ul.append(`<li>${todo.todo} - ${todo.completed ? 'Done' : 'No yet'}</li>`);
        });
      }
    });
  }


  $('header button').eq(0).click(function() {
    currentUserId = currentUserId === 1 ? totalUsers : currentUserId - 1;
    loadUser(currentUserId);
  });

  $('header button').eq(1).click(function() {
    currentUserId = currentUserId === totalUsers ? 1 : currentUserId + 1;
    loadUser(currentUserId);
  });

  loadUser(currentUserId);

  
  $('.posts h3').click(() => $('.posts ul').slideToggle());
  $('.todos h3').click(() => $('.todos ul').slideToggle());

 
  $(document).on('click', '.posts li h4', function() {
    const postId = $(this).parent().data('postid');
    $.ajax({
      url: `https://dummyjson.com/posts/${postId}`,
      method: 'GET',
      success: function(post) {
        const modal = $(`
          <div class="overlay">
            <div class="modal">
              <h3>${post.title}</h3>
              <p>${post.body}</p>
              <p>Views: ${post.reactions}</p>
              <button class="close-modal">Close Modal</button>
            </div>
          </div>
        `);
        $('body').append(modal);
      }
    });
  });

  
  $(document).on('click', '.close-modal', function() {
    $(this).closest('.overlay').remove();
  });
});