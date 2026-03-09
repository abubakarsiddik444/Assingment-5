const container = document.getElementById("issuesContainer")
const issueCount = document.getElementById("issueCount")
const modal = document.getElementById("issueModal")

const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

let allIssues = []

// Load Issues
async function loadIssues(){

container.innerHTML = `
<div class="col-span-4 text-center py-10">
<span class="loading loading-spinner loading-lg"></span>
</div>
`

const res = await fetch(API)
const data = await res.json()

allIssues = data.data

displayIssues(allIssues)

setActive(document.getElementById("allBtn"))

}








// Display Issues
function displayIssues(issues){

container.innerHTML = ""

updateCount(issues)

issues.forEach(issue => {

const statusBorder =
issue.status === "open"
? "border-green-500"
: "border-purple-500"

const card = document.createElement("div")

card.className = `bg-white rounded-lg shadow-md border-t-4 ${statusBorder} p-4 flex flex-col justify-between cursor-pointer`

card.innerHTML = `

<div class="flex justify-between items-center">

<span class="text-sm font-medium ${issue.status === "open" ? "text-green-500" : "text-purple-500"}">
${issue.status.toUpperCase()}
</span>

<span class="bg-red-100 text-red-500 text-xs px-3 py-1 rounded-full">
${issue.priority}
</span>

</div>

<div>

<h3 class="font-semibold text-sm mt-2">${issue.title}</h3>

<p class="text-xs text-gray-500 mt-2">
${issue.description.slice(0,70)}...
</p>

</div>

<div class="flex gap-2 mt-3">

${issue.labels.map(label =>
`<span class="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full">${label}</span>`
).join("")}

</div>

<div class="text-xs text-gray-400 mt-3 border-t pt-2">

<p>#${issue.id} by ${issue.author}</p>

<p>${new Date(issue.createdAt).toLocaleDateString()}</p>

</div>

`

// Card Click → Modal
card.addEventListener("click",()=>{
openModal(issue.id)
})

container.appendChild(card)

})

}





// Issue Count
function updateCount(issues){

issueCount.innerText = `${issues.length} Issues`

}





// Buttons Active
function setActive(btn){

document.getElementById("allBtn").classList.remove("btn-primary")
document.getElementById("openBtn").classList.remove("btn-primary")
document.getElementById("closedBtn").classList.remove("btn-primary")

btn.classList.add("btn-primary")

}




// Button Clicks

document.getElementById("allBtn").onclick = () =>{

displayIssues(allIssues)

setActive(document.getElementById("allBtn"))

}

document.getElementById("openBtn").onclick = () =>{

const open = allIssues.filter(issue => issue.status === "open")

displayIssues(open)

setActive(document.getElementById("openBtn"))

}

document.getElementById("closedBtn").onclick = () =>{

const closed = allIssues.filter(issue => issue.status === "closed")

displayIssues(closed)

setActive(document.getElementById("closedBtn"))

}





// Search Issues (API)

document.getElementById("searchInput").addEventListener("keyup", async function(){

const value = this.value

if(value === ""){
displayIssues(allIssues)
return
}

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`)

const data = await res.json()

displayIssues(data.data)

})




// Modal (Single Issue API)

async function openModal(id){

modal.classList.remove("hidden")

modal.classList.add("flex")

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)

const data = await res.json()

const issue = data.data

modal.querySelector("h2").innerText = issue.title

modal.querySelector(".text-gray-600").innerText = issue.description

}

function closeModal(){

modal.classList.add("hidden")

}




// Modal Background Click Close

modal.addEventListener("click",(e)=>{

if(e.target === modal){

closeModal()

}

})




// New Issue Button

document.getElementById("newIssueBtn").addEventListener("click",()=>{

alert("Create New Issue Feature Coming Soon ")

})





// Start App

loadIssues()