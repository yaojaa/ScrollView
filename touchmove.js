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

var animateTimer=null;

function clearanimateTimer(){
	if(animateTimer){
	clearInterval(animateTimer)
	}

	}

function animate(obj,json,speed,fnEnd){
	
	
	var d=speed||50;
	var t=0;
	var startPos=new Array;
	var endPos=new Array;
	
	
	
	for(var p in json){
		endPos[p]=json[p];
		startPos[p]=parseInt(getStyle(obj,p));
		if(p='opacity'){
			startPos['opacity']=Math.round(parseFloat(getStyle(obj, p))*100)
			}
		}
		
	if(t<d){	
	animateTimer= setInterval(function(){	
		t++;
		if(t>=d)
			{
				clearInterval(animateTimer);
				if(fnEnd)
			{
				fnEnd();
			}
			}
		
		for(var styleName in json){
		 b=0;
		 b=startPos[styleName];
		var c=endPos[styleName]-b

		
	if(styleName=='opacity'){
		obj.style.filter='alpha(opacity:'+Math.ceil(Tween.Quad.easeOut(t,b,c,d))+')';
		obj.style.opacity=Math.ceil(Tween.Quad.easeOut(t,b,c,d))/100;
		}
		else{

	obj.style[styleName] =Math.ceil(Tween.Quad.easeOut(t,b,c,d)) + "px";
		}
			
		}

         },30)
		
	}
	}
	

var EventUtil={
	addEventListener:function(element,type,fn){
		if(element.addEventListener){
		    element.addEventListener(type,fn,false)
			
			}
		else if(element.attachEvent){
			
			element.attachEvent('on'+type,fn)
			
			}
		else{
			element['on' + type]=fn
			}
				},
				
	removeEventListener:function(element,type,fn){
		if(element.removeEventListener){
		    element.removeEventListener(type,fn,false)
			
			}
		else if(element.detachEvent){
			
			element.detachEvent('on'+type,fn)
			
			}
		else{
			element['on' + type]=fn
			}
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

function getStyle(obj, styleName)
    {


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
	
EventUtil.addEventListener(ul,'mousedown',mouseDown)
	
	//鼠标按下
function mouseDown(e){
	
   var	e=e||window.event;

   
    if(window.captureEvents){ 
	   	  e.stopPropagation();
          e.preventDefault();
	}
	else{
		e.cancelBubble = true;
     window.event.returnValue = false;
		}
				
   if(timer){
	clearInterval(timer);
   }
   clearanimateTimer();

	disX=e.pageX-getStyle(ul, 'left');
	
	ul.style.cursor='pointer';

	EventUtil.addEventListener(ul,'mousemove',mouseMove)
	EventUtil.addEventListener(document,'mouseup',mouseUp);

	}
	
	
	
function mouseMove(e){
	
     var	e=e||window.event;
	 ul.style.left=e.pageX-disX+'px';
	 EventUtil.addEventListener(document,'mouseup',mouseUp);
	 
	 speed=e.pageX-lastX;
	 	 lastX=e.pageX;
		 

	}
	
	//鼠标弹起
	
function mouseUp(e){
	
	var e=e||window.event;
	EventUtil.removeEventListener(ul,'mousemove',mouseMove);
	EventUtil.removeEventListener(document,'mouseup',mouseUp);

	document.onmouseup=null;
    document.onmouseover=null;
	ul.style.cursor='';
	
	
	if(parseInt(ul.style.left)>0){
		
		animate(ul, {left:0},30)
		
		}
	else if(parseInt(ul.style.left)<getStyle(container,'width')-parseInt(ul.style.width)){
		
	animate(ul, {left:getStyle(container,'width')-parseInt(ul.style.width)},30)
	}	
		
	else{
		
	if (Math.abs(speed)<2){
		
		return;
		}	
		
    throwIt(ul,speed)
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
					console.log(parseInt(obj.style.width))
		animate(obj, {left:getStyle(container,'width')-parseInt(obj.style.width)},30)
			
			}	
		
		
		
		},30)
	
	
	
	
	}
	



  