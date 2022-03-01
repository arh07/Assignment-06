const parent = document.getElementById('main');
const main = document.getElementById('parent-div');
const searchPhone = () => {
    const input = document.getElementById('input-value');
    const inputValue = input.value;
    input.value = '';

    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            if (data.data == false || inputValue == '') {
                error.innerText = "Oops, Mobile not Found"
                parent.innerHTML = '';
                main.innerHTML = '';


            }
            else {
                phoneData(data.data);
                error.innerText = '';
            }
        })
}

const phoneData = mobileData => {
    // console.log(mobileData)
    parent.innerHTML = '';
    main.innerHTML = '';
    const first20Mobile = mobileData.slice(0, 20);

    for (const mobile of first20Mobile) {
        // console.log(mobile)

        const div = document.createElement('div');
        div.className = 'col-lg-4';



        div.innerHTML = `
        <div class='border text-center p-3 g-3 mb-3 shadow bg-body rounded'>
        <img src="${mobile.image}" class="card-img-top w-50" alt="...">
        <div class="card-body">
          <h5 class="card-title">${mobile.brand} </h5>
          <h class="card-title"></h5>
          <p class="card-text">${mobile.phone_name}</p>
          <button class="bg-primary text-white rounded" onclick="details('${mobile.slug}')" class="btn btn-outline-success" type="submit">Details</button>
        </div>
        </div>
        `
        parent.append(div)
    }

}

const details = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(response => response.json())
        .then(data => detailsPhone(data.data))
}

const detailsPhone = mobile => {
    // console.log(mobile)


    main.innerHTML = '';
    error.innerText = '';
    const div = document.createElement('div');
    // div.className = 'mb-5';
    // div.className = 'mx-auto';

    div.innerHTML = `
        <img  src="${mobile.image}" class="card-img-top w-25 " alt="...">
        <div class="card-body">
          <h4 class="card-title">${mobile.name} </h4>
          <br>
          <p class="card-text"> <span class="fw-bold" >Release Date:</span> ${mobile.releaseDate ? mobile.releaseDate : 'Not Release yet'}</p>
          <p class="card-text"><span class="fw-bold" >Sensors:</span> ${mobile.mainFeatures.sensors}</p>
          <p class="card-text"><span class="fw-bold" >Storage:</span> ${mobile.mainFeatures.storage}</p>
          <p class="card-text"><span class="fw-bold" >Chipset:</span> ${mobile.mainFeatures.chipSet}</p>
          <p class="card-text"><span class="fw-bold" >Display Size:</span> ${mobile.mainFeatures.displaySize}</p>
          
          <p class ="fw-bold">Others Features</p>
          <div>
              <p>GPS: ${mobile?.others?.GPS ? mobile?.others?.GPS : "Data Not Found"}
              <p>NFC: ${mobile?.others?.NFC ? mobile?.others?.NFC : "Data Not Found"}
              <p>Radio: ${mobile?.others?.Radio ? mobile?.others?.Radio : "Data Not Found"}
              <p>USB: ${mobile?.others?.USB ? mobile?.others?.USB : "Data Not Found"}
              <p>Bluetooth: ${mobile?.others?.Bluetooth ? mobile?.others?.Bluetooth : "Data Not Found"}
              <p>WLAN: ${mobile?.others?.WLAN ? mobile?.others?.WLAN : "Data Not Found"}
          </div>
        </div>
        `
    main.appendChild(div);

}