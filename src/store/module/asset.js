export default {
  state: {
    res_data: {}
  },
  getters: {
    get_res_data: (state) => {
      return state.res_data
    }
  },
  mutations: {
    change_res_data (state,res) {
      state.res_data=res
    }
  },
  actions: {
    addCount(context) {
      // 可以包含异步操作
      // context 是一个与 store 实例具有相同方法和属性的 context 对象
    }
  }
}
