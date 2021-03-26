<template>
    <div class="movie_body" ref="movieBody">
        <Loading v-if="isLoading"></Loading>
        <Scroll v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
        <ul>
            <li v-if="pullDownMsg">{{pullDownMsg}}</li>
            <li v-for="item in movieList" :key="item.id" @click="handleToDetail(item.id)">
                <div class="pic_show"><img :src="item.img| setWH('128.180')"></div>
                <div class="info_list">
                    <h2>{{item.nm}}<img v-if="item.version" src="@/assets/max.png" alt=""></h2>
                    <p v-if="item.sc">观众评分 <span class="grade">{{item.sc}}</span></p>
                    <p v-else-if="item.wish"><span class="grade">{{item.wish}}</span>人想看</p>
                    <p>主演: {{item.star}}</p>
                    <p>{{item.showInfo}}</p>
                </div>
                <div :class="item.globalReleased?'btn_mall':'btn_pre'">
                    {{item.globalReleased?"购买":"预约"}}
                </div>
            </li>
        </ul>
        </Scroll>
    </div>
</template>
<script>
// import BScroll from 'better-scroll'


export default {
    name: 'Nowplaying',
    data() {
        return {
            movieList: null,
            pullDownMsg: '',
            isLoading: true,
            prdvCityId: -1
        }
    },
    activated () {
        var cityId = this.$store.state.city.id;
        // console.log(cityId);
        if( this.prdvCityId === cityId){return;}
        this.isLoading = true;
        this.axios({
            url: `/ajax/movieOnInfoList?ci=${cityId}`
        }).then(res => {
            if(res.statusText === "OK"){
                this.movieList = res.data.movieList;
                this.isLoading = false;
                this.prdvCityId = cityId;
            }
        })
    },
    methods: {
        handleToDetail(id){
            // console.log(id);
            this.$router.push(`/movie/detail/1/${id}`)
        },
        handleToScroll(){
            this.pullDownMsg = '正在更新中';
            // this.movieList = [];
            this.axios.get(`/ajax/movieOnInfoList?ci=${this.$store.state.city.id}`).then((res)=>{
                console.log(res);
                if(res.statusText === "OK"){
                    this.pullDownMsg = '更新成功';
                    this.movieList = res.data.movieList;
                }
                setTimeout(()=>{
                    this.pullDownMsg = '';
                },1000); 
            });
        },
        handleToTouchEnd(pos){
            console.log("下拉刷新");
        }
    },
}
</script>

<style lang="scss" scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{font-size: 17px; line-height: 24px;overflow: hidden; white-space: nowrap; text-overflow:ellipsis;position: relative;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px;display: inline-block;position: relative; left: 4px; top: 2px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: green; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>