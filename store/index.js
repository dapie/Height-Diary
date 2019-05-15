import axios from 'axios'

export const state = () => {
  return {
    authUser: null,
    heights: null,
    leaderboards: null
  }
}

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },
  SET_HEIGHTS: function (state, heights) {
    state.heights = heights
  },
  SET_LEADERBOARDS: function (state, leaderboards) {
    state.leaderboards = leaderboards
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  async login({ commit }, { email, password }) {
    try {
      const { data } = await axios.post('/api/login', { email, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Не верен Email или пароль')
      }
      throw error
    }
  },

  async height({ commit }) {
    try {
      const { data } = await axios.get('/api/height')
      commit('SET_HEIGHTS', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Ошибка')
      }
      throw error
    }
  },

  async addHeight({ commit }, {height}) {
    try {
      const { data } = await axios.post('/api/height', {height})
      commit('SET_HEIGHTS', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error(error.response.data.message)
      }
      throw error
    }
  },

  async leaderboards({ commit }) {
    try {
      const { data } = await axios.get('/api/leaderboards')
      commit('SET_LEADERBOARDS', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error(error.response.data.message)
      }
      throw error
    }
  },

  async register({ commit }, {name, email, password }) {
    try {
      const { data } = await axios.post('/api/register', {name, email, password })
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error(error.response.data.message)
      }
      throw error
    }
  },

  async logout({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  }
}
