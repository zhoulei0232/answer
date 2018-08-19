<template>
   <section class="homepage">
      <header class="top_tips">
    		<span class="num_tip" v-if="fatherComponent == 'home'">{{level}}</span>
    		<span class="num_tip" v-if="fatherComponent == 'item'">题目{{itemNum}}</span>
    	</header>
      <div v-if="fatherComponent == 'home'" >
    		<div class="home_logo item_container_style"></div>
    		<router-link to="item" class="start button_style" ></router-link>
    	</div>
      <div v-if="fatherComponent == 'item'">
          <div class="item_back item_container_style">
          <div class="item_list_container" v-if="itemDetail.length > 0">
        
               <header class="item_title">{{itemDetail[itemNum-1].topic_name}}</header>
               
               <ul>
                 <li  class="item_list" v-for="(item ,index ) in itemDetail[itemNum-1].topic_answer" :key="index" @click="choosed(index,item.topic_answer_id)">
                    <span  class="option_style" :class="{'has_choosed':choosedNum==index}">{{chooseType(index)}}</span>
                    <span  class="option_detail">{{item.answer_name}}</span>
                 </li>
               </ul>
          </div>
          </div>
          <span class="next_item button_style" @click="nextItem" v-if="itemNum < itemDetail.length"></span>
          <span class="submit_item button_style" @click="submitAnswer"  v-else ></span>
      </div>
   </section>
</template>

<script>
import { mapState, mapActions} from 'vuex'

export default {
  name: 'itemcontainer',
  data () {
    return {
      itemId:null,
      choosedNum:null,
      choosedId:null,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:['fatherComponent'],
  computed: {
      ...mapState([
        'itemNum', //第几题
        'level', //第几周
        'itemDetail', //题目详情
        'timer', //计时器
  ])},
  methods:{
      ...mapActions(['addNum','initializeData']),
      nextItem(){
          if(this.choosedNum !==null){
            this.choosedNum = null 
            //保存这一题的答案，然后下一题
            this.addNum(this.choosedId)
          }else{
             alert('您还没有选择答案')
          }
      },
      chooseType(type){
          switch(type){
            case 0: return 'A';
            case 1: return 'B';
            case 2: return 'C';
            case 3: return 'D';
          }
      },
      choosed(type,id){
        this.choosedNum = type;
        this.choosedId = id ;
      },
      submitAnswer(){
          if(this.choosedNum !==null){
            this.choosedNum = null 
            //保存这一题的答案，然后下一题
            clearInterval(this.timer)
            this.$router.push('score')
          }else{
             alert('您还没有选择答案')
          }
      }
  },
  created(){
      if(this.fatherComponent == 'home'){
         this.initializeData()
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
html,body{
  height: 100%;
  width: 100%;
}
.homepage{
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  background:url('../images/1-1.jpg') no-repeat;
  background-size: 100% 100%;
}
.top_tips{
  position: absolute;
  height: 7.35rem;
  width: 3.25rem;
  top: -1.3rem;
  right: 1.6rem;
  background: url('../images/WechatIMG2.png') no-repeat;
	background-size: 100% 100%;
  z-index: 10;
  	.num_tip{
			position: absolute;
			left: 0.48rem;
			bottom: 1.1rem;
			height: 0.7rem;
			width: 2.5rem;
			font-size: 0.6rem;
			font-family: '黑体';
			font-weight: 600;
			color: #a57c50;
			text-align: center;
		}
}
	.item_container_style{
		height: 11.625rem;
		width: 13.15rem;
		background-repeat: no-repeat;
		position: absolute;
		top: 4.1rem;
		left: 1rem;
  }
  .home_logo{
		background-image: url(../images/1-2.png);
		background-size: 13.142rem 100%;
		background-position: right center;
  }
  .item_back{
    background-image: url('../images/2-1.png');
    background-size: 13.142rem 100%;
    background-position: right center;
  }
  .button_style{
        display: block;
        height: 2.1rem;
        width: 4.35rem;
        background-size: 100% 100%;
        position: absolute;
        top: 16.5rem;
        left: 50%;
        margin-left: -2.4rem;
        background-repeat: no-repeat;
	}
	.start{
        background-image: url('../images/1-4.png');
    }
  .next_item{
    	background-image: url('../images/2-2.png');
    }
  .submit_item{
    	background-image: url('../images/3-1.png');
    }
  .item_list_container{
    	position: absolute;
    	height: 7.0rem;
    	width: 9rem;
    	top: 1.8rem;
      left: 2rem;
      text-align:left;
      -webkit-font-smoothing: antialiased;
  }
      .item_title{
        text-indent: 2em;
        font-size: 0.65rem;
        color: #fff;
        line-height: 0.8rem;
        }
      .item_list{
        font-size: 0;
        margin-top: 0.4rem;
        width: 10rem;
       
         span{
          display: inline-block;
          font-size: 0.6rem;
          color: #fff;
          vertical-align: middle;
          }
         .option_style{
            height: 0.725rem;
            width: 0.725rem;
            border: 1px solid #fff;
            border-radius: 50%;
            line-height: 0.725rem;
            text-align: center;
            margin-right: 0.3rem;
            font-size: 0.5rem;
            font-family: 'Arial';
          }
          .has_choosed{
            background-color: #ffd400;
            color: #575757;
            border-color: #ffd400;
          }
          .option_detail{
            // padding-bottom: 0.2rem;
            width: 8rem;
            word-wrap: break-word;
            word-break: normal;
          }
      }
     
    
</style>
