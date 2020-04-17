var list=document.querySelector('.list');
var button=document.querySelector('.calculation');
var data=JSON.parse(localStorage.getItem('datalist'))||[];
var h;
var w;
var h_data=JSON.parse(localStorage.getItem('hight', h/0.01))||[];
var w_data=JSON.parse(localStorage.getItem('weight', w))||[];
var BMIFONT=JSON.parse(localStorage.getItem('bmifont',(bmiinfo)))||[];
var resultfont;
var bmiinfo;
 button.addEventListener('click',bmi);


function bmi(e){
    var reset=document.querySelector('.calculation_reset');
	h=parseInt(document.querySelector('.hight').value)*0.01;
	w=parseInt(document.querySelector('.weight').value);	
	var ans=w/Math.pow(h,2);
	var BMI=ans.toFixed(1);    
    var alarm=document.querySelector('.list_ans');
    result=document.querySelector('.key_bar');
	resultfont=document.createElement('p') ;


	if (!/^\d+[.]?\d*$/.test(h) || !/^\d+[.]?\d*$/.test(w))
    {
        e.value = /^\d+[.]?\d*/.exec(e.value);
        return alert('我需要數字');
    }
    else if(ans<18.5)
    {
    	resultfont.textContent='過輕';
        bmiinfo='過輕';
    	resultfont.setAttribute('class', 'too_light');
        button.setAttribute('class', 'blue');
    	button.setAttribute('value',BMI);
        button.setAttribute('disabled',true);
        reset.classList.add('apper');
        reset.setAttribute('style', 'background:#31BAF9');       
    }
    else if(18.5<=ans&&ans<24)
    {
    	resultfont.textContent='理想';
        bmiinfo='理想';
    	resultfont.setAttribute('class', 'regular');
        button.setAttribute('class', 'green');
        button.setAttribute('value',BMI);
        button.setAttribute('disabled',true);
        reset.classList.add('apper');
        reset.setAttribute('style', 'background:#86D73E'); 
    }
    else if(24<=ans&&ans<27)
    {
    	resultfont.textContent='過重';
        bmiinfo='過重';
    	resultfont.setAttribute('class', 'heavy');
        button.setAttribute('class', 'yellow');
        button.setAttribute('value',BMI);
        button.setAttribute('disabled',true);
        reset.classList.add('apper');
        reset.setAttribute('style', 'background:#FF982D'); 
    }
    else if(27<=ans&&ans<30)
    {
    	resultfont.textContent='輕度肥胖';
        bmiinfo='輕度肥胖';
    	resultfont.setAttribute('class', 'amoust_heavy');
        button.setAttribute('class', 'orange');
        button.setAttribute('value',BMI);
        button.setAttribute('style','white-space:pre-wrap');
        button.setAttribute('disabled',true);
        reset.classList.add('apper');
        reset.setAttribute('style', 'background:#FF6C02'); 
    }
    else if(30<=ans&&ans<35)
    {
    	resultfont.textContent='中度肥胖';
        bmiinfo='中度肥胖';
    	resultfont.setAttribute('class', 'too_heavy');        
        button.setAttribute('class', 'deep_orange');
        button.setAttribute('value',BMI);
        button.setAttribute('disabled',true);
        reset.classList.add('apper');
        reset.setAttribute('style', 'background:#ff4502'); 
    }
    else 
    {
    	resultfont.textContent='重度肥胖';
        bmiinfo='重度肥胖';
    	resultfont.setAttribute('class', 'over_heavy');        
        button.setAttribute('class', 'red');
        button.setAttribute('value',BMI+'BMI');
        button.setAttribute('disabled',true);
        reset.classList.add('apper');
        reset.setAttribute('style', 'background:#FF1200');         
    }

    result.appendChild(resultfont);

   reset.addEventListener('click',reseting);

function reseting(e){
    e.preventDefault();
    reset.classList.remove('apper');
    result.removeChild(resultfont);
    button.setAttribute('value','看結果');
    button.setAttribute('class','calculation');
    button.removeAttribute('disabled');  
}


	var todo={content:BMI};
    var hig={hdata:h/0.01};
    var wei={wdata:w};
    var bmisfont={bmifont:bmiinfo};
	data.push(todo);
    h_data.push(hig);
    w_data.push(wei);
    BMIFONT.push(bmisfont);
    localStorage.setItem('datalist', JSON.stringify(data));
    localStorage.setItem('hight', JSON.stringify(h_data));
    localStorage.setItem('weight', JSON.stringify(w_data));
    localStorage.setItem('bmifont', JSON.stringify(BMIFONT));
    updateList(data);
    updateList(h_data);
    updateList(w_data);
    uploadlist(BMIFONT);     
}

function day(e){
     var Today=new Date();
     time=(Today.getMonth()+1) + " - " + Today.getDate()+' - '+Today.getFullYear();
     return time;
}

function updateList(items) {
    str = '';
    var len = items.length;
    for (var i = 0; len > i; i++) {
      str += '<li class="list_ans" > <table><th><a href="#" alt="刪除"><i class="fas fa-trash-alt"  data-index=' + i + '><em>刪除</em></i></a></th><th>' + BMIFONT[i].bmifont + '</th><th><span>'+'BMI'+'</span>' + data[i].content + '</th><th><span>'+'weight'+'</span>' + w_data[i].wdata +'kg'+ '</th><th><span>'+'height'+'</span>' + h_data[i].hdata +'cm'+ '</th><th><span>'+day()+'</span></th></table></li>';
    }

  
    list.innerHTML = str;

    var listalarm = document.querySelectorAll('.list_ans');

    for(var i=0; i<listalarm.length; i++) {
        if (data[i].content<18.5)
        {
            listalarm[i].setAttribute('style', 'border-left:6px solid #31BAF9');
        }
        else if (data[i].content>=18.5&&data[i].content<24)
        {
            listalarm[i].setAttribute('style', 'border-left:6px solid #86D73E');
        }
        else if (data[i].content >=24&&data[i].content<27)
        {
            listalarm[i].setAttribute('style', 'border-left:6px solid #FF982D');
        }
        else if (data[i].content >=27&&data[i].content<30)
        {
            listalarm[i].setAttribute('style', 'border-left:6px solid #FF6C02');
        }
        else if (data[i].content >=30&&data[i].content<35)
        {
            listalarm[i].setAttribute('style', 'border-left:6px solid #ff4502');
        }
        else
        {
            listalarm[i].setAttribute('style', 'border-left:6px solid #FF1200');
        }
       
        
    }

  }

 
 list.addEventListener('click', killdata);

function killdata(e) {
    e.preventDefault();
    if(e.target.nodeName !== 'I'){return};
    var index = e.target.dataset.index;
    data.splice(index, 1);
    w_data.splice(index, 1);
    h_data.splice(index, 1);
    BMIFONT.splice(index, 1);
    localStorage.setItem('datalist', JSON.stringify(data));
    localStorage.setItem('hight', JSON.stringify(h_data));
    localStorage.setItem('weight', JSON.stringify(w_data));
    localStorage.setItem('bmifont', JSON.stringify(BMIFONT));
    updateList(data);
    updateList(h_data);
    updateList(w_data);
    uploadlist(BMIFONT);
  }

