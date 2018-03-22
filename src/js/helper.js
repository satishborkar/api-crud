const BASE_URL = "http://dummy.restapiexample.com/api/v1";
const app = document.getElementById("app");
const modalLoader = document.getElementById("loader-modal");
let blockUITemplate = `<div class="ui-block" style="display:{{none}}"></div>`;
let loadingIcon = `<div class="loading" style="display:{{none}}"></div>`;
let loadingText = `<div class="loading-text" style="display:{{none}}">{{loading}}</div>`;
let rowTemplate = `
    <tr>
        <td style="text-align:center">{{id}}</td>
        <td>{{photo}}</td>
        <td>{{name}}</td>
        <td>{{salary}}</td>
        <td>{{age}}</td>
        <td> <a href="#nogo" onClick="details({{id}})" class="link"> Details </a> </td>
        <td> <a href="#nogo" onClick="editRecord({{id}})" class="link" > Edit </a> </td>
        <td><a href="#nogo" onClick="deleteRecord({{id}})" title="API do not allow to delete the record" class="link"> <del>Delete</del> </a></td>            
    </tr>
`;

let modalDataTemplate = `
    <div class="modal" style="display:{{none}}">
    <h2>{{title}}</h2>
    <div class="row">
        <div class="col-3">
            <div class="no-dp big"></div>
        </div>
        <div class="col-7">
            <div class="row brdr-btm">
                <div class="col-3">Emp ID:</div>
                <div class="col-7">{{id}}</div>
            </div>
            <div class="row brdr-btm">
                <div class="col-3">Name:</div>
                <div class="col-7">{{name}}</div>
            </div>
            <div class="row brdr-btm">
                <div class="col-3">Salary:</div>
                <div class="col-7"> <span class="dollar-sign">$</span> {{salary}}</div>
            </div>

            <div class="row brdr-btm">
                <div class="col-3">Age:</div>
                <div class="col-7">{{age}}</div>
            </div>

            <div class="row" style="{{display:isViewMode}}">
                <div class="col-7 pull-right">
                    <button class="btn" onclick="{{saveEditedRecord()}}"> Save </button>
                    <button class="btn" onclick="closeModal()"> Cancel </button>
                </div>
                
            </div>
        </div>
    </div>
    <a href="#nogo" class="close-modal" onclick="closeModal()"> &#x2716; </a>
    </div>
`;

function loading(bool) {
  var showLoading =
    bool === true
      ? blockUITemplate.replace("{{none}}", "block") +
        loadingIcon.replace("{{none}}", "block") +
        loadingText.replace("{{loading}}", "Loading...")
      : closeLoading();

  //   bool === true && app.insertAdjacentHTML("afterend", showLoading);
  bool === true && (modalLoader.innerHTML = showLoading);
}

function closeLoading() {
  var loading = document.querySelector(".loading"),
    loadingText = document.querySelector(".loading-text"),
    ui = document.querySelector(".ui-block"),
    modal = document.querySelector(".modal");

  loading && (loading.style.display = "none");
  loadingText && (loadingText.style.display = "none");

  modal && modal.style.display == "block"
    ? ui && (ui.style.display = "block")
    : ui && (ui.style.display = "none");
}
function closeModal() {
  var modal = document.querySelector(".modal"),
    ui = document.querySelector(".ui-block");
  modal && (modal.style.display = "none");
  ui && (ui.style.display = "none");
}

function bindModalTemplate(template, item) {
  let tmpl = template;
  let isBlank = false;
  if (!item) {
    isBlank = true;
  }
  let textField = '<input type="text" name="{{inputName}}" value="{{value}}"/>';
  tmpl = tmpl.replace("{{none}}", "block");
  tmpl = tmpl.replace("{{title}}", isBlank ? "Create New User" : "Edit User");
  tmpl = tmpl.replace("{{id}}", isBlank ? "XXX" : item.id);
  tmpl = tmpl.replace(
    "{{name}}",
    textField
      .replace("{{value}}", isBlank ? "" : item.employee_name)
      .replace("{{inputName}}", "name")
  );

  tmpl = tmpl.replace(
    "{{salary}}",
    textField
      .replace("{{value}}", isBlank ? "" : item.employee_salary)
      .replace("{{inputName}}", "salary")
  );
  tmpl = tmpl.replace(
    "{{age}}",
    textField
      .replace("{{value}}", isBlank ? "" : item.employee_age)
      .replace("{{inputName}}", "age")
  );
  isBlank
    ? (tmpl = tmpl.replace("{{saveEditedRecord()}}", "saveEditedRecord()"))
    : (tmpl = tmpl.replace(
        "{{saveEditedRecord()}}",
        "saveEditedRecord(" + item.id + ")"
      ));

  return tmpl;
}

document.addEventListener("keyup", function(e) {
  const uiBlocker = document.querySelector(".ui-block");
  if (e.keyCode === 27 && uiBlocker && uiBlocker.style.display === "block") {
    closeModal();
  }
});
