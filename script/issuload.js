console.log("Hello world")

const cardcontainer = document.getElementById("card-container");
let allIssues =[];



//  Update total function

function updateTotalCount(issues) {
    const total = document.getElementById("total-issues-count");
    total.innerText = issues.length;
}



// Load cards

async function loadcard() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    allIssues = data.data;
    displaycard(data.data);
    updateTotalCount(allIssues);
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
                        <h2 class="font-semibold text-[1.25rem] text-[#1F2937] pb-2">${card.title}</h2>
                        <p class="text-[#64748B] line-clamp-2">${card.description}</p>
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
    displaycard(allIssues);
    updateTotalCount(allIssues);
})

openBtn.addEventListener("click", ()=> {
    const openIssues = allIssues.filter(issue => issue.status === "open");
    displaycard(openIssues);
    updateTotalCount(openIssues);
})

closedBtn.addEventListener("click", ()=> {
    const closedIssues = allIssues.filter(issue => issue.status === "closed");
    displaycard(closedIssues);
    updateTotalCount(closedIssues);
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
    const query = searchBox.value

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



loadcard();