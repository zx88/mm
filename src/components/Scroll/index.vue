<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name : 'Scroller',
    props : {
        handleToScroll : {
            type : Function,
            default : function(){}
        },
        handleToTouchEnd : {
            type : Function,
            default : function(){}
        }
    },
    mounted(){
        var that = this;
        setTimeout(()=>{
            var scroll = new BScroll( that.$refs.wrapper , {
                click : true,
                pullDownRefresh: true,
                pullUpLoad: true
            });
            scroll.on('pullingDown',(pos)=>{
                that.handleToScroll(pos);
                scroll.finishPullDown();
            });
            scroll.on('pullingUp',(pos)=>{
                that.handleToTouchEnd(pos);
                scroll.finishPullUp();
            });
        },150)

        // this.scroll = scroll;

        // scroll.on('touchEnd',(pos)=>{
        //     this.handleToTouchEnd(pos);
        // });
    },
    methods : {
        // toScrollTop(y){
        //     this.scroll.scrollTo(0,y);
        // }
    }
}
</script>

<style scoped>
    .wrapper{ height:100%;}
</style>
