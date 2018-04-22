import firebase from 'firebase';

export const checkAuth = (props) =>{

	firebase.auth().onAuthStateChanged(user=>{

		if(user){

			props.history.push({pathname: '/index/employer-dashboard'});
		} else {

			if(props.history.pathname !== '/login'){
				props.history.push({pathname: '/login'});
			}
		}
	});


};
