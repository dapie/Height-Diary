<template>
  <header>
  	<div class="logo">
        <h1 class="title">Rostik</h1>
    </div>
    <ul class="nav">
    	<li class="full" v-bind:class="{active: active == 1}" v-if="this.$store.state.authUser.isAdmin">
    		<nuxt-link to='/admin'>
    			Панель администратора
    		</nuxt-link>
    	</li>
    	<li v-bind:class="{active: active == 2}">
    		<nuxt-link to='/diary'>
    			Дневник
    		</nuxt-link>
    	</li>
    	<li v-bind:class="{active: active == 3}">
    		<nuxt-link to='/leaderboards'>
    			Топ-10
    		</nuxt-link>
    	</li>
    	<li>
    		<a href="#" @click="logout">
    			Выход
    		</a>
    	</li>
    </ul>
  </header>
</template>

<script>
export default {
    props: ['active'],
    methods: {
	    async logout() {
	      try {
	        await this.$store.dispatch('logout')
	        this.$router.replace({ path: '/login'})
	      } catch (e) {
	        console.log(e.message)
	      }
	    }
	}
}
</script>

<style>
header{
  width: 100%;
  height: 50px;
}
header .title{
	font-size: 32px;
	color: #2329D6;
	display: inline-block;
	line-height: 50px;
}
header .logo{
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

@media screen and (max-width: 680px) {
	header .title{
		display: block;
		text-align: center;
	}

	header .logo{
		width: 100%;
	}
	.nav{
		display: block;
		float: left;
		width: 100%;
	}

	.nav li{
		width: 32%;
		padding: 0;
		text-align: center;
	}

	header{
		padding: 20px 0px;
	}
	.full {
		display: block !important;
		width: 100% !important;
	}
}

</style>
