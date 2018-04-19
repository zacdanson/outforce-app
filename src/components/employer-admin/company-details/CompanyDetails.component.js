import CompanyDetailsForm from './CompanyDetailsForm.component';

const CompanyDetails = (props) => {
	return(
			<CompanyDetailsForm
				loading={props.loading}
				companyDetails={props.companyDetails}
				saveCompanyDetails={(companyDetails)=>props.saveCompanyDetails(companyDetails)}
				uploadCompanyLogo={(companyId, file, filename)=>props.uploadCompanyLogo(companyId, file, filename)}
			/>
	);
};

export default CompanyDetails;