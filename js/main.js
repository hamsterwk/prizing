

prizeList=[
    {
        "rank":"一等奖",
        "name":"橙影云台相机",
        "winner_id":0
    },
    {
        "rank":"二等奖",
        "name":"ysl礼盒",
        "winner_id":0
    },
    {
        "rank":"二等奖",
        "name":"Beats耳机",
        "winner_id":0
    },
    {
        "rank":"三等奖",
        "name":"蕉下防晒伞",
        "winner_id":0
    },
    {
        "rank":"三等奖",
        "name":"野兽派香薰",
        "winner_id":0
    },
    {
        "rank":"三等奖",
        "name":"键盘",
        "winner_id":0
    },
    {
        "rank":"三等奖",
        "name":"爱国者移动硬盘",
        "winner_id":0
    },
]
var cur_id = 0; //Current Prize id.

function generaterWinnerId(winner_id){
    winner_id = "" + parseInt(winner_id);
    while(winner_id.length<3){
        winner_id = "0" + winner_id;
    }
    winner_id = winner_id[0] + " " + winner_id[1] + " " +winner_id[2];
    return winner_id;
}

function renderPrizeInfo(){
    cur_prize = prizeList[cur_id];

    prizeName = document.getElementById("prizeName");
    prizeName.innerHTML=cur_prize.rank+": "+cur_prize.name;

    winner = document.getElementById("winnerId");
    winner.innerHTML = generaterWinnerId(cur_prize.winner_id); 
}

function get_next(){
    if(cur_id < prizeList.length){
        cur_id += 1;
    }
    renderPrizeInfo();
}

function get_prev(){
    if(cur_id > 0){
        cur_id -= 1;
    }
    renderPrizeInfo();
}

function highlight(item){
    item.style.color="red";
    item.style.borderColor="red";
    item.style.cursor="pointer";
}

function dimlight(item){
    item.style.color="white";
    item.style.borderColor="white";
    item.style.cursor="default";
}

var on_prizing = false;
var timer = null;
var num_person = null;

function anime(){
    cur_prize = prizeList[cur_id];
    rand_id = Math.ceil(Math.random() * num_person);
    cur_prize.winner_id = rand_id;
    renderPrizeInfo();
}

function dealPrizing(btn){
    if(on_prizing == false){
        //抽奖
        
        if(num_person==null){
            num_person = prompt("请输入抽奖总人数：");
            return;
        }

        timer = setInterval("anime()",10);
        on_prizing = true;
        btn.innerHTML="停止!"
    }else{
        //开奖
        winner = Math.ceil(Math.random() * num_person);
        clearInterval(timer);
        timer = null;
        renderPrizeInfo();
        on_prizing = false;
        btn.innerHTML="开抽！"
    }
}


window.onload=function(){
    btn_start = document.getElementById("btn-start");
    btn_prev = document.getElementById("btn-prev");
    btn_next = document.getElementById("btn-next");
    cur_id = 0;
    on_prizing = false;

    btn_prev.onclick = get_prev;
    btn_next.onclick = get_next;
    btn_start.onclick = function(){dealPrizing(btn_start)}

    btn_prev.onmouseover  = function(){highlight(btn_prev)};
    btn_next.onmouseover  = function(){highlight(btn_next)};
    btn_start.onmouseover = function(){highlight(btn_start)};

    btn_prev.onmouseout = function(){dimlight(btn_prev)};
    btn_next.onmouseout = function(){dimlight(btn_next)};
    btn_start.onmouseout = function(){dimlight(btn_start)};
    

    renderPrizeInfo();

    setTimeout(() => {
        num_person = prompt("请输入参与抽奖总人数："); 
    }, 300);
}