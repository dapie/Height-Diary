export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.authUser) {
    return redirect('/login')
  } else if(!store.state.authUser.isAdmin){
  	return redirect('/diary')
  }
}