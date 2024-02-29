const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    //1. get container name
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    const showAllContainer = document.getElementById('show-all-container');
    
    if(phones.length > 10 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    
    if(!isShowAll){
        phones = phones.slice(0, 9); 
    }
    
    phones.forEach(phone => {
        console.log(phone);
        // 2.create a div 
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        // 3.set inner html
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button onclick="handelShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
            </div>
        `;
        // 4. append child
        phoneContainer.appendChild(phoneCard);
    });

    //hide loading spinner
    toggleLoadingSpinner(false);
}

//handle search button start
function handleSerach(isShowAll){
    toggleLoadingSpinner(true);
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    loadPhone(searchText, isShowAll);
}
//handle search button ended

//loding spinner start
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
}
//loding spinner ended

// show more handeler start
const showAllData = () => {
    // displayPhones(true);
    handleSerach(true)
}
// show more handeler ended

// handel show details start
const handelShowDetails = async (id) =>{
    alert('clicked on show details' + id);
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    alert(data);
}
// handel show details ended

loadPhone();