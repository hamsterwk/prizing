

prizeList=[
    {
        "rank":"最终大奖",
        "name":"加湿器",
        "num":2,
        "winner_id":[-1, -1],
        "num_selected":0
    },
    {
        "rank":"美甲",
        "name":"&nbsp;",
        "num":2,
        "winner_id":[-1, -1],
        "num_selected":0
    }
]
var cur_id = 0; //Current Prize id.
function generaterWinnerId(winner_id){
    if(winner_id==-1)return "&nbsp;";
    winner_id = "" + parseInt(winner_id);
    while(winner_id.length<3){
        winner_id = "0" + winner_id;
    }
    winner_id = winner_id[0] + " " + winner_id[1] + " " +winner_id[2];
    return winner_id;
}

function renderPrizeInfo(rid){
    cur_prize = prizeList[rid];

    prizeTitle = document.getElementById("prizeTitle");
    prizeTitle.innerHTML=cur_prize.rank+"：";

    prizeName = document.getElementById("prizeName");
    prizeName.innerHTML=cur_prize.name;

    var winnerText="";
    for(var i=0;i<cur_prize.num;i++){
        if(cur_prize.winner_id[i]!=0){
            winnerText = winnerText + generaterWinnerId(cur_prize.winner_id[i])
        }
        if(i!=cur_prize.num-1){
            winnerText += "<br>";
        }
    }
    var divwinner = document.getElementById("winnerId");
    if(cur_prize.num>1){
        divwinner.style.fontSize="160px";
        divwinner.style.lineHeight="180px";
    }else{
        divwinner.style.fontSize="160px";
        divwinner.style.lineHeight="240px";
    }
    divwinner.innerHTML = winnerText;
    img = document.getElementById("image");
    img.src = "./img/"+rid+".jpg";
}

function get_next(){
    if(on_prizing==true){
        alert("请先停止当前抽奖！");
        return;
    }

    if(cur_id < prizeList.length - 1){
        cur_id += 1;
    }
    renderPrizeInfo(cur_id);
}

function get_prev(){
    if(on_prizing==true){
        alert("请先停止当前抽奖！");
        return;
    }
    if(cur_id > 0){
        cur_id -= 1;
    }
    renderPrizeInfo(cur_id);
}

function highlight(item){
    item.style.color="red";
    item.style.borderColor="red";
    item.style.cursor="pointer";
}

function dimlight(item){
    item.style.color="#c6558f";
    item.style.borderColor="#c6558f";
    item.style.cursor="#c6558f";
}

var on_prizing = false;
var timer = null;
var num_person = null;

function anime(){
    cur_prize = prizeList[cur_id];
    for(var i=0;i<cur_prize.num;i++){
        if(i!=cur_prize.num_selected){
            continue;
        }
        rand_id = Math.ceil(Math.random() * 1000);
        cur_prize.winner_id[i] = rand_id;
    }
    renderPrizeInfo(cur_id);
}

function dealPrizing(btn){
    if(on_prizing == false){
        //抽奖
        
        if(num_person==null){
            num_person = prompt("请输入抽奖总人数：");
            return;
        }

        timer = setInterval("anime()",5);
        on_prizing = true;
        btn.innerHTML="停止!"
    }else{
        //开奖
        clearInterval(timer);
        timer = null;

        winner = Math.ceil(Math.random() * num_person);
        prizeList[cur_id].winner_id[prizeList[cur_id].num_selected] = winner;
        renderPrizeInfo(cur_id);

        prizeList[cur_id].num_selected += 1;
        prizeList[cur_id].num_selected %= prizeList[cur_id].winner_id.length;
        on_prizing = false;
        btn.innerHTML="开抽！"
    }
}

function empty(){
    for(var i=0;i<prizeList.length;i++){
        for(var j=0;j<prizeList[i].winner_id.length;j++){
            prizeList[i].winner_id[j]=-1;
        }
        prizeList.num_selected = 0;
        renderPrizeInfo(i);
    }
    renderPrizeInfo(cur_id);
}

function empty_one(id, wid){
    prizeList[id].winner_id[wid] = -1;
    prizeList[id].num_selected = wid;
    
    renderPrizeInfo(id);
    cur_id = id;
}


window.onload=function(){
    btn_start = document.getElementById("btn-start");
    btn_prev = document.getElementById("btn-prev");
    btn_next = document.getElementById("btn-next");
    cur_id = prizeList.length-1;
    on_prizing = false;

    btn_prev.onclick = get_next;
    btn_next.onclick = get_prev;
    btn_start.onclick = function(){dealPrizing(btn_start)}

    btn_prev.onmouseover  = function(){highlight(btn_prev)};
    btn_next.onmouseover  = function(){highlight(btn_next)};
    btn_start.onmouseover = function(){highlight(btn_start)};

    btn_prev.onmouseout = function(){dimlight(btn_prev)};
    btn_next.onmouseout = function(){dimlight(btn_next)};
    btn_start.onmouseout = function(){dimlight(btn_start)};
    

    renderPrizeInfo(cur_id);

    num_person = prompt("请输入抽奖总人数：");
}