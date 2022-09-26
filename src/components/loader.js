
import chuckNorrisImage from '../images/chucknorris_logo_coloured_small.png'

export const  loader = ()=>{
    let load = document.createElement('div')
    load.id = 'loader'
    const list = ['fixed','top-0','left-0', 'w-screen','h-screen','bg-gray-500','items-center','justify-center','hidden'];
    load.classList.add(...list)
    load.innerHTML =
    `
        <img alt="Chuck Norris Jokes Api - JSON API for random Chuck Norris jokes" src="${chuckNorrisImage}" class="max-w-full animate-pulse">
    `
    document.querySelector('#content').appendChild(load);
}


export const showLoad = ()=>{
    let loader = document.querySelector('#loader');
    loader.classList.remove('hidden')
    loader.classList.add('flex')
}
export const hideLoad = ()=>{
    let loader = document.querySelector('#loader');
    loader.classList.remove('flex')
    loader.classList.add('hidden')
}