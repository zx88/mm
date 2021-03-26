<template>
    <div id="detailContrainer" class="slide-enter-active">
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
        <Loading v-if="isLoading" />
		<div v-else id="content" class="contentDetail">
            <div class="detail_list">
				<div class="detail_list_bg" :style="{ 'background-image' : 'url('+ detailMovie.img.replace(/w\.h/,'148.208') +')' }"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="detailMovie.img | setWH('148.208')" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{ detailMovie.nm }}</h2>
						<p>{{ detailMovie.enm }}</p>
						<p>评分:{{ detailMovie.sc }}</p>
						<p>{{ detailMovie.cat }}</p>
						<p>{{ detailMovie.src }} / {{ detailMovie.dur }}分钟</p>
						<p>{{ detailMovie.pubDesc }}</p>
					</div>
				</div>
			</div>
            <div class="detail_intro">
				<p>
                    {{ detailMovie.dra }}
                </p>
			</div>
            <div class="detail_player swiper-container" ref="detail_player">
                <p class="title">演职人员</p>
				<ul class="swiper-wrapper">
					<li class="swiper-slide">
						<div>
							<img src="https://pic.maizuo.com/usr/movie/577c7d72a1908638a805b4be88aeb791.jpg" alt="">
						</div>
                        <p>贾玲</p>
						<p>贾晓玲</p>
					</li>
					<li class="swiper-slide">
						<div>
							<img src="https://pic.maizuo.com/usr/movie/8e7578d4cae429675760aa74f5cc3da9.jpg" alt="">
						</div>
                        <p>张小玲</p>
						<p>李焕英</p>
					</li>
                    <li class="swiper-slide">
						<div>
							<img src="https://pic.maizuo.com/usr/movie/98c43da4b43bcf161d5b9c905253c016.jpg" alt="">
						</div>
                        <p>沈腾</p>
						<p>沈光林</p>
					</li>
                    <li class="swiper-slide">
						<div>
							<img src="https://pic.maizuo.com/usr/movie/4601fb466d358df29886c566a76808f8.jpg" alt="">
						</div>
                        <p>陈赫</p>
						<p>陈小赫</p>
					</li>
                    <li class="swiper-slide">
						<div>
							<img src="https://pic.maizuo.com/usr/movie/bf97810fa38188eb8fa0a7abc93b7cf7.jpg" alt="">
						</div>
                        <p>张子枫</p>
						<p>张晓枫</p>
					</li>
                    <li class="swiper-slide">
						<div>
							<img src="https://pic.maizuo.com/usr/movie/1f376fc5a437e675ab0141c56bc4dc26.jpg" alt="">
						</div>
                        <p>刘昊然</p>
						<p>秦风</p>
					</li>
                    <li class="swiper-slide">
						<div>
							<img src="https://pic.maizuo.com/usr/movie/701ddb6f4e04751b84b01be9fe418f34.jpg" alt="">
						</div>
                        <p>王宝强</p>
						<p>唐仁</p>
					</li>
				</ul>
			</div>
            <!-- <mt-swipe :auto="2000" class="swper">
                <mt-swipe-item v-for="(item,index) in detailMovie.photos" :key="index">
                    <img v-lazy="item.replace(/w\.h/,'300.250')">
                </mt-swipe-item>
            </mt-swipe> -->
            <div class="detail_player">
                <p class="title">剧照</p>
                <ul class="photos">
                    <li v-for="(item,index) in detailMovie.photos" :key="index">
                        <img v-lazy="item.replace(/w\.h/,'500.350')">
                    </li>
                </ul>
            </div>
		</div>
	</div>
</template>

<script>

import Header from '@/components/Header';

// import { Lazyload } from 'mint-ui';

export default {
    name : 'detail',
    data(){
        return {
            detailMovie : {},
            isLoading : true
        }
    },
    components : {
        Header
    },
    props : ['movieId'],
    methods : {
        handleToBack(){
            //返回前一页
            this.$router.back();
        }
    },
    mounted(){
        console.log( this.movieId );
        this.axios.get(`/ajax/detailmovie?movieId=${this.movieId}`).then((res)=>{
            console.log(res);
            if( res.statusText === 'OK' ){
                this.isLoading = false;
                this.detailMovie = res.data.detailMovie;
                this.$nextTick(()=>{
                    new Swiper(this.$refs.detail_player , {
                        slidesPerView : 'auto',
                        freeMode : true,
                        freeModeSticky: true
                    });
                });
            }
        });
    },
}
</script>

<style scoped>
#detailContrainer{ position: absolute; left:0; top:0; z-index: 100; width:100%; min-height:100%; background:white;}
#detailContrainer.slide-enter-active{ animation:0.5s slideMove;}
@keyframes slideMove{
    0%{ transform : translateX(100%); }
    100%{ transform : translateX(0); }
}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
#content .detail_intro{ padding: 10px;font-size: 18px;}
#content .detail_player{ margin:10px;}

.title{font-size: 20px;margin-bottom: 20px;}

.detail_player .swiper-slide{ width:80px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide2{ width:150px; margin-right: 20px; text-align: center; font-size: 14px;}

.detail_player .photos img{ width:100%; margin-bottom: 5px; border-radius: 10px;border: 2px solid pink;}

.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}

image[lazy=loading] {
  width: 4px;
  height: 30px;
  margin: 15px;
}
.photos li{margin-bottom: 12px;}
</style>


