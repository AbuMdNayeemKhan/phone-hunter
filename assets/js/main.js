const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones => {
    //1. get container name
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 10){
        showAllContainer.classList.remove('hidden');
    } else{
        showAllContainer.classList.add('hidden');
    }

    phones = phones.slice(0, 10);
    phones.forEach(phone => {
        
        // phone.slice(0, 10);
        
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
                <button class="btn btn-primary">Buy Now</button>
            </div>
            </div>
        `;
        // 4. append child
        phoneContainer.appendChild(phoneCard);
    });
}

//handle search button start
function handleSerach(){
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    loadPhone(searchText);
}
//handle search button ended

loadPhone();