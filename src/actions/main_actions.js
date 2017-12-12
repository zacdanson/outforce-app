

export const handleSidebar = (sidebar) =>{

	return{
		type:'SIDEBAR',
		payload: sidebar
	};
};


export const selectTab = (tab) => {
	return{
		type:'SELECTED_TAB',
		payload: tab
	};
};