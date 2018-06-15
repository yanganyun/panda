<style lang="scss">
//样式类型，pc.scss 和 mobile.scss
@import "./pc.scss";
</style>

<template>
	<div class="calendar_all">
    <input class="input" type="text">
    <div class="calendar_box" :class="{'calendar_min':type=='min'}">
      <div class="calendar_header">
        <p>June 2018</p>
        <span class="calendar_prev iconfont" @click="prevMonth">&#xe615;</span>
        <span class="calendar_next iconfont" @click="nextMonth">&#xe620;</span>
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
          <span :key="index" v-for="(item,index) in nowMonthDay">{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
    name: "calendar",
    props:{
      'type':String
    },
		data() {
      var date = new Date(),
        month = date.getMonth()+1,
        year = date.getFullYear();

			return {
        nowMonthDay:[],
        year: year,
        month: month
      }
    },
    computed:{
      
    },
		methods: {
      prevMonth(month){
        this.month--;
        if(this.month<1){
          this.month = 12;
          this.year--;
        }
        this.nowMonthDay = this.getMonthDay(this.year,this.month);
      },
      nextMonth(month){
        this.month++;
        if(this.month>12){
          this.month = 1;
          this.year++;
        }
        this.nowMonthDay = this.getMonthDay(this.year,this.month);
      },
      getMonthDay(year,month){
        //获取当月第一天星期几
        var firstDayWeek = new Date(year+'/'+(month)+'/1').getDay();
        //获取当月的天数
        var thisMonthDay = new Date(year, (month), 0).getDate();
        
        var dayArr = [],
          dayNum = 0;
        for(var i=0;i<35;i++){
          if(i>=firstDayWeek && dayNum<thisMonthDay){
            dayNum++;
            dayArr.push(dayNum);
          }else{
            dayArr.push('');
          }
        }

        return dayArr;
      }
		},
		mounted(){
      
      this.nowMonthDay = this.getMonthDay(this.year,this.month);
    },
    watch:{
      
    }
	}
</script>
