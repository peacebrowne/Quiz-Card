// logging out
const logOut = document.getElementById('log-out')
logOut.addEventListener('click',()=>{
    localStorage.removeItem('email')
    location.replace("sign_up.html")
})

const account_name = () =>{
    let un = localStorage.getItem('un')
    let name = document.querySelector('header #name-initial strong')
    name.textContent = un
    
};
account_name()


let request = indexedDB.open('cardDB',1)
let db;
let store;
let objectStore;
let userQuestions;
let generalQuestions;
request.addEventListener('error', err => console.warn(err))

request.addEventListener('success', ev =>{
    db = ev.target.result
    // console.log('success', db)
})


request.addEventListener('upgradeneeded', ev =>{
    db = ev.target.result
    // console.log('upgrade', db)
    
    if(! db.objectStoreNames.contains('userData')){
        objectStore = db.createObjectStore('userData', {
            keyPath: 'email'
        })
       
    
    }


    if(! db.objectStoreNames.contains('userQuestions')){
        userQuestions = db.createObjectStore('userQuestions', {
            keyPath: 'email'
        })
       
    }
})

let email = localStorage.getItem('email')



// const quiz = document.getElementById('quiz');
const add_question = document.getElementById('add-question')
const view_question = document.getElementById('view-question')

let message;

// // go to select option section
// quiz.addEventListener('click',()=>{
//     hideElement('#dropdown-icon')
//     showElement('#quiz-back-icon')
//     hideElement('#home-section')
//     showElement('#form-options-section')
// })

// const select_topic = document.querySelector('#select-options .card select')
// const number_of_questions = document.querySelector('#select-options input')

// // back to home section
// const quiz_back_icon = document.getElementById('quiz-back-icon')
// // const quiz_back_home = document.querySelector('#select-options #back-home')
// quiz_back_icon.addEventListener('click',()=>{
//     showElement('#dropdown-icon')
//     hideElement('#quiz-back-icon')
//     showElement('#home-section')
//     hideElement('#form-options-section')

//     // reinitialize option form
//     // select_topic.value = select_topic.children[0].value;
//     number_of_questions.value = ''
// })


// add questions section
add_question.addEventListener('click',()=>{
    message = 'added'
    hideElement('#dropdown-icon')
    showElement('#add-back-icon')
    hideElement('#home-section')
    showElement('#add-question-section')
})

const add_question_form = document.querySelectorAll('#add-question-section form input')
const add_question_textarea = document.querySelector('#add-question-section form textarea')
const add_question_correctAns = document.querySelector('#add-question-section select')
const add_question_submitBtn = document.querySelector('#add-question-section #submit-btn')
const add_back_icon = document.getElementById('add-back-icon')
// const add_question_back_home = document.querySelector('#add-question-section #back-home')
add_back_icon.addEventListener('click',()=>{
    showElement('#home-section')
    showElement('#dropdown-icon')
    hideElement('#add-back-icon')
    hideElement('#add-question-section')

    // reinitialize add question form
    reInitializeForm(add_question_form)
    add_question_correctAns.value = add_question_correctAns.children[0].value
    add_question_textarea.value = ''

   
})

const add_question_data = () =>{

    let questionData = {};

    // validating question
    if(add_question_textarea.value === ''){
        Swal.fire({
            icon: 'error',
            title: `Please enter the ${add_question_textarea.name} field`,
            confirmButtonText: "Close"
        })
        return ;
    }
    questionData[add_question_textarea.name] = add_question_textarea.value;
    
    // validating for empty answers
    for(let i = 0; i < add_question_form.length; i++){

        const data = add_question_form[i]
    
        if(data.value === ''){

             Swal.fire({
                icon: 'error',
                title: `Please enter the ${data.name} answer`,
                confirmButtonText: "Close"
            })
            return ;
        }
        
        questionData[data.name] = data.value;

    }

    if(add_question_correctAns.value === add_question_correctAns.children[0].value){

        Swal.fire({
            icon: 'error',
            title: `Please enter the ${add_question_correctAns.name} field`,
            confirmButtonText: "Close"
        })
        return ;

    }
    questionData[add_question_correctAns.name] = add_question_correctAns.value;
    return questionData
}


const get_added_question = data =>{

    add_question_validation(data)

}




// validatind added question
const add_question_validation = data => {

    let transaction = db.transaction("userQuestions","readonly").objectStore('userQuestions');
    let dbObject = transaction.get(email)

    dbObject.onsuccess = event =>{
        let questions = event.target.result.questions;
        
        let question_id = generate_questionID(questions)

        data['id'] = question_id;
        submit_added_question(data)

    }

}

// generating added question id
const generate_questionID = questions =>{
    let randomNumber = 0;

    for (let i = 0; i < 5; i++) {
       randomNumber += Math.floor(Math.random() * 100)
    }
     
    return randomNumber;

}

// subimtting added question
const submit_added_question = data =>{

    let transaction = db.transaction("userQuestions","readwrite").objectStore('userQuestions');
    let dbObject = transaction.get(email)

    dbObject.onsuccess = event =>{
        let question = event.target.result;
        question.questions.push(data)

        // update question database
        transaction.put(question)

        reInitializeForm(add_question_form)
        add_question_correctAns.value = add_question_correctAns.children[0].value
        add_question_textarea.value = ''
        Swal.fire({
            title: `Question Successfully ${message}`,
            confirmButtonText: "Close"
        })
        return ;

    }
    
}

// add question submit btn
add_question_submitBtn.addEventListener('click', ev =>{
    ev.preventDefault();
    get_added_question(add_question_data())

})


view_question.addEventListener('click', ev => {

    hideElement('#dropdown-icon')
    hideElement('#initial')
    showElement('#search-form')
    showElement('#view-back-icon')
    hideElement('#home-section')
    showElement('#view-question-section')
    read_questions()

})

const view_question_bar = document.getElementById('view-question-section')
const view_question_bar_title = document.querySelector('#view-question-section .title')
const view_back_icon = document.getElementById('view-back-icon')
view_back_icon.addEventListener('click', ev=>{

    hideElement('#view-question-section')
    hideElement('#search-form')
    hideElement('#view-back-icon')
    showElement('#home-section')
    showElement('#dropdown-icon')
    showElement('#initial')
    view_question_bar.innerHTML = `
        <div class="form-control title">
            <span>VIEW QUESTION</span>
        </div>
    `

})

const edit_back_icon = document.getElementById('edit-back-icon')
edit_back_icon.addEventListener('click', ev=>{

    hideElement('#edit-question-section')
    showElement('#search-form')
    hideElement('#edit-back-icon')
    showElement('#view-back-icon')
    showElement('#view-question-section')
    // showElement('#dropdown-icon')
    hideElement('#initial')
    view_question_bar.innerHTML = `
        <div class="form-control title">
            <span>VIEW QUESTION</span>
        </div>
    `
    read_questions()
})


const read_questions = () =>{
    let transaction = db.transaction("userQuestions","readonly").objectStore('userQuestions');
    let dbObject = transaction.get(email)

    dbObject.onsuccess = event =>{
        let questions = event.target.result.questions;
        
        display_user_questions(questions)
        delete_questionBtn()
        edit_questionBtn()
    }
}

// display all user questions
const display_user_questions = questions =>{
    // console.log(questions)

    if(questions.length === 0){
        Swal.fire({
            icon: 'error',
            title: `There's no question in your box.`,
            confirmButtonText: "Close"
        })
        return ;
    }

    questions.forEach( question => {
       let ans =  get_correct_answer(question)
    
       question.ans = ans;

        views(question)
    })

}

const get_correct_answer = q =>{

    let result = Array.of(q.correctAnswer).flatMap(a => a.split('-')).join('');
    
    let convertion = Object.entries(q)

    let ans = convertion.find(a => a[0] === result)

    return ans[1]

}

const views = q =>{

    let question_div = document.createElement('div')
    question_div.classList.add('form-control')
    question_div.classList.add('view-question-option')
    question_div.setAttribute('id', `q-${q.id}`)

    let print = `
        <div class="view-question form-control">
            <span>
                <strong>${q.question}</strong>
            </span>
        </div>
        <div class="view-answer form-control">
            <span>
                <strong>Ans:</strong> ${q.ans}
            </span>
        </div>
        <div class="view-btn form-control">
            <a href="#"  class="btn btn-primary edit-btn">Edit</a>
            <a href="#" class="btn btn-primary delete-btn">Delete</a>
        </div>
        <span class="topic" style="display:none">
            ${q.topic}
        </span>
        <span class="a" style="display:none">
            ${q.optionA}
        </span>
        <span class="b" style="display:none">
            ${q.optionB}
        </span>
        <span class="c" style="display:none">
            ${q.optionC}
        </span>
        <span class="ca" style="display:none">
            ${q.correctAnswer}
        </span>

    
    `

    question_div.innerHTML = print;
    view_question_bar.append(question_div)

}

// Delete questions  buttons from database
const delete_questionBtn = () =>{

    let deleteBtn = document.querySelectorAll('.delete-btn')

    deleteBtn.forEach(btn => {
        btn.addEventListener('click', ev =>{
            message = 'deleted'

            // get deleted question id
            let id = questionID(ev)

            // make a transaction with the database
            let transaction = db.transaction("userQuestions","readwrite").objectStore('userQuestions');
            let dbObject = transaction.get(email)

            dbObject.onsuccess = event =>{

                let response = event.target.result
                let request = response.questions;

                for (let i = 0; i < request.length; i++) {
                    const element = request[i];

                    if(id === element.id){
                        request.splice(i,1)

                        transaction.put(response)
                        remove_question(ev)

                        Swal.fire({
                            title: `Question Successfully ${message}`,
                            confirmButtonText: "Close"
                        })
                        return ;

                    }
                    
                }
                

            }

        })
    })

}


// deleted question id
const questionID = ev =>{

    let term = ev.target.parentElement.parentElement.id;
    
    return +term.split('-')[1];

}

const remove_question = ev =>{

    let removedQuestion = ev.target.parentElement.parentElement;
    removedQuestion.remove()


}

// Editing question
const edit_question_SubmitBtn = document.querySelector('#edit-question-section #submit-btn')
const edit_question_topic = document.querySelector('#edit-question-section #topic')
const edit_quiz_question = document.querySelector('#edit-question-section textarea')
const edit_question_optionA = document.querySelector('#edit-question-section #option-A')
const edit_question_optionB = document.querySelector('#edit-question-section #option-B')
const edit_question_optionC = document.querySelector('#edit-question-section #option-C')
const edit_question_correctAns = document.querySelector('#edit-question-section select')
// const edit_question_backBtn = document.querySelector('#edit-question-section #back-home')
let editQ_id;
let question_index;

// edit question btn
const edit_questionBtn = ()=>{

    const edit_btn = document.querySelectorAll('.edit-btn')

    edit_btn.forEach(btn => {

        // if edit btn is clicked 
        btn.addEventListener('click', ev =>{

            editQ_id = +ev.target.parentElement.parentElement.id.split('-')[1];
           
            // make transaction with db to get edited question by it's id
            let transaction = db.transaction("userQuestions","readonly").objectStore('userQuestions');
            let dbObject = transaction.get(email)

            dbObject.onsuccess = event =>{

                let data = event.target.result
                let result = data.questions
                let question = result.find( q => q.id === editQ_id)
                question_index = result.indexOf(question)
                open_editor(question)
                

            }
           
        })
    })


}

// display question editor
const open_editor = question =>{

    hideElement('#view-question-section')
    showElement('#edit-question-section')
    showElement('#edit-back-icon')
    showElement('#initial')
    hideElement('#search-form')
    hideElement('#view-back-icon')

    edit_question_topic.value = question.topic
    edit_quiz_question.value = question.question
    edit_question_optionA.value = question.optionA
    edit_question_optionB.value = question.optionB
    edit_question_optionC.value = question.optionC
    edit_question_correctAns.value = question.correctAnswer

}


const question_editor = () => {
    let userData = {};
    let  edit_question_form = document.querySelectorAll('#edit-question-section input')

    for(let i = 0; i < edit_question_form.length; i++){

        const data = edit_question_form[i]
    
        if(data.value === ''){

             Swal.fire({
                icon: 'error',
                title: `Please enter the ${data.name} field`,
                confirmButtonText: "Close"
            })
            return ;
        }
        
        userData[data.name] = data.value;

    }

    if(edit_question_correctAns.value !== ''){
        userData[edit_question_correctAns.name] = edit_question_correctAns.value
    }else{
        Swal.fire({
            icon: 'error',
            title: `Please enter the ${edit_question_correctAns.name} field`,
            confirmButtonText: "Close"
        })
        return;
    }

    if(edit_quiz_question.value !== ''){
        userData[edit_quiz_question.name] = edit_quiz_question.value
    }else{
        Swal.fire({
            icon: 'error',
            title: `Please enter the ${edit_quiz_question.name} field`,
            confirmButtonText: "Close"
        })
        return;
    }

    userData["id"] = editQ_id
    return userData

}

const submit_edit_question = editQ =>{
    message = 'edited'
    // make transaction with db to get edited question by it's id
    let transaction = db.transaction("userQuestions","readwrite").objectStore('userQuestions');
    let dbObject = transaction.get(email)

    dbObject.onsuccess = event => {

        let result = event.target.result;
        let question = result.questions;
        question.fill(editQ,question_index,question_index+1)
        transaction.put(result)
        Swal.fire({
            title: `Question Successfully ${message}`,
            confirmButtonText: "Close"
        })
        return ;

    }


}

edit_question_SubmitBtn.addEventListener('click', ev =>{
    ev.preventDefault()
    
    submit_edit_question(question_editor())

})

// back to view questions to see up
// edit_question_backBtn.addEventListener('click',()=>{
//     let  edit_question_form = document.querySelectorAll('#edit-question-section input')
//     reInitializeForm(edit_question_form)
//     edit_quiz_question.value = ''
//     edit_question_correctAns.value = edit_question_correctAns.children[0].textContent

//     hideElement('#edit-question-section')
//     showElement('#home-section')


// })

// reinitialising input field
const reInitializeForm = data =>{

    data.forEach(input => input.value = '');
   
}

// searching among display questions
const search_question = ev =>{

    let term = ev.target.value;
    let search_items = document.querySelectorAll('#view-question-section .view-question-option .view-question span strong')
    
    search_items.forEach(q => {
        let question = q.parentElement.parentElement.parentElement;
        let content = q.textContent.toLocaleLowerCase()

        if(content.indexOf(term) > -1){

            question.style.display = 'flex'

        }else{
            question.style.display = 'none'
        }

    })

}

const search = document.querySelector('#search-form input')
search.addEventListener('keyup', search_question)
