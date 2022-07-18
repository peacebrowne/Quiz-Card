let card_request = indexedDB.open('cardDB',1)
let card_db;
card_request.addEventListener('error', err => console.warn(err))

card_request.addEventListener('success', ev =>{
    card_db = ev.target.result
    // console.log('success', card_db)
})

const quiz = document.getElementById('quiz');
let topic;

// go to select option section
quiz.addEventListener('click',()=>{
    hideElement('#dropdown-icon')
    showElement('#quiz-back-icon')
    hideElement('#home-section')
    showElement('#form-options-section')
    get_topics()
    number_of_questions.value = ''
    selectedTopic.value = selectedTopic.children[0].textContent

})



// back to home section
const quiz_back_icon = document.getElementById('quiz-back-icon')
quiz_back_icon.addEventListener('click',()=>{
    showElement('#dropdown-icon')
    hideElement('#quiz-back-icon')
    showElement('#home-section')
    hideElement('#form-options-section')

    // reinitialize option form
    number_of_questions.value = ''
    let option = `
        <option selected disabled>Please select topic..</option>
        `
    selectedTopic.replaceChildren()
    selectedTopic.innerHTML = option
    
        
})

const general_topic = n =>{
    // document.getElementById('general').remove()

    let option = document.createElement('option')
    option.classList.add('option')
    option.setAttribute('id','general')
    option.setAttribute('value',`general-${n}`)
    option.textContent = `GENERAL Q(${n})`
    selectedTopic.appendChild(option)
}
    

// insert topic for selection
const insert_topics = topic =>{
    
    topic.forEach(top =>{

        let option = document.createElement('option')
        option.classList.add('option')
        option.setAttribute('value',`${top.t}-${top.q}`)
        option.textContent = `${top.t} Q(${top.q})`
        selectedTopic.appendChild(option)
        // total_number_question(top.q)

    })

}

let total = 0

const total_number_question = numb =>{

    total += +numb

}


// getting all topics from database
const get_topics = () =>{

    let transaction = card_db.transaction("userQuestions","readonly").objectStore('userQuestions');
    let dbObject = transaction.get(email)
    
    dbObject.onsuccess = event =>{
        let result = event.target.result.questions;
        general_topic(result.length)
        question = result;
        
        let all_topics = [];

        result.forEach(a => {

            let value = all_topics.some(val => val.t === a.topic)

            if (value === false) {
                let topic = a.topic
                let quest = result.filter( q => q.topic === topic)
                
                all_topics.push({
                    t:topic,
                    q: quest.length
                })

            }


        })

        insert_topics(all_topics)

    }

}


// start quiz
const number_of_questions = document.querySelector('#select-options input')
const selectedTopic = document.querySelector('#form-options-section select')

const start_quiz = document.querySelector('#form-options-section #start-btn')

const quiz_data = () =>{

    let data = {}

    if(selectedTopic.value === selectedTopic.children[0].textContent){
        Swal.fire({
            icon: 'error',
            title: `Please select your topic`,
            confirmButtonText: "Close"
        })
        return ;
    }else data[selectedTopic.name] = selectedTopic.value.split('-')[0];

    if(number_of_questions.value === ''){
        Swal.fire({
            icon: 'error',
            title: `Please select your number of questions`,
            confirmButtonText: "Close"
        })
        return ;
    }else data[number_of_questions.name] = number_of_questions.value

    let topic_question = +selectedTopic.value.split('-')[1]
    validate_numbOfQ_and_topic(data,topic_question)

}

const validate_numbOfQ_and_topic = (t,n) =>{

    // console.log(t,n)
    if(+t.numberQ > n){
        Swal.fire({
            icon: 'error',
            title: `Selected number is high...`,
            confirmButtonText: "Close"
        })
        return ;
    }


    generate_random_question(t)

}

let random_question;
let random_number;
let question;


const generate_random_question = data =>{

  
    let rn = 0;
    let sn = data.numberQ;
    random_question = [];

    if(data.topic === 'general'){

        for(let i = 0; i < sn; i++){
            
            let ql = question.length;

            rn = generateRandomNumber(ql)
            random_question.push(question[rn])
            question.splice(rn,1)

        }

    }
    else {

        let topic = data.topic;
        let st = question.filter(t => topic === t.topic)
        
        for(let i = 0; i < sn; i++){

            let tl = st.length;

            rn = generateRandomNumber(tl)
            random_question.push(st[rn])
            st.splice(rn,1)


        }

    }

    setTimeout(()=>{

        hideElement('#form-options-section')
        showElement('#card')
        hideElement('#quiz-back-icon')
        showElement('#card-back-icon')
        display__first_questions(random_question)
    
    },1000)

    return ;

}

const get_question =()=>{

    let transaction = card_db.transaction("userQuestions","readonly").objectStore('userQuestions');
    let dbObject = transaction.get(email)

    dbObject.onsuccess = event =>{

        question = event.target.result.questions
        
    }
    
}


const generateRandomNumber = num =>{

    return  Math.floor(Math.random() * (num))

}

start_quiz.addEventListener('click', ev => {
    ev.preventDefault()
    quiz_data()

})
const checks = document.querySelectorAll('.check')

const card_back_icon = document.getElementById('card-back-icon')
card_back_icon.addEventListener('click',()=>{
    showElement('#form-options-section')
    hideElement('#card')
    showElement('#quiz-back-icon')
    hideElement('#card-back-icon')
    get_question()
    checks.forEach(c => c.style.display = 'none')
    score.textContent = 0
})


const show_and_hide_ans = document.getElementById('showAndHideAns')

show_and_hide_ans.addEventListener('click', ev =>{
    ev.preventDefault()
    
    let text = ev.target.textContent
    if(text === 'show ans'){

        show_ans()
        
    }

    if(text === 'hide ans'){

        hide_ans()

    }

})

// show answer
const show_ans = () =>{

    hideElement('#card .card')
    showElement('#hidden_ans')
    show_and_hide_ans.textContent = 'hide ans'

}

// hide answer
const hide_ans = () =>{

    showElement('#card .card')
    hideElement('#hidden_ans')
    show_and_hide_ans.textContent = 'show ans'

}

const question_bar = document.querySelector('#question-bar .question')
const question_number = document.querySelector('#question-bar .num')
const optionA = document.querySelector('#ans-bar #optionA')
const optionB = document.querySelector('#ans-bar #optionB')
const optionC = document.querySelector('#ans-bar #optionC')
const hidden_ans = document.querySelector('#hidden_ans span')
const score = document.querySelector('#score').children[1]


const display__first_questions = q =>{

    // question
    // console.log('Random Questions:',q)
    question_bar.textContent = q[0].question;
    question_bar.setAttribute('id',`${0}`)
    question_number.textContent = 1

    // options
    optionA.textContent = q[0].optionA
    optionB.textContent = q[0].optionB
    optionC.textContent = q[0].optionC
    let ca = get_correct_answer(q[0])
    hidden_ans.textContent = ca;


}

const options_btns = document.querySelectorAll('.option')

options_btns.forEach(btn =>{
    btn.addEventListener('click', () =>{

        let checked = checked_already()
        if(checked == 'checked') return;
        
        let correct = correct_answer(btn)
        if (correct == 'correct') return;

        let wrong =  wrong_answer(btn)
        if (wrong == 'wrong') return;
       
    })
})

// check if ans already selected
const checked_already = () =>{

    for(const btn of checks){

        if(btn.style.display == 'flex') {
            Swal.fire({
                icon: 'error',
                title: `Answer Already Selected`,
                confirmButtonText: "Close"
            })
            return 'checked'
        }

    }

}

// correct ans
const correct_answer = btn =>{

    let correct = btn.nextElementSibling.nextElementSibling;
    let ans = btn.nextElementSibling.textContent

    if(ans == hidden_ans.textContent){
        correct.style.display = 'flex'
        score.textContent = +score.textContent + 10;
        return 'correct';
    }

}

const right_answers = document.querySelectorAll('.correct')
let prev_correct_ans;
let prev_wrong_ans;

// wrong ans
const wrong_answer = btn =>{

    let wrong = btn.nextElementSibling.nextElementSibling.nextElementSibling;
    let ans = btn.nextElementSibling.textContent

    if(ans != hidden_ans.textContent){

        wrong.style.display = 'flex'
        prev_wrong_ans = ans
        
    }

    for(const correct of right_answers){
       
        let answer = correct.previousElementSibling.textContent;
        if(answer === hidden_ans.textContent){
            correct.style.display = 'flex'
            prev_correct_ans = answer
            return 'wrong';
        }

    }

}



const next_btn = document.querySelector('#card-btn #nextBtn')
const finishBtn = document.querySelector('#card-btn #finishBtn')



const next_question = ev =>{

    ev.preventDefault();
    let compulsary = compulsary_ans();
    if(compulsary == 'no ans') return;


    question_number.textContent = +question_number.textContent + 1;
    let id = +question_bar.id;
    let next = random_question[id+1]

    let game_over = quiz_over(id+1,random_question.length)
    if(game_over == 'quiz finish') return;

    question_bar.id = id+1
    question_bar.textContent = next.question;

    optionA.textContent = next.optionA
    optionB.textContent = next.optionB
    optionC.textContent = next.optionC
    let ca = get_correct_answer(next)
    hidden_ans.textContent = ca;
    checks.forEach(c => c.style.display = 'none')

}
next_btn.addEventListener('click',next_question)

const quiz_over = (qi,ql) =>{

    let n = +qi;
    let l = ql;

    if(n === l){

        Swal.fire({
            title: `GAME OVER`,
            confirmButtonText: "OK"
        })
        hideElement('#nextBtn')
        showElement('#finishBtn')
        return 'quiz finish'
    }

}

const compulsary_ans = () =>{

    let counter = 0;
    for(const btn of checks){

        if(btn.style.display == '' || btn.style.display == 'none') counter++

    }
  

    if(counter === checks.length) {

        Swal.fire({
            icon: 'error',
            title: `Please Select Answer`,
            confirmButtonText: "Close"
        })
        return 'no ans'

    }

}

const finish_questions = ev =>{

    ev.preventDefault();
    // console.log('Random Questions:',random_question)
    hideElement('')
}
finishBtn.addEventListener('click',finish_questions)
