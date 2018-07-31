<style lang="scss">
//样式类型，pc.scss 和 mobile.scss
@import "./pc.scss";
</style>

<template>
	<div class="calendar_all">
    <!-- <input class="input" type="text"> -->
    <div class="calendar_box" :class="{'calendar_min':size=='min'&&showMonth!=2,'calendar_min_double':size=='min'&&showMonth==2,'calendar_big':size!='min'&&showMonth!=2,'calendar_big_double':size!='min'&&showMonth==2}">
      <span class="calendar_prev iconfont" @click="setPrevMonth">&#xe615;</span>
      <span class="calendar_next iconfont" @click="setNextMonth">&#xe620;</span>

      <div class="calendar_month">
        <div class="calendar_header">
          <p>{{calendarTitle(year,month)}}</p>
        </div>

        <div class="calendar_content">
          <div class="week_box">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>
          <div class="day_content">
            <div class="day_list" :class="{'has_date':item}" :key="index" v-for="(item,index) in nowMonthDay" :date="item?toDateStr([year,month,item]):''" @click="selectDate">
              <div class="day_box">
                <span class="day">{{item}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="calendar_month" v-if="showMonth==2">
        <div class="calendar_header">
          <p>{{calendarTitle(nextYear,nextMonth)}}</p>
        </div>

        <div class="calendar_content">
          <div class="week_box">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>
          <div class="day_content">
            <div class="day_list" :class="{'has_date':item}" :key="index" v-for="(item,index) in nextMonthDay" :date="item?toDateStr([nextYear,nextMonth,item]):''" @click="selectDate">
              <div class="day_box">
                <span class="day">{{item}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
    name: "calendar",
    props:{
      'type':String,
      'size':String,
      'showMonth':String,
      'value':{}
    },
		data() {
      var date = new Date(),
        month = date.getMonth()+1,
        year = date.getFullYear();

      var nextYear = year;
      var nextMonth = month+1;
      if(nextMonth>12){
        nextMonth = 1;
        nextYear++;
      }

			return {
        clickStart:false,
        clickStartDate:'',
        clickEedDate:'',

        dates:this.value,
        titleTemplate: '{{month}} {{year}}',
        nowMonthDay:[],
        nextMonthDay:[],
        year: year,
        month: month,
        nextYear: nextYear,
        nextMonth: nextMonth,
        monthStr: ['January','February','March','April','May','June','July','August','September','October','November','December'],
      }
    },
    computed:{
      
    },
		methods: {
      calendarTitle: function(year,month){
        return this.titleTemplate.replace(/\{\{year\}\}/,year).replace(/\{\{month\}\}/,this.monthStr[month-1]);
      },
      setPrevMonth(month){
        //双日历第二个月数据
        this.nextMonthDay = this.getMonthDay(this.year,this.month);
        this.nextYear = this.year;
        this.nextMonth = this.month;

        //双日历第一个月数据
        this.month--;
        if(this.month<1){
          this.month = 12;
          this.year--;
        }
        this.nowMonthDay = this.getMonthDay(this.year,this.month);

        //翻页设置已选日期
        var self = this;
        self.setActive(self.value);
        
      },
      setNextMonth(month){

        //双日历第一个月数据
        this.month++;
        if(this.month>12){
          this.month = 1;
          this.year++;
        }
        this.nowMonthDay = this.getMonthDay(this.year,this.month);


        //双日历第二个月数据
        var thisY = this.year,
          thisM = this.month;
        thisM++;
        if(thisM>12){
          thisM = 1;
          thisY++;
        }
        this.nextMonthDay = this.getMonthDay(thisY,thisM);
        this.nextYear = thisY;
        this.nextMonth = thisM;

        //翻页设置已选日期
        var self = this;
        self.setActive(self.value);
        

      },
      getMonthDay(year,month){
        //获取当月第一天星期几
        var firstDayWeek = new Date(year+'/'+(month)+'/1').getDay();
        //获取当月的天数
        var thisMonthDay = new Date(year, (month), 0).getDate();
        
        var dayArr = [],
          dayNum = 0;
        for(var i=0;i<42;i++){
          if(i>=firstDayWeek && dayNum<thisMonthDay){
            dayNum++;
            dayArr.push(dayNum);
          }else{
            dayArr.push('');
          }
        }

        return dayArr;
      },
      //选中日期
      selectDate(e){
        
        var path = e.path;
        for(var i=0;i<path.length;i++){
          var thisPath = path[i];
          var className = thisPath.className,
            tagName = thisPath.tagName;
          // 找到日期选择的最外层day_list
          if(tagName && tagName.toUpperCase()!='HTML'){
            var dateStr = thisPath.getAttribute('date');
            if(/day_list/.test(className) && dateStr){
              //触发回调
              this.$emit('change',thisPath);
              //记录选种值
              if(/multi/.test(this.type)){
                
                //单击多选
                if(this.type=='multi'){
                  this.addClass(thisPath,'active');

                  //添加选中日期
                  var datesSet = new Set(this.value);
                  datesSet.add(dateStr);
                  var newDates = Array.from(datesSet);

                  //设置源数据
                  this.$emit('input',newDates);
                }else{
                  //范围多选
                  this.selectMulti(dateStr,thisPath);
                }
                



              }else{
                this.removeClass(document.querySelectorAll('.day_list'),'active');
                this.addClass(thisPath,'active');
                this.$emit('input',dateStr);
                //this.value = dateStr;
              }
              break;
            }
          }
        }
        
      },
      selectMulti(dateStr,thisPath){
        var self = this;
        
        

        if(this.clickStart){
          //设置开始日期
          this.clickEndDate = dateStr;

          //设置选中和反选
          this.getDateArr(this.clickStartDate,this.clickEndDate);
          
          //移除状态和事件
          this.clickStart = false;
          document.onmouseover = false;
          return;
        }

        //设置开启范围选取状态
        this.clickStart = true;

        //设置开始日期
        this.clickStartDate = dateStr;

        //设置当前选中状态
        this.addClass(thisPath,'willActive');

        //绑定鼠标移动事件
        document.onmouseover = function(e){
          //鼠标移动到
          var dayList = self.getParent(e,'has_date');
          if(dayList){
            var mouseDate = dayList.getAttribute('date');
            if(mouseDate>dateStr){
              self.setWillActive(dateStr,mouseDate);
            }else{
              self.setWillActive(mouseDate,dateStr);
            }
          }
          
        };
      },
      //设置区间日期选中状态
      setWillActive(startDate,endDate){
        var list = document.querySelectorAll('.day_list');
        this.removeClass(list,'willActive');
        for(var i=0;i<list.length;i++){
          var thisList = list[i],
          thisDate = thisList.getAttribute('date');
          if(thisDate<=endDate && thisDate>=startDate){
            this.addClass(thisList,'willActive');
          }
        }
      },
      //日期转换把不带0的日期转化为标准格式（2018-8-9转为2018-08-09，2018/8/9转为2018-08-09）
      toDateStr(arr){
        if(!Array.isArray(arr)){
          if(/\-/.test(arr)){
            arr = arr.split('-');
          }else if(/\//.test(arr)){
            arr = arr.split('/');
          }
        }
        return arr[0] +'-'+ this.leadingZero(arr[1]) +'-'+ this.leadingZero(arr[2])
      },
      leadingZero(num){
        if(num<10){
              return '0'+num;
          }else{
              return ''+num;
        }
      },
      //添加class
      addClass(obj,name){
        obj.className = obj.className+' '+name;
      },
      //删除class
      removeClass(obj,name){
        if(obj.length){
          for(var i=0;i<obj.length;i++){
            var thisData = obj[i];
            thisData.className = thisData.className.replace(name,'').replace(/(^\s*)|(\s*$)/g, "");
          }
        }else{
          obj.className = obj.className.replace(name,'').replace(/(^\s*)|(\s*$)/g, "");
        }
        
      },
      getParent(event,className){
        var path = event.path;
        for(var i=0;i<path.length;i++){
          var thisPath = path[i];
          var thisClassName = thisPath.className,
            tagName = thisPath.tagName;
          // 找到日期选择的最外层day_list
          if(tagName && (new RegExp(className)).test(thisClassName)){
            return thisPath;
          }
        }
        return false;
      },
      getDateArr(startStr,endStr){
        var sArr = startStr.split('-'),
          eArr = endStr.split('-');
        if(startStr>endStr){
          sArr = endStr.split('-');
          eArr = startStr.split('-');
        }
        
        var dateS = new Date(sArr[0],sArr[1]-1,sArr[2]).getTime(),
          dateE = new Date(eArr[0],eArr[1]-1,eArr[2]).getTime();
        var days = (dateE - dateS)/1000/60/60/24 + 1;

        var selectArr = [];
        for(var i=0;i<days;i++){
          
          if(dateS<=dateE){
            var thisDate = this.toDateStr(new Date(dateS).toLocaleDateString());
            selectArr.push(thisDate);
          }
          dateS += 1000*60*60*24;
        }

        //没有去重
        var newValue = this.value;
            newValue = newValue.concat(selectArr);
            this.$emit('input',newValue);
      },
      setActive(dates){
        var self = this;
        
        
        
        setTimeout(function(){
          var list = document.querySelectorAll('.day_list');
          //清除所有已选日期
          //self.removeClass(list,'willActive');
          self.removeClass(list,'active');
          //如果没有开启多日期选择，默认日期如果又是数组，则只显示第一个
          if(!/multi/.test(self.type) && Array.isArray(dates)){
            dates = dates[0];
          }
          //便利所有日期，并设置选中状态
          for(var i=0;i<list.length;i++){
            var thisList = list[i],
              dateStr = thisList.getAttribute('date');
            if(Array.isArray(dates)){
              for(var j=0;j<dates.length;j++){
                var thisDate = dates[j];
                if(dateStr == thisDate){
                  self.addClass(thisList,'active');
                }
              }
            }else{
              if(dateStr == dates){
                self.addClass(thisList,'active');
                break;
              }
            }
          }
        },10);

      }
		},
		mounted(){
      
      this.nowMonthDay = this.getMonthDay(this.year,this.month);


      this.nextMonthDay = this.getMonthDay(this.nextYear,this.nextMonth);

      var self = this;
      self.setActive(self.value);
      
    },
    watch:{
      
    }
	}
</script>
