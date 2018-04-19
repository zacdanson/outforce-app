

const LoadingAnimation = (props) => {
	return(
		<div className="loading-animation-container">
			<div className={props.size==='small' ? "lds-facebook-sm" : "lds-facebook"}><div></div><div></div><div></div></div>
		</div>
	);
};

export default LoadingAnimation;
