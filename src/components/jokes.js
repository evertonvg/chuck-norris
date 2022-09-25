import axios from "axios"
import { hideLoad,showLoad } from './loader'


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
      console.log(res.data)
      document.querySelector('#jokes').innerHTML =  res.data.value
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
