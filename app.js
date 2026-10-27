"use strict";
const demoQuestions = [
 {q:"Ao encontrar um sinal STOP, o condutor deve:",a:["Diminuir um pouco e continuar","Parar completamente e avançar só quando for seguro","Buzinar e avançar"],correct:1},
 {q:"Ao aproximar-se de uma passadeira com peões, deve:",a:["Aumentar a velocidade","Ignorar os peões se não houver semáforo","Reduzir a velocidade e dar prioridade conforme as regras"],correct:2},
 {q:"Conduzir depois de consumir álcool:",a:["Aumenta o risco de acidente e deve ser evitado","É seguro em pequenas distâncias","É permitido se conduzir devagar"],correct:0},
 {q:"Quando a estrada está molhada, é importante:",a:["Aumentar a distância de segurança","Manter a mesma distância em qualquer situação","Travar bruscamente nas curvas"],correct:0},
 {q:"Antes de mudar de faixa, o condutor deve:",a:["Mudar imediatamente","Sinalizar e verificar os espelhos e o ângulo morto","Usar a buzina em vez de sinalizar"],correct:1},
 {q:"O cinto de segurança deve ser usado:",a:["Apenas em viagens longas","Só pelo condutor","Pelo condutor e passageiros, conforme as regras aplicáveis"],correct:2},
 {q:"Ao aproximar-se de um cruzamento sem boa visibilidade, deve:",a:["Reduzir a velocidade e observar cuidadosamente","Acelerar para passar depressa","Confiar que os outros vão parar"],correct:0},
 {q:"Se um veículo de emergência se aproxima com sinais sonoros e luminosos, deve:",a:["Facilitar a passagem em segurança","Seguir atrás dele de perto","Bloquear a via"],correct:0},
 {q:"Usar o telemóvel na mão enquanto conduz:",a:["É seguro em trânsito lento","Distrai e aumenta o risco de acidente","Ajuda a manter a atenção"],correct:1},
 {q:"Ao circular à noite, deve:",a:["Usar as luzes adequadas e adaptar a velocidade","Conduzir sempre com máximos, mesmo ao cruzar veículos","Apagar as luzes em zonas iluminadas"],correct:0},
 {q:"Se um pneu rebentar durante a marcha, deve:",a:["Travar bruscamente","Segurar firmemente o volante e reduzir a velocidade gradualmente","Virar de imediato para a berma"],correct:1},
 {q:"A distância de segurança serve para:",a:["Ter espaço para reagir e parar","Impedir que outros veículos ultrapassem","Poupar combustível em todas as situações"],correct:0},
 {q:"Antes de iniciar uma viagem longa, é aconselhável:",a:["Verificar o estado do veículo e descansar","Ignorar os pneus se parecem cheios","Tomar álcool para relaxar"],correct:0},
 {q:"Ao ver crianças perto da estrada, deve:",a:["Aumentar a velocidade para passar primeiro","Reduzir a velocidade e estar preparado para parar","Buzinar continuamente e continuar"],correct:1},
 {q:"Uma linha contínua no pavimento significa que:",a:["Pode ser atravessada sempre que quiser","Deve respeitar a restrição de atravessamento aplicável","Serve apenas para decoração"],correct:1},
 {q:"Ao sentir sono durante a condução, deve:",a:["Abrir a janela e continuar indefinidamente","Aumentar a música e acelerar","Parar num local seguro e descansar"],correct:2},
 {q:"Ao aproximar-se de uma rotunda, deve:",a:["Observar a sinalização, reduzir se necessário e ceder passagem conforme as regras","Entrar sem observar","Parar sempre no meio da rotunda"],correct:0},
 {q:"A buzina deve ser utilizada:",a:["Para cumprimentar todos os peões","Como advertência quando necessária e permitida","Para exigir prioridade em qualquer situação"],correct:1},
 {q:"Ao transportar carga, deve garantir que:",a:["Está bem acondicionada e não compromete a segurança","Pode tapar as luzes traseiras","Pode cair ligeiramente desde que a viagem seja curta"],correct:0},
 {q:"Se estiver envolvido num acidente, deve primeiro:",a:["Garantir a segurança do local e pedir ajuda quando necessário","Abandonar imediatamente o local em qualquer circunstância","Mover todos os feridos sem avaliar o risco"],correct:0},
 {q:"A velocidade segura depende:",a:["Apenas do limite máximo indicado","Do limite, do trânsito, do tempo e das condições da via","Apenas da potência do veículo"],correct:1},
 {q:"Ao ultrapassar um ciclista, deve:",a:["Passar o mais perto possível","Buzinar e manter a mesma trajetória sem observar","Manter distância lateral segura e só ultrapassar quando for seguro"],correct:2},
 {q:"O capacete numa mota deve:",a:["Ser usado corretamente e estar bem ajustado","Ser usado apenas fora da cidade","Ficar solto para ser retirado depressa"],correct:0},
 {q:"Se um semáforo estiver vermelho, deve:",a:["Parar antes da linha de paragem, quando existente","Avançar se não vir outros veículos","Acelerar antes de mudar"],correct:0},
 {q:"Antes de fazer marcha-atrás, deve:",a:["Verificar cuidadosamente o espaço e os utilizadores à volta","Confiar apenas nos espelhos","Fazer a manobra rapidamente sem olhar"],correct:0},
 {q:"A manutenção regular do veículo ajuda a:",a:["Reduzir riscos de avarias e melhorar a segurança","Eliminar a necessidade de respeitar sinais","Garantir que nunca haverá acidentes"],correct:0}
];
let examPremium=false, questions=[], answersChosen=[], currentQuestion=0, secondsLeft=1800, timerHandle=null;
function showScreen(id){
 document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
 const target=document.getElementById(id);
 if(target) target.classList.add("active");
 window.scrollTo({top:0,behavior:"smooth"});
}
function showPayment(){const box=document.getElementById("paymentDetails");if(box)box.classList.toggle("hidden");}
function checkCode(){
 const input=document.getElementById("accessCode"), msg=document.getElementById("codeMessage");
 if(!input||!msg)return;
 msg.textContent="A validação Premium ainda não está ligada a um servidor seguro. Não introduzas códigos de pagamento reais nesta demonstração.";
 msg.style.color="#b52e2e";
}
function startExam(premium){
 examPremium=Boolean(premium);
 if(examPremium){alert("O acesso Premium ainda não está ativado. É necessária validação segura do pagamento por um servidor.");showScreen("premium");return;}
 questions=demoQuestions.slice().sort(()=>Math.random()-0.5).slice(0,25);
 answersChosen=Array(questions.length).fill(null); currentQuestion=0;secondsLeft=1800;
 const timer=document.getElementById("timer"); if(timer)timer.textContent="30:00";
 if(timerHandle)clearInterval(timerHandle);
 timerHandle=setInterval(()=>{secondsLeft--;const t=document.getElementById("timer");if(t)t.textContent=String(Math.floor(secondsLeft/60)).padStart(2,"0")+":"+String(secondsLeft%60).padStart(2,"0");if(secondsLeft<=0){clearInterval(timerHandle);finishExam();}},1000);
 showScreen("exam");renderQuestion();
}
function renderQuestion(){
 const q=questions[currentQuestion];if(!q)return;
 document.getElementById("examTitle").textContent=`Pergunta ${currentQuestion+1} de ${questions.length}`;
 document.getElementById("questionText").textContent=q.q;
 document.getElementById("progressFill").style.width=((currentQuestion+1)/questions.length*100)+"%";
 const area=document.getElementById("answers");area.replaceChildren();
 q.a.forEach((answer,i)=>{const b=document.createElement("button");b.className="answer"+(answersChosen[currentQuestion]===i?" selected":"");b.textContent=String.fromCharCode(65+i)+". "+answer;b.onclick=()=>{answersChosen[currentQuestion]=i;renderQuestion();};area.appendChild(b);});
 document.getElementById("prevBtn").disabled=currentQuestion===0;
 document.getElementById("nextBtn").textContent=currentQuestion===questions.length-1?"Terminar exame ✓":"Seguinte →";
}
function moveQuestion(step){
 if(step<0){currentQuestion=Math.max(0,currentQuestion-1);renderQuestion();return;}
 if(currentQuestion<questions.length-1){currentQuestion++;renderQuestion();}else finishExam();
}
function finishExam(){
 if(timerHandle){clearInterval(timerHandle);timerHandle=null;}
 const correct=questions.reduce((n,q,i)=>n+(answersChosen[i]===q.correct?1:0),0);
 const unanswered=answersChosen.filter(a=>a===null).length;
 const result=document.getElementById("resultText");
 result.textContent=`Acertaste ${correct} de ${questions.length} perguntas (${Math.round(correct/questions.length*100)}%). ${unanswered ? `Ficaram ${unanswered} pergunta(s) sem resposta. ` : ""}Este teste contém perguntas de prática não oficiais; confirma sempre as regras no material oficial do INATRO.`;
 showScreen("result");
}
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));}
