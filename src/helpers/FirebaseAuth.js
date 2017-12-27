import firebase from 'firebase';

export const checkAuth = (props) =>{

	firebase.auth().onAuthStateChanged(user=>{
		console.log('auth status - ', user);
		if(user){
			console.log(props);
			props.history.push({pathname: '/index/employer-dashboard'});
		} else {
			console.log('not signed in.');
			if(props.history.pathname !== '/login'){
				props.history.push({pathname: '/login'});
			}
		}
	});


};
