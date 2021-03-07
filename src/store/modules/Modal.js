export const modal = {
  state: () => ({
    areYouSureOpen: false,
    areYouSureTitle: '',
    areYouSureMessage: '',
    areYouSureAction: '',
    areYouSureNonAction: '',
    errorOpen: false,
    errorMessage: '',
    spinnerOpen: false
  }),
  mutations: {
    OPEN_ARE_YOU_SURE(state, args) {
      state.areYouSureTitle = args.title
      state.areYouSureMessage = args.message
      state.areYouSureAction = args.action
      state.areYouSureNonAction = args.nonAction
      state.areYouSureOpen = true
    },
    CLOSE_ARE_YOU_SURE(state) {
      state.title = ''
      state.message = ''
      state.areYouSureOpen = false
    },
    OPEN_ERROR_ALERT(state, args) {
      state.errorMessage = args.errorMessage
      state.message = true
    },
    CLOSE_ERROR_ALERT(state) {
      state.errorMessage = ''
      state.message = false
    },
    OPEN_SPINNER(state) {
      state.spinnerOpen = true
    },
    CLOSE_SPINNER(state) {
      state.spinnerOpen = false
    }
  },
  actions: {
    openAreYouSure(context, args) {
      /*
            expects: 
                title
                message
                action
                nonAction
        */
      context.commit('OPEN_ARE_YOU_SURE', args)
    },
    closeAreYouSure(context) {
      context.commit('CLOSE_ARE_YOU_SURE')
    },
    openErrorAlert(context, args) {
      context.commit('OPEN_ERROR_ALERT', args)
    },
    closeErrorAlert(context) {
      context.commit('CLOSE_ERROR_ALERT')
    },
    openSpinner(context) {
      context.commit('OPEN_SPINNER')
    },
    closeSpinner(context) {
      context.commit('CLOSE_SPINNER')
    }
  }
}
