

prizeList=[
    {
        "rank":"一等奖",
        "name":"云台相机",
        "num":1,
        "winner_id":[0],
        "num_selected":0
    },
    {
        "rank":"二等奖",
        "name":"ysl礼盒",
        "num":1,
        "winner_id":[0],
        "num_selected":0
    },
    {
        "rank":"二等奖",
        "name":"Beats耳机",
        "num":1,
        "winner_id":[0],
        "num_selected":0
    },
    {
        "rank":"三等奖",
        "name":"防晒伞",
        "num":2,
        "winner_id":[0,0],
        "num_selected":0
    },
    {
        "rank":"三等奖",
        "name":"香薰",
        "num":2,
        "winner_id":[0,0],
        "num_selected":0
    },
    {
        "rank":"三等奖",
        "name":"键盘",
        "num":2,
        "winner_id":[0,0],
        "num_selected":0
    },
    {
        "rank":"三等奖",
        "name":"移动硬盘",
        "num":2,
        "winner_id":[0,0],
        "num_selected":0
    },
]
var cur_id = 0; //Current Prize id.
function generaterWinnerId(winner_id){
    if(winner_id==0)return "&nbsp;";
    winner_id = "" + parseInt(winner_id);
    while(winner_id.length<4){
        winner_id = "0" + winner_id;
    }
    winner_id = winner_id[0] + " " + winner_id[1] + " " +winner_id[2] + " " +winner_id[3];
    return winner_id;
}

function renderPrizeInfo(rid, sidebar=false){
    cur_prize = prizeList[rid];

    prizeTitle = document.getElementById("prizeTitle");
    prizeTitle.innerHTML=cur_prize.rank+"：";

    prizeName = document.getElementById("prizeName");
    prizeName.innerHTML=cur_prize.name;

    var winnerText="";
    var sidebarText="";
    for(var i=0;i<cur_prize.num;i++){
        if(cur_prize.winner_id[i]!=0){
            sidebarText = sidebarText + `
            <div class="col text-center" id="sidebar-${rid}-${i}" onclick="empty_one(${rid}, ${i})" onmouseover="show_empty(${rid},${i})" onmouseout='restore_sidebar(${rid}, ${i})'">${generaterWinnerId(cur_prize.winner_id[i])}</div>
            `
            winnerText = winnerText + generaterWinnerId(cur_prize.winner_id[i])
        }else{
            sidebarText = sidebarText + `
            <div class="col text-center" id="sidebar-${rid}-${i}" onclick="empty_one(${rid}, ${i})" onmouseover="show_empty(${rid},${i})" onmouseout='restore_sidebar(${rid}, ${i})'">&nbsp;</div>
            `
        }
        if(i!=cur_prize.num-1){
            winnerText += "<br>";
        }
    }
    var divwinner = document.getElementById("winnerId");
    var divsidebar = document.getElementById(`winner${rid}`);
    if(cur_prize.num>1){
        divwinner.style.fontSize="120px";
        divwinner.style.lineHeight="135px";
    }else{
        divwinner.style.fontSize="180px";
        divwinner.style.lineHeight="180px";
    }
    divwinner.innerHTML = winnerText;
    if(sidebar==true){
        divsidebar.innerHTML = sidebarText;
        if(sidebarText.length==0){
            sidebarText = "&nbsp;"
        }
        console.log(sidebarText);
    }
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
    item.style.color="white";
    item.style.borderColor="#9fb4c7";
    item.style.cursor="default";
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
        rand_id = Math.ceil(Math.random() * 9999);
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

        timer = setInterval("anime()",10);
        on_prizing = true;
        btn.innerHTML="停止!"
    }else{
        //开奖
        clearInterval(timer);
        timer = null;

        winner = Math.ceil(Math.random() * num_person);
        prizeList[cur_id].winner_id[prizeList[cur_id].num_selected] = winner;
        renderPrizeInfo(cur_id,sidebar=true);

        prizeList[cur_id].num_selected += 1;
        prizeList[cur_id].num_selected %= prizeList[cur_id].winner_id.length;
        on_prizing = false;
        btn.innerHTML="开抽！"
    }
}

function empty(){
    for(var i=0;i<prizeList.length;i++){
        for(var j=0;j<prizeList[i].winner_id.length;j++){
            prizeList[i].winner_id[j]=0;
        }
        prizeList.num_selected = 0;
        renderPrizeInfo(i, sidebar=true);
    }
    renderPrizeInfo(cur_id);
}

function empty_one(id, wid){
    prizeList[id].winner_id[wid] = 0;
    prizeList[id].num_selected = wid;
    
    renderPrizeInfo(id,sidebar=true);
    cur_id = id;
}

function show_empty(rid, wid){
    if(prizeList[rid].winner_id[wid]==0)return;
    document.getElementById(`sidebar-${rid}-${wid}`).innerHTML="清空";
}

function restore_sidebar(rid, wid){
    document.getElementById(`sidebar-${rid}-${wid}`).innerHTML=(generaterWinnerId(prizeList[rid].winner_id[wid]))
}

window.onload=function(){
    for(var i=0;i<prizeList.length;i++){
        var prize = prizeList[i];
        item = document.createElement("div");
        item.innerHTML = `
        <div class="container text-start sidebar2">
        ${prize.rank}：${prize.name}
        </div>
        <div class="row sidebar-winner justify-content-between" id="winner${i}">
        </div>`
        document.getElementById("sidebar").appendChild(item);
        renderPrizeInfo(i,sidebar=true);
    }

    btn_start = document.getElementById("btn-start");
    btn_prev = document.getElementById("btn-prev");
    btn_next = document.getElementById("btn-next");
    btn_empty = document.getElementById("btn-empty");
    cur_id = prizeList.length-1;
    on_prizing = false;

    btn_prev.onclick = get_next;
    btn_next.onclick = get_prev;
    btn_start.onclick = function(){dealPrizing(btn_start)}
    btn_empty.onclick = empty;

    btn_prev.onmouseover  = function(){highlight(btn_prev)};
    btn_next.onmouseover  = function(){highlight(btn_next)};
    btn_start.onmouseover = function(){highlight(btn_start)};
    btn_empty.onmouseover = function(){highlight(btn_empty)};

    btn_prev.onmouseout = function(){dimlight(btn_prev)};
    btn_next.onmouseout = function(){dimlight(btn_next)};
    btn_start.onmouseout = function(){dimlight(btn_start)};
    btn_empty.onmouseout = function(){dimlight(btn_empty)};
    

    renderPrizeInfo(cur_id);

    setTimeout(() => {
        num_person = prompt("请输入参与抽奖总人数："); 
    }, 300);
}