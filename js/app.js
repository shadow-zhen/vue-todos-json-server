// 在这里, 编写你的vue代码
(function () {
  new Vue({
    el: '.todoapp',
    data: {
      todoName: '',
      todos: [],
      now: -1
    },
    //进入页面，尽快发送ajax请求，但是不能早于created
    created () {
      this.render()
    },
    methods: {
      //渲染页面发送ajax请求
      render () {
        axios({
          method: 'get',
          //_sort：以什么排序，_order：降序（desc）还是升序（asc）
          url: 'http://localhost:3000/todos?_sort=id&_order=desc'
        }).then(
          res => {
            // console.log(res)
            this.todos = res.data
          }
        )
      },
      //添加一项todo
      addTodo () {
        axios({
          method: 'post',
          url: 'http://localhost:3000/todos',
          data: {
            todoName: this.todoName,
            state: false
          }
        }).then(res => {
          this.render()
          this.todoName = ''
        })
      },
      //删除todo
      delTodo (id) {
        axios({
          method: 'delete',
          url: `http://localhost:3000/todos/${id}`
        }).then(res => this.render())
      },
      //点击前面的按钮，修改状态
      changeSate (id, state) {
        axios({
          method: 'patch',
          url: `http://localhost:3000/todos/${id}`,
          data: { state }
        }).then(
          res => {
            this.render()
          }
        )
      },
      //展示修改框
      showInp (id) {
        this.now = id
      },
      //按enterr键，修改todoName
      changeTodoName (id, todoName) {
        axios({
          method: 'patch',
          url: `http://localhost:3000/todos/${id}`,
          data: { todoName }
        }).then(
          res => {
            this.now = -1
            this.render()
          }
        )
      }
    },
    computed: {
      leftCount () {
        return this.todos.filter(item => !item.state).length
      },
      isShowFooter () {
        return this.todos.length > 0
      }
    }
  })
})()