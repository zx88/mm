<template>
    <div class="cinema_body">
        <Loading v-if="isLoading"></Loading>
        <Scroll v-else>
        <ul>
            <li v-for="item in cinimaList" :key="item.id">
                <div>
                    <span>{{item.nm}}</span>
                    <span class="q"><span class="price">{{item.sellPrice}}</span> 元起</span>
                </div>
                <div class="address">
                    <span>{{item.addr}}</span>
                    <span>{{item.distance}}</span>
                </div>
                <div class="card">
                    <div :class="key | colorCard" v-for="(num,key) in item.tag" v-if="num === 1" :key="key">{{key | fromCard}}</div>
                </div>
            </li>
        </ul>
        </Scroll>
    </div>
</template>

<script>
export default {
    name: 'Clist',
    data() {
        return {
            cinimaList: [],
            isLoading: true,
            prdvCityId: -1
        }
    },
    activated () {
        var cityId = this.$store.state.city.id;
        console.log(cityId);
        if( this.prdvCityId === cityId){return;}
        this.isLoading = true;

        this.axios({
            url: `/ajax/cinemaList?ci=${cityId}&limit=10`
        }).then(res => {
            console.log(res);
            if(res.statusText === "OK"){
                this.cinimaList = res.data.cinemas
                // console.log(this.cinimaList)
                this.isLoading = false;
                this.prdvCityId = cityId;
            }
        })
    },
    filters: {
        fromCard(key){
            var card = [
                {key: 'allowRefund' , value : '改签'},
                {key: 'endorse' , value : '退'},
                {key: 'sell' , value : '折扣'},
                {key: 'snack' , value : '小吃'}
            ];
            for (let i = 0; i < card.length; i++) {
                if(card[i].key === key){
                    return card[i].value
                }
            }
            return '';
        },
        colorCard(key){
            var card = [
                {key: 'allowRefund' , value : 'bl'},
                {key: 'endorse' , value : 'bl'},
                {key: 'sell' , value : 'or'},
                {key: 'snack' , value : 'or'}
            ];
            for (let i = 0; i < card.length; i++) {
                if(card[i].key === key){
                    return card[i].value
                }
            }
            return '';
        }
    }
}
</script>

<style lang="scss" scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>