const container = document.getElementById("issuesContainer")

const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"


async function loadIssues() {

    container.innerHTML = `
    <div class="col-span-4 text-center py-10">
        <span class="loading loading-spinner loading-lg"></span>
    </div>
    `

    const res = await fetch(API)
    const data = await res.json()

    displayIssues(data.data)

}


function displayIssues(issues){

    container.innerHTML = ""

    issues.forEach(issue => {

        const statusBorder =
        issue.status === "open"
        ? "border-green-500"
        : "border-purple-500"

        const card = document.createElement("div")

        card.className = `bg-white rounded-lg shadow-md border-t-4 ${statusBorder} p-4 flex flex-col justify-between`

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

        container.appendChild(card)

    })

}


loadIssues()











// button 

let allIssues = []

async function loadIssues(){
    const res = await fetch(API)
    const data = await res.json()

    allIssues = data.data

    displayIssues(allIssues)
    setActive(document.getElementById("allBtn")) // Default active
}

// Active button function
function setActive(btn){
    document.getElementById("allBtn").classList.remove("btn-primary")
    document.getElementById("openBtn").classList.remove("btn-primary")
    document.getElementById("closedBtn").classList.remove("btn-primary")

    btn.classList.add("btn-primary")
}

// Button click events
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








// Search issues 

document.getElementById("searchInput").addEventListener("keyup", function(){

    const value = this.value.toLowerCase()

    const filtered = allIssues.filter(issue =>
        issue.title.toLowerCase().includes(value)
    )

    displayIssues(filtered)

})













// Modal Elements
const modal = document.getElementById("issueModal")
const modalCloseBtn = document.getElementById("modalClose")
const modalTitle = document.getElementById("modalTitle")
const modalStatus = document.getElementById("modalStatus")
const modalAuthor = document.getElementById("modalAuthor")
const modalDescription = document.getElementById("modalDescription")
const modalAssignee = document.getElementById("modalAssignee")
const modalPriority = document.getElementById("modalPriority")

// Function to open modal with issue details
function openModal(issue) {
    modalTitle.textContent = issue.title
    modalStatus.textContent = issue.status.toUpperCase()
    modalStatus.className = `text-sm font-medium ${issue.status === "open" ? "text-green-500" : "text-purple-500"}`
    modalAuthor.textContent = `Opened by ${issue.author} • ${new Date(issue.createdAt).toLocaleDateString()}`
    modalDescription.textContent = issue.description
    modalAssignee.textContent = issue.assignee || "Unassigned"
    modalPriority.textContent = issue.priority
    modalPriority.className = `bg-red-100 text-red-500 px-2 py-1 rounded-full`

    // Show modal
    modal.classList.remove("hidden")
    modal.classList.add("flex")
}

// Close modal function
modalCloseBtn.onclick = () => {
    modal.classList.add("hidden")
    modal.classList.remove("flex")
}

// Close modal when clicking outside modal content
window.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden")
        modal.classList.remove("flex")
    }
}

// ✅ Attach modal to all cards when rendering
function displayIssues(issues){
    container.innerHTML = ""

    issues.forEach(issue => {
        const statusBorder = issue.status === "open" ? "border-green-500" : "border-purple-500"

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

        // Open modal on card click
        card.addEventListener("click", () => openModal(issue))

        container.appendChild(card)
    })
}




















// new js 




