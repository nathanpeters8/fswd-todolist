import $ from 'jquery';
import {
  indexTasks,
  postTask,
} from './requests.js';

var generateTaskHtml = function(response) {
  var htmlString = response.tasks.map(function (task) {
    return (
      "<div class='col-12 px-2 py-3 mb-1 border rounded task d-flex align-items-center justify-content-evenly' data-id='" +
      task.id +
      "'><input type='button' class='btn btn-outline-danger px-3 py-0 fs-4' value='X' title='Delete' /><h4 class='task-text text-wrap col-3 font-monospace'>" +
      task.content +
      "</h4><input type='checkbox' class='form-check-input form-check p-3' title='Mark Complete' /></div>"
    );
  });
  return htmlString;
}
// turbolinks onload event listener
document.addEventListener("turbolinks:load", function() {
  // initial index tasks
  indexTasks(function(response) {
    var htmlString = generateTaskHtml(response);
    $('#tasks').html(htmlString);
  });
  
  // add task event listener
  $('#add-task').on('click', function(event) {
    var content = $('#task-input').val();
    // post task
    postTask(content, function(response) {
      console.log('task posted successfully: ', response);  
      indexTasks(function(response) {
        var htmlString = generateTaskHtml(response);
        $('#tasks').html(htmlString);
      });
    }, function(error) {
      console.log('error from postTask callback: ', error);
    });
  });
});

