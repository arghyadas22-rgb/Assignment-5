console.log("Hello world")

const cardcontainer = document.getElementById("card-container");


async function loadcard() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    displaycard(data.data);
}

function displaycard(issues){
    console.log(issues);
    issues.forEach(card => {
        console.log(card);

        // hlep form google just status icon
        const statusIcon = card.status === "closed" 
            ? "./assets/Closed- Status .png"
            : "./assets/Open-Status.png";

        const allcard = document.createElement("div")
        allcard.className = "card bg-base-100 shadow-sm p-4 border-t-4 border-[#00A96E]";
        allcard.innerHTML = `<div class="flex justify-between mb-3">
                        <img class="w-6 h-6" src="${statusIcon}" alt="">
                        <span class="${card.priority === 'high' ? 'bg-red-100 text-red-500' :card.priority === 'medium' ? 'bg-yellow-100 text-yellow-500' :'bg-gray-100 text-gray-500'}    bg-[#ef44441c] text-[#EF4444] px-6 py-1 rounded-[50px]">${card.priority}</span>
                    </div>
                    <div class="mb-3">
                        <h2 class="font-semibold text-[1.25rem] text-[#1F2937] pb-2">${card.title}</h2>
                        <p class="text-[#64748B] line-clamp-2">${card.description}</p>
                    </div>
                    <div class="mb-3">
                        <div class="badge badge-soft bg-[#ef44441c] text-[#EF4444] px-4 py-3.5 font-medium"><span><img class="w-3" src="./assets/Vector.png" alt=""></span>BUG</div>

                        <div class="badge badge-soft bg-[#fde68a59] text-[#D97706] px-4 py-3.5 font-medium"><span><img class="w-3" src="./assets/Vector (1).png" alt=""></span>HELP WANTED</div>
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

loadcard();