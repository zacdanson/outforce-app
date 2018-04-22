

export const handleSidebar = (sidebar) =>{

	return{
		type:'SIDEBAR',
		payload: sidebar
	};
};

export const loading = (status) =>{

	return{
		type:'IS_LOADING',
		payload: status
	};
};

export const loadingAnimation = (status) =>{

	return{
		type:'LOADING',
		payload: status
	};
};


export const selectTab = (tab) => {

	return{
		type:'SELECTED_TAB',
		payload: tab
	};
};