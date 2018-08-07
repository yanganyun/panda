<style lang="scss" scoped>
//样式类型，pc.scss 和 mobile.scss
@import "./pc.scss";
</style>
<style lang="scss">
.is_sale{
  position: absolute;
  left: 0;
  top: 40px;
  width: 100%;
  text-align: center;
  font-size: 16px;
}
</style>


<template>
	<div class="calendar_all" :class="{calendar_abs:bindDom}">
    <!-- <input class="input" type="text"> -->
    <div class="calendar_box" :class="{'calendar_mini':size=='mini'&&!showDouble,'calendar_mini_double':size=='mini'&&showDouble,'calendar_big':size!='mini'&&!showDouble,'calendar_big_double':size!='mini'&&showDouble}">
      <span class="calendar_prev iconfont" @click="setPrevMonth" v-show="showPrev||oldDate">&#xe615;</span>
      <span class="calendar_next iconfont" @click="setNextMonth" v-show="showNext">&#xe620;</span>

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
            <div class="day_list" :class="{'has_date':item,'cal_disabled':!item||item<today&&!oldDate , 'today':(item==today)}" :key="index" v-for="(item,index) in nowMonthDay" :date="item?item:''" @click="selectDate">
              <div class="day_box">
                <span class="day" v-if="item.substring(8,10)">{{parseInt(item.substring(8,10))}}</span>
              </div>
            </div>
          </div>
          <div class="calendar_loading" v-show="loading">
            <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
          </div>

        </div>
      </div>
      <div class="calendar_month" v-if="showDouble">
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
            <div class="day_list" :class="{'has_date':item, 'cal_disabled':!item||item<today&&!oldDate , 'today':(item==today)}" :key="index" v-for="(item,index) in nextMonthDay" :date="item?item:''" @click="selectDate">
              <div class="day_box">
                <span class="day" v-if="item.substring(8,10)">{{parseInt(item.substring(8,10))}}</span>
              </div>
            </div>
          </div>
          <div class="calendar_loading" v-show="loading">
            <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
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
      'showDouble':String,
      'value':{},
      'bindDom':String,
      'maxMonths':String,
      'oldDate': String,
      'loading':Boolean
    },
		data() {
      var date = new Date(),
        month = date.getMonth()+1,
        year = date.getFullYear(),
        today= year+'-'+this.leadingZero(month)+'-'+this.leadingZero(date.getDate());
      
      var nowMonth = month,
        nowYear = year;
      
      var thisValue = this.value;
      if(!Array.isArray(thisValue)){
        var valueArr = thisValue.split('-');
        if(valueArr.length==3 && valueArr[0]==year && valueArr[1]==month){}else{
          year = parseInt(valueArr[0]);
          month = parseInt(valueArr[1]);
        }
      }
      

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

        dates: thisValue,
        titleTemplate: '{{month}} {{year}}',
        nowMonthDay:[],
        nextMonthDay:[],

        showPrev:month>nowMonth,
        showNext:true,

        nowYear:nowYear,
        nowMonth:nowMonth,
        today:today,

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
        if(this.showDouble){
          this.nextMonthDay = this.getMonthDay(this.year,this.month);
          this.nextYear = this.year;
          this.nextMonth = this.month; 
        }
        

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

        //设置向前翻页按钮显示
        this.showNext = true;
        

        if(Math.abs((this.year-this.nowYear)*12-Math.abs(this.month-this.nowMonth)) <=0 && !this.oldDate){
          this.showPrev = false;
        }
        
        
        
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
        if(this.showDouble){
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
        }

        //翻页设置已选日期
        var self = this;
        self.setActive(self.value);

        //设置显示翻页按钮
        this.showPrev = true;

        if( Math.abs((this.year-this.nowYear)*12-Math.abs(this.month-this.nowMonth)) >= this.maxMonths-1-(this.showDouble?1:0)){
          this.showNext = false;
        }
        

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
            dayArr.push(year+'-'+this.leadingZero(month)+'-'+this.leadingZero(dayNum));
          }else{
            dayArr.push('');
          }
        }
        return dayArr;
      },
      //选中日期
      selectDate(e){
        var thisPath = this.getParents(e.target,'day_list'),
          className = thisPath.className;
        var dateStr = thisPath.getAttribute('date');

        
        if(/day_list/.test(className) && dateStr && !/cal_disabled/.test(className)){
          
          //记录选种值
          if(/multi/.test(this.type)){
            
            //单击多选
            if(this.type=='multi'){
              

              //添加选中日期
              var datesSet = new Set(this.value);
              var thisSize = datesSet.size;
              datesSet.add(dateStr);

              //添加和删除选中状态、数据
              if(datesSet.size==thisSize){
                datesSet.delete(dateStr);
                this.removeClass(thisPath,'active');
              }else{
                this.addClass(thisPath,'active');
              };
              var newDates = Array.from(datesSet);
              
              //设置源数据
              this.$emit('input',newDates);

              //触发回调
              this.$emit('change',{'el':this.$el,'changeDate':dateStr,'changeDom':thisPath});
            }else{
              //范围多选
              this.selectMulti(dateStr,thisPath);
            }
            



          }else{
            this.removeClass(this.$el.querySelectorAll('.day_list'),'active');
            this.addClass(thisPath,'active');
            this.$emit('input',dateStr);
            //触发回调
            this.$emit('change',{'el':this.$el,'changeDate':dateStr,'changeDom':thisPath});

            this.$el.style.display = 'none';
            //this.value = dateStr;
          }
        }
        
      },
      selectMulti(dateStr,thisPath){
        var self = this;
        
        

        if(this.clickStart){
          //设置开始日期
          this.clickEndDate = dateStr;

          //设置选中和反选状态
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
        if(this.hasClass(thisPath,'active')){
          this.addClass(thisPath,'willDel');
        }else{
          this.addClass(thisPath,'willActive');
        }
        

        //绑定鼠标移动事件
        document.onmouseover = function(e){
          //鼠标移动到
          var dayList = self.getParents(e.target,'has_date');
          if(dayList){
            var mouseDate = dayList.getAttribute('date');
            //往前移动，往后移动
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
        var list = this.$el.querySelectorAll('.day_list');
        this.removeClass(list,'willActive');
        this.removeClass(list,'willDel');
        

        var hasNoDate = false;
        var listArr = [];
        for(var i=0;i<list.length;i++){
          var thisList = list[i],
          thisDate = thisList.getAttribute('date');
          if(thisDate<=endDate && thisDate>=startDate){
            //检测区间是否有未选日期，如果有未选日期则设置为全选，否则设置为反选
            if(!this.hasClass(thisList,'active')){
              hasNoDate = true;
            }
            listArr.push(thisList);
          }
        }
        
        //检测区间是否有未选日期，如果有未选日期则设置为全选，否则设置为反选
        if(hasNoDate){
          for(var i=0;i<listArr.length;i++){
            var thisList = listArr[i],
            thisDate = thisList.getAttribute('date');
            if(thisDate<=endDate && thisDate>=startDate){
              this.addClass(thisList,'willActive');
            }
          }
        }else{
          for(var i=0;i<listArr.length;i++){
            var thisList = listArr[i],
            thisDate = thisList.getAttribute('date');
            if(thisDate<=endDate && thisDate>=startDate){
              //检测区间是否有未选日期，如果有未选日期则设置为全选，否则设置为反选
              this.addClass(thisList,'willDel');
            }
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
      hasClass(obj,name){
        var classArr = obj.className.split(' ');
        for(var i=0;i<classArr.length;i++){
          var thisData = classArr[i];
          if(thisData==name){
            return true;
          }
        }
        return false;
      },
      getParents(target,className){
        //获取所有父元素
        var parent = target;
        var allParent = [];
        while (parent.tagName != 'BODY') { 
          allParent.push(parent);
          parent = parent.parentNode;
        }
        //遍历所有父元素
        for(var i=0;i<allParent.length;i++){
          if(this.hasClass(allParent[i],className)){
            return allParent[i];
          }
        };
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

        //区间日期
        var selectArr = [];
        //便利区间的每一天
        for(var i=0;i<days;i++){
          if(dateS<=dateE){
            var thisDate = this.toDateStr(new Date(dateS).toLocaleDateString());
            selectArr.push(thisDate);
          }
          dateS += 1000*60*60*24;
        }

        //初始化数据
        var setValue = new Set(this.value);
        var changeDate = [];
        for(var i=0;i<selectArr.length;i++){
          var thisData = selectArr[i];
          var setSize = setValue.size;
          setValue.add(thisData);
          if(setSize==setValue.size){
            //setValue.delete(thisData);
          }else{
            changeDate.push(thisData);
          }
        }
        

        //设置反选和选中
        var list = this.$el.querySelectorAll('.day_list');
        var changeDom = [];
        for(var i=0;i<list.length;i++){
          var thisList = list[i],
          className = thisList.className;
          if(/willDel/.test(className) && /active/.test(className)){
            var dateStr = thisList.getAttribute('date');
            setValue.delete(dateStr);
            this.removeClass(thisList,'willDel');
            this.removeClass(thisList,'active');
          }else if(/willActive/.test(className)){
            changeDom.push(thisList);
            this.removeClass(thisList,'willActive');
          }
        }


        
        //转为数组
        setValue = Array.from(setValue);
        //排序
        setValue.sort();

        this.setActive(setValue,changeDate,changeDom);
        this.$emit('input',setValue);

        
        
      },
      setActive(dates,changeDate,changeDom){
        var self = this;
        
        
        
        setTimeout(function(){
          var list = self.$el.querySelectorAll('.day_list');
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

          //触发回调
          self.$emit('change',{'el':self.$el,'changeDate':changeDate,'changeDom':changeDom});
        },0);

      }
		},
		mounted(){
      //初始化显示日期
      this.nowMonthDay = this.getMonthDay(this.year,this.month);
      if(this.showDouble){
        this.nextMonthDay = this.getMonthDay(this.nextYear,this.nextMonth);
      }

      //初始化设置选中日期
      var self = this;
      self.setActive(self.value);

      //初始化绑定输入框事件
      var bindClassName = this.bindDom;

      
      
      if(bindClassName){
        var firstStr = bindClassName.substring(0,1);
        self.className = (firstStr=='.'||firstStr=='#') ? bindClassName.substring(1) : bindClassName;
        this.focusDom = document.querySelectorAll( (firstStr=='.'||firstStr=='#') ? bindClassName : '.'+bindClassName );
        

        

        for(var i=0;i<this.focusDom.length;i++){
          this.focusDom[i].onfocus = function(e){
            //先赢藏所有弹窗组件
            var $calendar_abs = document.querySelectorAll('.calendar_abs');
            for(var i=0;i<$calendar_abs.length;i++){
              $calendar_abs[i].style.display = 'none';
            };

            var $this = this;
            self.focusInput = $this;
            var $calendar = self.$el;
            
            //设置位置
            var focusH = $this.offsetHeight,
              focusL = $this.offsetLeft,
              focusT = $this.offsetTop;
            $calendar.style.display = 'block';
            $calendar.style.left = focusL + 'px';
            $calendar.style.top = focusT+focusH + 'px';
          };

          this.focusDom[i].onclick = function(e){
            e.stopPropagation();
          }
          

        }


        document.onclick = function(e){

          //var $calendar = self.$el;
          var $this = e.target;
          //点击其他区域
          var isCalendar = false;

          var thisPath = self.getParents($this,'calendar_all');
          if(thisPath){
            isCalendar = true;
          }

          //点击其他区域、日历区域隐藏日历
          if(!isCalendar || !/multi/.test(self.type) && $this.className=='day' || !/multi/.test(self.type) && $this.className=='day_box'){
            //$calendar.style.display = 'none';
            var $calendar_abs = document.querySelectorAll('.calendar_abs');
            for(var i=0;i<$calendar_abs.length;i++){
              $calendar_abs[i].style.display = 'none';
            };
          }
        }
      }
      
    },
    watch:{
      value:function(val){
        //初始化设置选中日期
        this.setActive(val);
      }
    }
	}
</script>
