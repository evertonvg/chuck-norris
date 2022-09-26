export const paginator = ()=>{
    let page = 1;
    let itemsPerPage = 10;
    let posts = document.querySelectorAll('.item-card')
    let buttons = Math. ceil(posts.length/itemsPerPage)


    const showCards = (setPage)=>{
        page = setPage
        posts.forEach((post,index)=>{
            if((index+1 <= page*itemsPerPage) && (index+1 >= (page*itemsPerPage)-(itemsPerPage-1))){
                post.classList.add('block')
                post.classList.remove('hidden')
            }else{
                post.classList.add('hidden')
                post.classList.remove('block')
            }
        })
    }

    const showButtons = (pageMoment)=>{
        let btnsPaginate = document.querySelectorAll('.btn-page')
        let showBtn = ['increase','decrease','1',String((btnsPaginate.length)-2),String(parseInt(pageMoment)+1),String(parseInt(pageMoment)+2),String(pageMoment-1),String(pageMoment-2),String(pageMoment)]
        btnsPaginate.forEach((btn)=>{

            if(showBtn.includes(btn.dataset.page)){
                btn.parentElement.classList.add('block')
                btn.parentElement.classList.remove('hidden')
            }else{
                btn.parentElement.classList.add('hidden')
                btn.parentElement.classList.remove('block')
            }
            btn.classList.remove('mr-2')
            btn.classList.remove('ml-2')
        })
        if(btnsPaginate[page-2]){
            if(btnsPaginate[page-2]!=1 && btnsPaginate[page-2]!=0){
                btnsPaginate[page-2].classList.add('ml-2')
            }
        }
        if(btnsPaginate[parseInt(page)+2]){
            if(btnsPaginate[parseInt(page)+2]!=btnsPaginate.length-2 && btnsPaginate[parseInt(page)+2]!=btnsPaginate.length-1){
                btnsPaginate[parseInt(page)+2].classList.add('mr-2')
            }
        }
    }
    
    if(buttons>1){
        document.querySelector('#paginator').innerHTML = `
        <ul class="flex items-center justify-center gap-1 max-w-full p-4">
        </ul>
        `
        for(let i=1;i<=buttons;i++){
            let btn = document.createElement('li')
            btn.innerHTML = `
                <button data-page="${i}"  class="${page != i ? 'bg-orange-500' : 'bg-orange-900'} btn-page w-6 h-8 sm:w-8 hover:bg-orange-700 transition-colors text-white flex items-center justify-center cursor-pointer">
                    ${i}
                </button>
            `
            document.querySelector('#paginator ul').appendChild(btn)
        }
        let beforeBtn = document.createElement('li')
        beforeBtn.innerHTML = `
            <button data-page="${'decrease'}" class="btn-page w-6 h-8 sm:w-8 bg-orange-500 ${page == 1 ? '' : ''} hover:bg-orange-700 transition-colors text-white flex items-center justify-center cursor-pointer disabled:bg-orange-200 disabled:cursor-auto" ${ page==1 ? 'disabled' : ''}>
                <<
            </button>
        `
        document.querySelector('#paginator ul').prepend(beforeBtn)

        let afterBtn = document.createElement('li')
        afterBtn.innerHTML = `
            <button data-page="${'increase'}" class="btn-page w-6 h-8 sm:w-8 bg-orange-500 hover:bg-orange-700 transition-colors text-white flex items-center justify-center cursor-pointer disabled:bg-orange-200 disabled:cursor-auto" ${ page==buttons ? 'disabled' : ''}>
                >>
            </button>
        `
        document.querySelector('#paginator ul').appendChild(afterBtn)

        

        let btnsPaginate = document.querySelectorAll('.btn-page')
        btnsPaginate.forEach((btn)=>{
            btn.addEventListener('click',(ev)=>{
                btnsPaginate.forEach((post)=>{
                    post.classList.remove('bg-orange-900')
                    post.classList.add('bg-orange-500')
                })
                switch(ev.target.dataset.page){
                    case 'decrease':
                        page --;
                        if(page<=0){
                            page=1;
                        }
                        btnsPaginate[page].classList.add('bg-orange-900')
                    break;
                    case 'increase':
                        page ++;
                        if(page>=buttons){
                            page=buttons;
                        }
                        btnsPaginate[page].classList.add('bg-orange-900')
                        break;
                    default:
                        page = ev.target.dataset.page
                        ev.target.classList.add('bg-orange-900')
                }
                
                btnsPaginate[0].disabled = page == 1 ? true : false
                btnsPaginate[btnsPaginate.length-1].disabled = page == buttons ? true : false
                
                showCards(page)
               
                showButtons(page)
            })
        })
        showButtons(1)
    }else{
        document.querySelector('#paginator').innerHTML = ``
    }
    showCards(1)
    
}