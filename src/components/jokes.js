import axios from "axios"
import { hideLoad,showLoad } from './loader'
import moment from 'moment'


let list = ['border-red-900','border-4']
let validateStatus = false;

export function jokes() {
  let form = document.forms.search;
  let loader = document.querySelector('#loader');
  let findField = document.querySelector('#find-field');
  let errorMessage = document.querySelector('#error-message');
  const getJokes = async () => {
    showLoad()
    axios.get(`https://api.chucknorris.io/jokes/search?query=${form.term.value}`)
    .then((res)=>{
      console.log(Object.values(res.data.result))
      document.querySelector('#jokes').innerHTML =  `
        <span class="bg-orange-500 block p-4 text-white">${res.data.total == 0 ? 'No jokes found.' :`there are ${res.data.total} joke(s) found.`}</span>
        ${ Object.values(res.data.result).map((item)=>{
          return  `<a href="${item.url}" target="_blank">
            <div class="p-4 shadow-md mt-4 pb-8 relative hover:-translate-y-1 transition-all">
                      ${item.value}
                      <span class="absolute bottom-2 left-4 text-gray-500 text-xs">${moment(item.updated_at).format('DD/MM/YYYY')}</span>
                    </div>
            </a>`
          }).join('')
        }
        <div class="mt-8">
          <ul class="flex items-center justify-center gap-3">
            <li class="">
              <button class="w-12 h-12 bg-orange-500 text-white flex items-center justify-center cursor-pointer">
                1
              </button>
            </li>
            <li >
              <button class="w-12 h-12 bg-orange-500 text-white flex items-center justify-center cursor-pointer">
                2
              </button>
            </li>
          </ul>
        </div>
      `
    })
    .catch(err=>{
      console.log(err)
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

}
