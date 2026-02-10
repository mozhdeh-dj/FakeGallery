const gallery = document.getElementById("gallery")
const modal = document.getElementById("editModal")
const modalImg = document.getElementById("modalImg")
const widthRange = document.getElementById("widthRange")
const heightRange = document.getElementById("heightRange")
const deleteModal = document.getElementById("deleteModal")

let photos = []
let selectedPhoto = null


fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
        photos = data
        renderPhotos()
    })


function renderPhotos() {
    gallery.innerHTML = ""

    photos.forEach(photo => {
        gallery.innerHTML += `
        <div class="bg-white p-4 rounded-xl shadow-md text-center">
            <img src="${photo.image}"
            width="150px" height="150px"
             style="width:${photo.width}px height:${photo.height}px"
             class="mx-auto mb-3 object-cover rounded">

        <div class="flex gap-2 justify-center">
            <button onclick="openEdit(${photo.id})"
                  class="bg-blue-500 text-white px-3 py-1 rounded">
                Edit
            </button>

            <button onclick="openDelete(${photo.id})"
                  class="bg-red-500 text-white px-3 py-1 rounded">
                Delete
            </button>
        </div>
      </div>
    `
    })
}

function openEdit(id) {
    selectedPhoto = photos.find(photo => photo.id === id)

    modalImg.src = selectedPhoto.image
    modalImg.style.width = selectedPhoto.width + "px"
    modalImg.style.height = selectedPhoto.height + "px"

    widthRange.value = selectedPhoto.width
    heightRange.value = selectedPhoto.height

    modal.classList.remove("hidden")
    modal.classList.add("flex")
}

widthRange.addEventListener("input", () => {
    modalImg.style.width = widthRange.value + "px"
});

heightRange.addEventListener("input", () => {
    modalImg.style.height = heightRange.value + "px"
});


function saveEdit() {
    selectedPhoto.width = widthRange.value
    selectedPhoto.height = heightRange.value

    closeModal()
    renderPhotos()
}

function closeModal() {
    modal.classList.add("hidden")
    modal.classList.remove("flex")

}

let deleteItem = null


function openDelete(id) {
    deleteItem = photos.find(p => p.id === id)

    deleteModal.classList.remove("hidden")
    deleteModal.classList.add("flex")
}

function confirmDelete() {
    photos = photos.filter(p => p.id !== deleteItem.id)

    closeDeleteModal()
    renderPhotos()
}



function closeDeleteModal(){
    deleteModal.classList.add("hidden")
    deleteModal.classList.remove("flex")
}

