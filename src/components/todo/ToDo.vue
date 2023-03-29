<template>
    <div class="todo">
        <div class="todo-header">
            <input type="text" placeholder="请输入你的任务名称，按回车键确认" v-model="title" @keyup.enter="add" />
        </div>
        <ul class="todo-main">
            <li>
                <label>
                    <input type="checkbox"  @change=""/>
                    <span>吃饭</span>
                </label>
                <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
            </li>
            <li>
                <label>
                    <input type="checkbox"  @change=""/>
                    <span>学习</span>
                </label>
                <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
            </li>
        </ul>

        <div class="todo-footer">
            <label>
                <!-- <input type="checkbox" :checked="isAll" @change="checkAll"/> -->
                <input type="checkbox" v-model="isAll" />
            </label>
            <span>
                <span>已完成0</span> / 全部2
            </span>
            <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
        </div>
    </div>
</template>

<script>
    import { nanoid } from 'nanoid'
    export default {
        name: 'ToDo',

        data() {
            return {

            }
        },
        methods: {

        },
    }
</script>

<style scoped>
    .todo {
        margin-left: 10px;
        margin-right: 20px;
    }
    /*header*/
    .todo-header input {
        width: 100%;
        height: 28px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 4px 7px;
    }

    .todo-header input:focus {
        outline: none;
        border-color: rgba(82, 168, 236, 0.8);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
    }

    /*item*/
	li {
		list-style: none;
		height: 36px;
		line-height: 36px;
		padding: 0 5px;
		border-bottom: 1px solid #ddd;
	}

	li label {
		float: left;
		cursor: pointer;
	}

	li label li input {
		vertical-align: middle;
		margin-right: 6px;
		position: relative;
		top: -1px;
	}

	li button {
		float: right;
		display: none;
		margin-top: 3px;
	}

	li:before {
		content: initial;
	}

	li:last-child {
		border-bottom: none;
	}

	li:hover{
		background-color: #ddd;
	}
	
	li:hover button{
		display: block;
	}

    /*main*/
	.todo-main {
		margin-left: 0px;
		border: 1px solid #ddd;
		border-radius: 2px;
		padding: 0px;
	}

	.todo-empty {
		height: 40px;
		line-height: 40px;
		border: 1px solid #ddd;
		border-radius: 2px;
		padding-left: 5px;
		margin-top: 10px;
	}

    /*footer*/
	.todo-footer {
		height: 40px;
		line-height: 40px;
		padding-left: 6px;
		margin-top: 5px;
	}

	.todo-footer label {
		display: inline-block;
		margin-right: 20px;
		cursor: pointer;
	}

	.todo-footer label input {
		position: relative;
		top: -1px;
		vertical-align: middle;
		margin-right: 5px;
	}

	.todo-footer button {
		float: right;
		margin-top: 5px;
	}
    
</style>