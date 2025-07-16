<template>
  <adm-background class="grid-background" :min-ran="-3" :max-ran="3">{{background}}</adm-background>
	<view class="grid-item">
    <slot></slot>
	</view>
  <view class="grid-row">
    <view class="item" v-for="(object, index) in content" :key="index">
      <adm-fill :is-row="true">
        <adm-item :is-row="true" :is-justify="true" :height="height">{{object.item[0]}}</adm-item>
        <adm-item :is-row="true" :is-justify="true" :height="height">{{object.item[1]}}</adm-item>
      </adm-fill>
    </view>
  </view>
  <view id="gridColmn" class="grid-colmn">
    <adm-fill class="item">
      <adm-item v-for="(object, index) in content" :key="index">{{object.type}}</adm-item>
    </adm-fill>
    <adm-fill class="item">
      <adm-item v-for="(object, index) in content" :key="index">{{object.type}}</adm-item>
    </adm-fill>
  </view>
</template>

<script lang="ts">
  import adm from '../sdk/adm';
	export default {
		name: "admGrid",
    props: {
			content: {
				type: Array,
				default: () => [{ type: '藥片', item: ['孟魯司特鈉片', '孟魯司特鈉片'] },{ type: '藥片', item: ['孟魯司特鈉片', '孟魯司特鈉片'] }],
				required: false
			},
			isFill: {
				type: Boolean,
				default: false,
				required: false
			},
			background: {
				type: String,
				default: 'APA-0032为由487个非周期性拟态晶体构成的动态集合体，其外部可见结构以0.5Hz频率在正十二面体与超立方体间拓朴转换。光谱分析揭示内部存在量子化铝镍钴合金核心（质量波动于2.3-17.4g/cm³区间），在第7次XK级现实重建实验中曾记录到其表面析出类拜占庭纹章学符号（现归类为eVELL-32型非典型语素）。接触性活化测试显示，目标会在目标生物前额叶产生持续13毫秒的β-辐射脉冲，引发颞叶持续性情境复现现象。 2024年1月15日事故报告中，D-4421在实验后72小时内准确绘制出西元前539年巴比伦城墙的三维定位座标（准确率98.73%），此能力于暴露120小时后随实验体脑组织玻化消失。',
				required: false
			}
    },
		data() {
			return {
        height: 0
			};
		},
		mounted() {
			this.initDom()
		},
    methods: {
      initDom() {
        const query = uni.createSelectorQuery().in(this)
        query.select('#gridColmn').boundingClientRect()
        query.exec((res) => {
          const [colmnRect] = res
          this.height = colmnRect.width / 2
        })
      },
      initPosition() {
        // TODO: 处理输入的数组结构属性：横向拆分为二维数组，竖向拆分为两个竖向数组。
        // TODO: 重点是一定使其同一行的竖向数组项字数一致，若不一致则填充空项
        // TODO: 动态计算横向间距为竖向每项的高，通过字数计算item高公式：adm.item.wrap.height + adm.item.unit.main * 字数
      }
    }
	}
</script>

<style lang="scss">
.grid-background {
  position: absolute;
  z-index: 0;
}

.grid-item {
  position: absolute;
  z-index: 1;
}

.grid-row {
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;

  .item {
    height: $adm-pss-width-base;
    margin-top: 138.6rpx;
  }
}

.grid-colmn {
  display: flex;
  flex-direction: row;
  position: absolute;
  z-index: 3;

  .item {
    margin-left: 245.63rpx;
  }
}
</style>
