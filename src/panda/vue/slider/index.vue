<style lang="scss">
//样式类型，pc.scss 和 mobile.scss
@import "./mobile.scss";
</style>

<template>
  <div class="slider_box">
    <div class="slider_line_bg" :value="value">
      <p :style="defaultLine()"></p>
      <span class="slider_btn" @touchmove="btnMove" @touchstart="btnStart" @touchend="btnEnd" @mousedown="btnStart" :style="defaultBtn1()"></span>
      <span class="slider_btn" @touchmove="btnMove" @touchstart="btnStart" @touchend="btnEnd" @mousedown="btnStart" :style="defaultBtn2()" v-if="value.length==2"></span>
      <div class="slider_tip" v-show="showTip">{{tipVal()}}<i></i></div>
    </div>
  </div>
</template>

<script>
	export default {
    name: "slider",
    props:{
      value: Array,
      min: String,
      max: String,
      maxTipValue: String,
      tipValueTpl: String,
      step: String
    },
		data() {
      var min = this.min?this.min:0;
      var max = this.max?this.max:100;
			return {
        minVal: (this.value[0]<min)?this.value[0]:min,
        maxVal: (this.value[1]>max)?this.value[1]:max,
        stepNum: this.step ? parseInt(this.step) : 1,
        oldLeft: 0,
        oldX: 0,
        sliderWidth: 0,
        showTip: false,
        tipValue: 0,
        tipTpl: this.tipValueTpl ? this.tipValueTpl : ''
			}
    },
    computed:{
      
    },
		methods: {
      btnStart(ev){
        var target = ev.target,
          parent = target.parentNode;

        this.oldLeft = target.offsetLeft;
        this.oldX = ev.targetTouches ? ev.targetTouches[0].clientX : ev.clientX;
        this.sliderWidth = parent.clientWidth;
        this.thisLine = parent.getElementsByTagName('p')[0];
        this.thisBtn = parent.getElementsByTagName('span');
        this.thisTip = parent.getElementsByTagName('div')[0];

        //显示提示
        var def = Math.round((this.maxVal-this.minVal)*(target.offsetLeft/this.sliderWidth))+parseInt(this.minVal);
        var stepNum = this.stepNum;
        if(stepNum>1){
          if(def%stepNum < stepNum/2){
            def = def - def%stepNum;
          }else{
            def = def - def%stepNum + stepNum;
          };
        }
        this.thisTip.style.left = this.oldLeft/this.sliderWidth*100 +'%';
        this.tipValue = def;
        this.showTip =true;

        target.style.zIndex = 3;
        //this.btnWidth = e.target.clientWidth/2;

        var self = this;
        //兼容PC
        if(ev.type == 'mousedown'){
          document.onmousemove = function(e){
            self.btnMove(e,ev);
          }
        }

      },
      btnMove(e,btnEv){
        e.preventDefault();
        e.stopPropagation();

        var self = this;
        var target = btnEv.target,
          parent = target.parentNode;

        //获取当前拖拽的位置
        var clientX = e.targetTouches ? e.targetTouches[0].clientX : e.clientX;
        var moveX = clientX - this.oldX;
        //获取当前移动的距离
        var left = this.oldLeft + moveX;
        if(left<0){
          left = 0;
        }else if(left>this.sliderWidth){
          left = this.sliderWidth;
        }
        //修改拖拽按钮的位置
        target.style.left = left/this.sliderWidth*100 +'%';
        this.thisTip.style.left = left/this.sliderWidth*100 +'%';

        //获得按钮拖拽后的最大，最小值
        var btnLeft1 = this.thisBtn[0].offsetLeft,
          btnLeft2 = this.thisBtn[1] ? this.thisBtn[1].offsetLeft : 0;
        var left = {
          min: btnLeft1>btnLeft2?btnLeft2:btnLeft1,
          max: btnLeft1<btnLeft2?btnLeft2:btnLeft1
        }
        //设置区间色块的位置和宽度
        this.thisLine.style.width = (left.max-left.min)/this.sliderWidth*100 +'%';
        this.thisLine.style.left = (left.min)/this.sliderWidth*100 +'%';

        
        
        var min = Math.round((this.maxVal-this.minVal)*(left.min/this.sliderWidth))+parseInt(this.minVal),
          max = Math.round((this.maxVal-this.minVal)*(left.max/this.sliderWidth))+parseInt(this.minVal),
          def = Math.round((this.maxVal-this.minVal)*(target.offsetLeft/this.sliderWidth))+parseInt(this.minVal);

        var stepNum = this.stepNum;
        //拖动数值变化最小区间
        if(stepNum>1){
          if(min%stepNum < stepNum/2){
            min = min - min%stepNum;
          }else{
            min = min - min%stepNum + stepNum;
          };
          if(max%stepNum < stepNum/2){
            max = max - max%stepNum;
          }else{
            max = max - max%stepNum + stepNum;
          };

          if(def%stepNum < stepNum/2){
            def = def - def%stepNum;
          }else{
            def = def - def%stepNum + stepNum;
          };
          
        }

        if(max>this.maxVal){
          max = this.maxVal;
        }
        if(min<this.minVal){
          min = this.minVal;
        }


        this.tipValue = def;

        //多个区间
        if(this.value.length==2){
          this.$emit('input',[min,max]);
        }else{
          //显示值单个
          var value = Math.round((this.maxVal-this.minVal)*(btnLeft1/this.sliderWidth))+parseInt(this.minVal);
          if(stepNum>1){
            if(value%stepNum < stepNum/2){
              value = value - value%stepNum;
            }else{
              value = value - value%stepNum + stepNum;
            };
          }
          this.$emit('input',[value]);
        }

        //兼容PC
        if(e.type == 'mousemove'){
          document.onmouseup = function(){
            document.onmousemove = null;
            self.btnEnd(btnEv);
          }
        }
      },
      btnEnd(e){
        this.showTip =false;
        e.target.style.zIndex = 0;
      },
      defaultLine(){
        var left = 0;
        var width = this.value[0] / this.maxVal * 100;
        //多个区间
        if(this.value.length==2){
          left = (this.value[0]-this.minVal) / (this.maxVal-this.minVal) * 100;
          width = (this.value[1] - this.value[0]) / (this.maxVal-this.minVal) * 100;
        }
        return 'width:'+width+'%;left:'+left+'%';
      },
      defaultBtn1(){
        var left = (this.value[0]-this.minVal) / (this.maxVal-this.minVal) * 100;
        return 'left:'+left+'%';
      },
      defaultBtn2(){
        var left = (this.value[1]-this.minVal) / (this.maxVal-this.minVal) * 100;
        return 'left:'+left+'%';
      },
      setPosition(){
        var slider_line_bg = document.querySelectorAll('.slider_line_bg');
        for(var i=0;i<slider_line_bg.length;i++){
          var thisLineBox = slider_line_bg[i];
          var value = thisLineBox.getAttribute('value');
          var thisLine = thisLineBox.getElementsByTagName('p')[0];
          var thisBtn = thisLineBox.querySelectorAll('.slider_btn');


          //设置进度条
          var lineLeft = 0;
          var lineWidth = this.value[0] / this.maxVal * 100;
          
          if(this.value.length==2){
            lineLeft = (this.value[0]-this.minVal) / (this.maxVal-this.minVal) * 100;
            lineWidth = (this.value[1] - this.value[0]) / (this.maxVal-this.minVal) * 100;

            //设置按钮2位置
            var left2 = (this.value[1]-this.minVal) / (this.maxVal-this.minVal) * 100;
            thisBtn[1].style = 'left:'+left2+'%';
          }
          thisLine.style = 'width:'+lineWidth+'%;left:'+lineLeft+'%';

          //设置按钮1位置
          var left1 = (this.value[0]-this.minVal) / (this.maxVal-this.minVal) * 100;
          thisBtn[0].style = 'left:'+left1+'%';

          

        }
      },
      tipVal(){
        var value = (this.tipValue==this.max&&this.maxTipValue) ? this.maxTipValue : this.tipValue;
        return this.tipTpl ? this.tipTpl.replace(/\$1/g,value) : value;
      }

      
		},
		mounted(){
      
      
    },
    watch:{
      
    }
	}
</script>
