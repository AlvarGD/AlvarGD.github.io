var SSlist = [log(10,100),20,120,400,10000,10**300]
var list = ["level", "bulk", "time", "LPS", "SS"]
var count = 1;
var level = 1;
var dt = 0;
var bulk = 0;
var money = 1;
var LPS = 0;
var cbulk = 0;
var SS = -1;
var timer = 0;
var lastUpdate = Date.now()

function reset() {
count = 1;
level = 1;
dt = 0;
bulk = 1;
money = 1;
cbulk = 0;
timer = 0;
}
function skip(){
    count=10**300
    level=10**300
    sell(count)
    dSS()
}

function ln(x){
    return Math.log(x)
}
function sell(amount){
    money = level*log(10,amount)+log(10,1/0.9)*Math.max(dt-39,0)
}
function log(a,b){
    return Math.log(b)/Math.log(a)
}
function gamma(x){
    return sqrt(2*Math.PI*x)*(x/Math.E)**x
}
function sqrt(x){
    return Math.sqrt(x)
}

function format(moneys,digit){
    if (moneys<10**6) return Math.round(moneys)
    else return "e"+log(10,moneys).toFixed(digit)
}
function format2(moneys,bool){
    if (moneys<24-SS*3) return (10**moneys).toFixed(bool*3)
    else if (moneys<10**6) return "e"+moneys.toFixed(3)
    else return "ee"+log(10,moneys).toFixed(3)
}

function price(upgrade){
    if (upgrade == "level") 
    return Math.pow(level,1.5-LPS/100)
    if (upgrade == "bulk")
    return bulk
    if (upgrade == "time")
    return gamma(log(2,dt+1))
    if (upgrade == "LPS")
    return (LPS+2)**(sqrt(LPS+2))
    if (upgrade == "SS"){
    if (SS<0) {return 0}
    else return SSlist[SS]}
}
function dSS(){
    if (price("SS")<=money){
        reset()
        if (SS >= 0) {
            assign("level","gone",0)
            bulk = 1
        }
        if (SS >= 1) {
            assign("bulk","gone",0)
        }
        if (SS >= 2) {
            assign("time","gone",0)
            bulk = 0
        }
        if (SS == 3) {
            LPS=10
        }
        if (SS == 4) {
            assign("LPS","gone",0)
        }
        if (SS == 5) {
            LPS=0
            for (i = 0; i<5; i++) {
                assign(list[i],"gone",1)
            }
        }
        SS += 1
        document.getElementById("stage".concat(SS)).classList.remove("gone")
        replace("SS","Go to the next stage")
        for (i = 0; i<4; i++) {
            replace(list[i],"Click to find out what it does")
        }
    }
}
function dlevel(){
    if (money >= price("level")) {
        level +=1
        if (money >= 100) {
        level = Math.floor(1+Math.pow(money,1/(1.5-LPS/100)))}
        replace("level","Increase polynomial degree by 1")
    }
}
function dbulk(){
    if (money >= price("bulk")) {
        bulk += 1
        replace("bulk","Add +1 count per dt")
        if (money >= 100) {
            assign("bulk","gone",1)
            cbulk=1
        }
    }
}
function dtime(){
if (money >= price("time")) {
    dt += 1
    replace("time","Make dt be 0.9 times itself")
        if (dt<39) {
            clearInterval(Looop)
            Looop = setInterval(mainLoop, Math.floor(l2t(dt)))
        }
        else {
            if(SS==3){
                dt-=1
                assign("time","gone",1)
            }
        }
    }
}
function dLPS(){
    if (LPS<150 && money >= price("LPS")) {
        LPS+=1;
        replace("LPS","Change LPS by one")
    }
    if (LPS>=150) {assign("LPS","done",1)}
}

function assign(button, classs, boolboi){
    if (boolboi == 1) {document.getElementById(button.concat("button")).classList.add(classs)}
    if (boolboi == 0) {document.getElementById(button.concat("button")).classList.remove(classs)}
}
function replace(upgrade,texts){
    writeon(upgrade.concat("button"),texts +"<br>"+format2(price(upgrade),1))
}
function writeon(buttons,texts){
    document.getElementById(buttons).innerHTML = texts
}
function Cbulk(){
    bulk = Math.floor(money)
}
function l2t(dt){
    if (dt < 39) return Math.floor(1000*0.9**dt)
    else return 16
}
function GUI(upgrade){
    if (money < price(upgrade))
    {assign(upgrade,"unlocked",0)}
    else assign(upgrade,"unlocked",1)
}

mainLoop()
function mainLoop(){    
    if(SS == 6){
        for (i = 0; i<4; i++) {
            assign(list[i],"gone",1)
        }
        document.getElementById("moneycount").classList.add("gone")
        document.getElementById("infinitydisplay").classList.remove("gone")
        document.getElementById("timer").classList.add("gone")
    }
    else{
        timer += Math.round(Math.max(Date.now()-lastUpdate-100,l2t(dt)))
        sell(count)
        writeon("moneycount",format2(money/level,0)+"^"+format(level)+"="+format2(money,0)+", dx="+format(bulk)+", dt="+l2t(dt)/1000+", Dt="+format2(Math.max(dt-39,0)*log(10,1/0.9),1)+", LPS="+LPS)
        for (i = 0; i<4; i++) {
            GUI(list[i])
        }
        if (money < price("SS"))
        {assign("SS","SS2",0)
        assign("SSback","SSback2",0)}
        else {assign("SS","SS2",1)
        assign("SSback","SSback2",1)}
        writeon("timer",timer)
        if (cbulk==1) {Cbulk()}
        count+=Math.round(bulk*Math.max(Date.now()-lastUpdate-100,l2t(dt))*(1/0.9)**Math.max(dt-39,0)/l2t(dt))
        lastUpdate = Date.now()
    }
}
var Looop = setInterval(mainLoop, 1000)
replace("SS","Go to the next stage")
for (i = 0; i<4; i++) {
    assign(list[i],"gone",1)
} 
// Done.