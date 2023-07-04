const questions = [
    {
        pertanyaanku : "Apakah bisa kita menang dengan orang bermateri?",
        answers : [
            {text : "Bisa jadi, gua menang soal pemikiran", correct : true},
            {text : "Kagak lah, mending mundur gua sih", correct : false},
            {text : "Kamu nanya?", correct : false},
            {text : "Bentar dulu gua mau ngopi", correct : false},
        ]
    },
    {
        pertanyaanku : "Siapa presiden pertama indonesia?",
        answers : [
            {text : "Ir. Soekarno", correct : true},
            {text : "BJ. Habibie", correct : false},
            {text : "Joko Widodo", correct : false},
            {text : "Mega-chan", correct : false},
        ]
    },
    {
        pertanyaanku : "Apa bentuk bumi?",
        answers : [
            {text : "Kotak", correct : false},
            {text : "Donat", correct : false},
            {text : "Bulat", correct : true},
            {text : "Datar", correct : false},
        ]
    }
]

const tanya = document.getElementById("question");
const jawab = document.getElementById('answer-btn');
const next = document.getElementById('next-btn');
const nomer = document.getElementById('nomor');

var indexTanya = 0;
var score = 0;

function start(){
    indexTanya = 0;
    score = 0;
    next.innerHTML = 'Next';
    showQuestion();
};

function showQuestion(){
    reset();
    let pertanyaan = questions[indexTanya];
    tanya.innerHTML = pertanyaan.pertanyaanku;
    nomer.innerHTML = indexTanya + 1;

    pertanyaan.answers.forEach(e => {
        const tombol = document.createElement('button');
        tombol.innerHTML = e.text;
        tombol.classList.add('btn');
        jawab.appendChild(tombol);
        if (e.correct){
            tombol.dataset.correct = e.correct;
        }
        tombol.addEventListener('click', e => {
            const selected = e.target;
            const isCorrect = selected.dataset.correct === "true";
            if (isCorrect){
                tombol.classList.add('benar');
                score++;
            } else {
                tombol.classList.add('salah');
            }
            Array.from(jawab.children).forEach(tombol => {
                if (tombol.dataset.correct === "true"){
                    tombol.classList.add('benar')
                };
                tombol.disabled = true;
                tombol.style.cursor = 'no-drop';
            });
            next.style.display = 'block';
        })
    })
};

function reset(){
    next.style.display = 'none';
    while(jawab.firstChild){
        jawab.removeChild(jawab.firstChild)
    }
}

function handleNext (){
    indexTanya++;
    if (indexTanya < questions.length){
        showQuestion()
    } else {
        showEnd();
    }
}

function showEnd(){
    reset();
    tanya.innerHTML = `Total jawaban kamu yang benar ${score} dari ${questions.length} pertanyaan!`;
    next.innerHTML = 'Bermain Lagi';
    next.style.display = 'block';
}

next.addEventListener('click', () => {
    if (indexTanya < questions.length){
        handleNext();
    } else {
        start();
    }
})

start();