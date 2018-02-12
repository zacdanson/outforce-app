

export const handleSidebar = (sidebar) =>{

	return{
		type:'SIDEBAR',
		payload: sidebar
	};
};

export const loading = (status) =>{
	console.log('loadennn - ', status );
	return{
		type:'IS_LOADING',
		payload: status
	};
};

export const loadingAnimation = (status) =>{
	console.log('loadennn - ', status );
	return{
		type:'LOADING',
		payload: status
	};
};


export const selectTab = (tab) => {
	console.log(tab);
	return{
		type:'SELECTED_TAB',
		payload: tab
	};
};