import $ from 'jquery';
import { indexTasks, postTask, deleteTask, markTaskComplete, markTaskActive } from './requests.js';

var generateTaskHtml = function (response) {
  var htmlString = response.tasks.map(function (task) {
    return (
      "<div id='task" +
      task.id +
      "' class='col-12 px-2 py-3 mb-1 border rounded task d-flex align-items-center justify-content-evenly' data-id='" +
      task.id +
      "'><input type='button' class='delete-task btn btn-outline-danger px-3 py-0 fs-4' value='X' title='Delete' /><h4 class='task-text text-wrap col-3 font-monospace'>" +
      task.content +
      "</h4><input type='checkbox' class='mark-complete form-check-input form-check p-3' title='Mark Complete' /></div>"
    );
  });
  return htmlString;
};

// turbolinks onload event listener
document.addEventListener('turbolinks:load', function () {
  $('#task-input').val('');

  // index tasks
  indexTasks(function (response) {
    var htmlString = generateTaskHtml(response);
    $('#tasks').html(htmlString);
  });

  // add task event listener
  $('#add-task').on('click', function (event) {
    var content = $('#task-input').val();
    // post task
    postTask(
      content,
      function (response) {
        console.log('task posted successfully: ', response);
        indexTasks(function (response) {
          var htmlString = generateTaskHtml(response);
          $('#tasks').html(htmlString);
          $('#task-input').val('');
        });
      },
      function (error) {
        console.log('error from postTask callback: ', error);
      }
    );
  });

  // delete task event listener
  $('#tasks').on('click', '.delete-task', function (event) {
    var taskId = $(this).parent().data('id');
    console.log('task id to delete: ', taskId);
    // delete task
    deleteTask(
      taskId,
      function (response) {
        console.log('task deleted successfully: ', response);
        indexTasks(function (response) {
          var htmlString = generateTaskHtml(response);
          $('#tasks').html(htmlString);
        });
      },
      function (error) {
        console.log('error from deleteTask callback: ', error);
      }
    );
  });

  // mark task complete or active event listener
  $('#tasks').on('change', '.mark-complete', function (event) {
    var taskId = $(this).parent().data('id');

    // Toggle the completed class
    var taskElement = $('#task' + taskId);
    taskElement.toggleClass('completed');

    // Toggle the text decoration
    var taskText = taskElement.find('.task-text');
    taskText.toggleClass('completed-text');
    
    // mark task complete or active
    if(taskElement.hasClass('completed')) {
      markTaskComplete(
        taskId,
        function (response) {
          console.log('task marked complete successfully: ', response);
        },
        function (error) {
          console.log('error from markTaskComplete callback: ', error);
        }
      );
    }
    else {
      markTaskActive( taskId, function (response) {
        console.log('task marked active successfully: ', response);
      },
      function (error) {
        console.log('error from markTaskActive callback: ', error);
      });
    }
  });

  // change task background color on hover
  $('#tasks').on('mouseenter mouseleave', '.task', function (event) {
    $(this).toggleClass('bg-light');
  });
});
