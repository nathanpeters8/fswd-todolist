import $ from 'jquery';

import {
  indexTasks,
  postTask,
} from './requests.js';

indexTasks(function(response) {
  var htmlString = response.tasks.map(function(task) {
    return ("<div class='col-12 px-2 py-3 mb-1 border rounded task d-flex align-items-center justify-content-evenly' data-id='" + task.id + "'><input type='button' class='btn btn-outline-danger px-3 py-0 fs-4' value='X' title='Delete' /><h4 class='task-text text-wrap col-3 font-monospace'>" + task.content + "</h4><input type='checkbox' class='form-check-input form-check p-3' title='Mark Complete' /></div>");
  });
  
  $('#tasks').html(htmlString);
});

postTask(function(response) {
  console.log(response);
})