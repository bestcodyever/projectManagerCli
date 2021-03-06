$(document).ready(() => {})

$(`#home`).click(function() {
  window.location.replace('../index.html')
})

function getTasks(project) {
  $.get(url + project, function(tasksData) {
    addTasks(tasksData)
  })
}
getTasks(localStorage.project)

$('.littleMain').click(function(event) {
  const destroy = $(event.target).attr('data-id')
  $(`#card${destroy}`).remove()
  if (destroy != null){
    $.ajax({
    url: url + `tasks/` + destroy,
    type: 'DELETE',
    success: function(result) {
    }
  })}
})

$('#postButton').click(function(event) {
  const newTaskProject = $('#projectID').attr('data-projectId')
  const newTaskName = $('#task-name').val()
  const newTaskDescription = $('#description-text').val()
  const newTask = {
    "name": newTaskName,
    "description": newTaskDescription,
    "todo": true,
    "inprogress": false,
    "finished": false,
    "icebox": false,
    "project_id": localStorage.project
  }
  $.ajax({
    url: url + newTaskProject,
    type: 'POST',
    data: newTask,
    success: function(result) {
      window.location.reload();
    }
  })

})
$("#loginSubmit").click(function() {
  event.preventDefault()
  let userEmail = $('#loginEmail').val()
  let password = $('#loginPassword').val()
  let login = {
    "email": userEmail,
    "password": password
  }
  let email_filter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
  if (email_filter.test(userEmail)) {
    $.ajax({
      url: url + 'login',
      type: 'POST',
      data: login,
      success: function(result) {
        if (result.error) {
          alert(result.error)
        } else {
          localStorage.setItem('token', result.data)
          window.location.replace('../HTML/tokenTasks.html')
        }
      }
    })
  } else {
    alert('Your email address is invalid. Please enter a valid address.')
  }
})

$('#createUser').click(function() {
  event.preventDefault()
  let newName = $('#newName').val()
  let newEmail = $('#newEmail').val()
  let newPassword = $('#newPassword').val()
  let newUser = {
    "name": newName,
    "email": newEmail,
    "password": newPassword
  }
  let email_filter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
    if (email_filter.test(newEmail)) {
  $.ajax({
    url: url + 'login/signup',
    type: 'POST',
    data: newUser,
    success: function(result) {
      if (result.error) {
        alert(result.error)
      } else {
        localStorage.setItem('token', result.data)
        window.location.replace('../HTML/tokenTasks.html')
      }
    }
  })
} else {
      alert('Your email address is invalid. Please enter a valid address.')
}
})
