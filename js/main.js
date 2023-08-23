// selectors
var siteName = document.querySelector("#sn");
var siteURL = document.querySelector("#su");
var submitBtn = document.querySelector("#submitBtn");
var bodyOfTable = document.querySelector("table tbody");
var editeBtn;
var BtnsCont = document.querySelector("#BtnsCont");
var searchBtn = document.querySelector("#searchBtn");
var pobupModal = document.querySelector("#validation-modal");
var closeBtn = document.querySelector("#closeBtn");
var Data = JSON.parse(localStorage.getItem("websits"));
if (localStorage.getItem("websits") == null) {
  var Data = [];
}

// functions
function addWebsite() {
  Data.push({
    siteName: siteName.value.charAt(0).toUpperCase()+siteName.value.slice(0),
    siteURL: siteURL.value.includes("https://")
      ? siteURL.value
      : "https://" + siteURL.value,
  });
  // displayWebsites();
  searchAndDisplay();
  clearForm();
  localStorage.setItem("websits", JSON.stringify(Data));
}

// displayWebsites();
// function displayWebsites(){
//     var tableContnet = "";
//     for(var i = 0; i<Data.length; i++){
//         tableContnet += `<tr>
//         <td class="index">${i}</td>
//         <td>${Data[i].siteName}</td>
//         <td><a href="${Data[i].siteURL}" target="_blank" class="btn btn-outline-warning">Visit</a></td>
//         <td><a onclick="deleteWebsite(${i});" class="btn btn-outline-danger">Delete</a></td>
//         <td><a onclick="updateWebsiteV2(${i});" class="editeBtn btn btn-outline-info">Edit</a></td>
//         </tr>`
//     }
//     bodyOfTable.innerHTML = tableContnet;
// }

function deleteWebsite(index) {
  Data.splice(index, 1);
  // displayWebsites();
  searchAndDisplay();

  localStorage.setItem("websits", JSON.stringify(Data));
}

function updateWebsiteV1(index) {
  if(validation(siteName,siteName_regex) && validation(siteURL, siteURL_regex)){
  Data[index].siteName = siteName.value,
  Data[index].siteURL = siteURL.value.includes("https://")
      ? siteURL.value
      : "https://" + siteURL.value;

  localStorage.setItem("websits", JSON.stringify(Data));
  BtnsCont.innerHTML = `<button id="submitBtn" class="btn btn-danger text-white px-5">Submit</button>`;
  submitBtn = document.querySelector("#submitBtn");
  submitBtn.addEventListener("click", checkValidationAndAddWebsite);
  // displayWebsites();
  searchAndDisplay();
  clearForm();
  siteName.classList.remove("is-valid");
  siteURL.classList.remove("is-valid");

}else{
  pobupModal.classList.add("show");
  pobupModal.style.display="block";
  document.body.style.overflow = "hidden";
}
}

function updateWebsiteV2(index) {
  siteName.value = Data[index].siteName;
  siteURL.value = Data[index].siteURL;

  BtnsCont.innerHTML = `<button onclick="updateWebsiteV1(${index})" class='btn btn-info px-5'>Edit</button>`;
}

function clearForm() {
  siteName.value = "";
  siteURL.value = "";
}

searchAndDisplay();
function searchAndDisplay(q = "") {
  var reg = new RegExp(q,'i');
  var tableContnet = "";
  for (var i = 0; i < Data.length; i++) {
    if (Data[i].siteName.toLowerCase().includes(q.toLowerCase())) {
      tableContnet += `<tr>
            <td class="index">${i+1}</td>
            <td>${Data[i].siteName.replace(reg, `<mark>${q}</mark>`)}</td>
            <td><a href="${Data[i].siteURL}" target="_blank" class="btn btn-warning"><i class="fa-regular fa-eye pe-2"></i>Visit</a></td>
            <td><a onclick="deleteWebsite(${i});" class="btn btn-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</a></td>
            <td><a onclick="updateWebsiteV2(${i});" class="editeBtn btn btn-info"><i class="fa-solid fa-pen-to-square pe-2"></i>Edit</a></td>
            </tr>`;
    }
  }
  bodyOfTable.innerHTML = tableContnet;
}


let siteName_regex = /^[a-z]{3,}$/i;
let siteURL_regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/i;

function validation(element, regex){
  if(regex.test(element.value)){
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");

    return true;
  }
  else{
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");

    return false;
  }
}

function checkValidationAndAddWebsite(){
  if(validation(siteName,siteName_regex) && validation(siteURL, siteURL_regex)){
    addWebsite();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");

  }else{
    pobupModal.classList.add("show");
    pobupModal.style.display="block";
    document.body.style.overflow = "hidden";
  }
  
}

function closeModal(){
  pobupModal.classList.remove("show");
  pobupModal.style.display="none";
  document.body.style.overflow = "auto";

}

// events
submitBtn.addEventListener("click", checkValidationAndAddWebsite);
searchBtn.addEventListener("keyup", function () {
  searchAndDisplay(this.value)
});

siteName.addEventListener("keyup", function(){
  validation(this,siteName_regex);
})
siteURL.addEventListener("keyup", function(){
  validation(this,siteURL_regex);
})
closeBtn.addEventListener('click' ,closeModal);
