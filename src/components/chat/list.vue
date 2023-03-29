<template>
	<div id="list">
		<ul style="padding-left: 0px; ">
			<!-- 循环admin，激活当前id是否等于当前session的id：currentSession -->
			<li v-for="item in admins"
				:class="{active: currentSession? item.username === currentSession.username: false, }"
				v-on:click="changeCurrentSession(item)">
				<!-- :class="[item.id === currentSession ? 'active':'']" -->
				<img class="avatar" :src="item.userFace" :alt="item.name" />
				<p class="name">{{ item.name }}</p>
				<el-badge :is-dot="isDot[user.username + '#' +item.username]"  class="new"></el-badge>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		name: "list",
		data() {
			return {
				user: JSON.parse(window.sessionStorage.getItem("user"))
			};
		},
		computed: mapState([
			// index中的admin[]
			"admins",
			"currentSession",
			'isDot'
		]),
		methods: {
			changeCurrentSession: function (id) {
				this.$store.commit("changeCurrentSessionId", id);
			},
		},
	};
</script>

<style lang="scss" scoped>
	#list {
		max-height: 100%;
		overflow-y: scroll;
		


		li {
			padding: 10px 15px;
			border-bottom: 1px solid #292c33;
			cursor: pointer;
			

			&:hover {
				background-color: rgba(255, 255, 255, 0.03);
			}
		}

		li.active {
			/*注意这个是.不是冒号:*/
			background-color: rgba(255, 255, 255, 0.1);
		}

		.avatar {
			border-radius: 2px;
			width: 30px;
			height: 30px;
			vertical-align: middle;
		}

		.name {
			display: inline-block;
			margin-left: 15px;
			margin-top: 0px;
			margin-bottom: 0px;
			
		}
		.new {
			margin-left: 20px;
		}
	}
</style>