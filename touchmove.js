// JavaScript Document
//author:yaojaa QQ:264406

var Tween = {
	Linear: function(t, b, c, d) {
		return c * t / d + b;
	},
	Quad: {
		easeIn: function(t, b, c, d) {
			return c * (t /= d) * t + b;
		},
		easeOut: function(t, b, c, d) {
			return - c * (t /= d) * (t - 2) + b;
		},
		easeInOut: function(t, b, c, d) {
			if ((t /= d / 2) < 1) return c / 2 * t * t + b;
			return - c / 2 * ((--t) * (t - 2) - 1) + b;
		}
	}
}

var animateTimer;
var t=0;

function clearAnimate(){
		clearInterval(animateTimer);
		 t=0;

	}


function animate(obj,json,speed,fnEnd){
	
	
	
	var d=speed||50;
	var startPos=new Array;
	var endPos=new Array;
	for(var p in json){
		endPos[p]=json[p];
		startPos[p]=parseInt(getStyle(obj,p));
		if(p='opacity'){
			startPos['opacity']=Math.round(parseFloat(getStyle(obj, p))*100)
			}
		}
		
	var d=speed||50;
		
	if(t<d){	
	
 clearAnimate();
	
  animateTimer= setInterval(function(){	
		t++;
		
		if(t<=d){
			
		for(var styleName in json){
		 b=0;
		 b=startPos[styleName];
		var c=endPos[styleName]-b;
		
			 if(styleName=='opacity'){
			  obj.style.filter='alpha(opacity:'+Math.ceil(Tween.Quad.easeOut(t,b,c,d))+')';
			  obj.style.opacity=Math.ceil(Tween.Quad.easeOut(t,b,c,d))/100;
			  }
			  else{
			 obj.style[styleName] =Math.ceil(Tween.Quad.easeOut(t,b,c,d)) + "px";
			  }
		
		}
			

			
			}
		else{
				clearInterval(animateTimer);
				t=0;	
			}	
			
		

		}
		,20)
		
	}
	

	}
	

var EventUtil={
	
    addHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
	
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },

    getEvent: function (event) {
        return event ? event : window.event;
    },
    getTarget: function (event) {
        return event.target || event.srcElement;
    },
	
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
	
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubbles = true;
        }
    },
	
    getRelatedTarget: function (event) {
        if (event.relatedTarger) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else { return null; }

    },
	
	 getWheelDelta: function (event) {
		 
        if (event.wheelDelta) {
            return  event.wheelDelta;
        } 
		else{
            return -event.detail*40;
        }
    }
	}

function getStyle(obj, styleName){

	if(obj.currentStyle)
	{
		
		return parseInt(obj.currentStyle[styleName]);
		
	}
	else
	{
		return parseInt (getComputedStyle(obj, false)[styleName]);
	}
    }
	
	

var container=document.getElementById('container');
var ul=container.getElementsByTagName('ul')[0];



var liSize=container.getElementsByTagName('li').length
var  li= container.getElementsByTagName('li')[0];
    ul.style.width=getStyle(li,'width')*liSize+'px';
	

	
	
var lastX=0;
var speed=0;
var timer;
	
EventUtil.addHandler(ul,'mousedown',mouseDown)
	
	//鼠标按下
function mouseDown(e){
	
	var ev=EventUtil.getEvent(e);
	
	EventUtil.preventDefault(ev);
   
 if(timer){
	clearInterval(timer);
   }
   
   clearAnimate();
   
	disX=ev.clientX-getStyle(ul, 'left');
	
	EventUtil.addHandler(ul,'mousemove',mouseMove)
	EventUtil.addHandler(document,'mouseup',mouseUp);

	}
	
	
	
function mouseMove(e){
	
	var ev=EventUtil.getEvent(e);
	 
	 EventUtil.preventDefault(ev);
	 
	 var left=ev.clientX-disX;
	 
	 left=left>100?100:left=left<getStyle(container,'width')-parseInt(ul.style.width)-100?getStyle(container,'width')-parseInt(ul.style.width)-100:left;
	 
	 
	 ul.style.left=left+'px';
	 EventUtil.addHandler(document,'mouseup',mouseUp);
	 speed=ev.clientX-lastX;
	 lastX=ev.clientX;
		 

	}
	
	//鼠标弹起
	
function mouseUp(e){
	
	var ev=EventUtil.getEvent(e);
	EventUtil.removeHandler(ul,'mousemove',mouseMove);
	EventUtil.removeHandler(document,'mouseup',mouseUp);

	
	if(parseInt(ul.style.left)>0){
	 animate(ul, {left:0},15);
		
		}
	else if(parseInt(ul.style.left)<getStyle(container,'width')-parseInt(ul.style.width)){
		
     animate(ul, {left:getStyle(container,'width')-parseInt(ul.style.width)},15)
	}	
		
	else{
		
	if (Math.abs(speed)<2){
		return;
		}
	    else{
		  
				
         throwIt(ul,speed)	
		}	
			

	}
	}
	
function throwIt(obj,speed){

	var speed=speed;
	
	clearInterval(timer);
	
	var t=0;
	var b=getStyle(ul, 'left');
	var c=speed*10; //乘以10倍数 为移动的距离，拖动的越快，移动距离越大
	var d=30;

	
	timer=window.setInterval(function(){
		t++;
		if(t>=d){
		clearInterval(timer)
		}

	obj.style.left=Math.ceil(Tween.Quad.easeOut(t,b,c,d)) + "px";
		
		if(parseInt(obj.style.left)>0){
					clearInterval(timer);
		animate(ul, {left:0},30)
			
			}
			
		if(parseInt(obj.style.left)<getStyle(container,'width')-parseInt(obj.style.width)){
					clearInterval(timer);
		animate(obj, {left:getStyle(container,'width')-parseInt(obj.style.width)},30)
			
			}	
		
		
		
		},30)
	
	
	
	
	}
	



  