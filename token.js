$(document).ready(() => {})
// const url = 'http://localhost:8080/'
const url = 'https://still-bayou-84038.herokuapp.com/'
if (localStorage.getItem('token') === null){
    window.location.replace('./index.html')
}
getProjects()

$(`#home`).click(function() {
  window.location.replace('./tokenProjects.html')
})

$(`.littleMain`).click(function(event) {
  const targetOfClick = $(event.target).attr('data-project')
  if (targetOfClick >= 1){
  localStorage.project = targetOfClick
  window.location.replace('tokenTasks.html')
}
})

function getTasks(project) {
  $.get(url + project, function(tasksData) {
    addTasks(tasksData)
  })
}

$('.littleMain').click(function(event) {
  const destroy = $(event.target).attr('data-id')
  $(`#card${destroy}`).remove()
  $.ajax({
    url: url + `tasks/` + destroy,
    type: 'DELETE',
    success: function(result) {
      window.location.reload();
    }
  })
})


$('#logout').click(function(){
  event.preventDefault()
  localStorage.removeItem('token')
  window.location.replace('./index.html')
})
