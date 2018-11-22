import contract from 'truffle-contract'
import TodoListContract from '@contracts/TodoList.json'

const TodoListLogic = {

  async init () {
    this.contract = contract(TodoListContract)
    this.contract.setProvider(window.web3.currentProvider)
    this.instance = await this.contract.deployed()
    return this.instance
  },

  async addTodo (content) {
    return await this.instance.addTodo(
      content,
      {from: window.web3.eth.accounts[0]}
    )
  },

  async markTodoAsCompleted (todoId) {
    return await this.instance.markTodoAsCompleted(
      todoId,
      {from: window.web3.eth.accounts[0]}
    )
  },
  timeConverter (unixTimeStamp) {
    var a = new Date(unixTimeStamp * 1000)
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var year = a.getFullYear()
    var month = months[a.getMonth()]
    var date = a.getDate()
    var hour = a.getHours()
    var min = a.getMinutes()
    var sec = a.getSeconds()
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
    return time
  },
  async returnAllTodos () {
    let numOfTodos = 0
    let todoListStruct = []
    const FIELD_IDS = 0
    const FIELD_CONTENTS = 1
    const FIELD_OWNERS = 2
    const FIELD_ISCOMPLETEDS = 3
    const FIELD_TIMESTAMPS = 4
    let numTodos = await this.instance.lastIds.call(window.web3.eth.accounts[0])
    numOfTodos = numTodos.toNumber()
    const todoItems = Array.from(Array(numOfTodos).keys())
    let todoList = await this.instance.returnAllTodos.call(
      todoItems, {from: window.web3.eth.accounts[0]}
    )
    for (let i = 0; i < numOfTodos; i++) {
      let todo = {
        ids: todoList[FIELD_IDS][i].toNumber(),
        contents: window.web3.toUtf8(todoList[FIELD_CONTENTS][i]),
        owners: todoList[FIELD_OWNERS][i],
        isCompleteds: todoList[FIELD_ISCOMPLETEDS][i],
        timestamps: this.timeConverter(todoList[FIELD_TIMESTAMPS][i].toNumber())
      }
      todoListStruct.push(todo)
    }
  }
}

export default TodoListLogic
