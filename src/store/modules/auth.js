import axios from "axios"
let timer;

export default {
 state() {
  return {
    accessToken: null,
    userId: null,
    role: null,
    didAutoLogout: false,
    userInfo: null
  }
 },
 actions: {
  async loginTutor(context, payload) {
    const response = await fetch('https://private-tutoring-backend.herokuapp.com/api/tutor/login-tutor', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password
      })
    })

    const responseData = await response.json()
    context.commit('getUserInfo', responseData)

    if (!response.ok) {
      const error = new Error ("Could not log user in 🙏")
      throw error;
    } else {
      console.log(responseData)
    }

    const expiresIn = +responseData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expiresIn;
      
    localStorage.setItem('accessToken', responseData.accessToken)  
    localStorage.setItem('userId', responseData.userId)
    localStorage.setItem('role', responseData.role)
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function() {
       context.dispatch('autoLogout');
    }, expiresIn);


    context.commit('setUser', {
      accessToken: responseData.accessToken,
      userId: responseData.userId,
      role: responseData.role
    });
  },
  async loginAdmin(context, payload) {
    const response = await fetch('https://private-tutoring-backend.herokuapp.com/api/admin/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password
      })
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error ("Could not log user in 🙏")
      throw error;
    } else {
      console.log(responseData)
    }

    const expiresIn = +responseData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expiresIn;
      
    localStorage.setItem('accessToken', responseData.accessToken)  
    localStorage.setItem('userId', responseData.userId)
    localStorage.setItem('role', responseData.role)
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function() {
       context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      accessToken: responseData.accessToken,
      userId: responseData.userId,
      role: responseData.role
    });
    context.commit('getUserInfo', responseData)
  },
  autoLogin(context) {
    const accessToken = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (accessToken) {
      context.commit('setUser', {
        accessToken: accessToken,
        userId: userId,
        role: role
      })
    }
  },
  logout(context) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      accessToken: null,
      userId: null,
      role: null
    })
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
 },
 mutations: {
  setUser(state, payload) {
    state.accessToken = payload.accessToken;
    state.userId = payload.userId;
    state.role = payload.role;
    state.expirationDate = payload.expirationDate;
    state.didAutoLogout = false;
  },
  getUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  setAutoLogout(state) {
    state.didAutoLogout = true;
  }
 },
 getters: {
  accessToken(state) {
   return state.accessToken;
  },
  userInfo(state) {
    return  state.userInfo;
  },
  isAuthenticatedAsTutor(state) {
    return !!state.accessToken && state.role == "tutor";
  },
  isAuthenticatedAsAdmin(state) {
    return !!state.accessToken && state.role == "admin";
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  }
 }
}