import React, { Component } from 'react';
import {
 	Card,
	Button
} from '../elements';
import {Select} from 'grommet';
import LoadingAnimation from '../loading-animation/LoadingAnimation.component';


const DashboardCard = (props) => {
	if(props.type === 'summary') {
		return(
		<Card
			cardHeader={props.header}
			contentClass="o-card-content-no-padding"
			headerIcon={props.headerIcon ? props.headerIcon : ''}
			headerTools={[
				props.headerTools ? props.headerTools :
					<Select placeHolder={props.selectPlaceholder ? props.selectPlaceholder : 'None'}
									multiple={false}
									options={props.selectOptions}
									value={props.selectVal ? props.selectVal : ''}
									onChange={props.selectChange}
					/>
			]}
		>
			<div className="dashboard-card-summary-container">
				{props.content ? props.content : ''}
			{
				props.items.map((item, $index) => {
					$index += 1;
					let previousRow = -1;
					if ( $index % 2 === 0) {
						previousRow+=1;
						console.log(_.slice(props.items, previousRow, $index), $index);
						return (
							<DashboardRow
								key={$index}
								items={_.slice(props.items, previousRow, $index)}
							/>
						);
					} else if ($index%2 !== 0 && $index % 2 !== 0 && $index !== 1 ){
						return (
							<DashboardRow
								key={$index}
								items={_.slice(props.items, previousRow, $index)}
							/>
						);
					}

				})
			}
			</div>
			{props.children}
		</Card>
	);
	} else if(props.type === 'container'){
		return (
			<Card
				noHeader={true}
				contentClass={'o-card-border-'+props.color+props.contentClassName}
			>
				{props.children}
			</Card>
		);
	} else if(props.type === 'containerWithHeader'){
		return(
				<Card
					header={props.header}
					headerTools={[props.headerTools]}
				>
					{props.children}
				</Card>
	);
	} else {
		return (
			<Card
				noHeader={true}
				className={props.className}
				contentClass={'o-card-border-'+props.color+' '+props.contentClassName}
			>
				{props.loading ?  <LoadingAnimation size="small"/> :
				<div>
					<div className="dashboard-card-number">{props.figure}</div>
					<div>{props.name}</div>
					{props.children}
				</div> }
			</Card>
		);
	}
}

export default DashboardCard;

const DashboardRow = (props) => {
	return (
	<div className="dashboard-card-summary-row">
		{ props.items.map((item, $index) => {
			return (
				<DashboardItem
					key={$index}
					name={item.name}
					figure={item.figure}
				/>
			);
			})
		}
	</div>
	);
};

const DashboardItem = (props) => {
		return (
			<span className="dashboard-card-summary-item">
				{props.name}
				<br></br>
				<span className="dashboard-card-summary-number">{props.figure}</span>
			</span>
		);
};