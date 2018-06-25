function getAllUsrs() {
  loading(true);

  // ******************************************** using JS fetch instead of jQuery
  // $.getJSON()
  //   .then(function(users) {
  //     return users;
  //   })
  // ******************************************** /using JS fetch instead of jQuery

  fetch("http://dummy.restapiexample.com/api/v1" + "/employees", { type: "GET" })
    .then(function(response) {
      return response.json();
    })
    .then(function(users) {
      //console.log(users);
      var renderAllUsers = users.reduce(function(all, item, index) {
        var profilePhoto = !!item.profile_image
          ? `<img
              src="${item.profile_image}"
              alt="${item.employee_name}"
              title="${item.employee_name}"
            />`
          : `<div class="no-dp"></div>`;
        if (!!item.employee_name) {
          var template = rowTemplate;
          template = template.replace("{{id}}", item.id);
          template = template.replace("{{photo}}", profilePhoto);
          template = template.replace("{{name}}", item.employee_name);
          template = template.replace("{{salary}}", item.employee_salary);
          template = template.replace("{{age}}", item.employee_age);
          template = template.replace(
            "details({{id}})",
            "details(" + item.id + ")"
          );
          template = template.replace(
            "editRecord({{id}})",
            "editRecord(" + item.id + ")"
          );
          template = template.replace(
            "deleteRecord({{id}})",
            "deleteRecord(" + item.id + ")"
          );
          all += template;
        }

        return all;
      }, "");

      //console.log(renderAllUsers);
      document.getElementById("tblBody").innerHTML = renderAllUsers;
      loading(false);
    });
}
getAllUsrs();

function details(id) {
  loading(true);

  // ******************************************** using JS fetch instead of jQuery
  // $.getJSON(BASE_URL + "/employee/" + id)
  //   .then(function(item) {
  //     //console.log(result);
  //     return item;
  //   })
  // ******************************************** /using JS fetch instead of jQuery
  fetch("http://dummy.restapiexample.com/api/v1" + "/employee/" + id, { type: "GET" })
    .then(function(response) {
      return response.json();
    })
    .then(function(item) {
      let viewDetailsTemplate = modalDataTemplate;
      viewDetailsTemplate = viewDetailsTemplate.replace("{{none}}", "block");
      viewDetailsTemplate = viewDetailsTemplate.replace(
        "{{display:isViewMode}}",
        "display:none"
      );
      viewDetailsTemplate = viewDetailsTemplate.replace(
        "{{title}}",
        "User Details"
      );
      viewDetailsTemplate = viewDetailsTemplate.replace("{{id}}", item.id);
      viewDetailsTemplate = viewDetailsTemplate.replace(
        "{{name}}",
        item.employee_name
      );
      viewDetailsTemplate = viewDetailsTemplate.replace(
        "{{salary}}",
        item.employee_salary
      );
      viewDetailsTemplate = viewDetailsTemplate.replace(
        "{{age}}",
        item.employee_age
      );
      viewDetailsTemplate = viewDetailsTemplate.replace("{{none}}", "block");

      modalLoader.innerHTML =
        blockUITemplate.replace("{{none}}", "block") + viewDetailsTemplate;
      loading(false);
    });
}

function editRecord(id) {
  loading(true);
  $.getJSON("http://dummy.restapiexample.com/api/v1" + "/employee/" + id).then(function(result) {
    var template = bindModalTemplate(modalDataTemplate, result);
    modalLoader.innerHTML =
      template + blockUITemplate.replace("{{none}}", "block");
    loading(false);
  });
}

function saveEditedRecord(id) {
  var request = {
    id: id ? id : new Date().getTime(),
    type: id ? "PUT" : "POST",
    apiRoute: id ? "/update/" + id : "/create"
  };

  var updatedData = {
    id: request.id,
    name: document.getElementsByName("name")[0].value,
    salary: document.getElementsByName("salary")[0].value,
    age: document.getElementsByName("age")[0].value
  };

  $.ajax({
    url: "http://dummy.restapiexample.com/api/v1" + request.apiRoute,
    type: request.type,
    data: JSON.stringify(updatedData),
    success: function(result) {
      console.log(result);
      closeModal();
      getAllUsrs();
    }
  });
}

function createBlankForm() {
  loading(true);
  var blankTmpl = bindModalTemplate(modalDataTemplate);
  modalLoader.innerHTML =
    blockUITemplate.replace("{{none}}", "block") + blankTmpl;
  loading(false);
}

function createRecord(id) {
  var data = {
    id: 888,
    name: "John Doe",
    salary: "55555",
    age: "25"
  };
  $.ajax({
    url: "http://dummy.restapiexample.com/api/v1" + "/create",
    type: "POST",
    data: JSON.stringify(data),
    success: function(result) {
      getAllUsrs();
      console.log(result);
    }
  });
}

function deleteRecord(id) {
  alert("Sorry, Delete API do not allow to delete the record");
  //console.log(BASE_URL + "/d/" + id);
  // $.ajax({
  //   url: BASE_URL + "/delete/" + id,
  //   type: "DELETE",
  //   success: function(result) {
  //     console.log(result);
  //     getAllUsrs();
  //   }
  // });
}

// http://www.json-generator.com/api/json/get/cvekPXJxbC?indent=2
