<template>
    <div class="movie_body">
        <ul>
            <li v-for="item in movieList" :key="item.id">
                <div class="pic_show"><img :src="item.img| setWH('128.180')"></div>
                <div class="info_list">
                    <h2>{{item.nm}}<img v-if="item.version" src="@/assets/max.png" alt=""></h2>
                    <p v-if="item.sc">观众评 <span class="grade">{{item.sc}}</span></p>
                    <p v-else-if="item.wish"><span class="grade">{{item.wish}}</span>人想看</p>
                    <p>主演: {{item.star}}</p>
                    <p>{{item.showInfo}}</p>
                </div>
                <div :class="item.globalReleased?'btn_mall':'btn_pre'">
                    {{item.globalReleased?"购买":"预约"}}
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'Nowplaying',
    data() {
        return {
            movieList: []
        }
    },
    mounted () {
        this.axios({
            // url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=7758474',
            // headers: {
            //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16164252172533949100261377","bc":"110100"}',
            //     'X-Host': 'mall.film-ticket.film.list'
        // }
            url: '/ajax/movieOnInfoList'
        }).then(res => {
            // console.log(res.data.movieList)
            this.movieList = res.data.movieList;
            // this.looplist = res.data.data
            // var msg = res.data.msg;
            // if(msg === 'ok'){
            //     var data = res.data.data.cities;
            //     console.log(data);
            //     var { cityList , hotList } = this.formatCityList(data);
            //     this.cityList = cityList;
            //     this.hotList = hotList;
            //     console.log(cityList);
            // }
        })
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