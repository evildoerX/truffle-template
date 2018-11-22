<template>
  <div class="todolist">
    <Form ref="formInline" :model="form" inline>
        <FormItem prop="user">
            <Input type="text" v-model="form.todo" placeholder="Username"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="addtodo">Add Todo</Button>
        </FormItem>
    </Form>
    <h3> TodoList </h3>
    <Table :columns="columns1" :data="todolist"></Table>
  </div>
</template>

<script>
import TodoListLogic from '../abi/todolist'
export default {
  name: 'addtodo',
  data () {
    return {
      form: {
        todo: undefined
      },
      todolist: [],
      columns1: [
        {
          title: 'Ids',
          key: 'ids'
        },
        {
          title: 'Todo Contents',
          key: 'contents'
        },
        {
          title: 'Owner',
          key: 'owners'
        },
        {
          title: 'Unix timestamp',
          key: 'timestamps'
        },
        {
          title: 'isCompleted',
          key: 'isCompleteds',
          align: 'center',
          render: (h, params) => {
            let dataStates = params.row.isCompleteds
            if (!dataStates) {
              return h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.markAsCompleted(params.row.isCompleteds)
                  }
                }
              }, 'Mark as Done')
            } else {
              return h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                }
              }, 'Completed')
            }
          }
        }
      ]
    }
  },
  async beforeCreate () {
    await TodoListLogic.init()
    await this.returnAllTodos()
  },
  methods: {
    async addtodo () {
      if (typeof this.form.todo !== 'undefined' && this.form.todo !== '') {
        await TodoListLogic.addTodo(this.form.todo)
        await this.returnAllTodos()
      }
    },
    async markAsCompleted (todoId) {
      await TodoListLogic.markTodoAsCompleted(todoId, window.web3.eth.accounts[0])
      await this.returnAllTodos()
    },
    async returnAllTodos () {
      let _todoList = await TodoListLogic.returnAllTodos(window.web3.eth.accounts[0])
      this.todolist = _todoList
    }
  }
}
</script>

<style scoped>
</style>