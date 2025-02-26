// handel search

const loadAllPets = () => {
    document.getElementById('allPets').classList.remove("hidden")
    document.getElementById('like-add-pet').classList.remove("hidden")

    document.getElementById('loading').style.display = "none";

}

const handelSearch = () => {

    document.getElementById('allPets').classList.add("hidden")
    document.getElementById('like-add-pet').classList.add("hidden")

    document.getElementById('loading').style.display = "block";

    setTimeout(function () {

        loadAllPets()

    }, 2000)
}

// Load function fetch button
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => petCategories(data.categories))
        .catch((error) => console.log(error));
}

const clickVideos = (petId) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/categoryName/${petId}`)
    .then((res) => res.json())
    .then((data) => petCategories2(data.data))
    // .then((data) => console.log(data.data))
    .catch((error) => console.log(error));

}

// All categories pet button
const petCategories = (categories) => {
    const petContainer = document.getElementById("pet-button");

    categories.forEach((pets) => {

        const petBtn = document.createElement('div')
        // petBtn.classList = "mx-auto px-[170px] md:px-0 lg:px-[0px] md:w-[250px] lg:w-[190px]" 
        petBtn.innerHTML =
            `
            
            <button onclick = "handelSearch (), clickVideos (${pets.id})" class="btn bg-white md:w-[250px] lg:w-[190px] h-[63px] font-inter bg-white text-[20px] font-bold"><img class = "w-[36px] h-[36px] " src=${pets.category_icon} alt="">${pets.category}</button>

        `;

        // petContainer.innerHTML = 
        // `
        //     <button class = "btn"><img class = "w-[36px] h-[36px] " src=${pets.category_icon} alt=""> ${pets.category}</button>
        // `;

        petContainer.append(petBtn);
    });

}

loadCategories();






// Load function fetch 2

const loadCategories2 = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => petCategories2(data.pets))
        .catch((error) => console.log(error));
}

// All categories pet



const petCategories2 = (pets) => {
    const petContainer2 = document.getElementById("allPets");

    petCategories2.innerHTML = ""

    if(pets.length == 0){
        petCategories2.innerHTML = "No Contant Here";
        return;
    }

    pets.forEach((allPets) => {
        // console.log(allPets)


        const petDiv = document.createElement('div');
        petDiv.classList = "card card-compact w-[280px]  border-[1px]  mx-auto"
        petDiv.innerHTML =
            `
        
        <figure class = "h-[160px] ">
            <img class ="h-[full] w-[250px] object-cover pt-[55px]"
            src=${allPets.image} />
        </figure>
        <div class="px-5 py-4 ">
            <div>
                <h2></h2>
                <div class="flex items-center gap-2 "><img src="/assets/breed.png"><p class="font-lato text-sm font-normal">Breed: ${allPets.breed}</p></div>
                <div class="flex gap-2 mt-[9px]"><img src="/assets/birth.png"><p class="font-lato text-sm font-normal">Birth: ${allPets.date_of_birth}</p></div>
                <div class="flex gap-2 mt-[9px]"><img src="/assets/gender.png"><p class="font-lato text-sm font-normal">Gender: ${allPets.gender}</p></div>
                <div class="flex gap-2 mt-[9px]"><img src="/assets/price.png"><p class="font-lato text-sm font-normal">Price: ${allPets.price}$</p></div>
            </div>
            <hr class="w-[240px] h-[2px] mt-4 pb-4">
            <div class=" flex justify-around">
                <button id = "click" class="btn w-[50px]  bg-white"><img src="./assets/like.svg" alt=""></button>
                <button id = "adopt_btn" class="btn w-[85px]  bg-white text-teal-700 font-Lato font-bold text-lg" onclick ="disable_Adopt (this)">Adopt</button>
                
                <button class="btn w-[85px]  bg-white text-teal-700 font-lato font-bold text-lg" onclick="my_modal_5.showModal()">Details</button>
            </div>
        </div>
        
        `
        petContainer2.append(petDiv);

    });

}

loadCategories2();


// Modal

const petDetail = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => showModal(data.pets))
        .catch((error) => console.log(error))
}

const showModal = (detail) => {
    const modal = document.getElementById('modal-container')

    detail.forEach((allDetail) => {

        // console.log(allDetail)
        modal.innerHTML =
            `
         <dialog id="my_modal_5" class="modal modal-center sm:modal-middle lg:w-[700px] border-2 border-solid border-red-700 mx-auto">
                <div class="modal-box">
                    <img class ="h-[full] w-[636px] object-cover mx-auto"src=${allDetail.image} />
                    <div class="flex items-center gap-2 "><img src="/assets/breed.png"><p class="font-lato text-sm font-normal">Breed: ${allDetail.breed}</p></div>
                    <div class="flex gap-2 mt-[9px]"><img src="/assets/birth.png"><p class="font-lato text-sm font-normal">Birth: ${allDetail.date_of_birth}</p></div>
                    <div class="flex gap-2 mt-[9px]"><img src="/assets/gender.png"><p class="font-lato text-sm font-normal">Gender: ${allDetail.gender}</p></div>
                    <div class="flex gap-2 mt-[9px]"><img src="/assets/price.png"><p class="font-lato text-sm font-normal">Price: ${allDetail.price}$</p></div>
                    <p class=" w-[480px]">${allDetail.pet_details}</p>
                    <div class="modal-action">
                        <form method="dialog" class = " mx-auto">
                            <button class="btn w-[480px]">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        `
    })
}

petDetail();


// Adopt button disable


function disable_Adopt (thisButton){

    console.log(document.getElementById(thisButton.id))

    document.getElementById(thisButton.id).disabled = true;


}
