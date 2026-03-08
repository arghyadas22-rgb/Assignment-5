

const cardcontainer = document.getElementById("card-container");
let allIssues =[];
const spinner = document.getElementById("loading-spinner");



//  Update total function

function updateTotalCount(issues) {
    const total = document.getElementById("total-issues-count");
    total.innerText = issues.length;
}



// Load cards

async function loadcard() {

    spinner.classList.remove("hidden");

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssues = data.data;
    displaycard(data.data);
    updateTotalCount(allIssues);

    spinner.classList.add("hidden");
}

// Display cards function

function displaycard(issues){
    cardcontainer.innerHTML = "";
    issues.forEach(card => {

    const badges = card.labels.map(label => {
        return `<div class="badge badge-soft bg-[#ef44441c] text-[#EF4444] px-4 py-3.5 font-medium">
            ${label}
        </div>`;
    }).join("");

        // hlep form google just status icon
        const statusIcon = card.status === "closed" 
            ? "./assets/Closed- Status .png"
            : "./assets/Open-Status.png";


            // border color
            const borderColor = card.status === "closed"
            ? "border-[#A855F7]"
            : "border-[#00A96E]";


        const allcard = document.createElement("div")
        allcard.className = `card bg-base-100 shadow-sm p-4 border-t-4 ${borderColor} flex flex-col justify-between`;
        allcard.innerHTML = `<div class="flex justify-between mb-3">
                        <img class="w-6 h-6" src="${statusIcon}" alt="">
                        <span class="${card.priority === 'high' ? 'bg-red-100 text-red-500' :card.priority === 'medium' ? 'bg-yellow-100 text-yellow-500' :'bg-gray-100 text-gray-500'}    bg-[#ef44441c] text-[#EF4444] px-6 py-1 rounded-[50px]">${card.priority}</span>
                    </div>
                    <div class="mb-3">
                        <h2 class="cursor-pointer font-semibold text-[1.25rem] text-[#1F2937] pb-2" onclick="opencardmodal(${card.id})">${card.title}</h2>
                        <p class="text-[#64748B] line-clamp-2 cursor-pointer" onclick="opencardmodal(${card.id})">${card.description}</p>
                    </div>
                    <div class="mb-3 flex gap-2">
                        ${badges}
                    </div>

                    <div class="border border-gray-200 w-full">

                    </div>
                    <div class="mt-3 flex justify-between">
                        <div>
                            <p>${card.author}</p>
                            <p>${card.assignee}</p>
                        </div>
                        <div class="text-right">
                            <p>${card.createdAt}</p>
                            <p>${card.updatedAt}</p>
                        </div>
                    </div>`
        cardcontainer.appendChild(allcard);
    });
}



const allBtn = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

// Filter buttons


allBtn.addEventListener("click", ()=> {
    spinner.classList.remove("hidden");

    displaycard(allIssues);
    updateTotalCount(allIssues);

    spinner.classList.add("hidden");
})

openBtn.addEventListener("click", ()=> {

    spinner.classList.remove("hidden");

    const openIssues = allIssues.filter(issue => issue.status === "open");
    displaycard(openIssues);
    updateTotalCount(openIssues);

    spinner.classList.add("hidden");
})

closedBtn.addEventListener("click", ()=> {

    spinner.classList.remove("hidden");

    const closedIssues = allIssues.filter(issue => issue.status === "closed");
    displaycard(closedIssues);
    updateTotalCount(closedIssues);

    spinner.classList.add("hidden");
})


const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        buttons.forEach(btnEl => btnEl.classList.remove("btn-primary"));
        btn.classList.add("btn-primary");
    });
});



// search button

const searchBox =  document.getElementById("search-box");
const searchBtn =  document.getElementById("search-btn");

// search button click

// some help from google

searchBtn.addEventListener("click" , ()=>{
    const query = searchBox.value.toLowerCase();

    const filteredIssues = allIssues.filter(issue => 
        issue.title.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query) ||
        issue.author.toLowerCase().includes(query)
    );

    displaycard(filteredIssues);
    updateTotalCount(filteredIssues);
})

// if i click the keybord enter button it will be search help by google
searchBox.addEventListener("keyup" , (el) => {
    if(el.key === "Enter") searchBtn.click();
});



// popup show  $$ click on title and description

const carddetailsmodal = document.getElementById("card-details-modal");

async function opencardmodal(cardid) {

  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${cardid}`);
  const data = await res.json();
  const carddetails = data.data;

    const cardds = carddetails.labels.map(label => {
        return `<div class="badge badge-soft bg-[#ef44441c] text-[#EF4444] px-4 py-3.5 font-medium">
            ${label}
        </div>`;
    }).join("");



// i trying to use forEach loop but not working and then i help from google
  
  let existingModal = document.getElementById("card-details-modal");
  if(existingModal) existingModal.remove();

  // modal create
  const allcarddetails = document.createElement("dialog");
  allcarddetails.id = "card-details-modal";
  allcarddetails.className = "modal rounded-[10px]";

  allcarddetails.innerHTML = `
    <div class="modal-box">
      <div class="card bg-base-100 shadow-sm p-8 mx-auto">
        <h2 class="font-bold text-[1.5rem] text-[#1F2937] mb-3">
          ${carddetails.title || "No title"}
        </h2>
        <div class="flex gap-2 mb-6">
          <div>
            <button class="btn bg-[#00A96E] text-white rounded-[50px] focus:outline-none">
              ${carddetails.status}
            </button>
          </div>
          <div class="flex gap-2">
            <p class="text-[#64748B]">
              <span class="text-xl">●</span> Opened by ${carddetails.assignee || "N/A"}
            </p>
            <p class="text-[#64748B]">
              <span class="text-xl">●</span> ${carddetails.createdAt || "N/A"}
            </p>
          </div>
        </div>

        <div class="mb-6 flex gap-3">
          ${cardds}
          
        </div>

        <p class="mb-6 text-[#64748B] text-[1.25rem]">
          ${carddetails.description || "No description"}
        </p>

        <div class="bg-[#f8fafc98] flex justify-between p-5 mb-6">
          <div>
            <h2 class="text-[#64748B]">Assignee:</h2>
            <h2 class="text-[#1F2937] font-semibold">${carddetails.assignee || "N/A"}</h2>
          </div>
          <div class="flex flex-col gap-1">
            <h2 class="text-[#64748B]">Priority:</h2>
            <span class="bg-[#EF4444] text-white px-3 py-1 rounded-[50px] w-fit">
              ${carddetails.priority || "N/A"}
            </span>
          </div>
        </div>

        <div class="flex justify-end">
          <button class="btn btn-primary" onclick="document.getElementById('card-details-modal').close()">Close</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(allcarddetails);

  // modal open
  allcarddetails.showModal();
}




loadcard();