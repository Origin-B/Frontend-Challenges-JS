const modeBtn = document.getElementById('mode');
const filterBtns = document.getElementById('filter');
const extensionList = document.getElementById('extensions-list');
let extensionData = []

modeBtn.addEventListener('click',()=>{
  document.documentElement.classList.toggle('dark');
})

function createExtension(extensionData) {
  extensionList.innerHTML = '';
  const filter = [...filterBtns.children].filter(e => e.classList.contains('act-filter'))[0].textContent.trim().toLocaleLowerCase();
  let extensions = 
    (filter === 'all') ? extensionData 
      : (filter === 'active') ? extensionData.filter( e => e.isActive === true )
        : extensionData.filter( e => e.isActive === false )
  extensions.forEach(e => {
    const card = document.createElement('div');
    card.setAttribute('active-statue',`${e.isActive}`)
    card.className = 'max-w-104 p-5 rounded-3xl flex flex-wrap gap-10 justify-between bg-N-0 shadow-[1px_0_2px_1px_hsl(227deg_75%_14%_/20%)] dark:border dark:border-N-600 dark:bg-N-800'
    card.innerHTML =
      `
      <article class="w-full flex gap-4 items-start">
        <img src="${e.logo}" alt="${e.name} logo">
        <div class="flex flex-col gap-2">
          <h3 class="text-N-900 font-bold dark:text-N-0 text-xl">
          ${e.name}
          </h3>
          <p>
          ${e.description}
          </p>
        </div>
      </article>
        <button
          class="remove p-padding outline-2 outline-N-300 rounded-[30px] text-N-900 cursor-pointer transition hover:bg-Red-700 hover:text-N-0 focus:outline-2 focus:outline-Red-700 focus:bg-N-300 dark:text-N-200 dark:hover:bg-Red-500 hover:outline-0 dark:hover:text-N-900 dark:focus:bg-N-600 dark:outline-N-600">
          Remove
        </button>
        <span
          class="statue w-10 h-6 p-1 flex items-center ${(e.isActive === true)? 'active-btn' : 'inactive-btn' } rounded-4xl cursor-pointer before:content-[''] before:block before:h-3.75 before:w-3.75 before:rounded-full before:bg-N-0">
        </span>
      </div>
      `
    extensionList.append(card);
  })
  
}

async function createExtensionList() {
  try {
    let data = await fetch('./data.json');
    extensionData = await data.json();
    createExtension(extensionData);
  } catch (error) {
    console.error('No Data Founded')
  }
}

createExtensionList()

filterBtns.addEventListener('click',(e)=>{
  [...filterBtns.children].forEach(ele => ele.classList.remove('act-filter') );
  [...filterBtns.children].forEach(ele => ele.classList.add('inactive-filter') );
  e.target.classList.remove('inactive-filter');
  e.target.classList.add('act-filter');
  createExtension(extensionData)
})

extensionList.addEventListener('click',(e)=>{
  if(e.target.classList.contains('remove')){
    e.target.parentElement.remove()
  }else if(e.target.classList.contains('statue')){
    e.target.classList.toggle('inactive-btn');
    e.target.classList.toggle('active-btn');
    e.target.parentElement.setAttribute('active-statue',`${(e.target.classList.contains('active-btn')) ? 'true' : 'false' }`)
  }
})
