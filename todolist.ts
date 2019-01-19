let TaskList:Array<string>;
TaskList=['0','tasklist1', 'tasklist2', 'tasklist3', 'tasklist4', 'tasklist5', 'tasklist6', 'tasklist7', 'tasklist8', 'tasklist9', 'tasklist10', 
'tasklist11', 'tasklist12', 'tasklist13', 'tasklist14', 'tasklist15', 'tasklist16', 'tasklist17', 'tasklist18', 'tasklist19', 'tasklist20',
'tasklist21', 'tasklist22', 'tasklist23', 'tasklist24', 'tasklist25', 'tasklist26', 'tasklist27', 'tasklist28', 'tasklist29', 'tasklist30']
let Tl:Array<string>;
Tl=['0','TL1','TL2','TL3','TL4','TL5','TL6','TL7','TL8','TL9','TL10',
'TL11','TL12','TL13','TL14','TL15','TL16','TL17','TL18','TL19','TL20',
'TL21','TL22','TL23','TL24','TL25','TL26','TL27','TL28','TL29','TL30']

let flag:boolean = true;
let task:string;
let time:any;
let listtemp:Array<any>;
let si:number;
let ti:number=1;//funciontask的列表计数
//var tj=ti+1;//funciontask的任务计数
let fi:number=1;//finishTask计数
let fj:number=1;//finishTask2计数
let tasktemp:string;
let a:number;
let b:number;

function functionsubmit(){//submit按钮的设定为onclick="functionsubmit()"
  si = 1;
  task=document.getElementById("task").value;   //这里第一个“.”后面必须是form标签的name而不能是id；而第二个“.”后id和name均可。
  time=document.getElementById("time").value;
  if (task === '') {
    window.alert ('请输入任务名！');
  } else {
    if (time < 1) {
      window.alert ('请输入不少于1分钟的任务时间！');
      document.getElementById("time").value='';
    } else {
      insubmit(); 
    }
  }   
}
function insubmit():any{
  if (si>30) {
    window.alert ('抱歉，最多设置30个任务😭,小的正在努力升级代码✊');
  } else {
    if (document.getElementById(TaskList[si]).innerHTML === '') {
      task = task + '              ';
      task = task.substr(0,15);
      time = '   ' + time;
      time = time.substr(-4,4);
      document.getElementById (TaskList[si]).innerHTML = '任务:' + task + '计划使用' + time + '分钟' ;
      document.getElementById("task").value='';
      document.getElementById("time").value='';
    } else {
      si++;
      return insubmit();
    }
  }
}
function functiontask (){
    flag = true;
    task = document.getElementById("tasklist1").innerHTML.substr(3,15);
    console.log(task)
    time = document.getElementById("tasklist1").innerHTML.substr(22,4);
    console.log(time);
    window.alert ('任务:' + task + "计划使用" + time + '分钟');//var finsihtime = new Date();
    let Begintime = new Date();//或许可以用functionBeginTime这样的函数
    let taskBeginH:number =Begintime.getHours();       //开始时的小时数
    let taskBeginM:number =Begintime.getMinutes();     //开始时的分钟数
    let taskBeginS:number =Begintime.getSeconds();     //开始时的秒数
    window.alert ('计时从' + taskBeginH + '时' + taskBeginM + '分开始');
    let taskFinishH:number =(taskBeginH+(time-time%60)/60+((taskBeginM+time%60)-(taskBeginM+time%60)%60)/60)%24;
    let taskFinishM:number =(taskBeginM+time%60)%60;//注意进位
    let taskFinishS:number =taskBeginS;
    window.alert ('计时将于' + taskFinishH + '时' + taskFinishM + '分结束');
    listtemp = [task, time, taskFinishH, taskFinishM, taskFinishS];//传递参数task\time\taskFinishH\taskFinishM\taskFinishS
    timer ();

}   
function timer ():any{//此函数可每隔500毫秒比对一次taskFinish 与 now 
  if (flag === true) {
    console.log('hello timer!')
    let task = listtemp[0];
    let time = listtemp[1];
    let taskFinishH = listtemp[2];
    let taskFinishM = listtemp[3];
    let taskFinishS = listtemp[4];
    let now=new Date ();
    let nowH:number = now.getHours();
    let nowM:number = now.getMinutes();
    let nowS:number = now.getSeconds();
    if (taskFinishH !== nowH) {
      //console.log (nowH + '时' + nowM + '分' + nowS + '秒');
      var t = setTimeout(function () { timer(); }, 500);
    } 
    else {
      if (taskFinishM !== nowM) {
        //console.log (nowH + '时' + nowM + '分' + nowS + '秒');
        var t = setTimeout (function () { timer(); }, 500);
      }
      else {
        if (taskFinishS !== nowS) {
          //console.log (nowH+'时'+nowM+'分'+nowS+'秒');
          var t = setTimeout (function () { timer(); }, 500);
        }
        else {
          clearTimeout (t);
          window.alert ('任务：'+task+'已使用'+time+'分钟!');
          tasktemp = document.getElementById("tasklist1").innerHTML;
          tasktemp = document.getElementById("tasklist1").innerHTML + ',按时完成'
          finishTask2();
        }
      }
    }
  } else {
    tasktemp = document.getElementById("tasklist1").innerHTML + ',提前完成'
    finishTask2();
  }
}
function beyondPlan(){
  window.alert('恭喜您提前完成任务');
  flag=false;
}
function finishTask2():any{
  if (fj === 30) {
    document.getElementById("tasklist30").innerHTML='';
    fj = 1;
    finishTask();
  } else {
    console.log(tasktemp);
    document.getElementById(TaskList[fj]).innerHTML=document.getElementById(TaskList[fj+1]).innerHTML;
    fj++;
    console.log(fj);
    return finishTask2();
  }
}
function finishTask():any{
  if (document.getElementById(Tl[fi]).innerHTML==='') {
    document.getElementById(Tl[fi]).innerHTML=tasktemp;
    console.log('OK')
  } else {
    fi++;
    return finishTask();
  }
}


function deleteTask():any{
  if (a === 30 ) {
    document.getElementById("tasklist30").innerHTML='';
  } else {
    document.getElementById(TaskList[a]).innerHTML = document.getElementById(TaskList[a+1]).innerHTML;
    a++;
    return deleteTask();
  }
}
function changeOrder(){
  let tasktem = document.getElementById(TaskList[b]).innerHTML;
  document.getElementById(TaskList[b]).innerHTML = document.getElementById(TaskList[b+1]).innerHTML;
  document.getElementById(TaskList[b+1]).innerHTML = tasktem;
}
/*<input type="radio" name="任务状态" value="finished">已完成
<br>
<input type="radio" name="任务状态" value="not yet">还需增加时间
<br>
*/
//延长时间