<template>
  <header>
  	<div class="logo">
        <h1 class="title">Rostik</h1>
    </div>
    <ul class="nav">
    	<li v-bind:class="{active: active == 1}">
    		<nuxt-link to='/diary'>
    			Дневник
    		</nuxt-link>
    	</li>
    	<li v-bind:class="{active: active == 2}">
    		<nuxt-link to='/leaderboards'>
    			Топ-10
    		</nuxt-link>
    	</li>
    	<li>
    		<nuxt-link to='/'>
    			Выход
    		</nuxt-link>
    	</li>
    </ul>
  </header>
</template>

<script>
export default {
    props: ['active']
}
</script>

<style>
header{
  width: 100%;
  height: 50px;
}
.title{
	font-size: 32px;
	color: #2329D6;
	display: inline-block;
	line-height: 50px;
}
.logo{
	display: inline-block;
}
.nav{
	float: right;
}

.nav li{
	display: inline-block;
	line-height: 50px;
	padding: 0px 10px;
}

.nav a{
	border-bottom: 1px solid #FAFAFF;
	transition: all .3s ease-in;
	padding: 5px 0px;
}

.nav a:hover, .nav li.active a{
	border-bottom: 1px solid #2329D6;
	transition: all .3s ease-in;
}

</style>
