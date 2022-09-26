export const paginator = ()=>{
    let page = 1;
    let itemsPerPage = 10;
    let posts = document.querySelectorAll('.item-card')
    let buttons = Math. ceil(posts.length/itemsPerPage)

    if(buttons>1){
        document.querySelector('#paginator').innerHTML = `
        <ul class="flex items-center justify-center gap-3">
        </ul>
    `
        for(let i=1;i<=buttons;i++){
            let btn = document.createElement('li')
            btn.innerHTML = `
                <button class="w-12 h-12 bg-orange-500 hover:bg-orange-700 transition-colors text-white flex items-center justify-center cursor-pointer">
                    ${i}
                </button>
            `
            document.querySelector('#paginator ul').appendChild(btn)
        }
        let beforeBtn = document.createElement('li')
        beforeBtn.innerHTML = `
            <button class="w-12 h-12 bg-orange-500 hover:bg-orange-700 transition-colors text-white flex items-center justify-center cursor-pointer">
                <<
            </button>
        `
        document.querySelector('#paginator ul').prepend(beforeBtn)

        let afterBtn = document.createElement('li')
        afterBtn.innerHTML = `
            <button class="w-12 h-12 bg-orange-500 hover:bg-orange-700 transition-colors text-white flex items-center justify-center cursor-pointer">
                >>
            </button>
        `
        document.querySelector('#paginator ul').appendChild(afterBtn)


        posts.forEach((post,index)=>{
            console.log(page,itemsPerPage)
            if((index+1 <= page*itemsPerPage) && (index+1 >= page*itemsPerPage-itemsPerPage)){
                post.classList.add('block')
                post.classList.remove('hidden')
            }
        })
    }
    
}