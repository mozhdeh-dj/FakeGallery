const gallery = document.getElementById("gallery")
const modal = document.getElementById("editModal")
const modalImg = document.getElementById("modalImg")
const widthRange = document.getElementById("widthRange")
const heightRange = document.getElementById("heightRange")
const deleteModal = document.getElementById("deleteModal")
const actionModal = document.getElementById('actionModal')
const actionImg = document.getElementById('actionImg')
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

    photos.map(photo => {
        gallery.innerHTML += `
        <div class="bg-white p-4 rounded-xl shadow-md text-center cursor-pointer">
             <a href="#" onclick="openAction(${photo.id})">
                 <img src="${photo.image}"
                    style="width:${photo.width || 150}px; height:${photo.height || 150}px;"
                    class="mx-auto mb-3 object-cover rounded">
            </a>
        </div>
    `
    })
}

function openEdit(id) {
    closeActionModal()

    selectedPhoto = photos.find(photo => photo.id === id)

    modalImg.src = selectedPhoto.image
    modalImg.style.width = widthRange.value  + "px"
    modalImg.style.height = heightRange.value + "px"

    widthRange.value = selectedPhoto.width || 150
    heightRange.value = selectedPhoto.height || 150

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
    closeActionModal()
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

function openAction(id){
    selectedPhoto = photos.find(photo => photo.id === id)
    actionImg.src = selectedPhoto.image
    actionModal.classList.remove('hidden')
    actionModal.classList.add('flex')
}

function closeActionModal(){
    actionModal.classList.remove('flex')
    actionModal.classList.add('hidden')
}

