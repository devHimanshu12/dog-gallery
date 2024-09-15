const dogListUrl = new URL("https://dog.ceo/api/breeds/list/all");
let filteredData;



async function getDogMeta() {
    // document.getElementById('loader').innerHTML = 'loading'
//   handleLoader(true)
  handleLoader(true)
  const response = await fetch(dogListUrl);
  const dogMeta = await response.json();
  handleDogMeta(dogMeta.message);
}
getDogMeta();

async function handleDogMeta(list) {
  const breedKeys = Object.keys(list);
  try {
    // Creating an array of promises from API URLs
    const fetchPromises = breedKeys.map(async (name) => {
      const response = await fetch(
        `https://dog.ceo/api/breed/${name}/images/random`
      );
      let res = await response.json()
      return {name:name,res:res};
    });
    const data = await Promise.all(fetchPromises);
    filteredData =  data
    createGallery(data)
    this.createSearchInput()

  } catch (error) {
    console.error("Error:", error);
  }
}

function createGallery(data) {
// document.getElementById('loader').innerHTML = ''
  handleLoader(false)
  const gallery = document.getElementById('gallery')  
  gallery.innerHTML = ''
  let dogImgNameContainer = "";
  data.forEach(element => {
    dogImgNameContainer += `<div class='imgName-container'><img class='dog-image' src = ${element.res.message} loading='lazy'>
    <span class='dog-name'>${element.name}</span></div>`
  });
  dogImgNameContainer += `<div class='imgName-container'></div>`
  gallery.innerHTML = dogImgNameContainer

}

function handleLoader(isLoading){
    const loadingElem = document.getElementById('loader')    
    if(isLoading){
        loadingElem.classList.add('show-loader')
    }else{
        loadingElem.classList.remove('show-loader')
    }
}

function createSearchInput(){
  const headerElem = document.getElementById('header')
  let searchElem = document.createElement('input')
  searchElem.value = ''
  searchElem.type = 'text'
  searchElem.placeholder = 'type breed name'
  headerElem.appendChild(searchElem)
  searchElem.addEventListener('input',handleSearchInput)

}

function handleSearchInput(input){
  if(input.target.value){
    console.log(filteredData)
    console.log(input.target.value)
    let value = input.target.value
    let data = filteredData.filter((item) => item.name.includes(value))
    createGallery(data)
  }
  if(input.target.value === ''){
    createGallery(filteredData)
  }
}

