import axios from "axios"
import { hideLoad,showLoad } from './loader'
import moment from 'moment'
import {paginator} from './paginator';

let list = ['border-red-900','border-4']
let validateStatus = false;


export const jokes = () =>{
  let form = document.forms.search;
  let loader = document.querySelector('#loader');
  let findField = document.querySelector('#find-field');
  let errorMessage = document.querySelector('#error-message');
  const getJokes = () => {
    showLoad()
    axios.get(`https://api.chucknorris.io/jokes/search?query=${form.term.value}`)
    .then((res)=>{
      document.querySelector('#jokes').innerHTML =  `
        <span class="bg-orange-500 block p-4 text-white">${res.data.total == 0 ? 'No jokes found.' :`there are ${res.data.total} joke(s) found.`}</span>
        ${ Object.values(res.data.result).map((item)=>{
          return  `<a href="${item.url}" target="_blank" class="item-card hidden animate-fade">
              <div class="border-l-4 border-l-orange-600 card-item p-4 shadow-md mt-4 pb-8 relative hover:-translate-y-1 transition-all">
                ${item.value}
                <span class="absolute bottom-2 left-4 text-gray-500 text-xs">${moment(item.updated_at).format('DD/MM/YYYY')}</span>
              </div>
            </a>`
          }).join('')
        }
      `
      paginator()
    })
    .catch(err=>{
      console.log(err)
      document.querySelector('#jokes').innerHTML =  `<span class="bg-orange-500 block p-4 text-white">Server error, please come back later</span>`
    })
    .finally(()=>{
      hideLoad()
    })
    
  }

  const getLucky = () =>{
    showLoad()
    axios.get(`https://api.chucknorris.io/jokes/search?query=${findField.value}`)
      .then((resp)=>{
        console.log(resp.data.result[0],resp.data.total)
        document.querySelector('#jokes').innerHTML = `
          <span class="bg-orange-500 block p-4 text-white">${resp.data.total == 0 ? 'No luck, sorry.' : 'your luck is here'}</span>
          ${
            resp.data.total > 0 ?
            `
            <a href="${resp.data.result[0].url}" target="_blank" class="item-card animate-fade">
            <div class="border-l-4 border-l-orange-600 card-item p-4 shadow-md mt-4 pb-8 relative hover:-translate-y-1 transition-all">
              ${resp.data.result[0].value}
              <span class="absolute bottom-2 left-4 text-gray-500 text-xs">${moment(resp.data.result[0].updated_at).format('DD/MM/YYYY')}</span>
            </div>
          </a>
            ` : `` 
          }
        `
      })
      .catch(err=>{
        console.log(err)
        document.querySelector('#jokes').innerHTML =  `<span class="bg-orange-500 block p-4 text-white">Server error, please come back later</span>`
      })
      .finally(()=>{
        hideLoad()
      })
  }

  const valid = () =>{
    findField.classList.remove(...list)
    errorMessage.classList.add('hidden')
  }
  const invalid = () =>{
    findField.classList.add(...list)
    errorMessage.classList.remove('hidden')
  }
  const validate = () =>{
    if(findField.value.length < 3){
      invalid()
      return false
    }else{
      valid()
      return true
    }
  }

  form.addEventListener('submit',(ev)=>{
    ev.preventDefault()
    let status = validate()
    if(status==false){
      validateStatus = true;
      return
    }
    getJokes()
    validateStatus = false
  })

  findField.addEventListener('input',()=>{
    if(validateStatus==true){
      validate()
    }
  })

  let lucky =document.querySelector('#lucky')
  lucky.addEventListener('click',()=>{
    let status = validate()
    if(status==false){
      validateStatus = true;
      return
    }
    getLucky()
    validateStatus = false
  })
}
