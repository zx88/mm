<template>
    <div class="city_body">
        <div class="city_list">
            <Loading v-if="isLoading"></Loading>
            <Scroll v-else>
            <div>
            <div class="city_hot">
                <h2>热门城市</h2>
                <ul class="clearfix">
                    <li v-for="data in hotList" :key="data.id" @click="handleCity(data.nm,data.id)">{{data.nm}}</li>
                </ul>
            </div>
            <div class="city_sort">
                <div v-for="data in cityList" :key="data.index">
                    <h2>{{data.index}}</h2>
                    <ul>
                        <li v-for="data2 in data.list" :key="data2.id" @click="handleCity(data2.name,data2.id)">{{data2.name}}</li>
                    </ul>
                </div>
            </div>
            </div>
            </Scroll>
        </div>
        <div class="city_index">
            <ul>
                <li v-for="data in cityList" :key="data.cityId" @click="handleToIndex(data.index)">{{data.index}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
import { MessageBox } from 'mint-ui';
export default {
    name: 'City',
    data() {
        return {
            cityList: [],
            hotList: [],
            isLoading: true,
            Dcity: {nm:"重庆",id:45}
        }
    },
    mounted () {
        // MessageBox({
        //     title: '提示',
        //     message: '确定执行此操作?',
        //     showCancelButton: true
        // });
        MessageBox.confirm("message", "title");
        MessageBox.confirm(this.Dcity.nm,'当前定位').then(action => {
            this.$store.commit('city/CITY_INFO', this.Dcity);
            window.localStorage.setItem('nowNm',this.Dcity.nm);
            window.localStorage.setItem('nowId',this.Dcity.id);
            this.$router.push('movie/Nowplaying');
        }).catch(action=>{
            console.log("点击取消");
        });

        var cityList = window.localStorage.getItem('cityList');
        var hotList = window.localStorage.getItem('hotList');

        if(cityList && hotList){
            this.cityList = JSON.parse(cityList);
            this.hotList = JSON.parse(hotList);
            this.isLoading = false;
        }else{
            this.axios({
                url: `http://localhost:8080/city.json`
                // url: 'https://m.maizuo.com/gateway',
            //     headers: {
            //     'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
            //     'X-Host': 'mall.film-ticket.city.list'
            // }
            }).then(res => {
                console.log(res)
                // this.looplist = res.data.data
                if(res.statusText === 'OK'){
                    var data = res.data.cts;
                    console.log(data);
                    var { cityList , hotList } = this.formatCityList(data);
                    this.cityList = cityList;
                    this.hotList = hotList;
                    console.log(cityList);
                    this.isLoading = false;
                    window.localStorage.setItem('cityList' , JSON.stringify(cityList));
                    window.localStorage.setItem('hotList' , JSON.stringify(hotList));
                }
            })
        }
    },
    methods: {
        
        formatCityList(cities){
            var cityList = [];
            var hotList = [];

            for(var i=0;i<cities.length;i++){
                var firstLetter = cities[i].py.substring(0, 1).toUpperCase();
                if(toCom(firstLetter)){
                    cityList.push({ index : firstLetter, list : [{ name : cities[i].nm, id: cities[i].id}]})
                }else{
                    for (let j = 0; j < cityList.length; j++) {
                        if( cityList[j].index === firstLetter){
                            cityList[j].list.push({ name : cities[i].nm, id: cities[i].id});
                        }
                    }
                }
            }
            cityList.sort((n1, n2)=> {
                if(n1.index > n2.index){
                    return 1;
                }else if(n1.index < n2.index){
                    return -1;
                }else{
                    return 0;
                }
            })
            function toCom(firstLetter){
                for (let i = 0; i < cityList.length; i++) {
                    if( cityList[i].index === firstLetter){
                        return false;
                    }  
                }
                return true;
            }
            for (let i = 0; i < cities.length; i++) {
                if(cities[i].isHot === 1){
                    hotList.push(cities[i]);
                }
            }
            return {
                cityList,
                hotList
            }
        },
            // console.log(this.$refs);
            // console.log(index);
            // var h2 = this.$refs.city_sort.getElementsByTagName('h2');
            // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
        handleToIndex (id) { // 点击右边字母滚动
        // console.log(id);
        //   this.tipString = id
        //   let obj = document.getElementById(id)
        //   let tip = document.getElementById('tip')
        //   tip.setAttribute('class', 'tipAppear')
        //   setTimeout(function () {
        //    tip.removeAttribute('class')
        //   }, 500)
        //   let oPos = obj.offsetTop
        //   return window.scrollTo(0, oPos - 36)
        },
        handleCity(nm,id){
            console.log(nm,id);
            this.$store.commit('city/CITY_INFO', {nm ,id });
            window.localStorage.setItem('nowNm',nm);
            window.localStorage.setItem('nowId',id);
            this.$router.push('movie/Nowplaying');
        },
    }
}
</script>

<style lang="scss" scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul{}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort{}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>