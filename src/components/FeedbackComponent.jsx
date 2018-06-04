import React from 'react';
import { connect } from 'react-redux';
import { Container, Header, Table, Pagination } from 'semantic-ui-react';
import { feedbackAction } from '../_actions/feedback.action';

export class FeedbackComponent extends React.Component {
	constructor(){
		super();
		this.state = {
			activePage: 1,
			limit: 10,
		};
	}

	handlePaginationChange = (e, { activePage }) => {
		this.setState({ activePage });
		this.props.feedbackAction(activePage);
	}


	handlePageTotal = () => {
		return Math.ceil(this.props.feedbackCount / this.state.limit);
	}

	pagination = () => {
		return (
			<div>
				<Pagination
					activePage={this.state.activePage}
					totalPages={this.handlePageTotal()}
					onPageChange={this.handlePaginationChange}
				/>
			</div>
		);
	}

	loadFeedback = () => {
		const feedbacks = this.props.feedback.map((feedback) => {
			return(
				<Table.Row>
					<Table.Cell>{feedback.index}</Table.Cell>
					<Table.Cell>{feedback.submittedBy}</Table.Cell>
					<Table.Cell>{feedback.dateSubmitted}</Table.Cell>
					<Table.Cell>{feedback.type}</Table.Cell>
					<Table.Cell>{feedback.description}</Table.Cell>
				</Table.Row>
			)
		});
		return feedbacks
	}

	componentDidMount(){
		this.props.feedbackAction(this.state.defaultPage);
	}

	render() {
		console.log("state", this.state.feedback);
		return [
			<div className=''>
				<Container>
					<Header className='landing-heading' content='User Feedback' />
						<Table celled>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>Index</Table.HeaderCell>
									<Table.HeaderCell>Submitted by</Table.HeaderCell>
									<Table.HeaderCell>Date Submitted</Table.HeaderCell>
									<Table.HeaderCell>Type</Table.HeaderCell>
									<Table.HeaderCell>Description</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{this.loadFeedback()}
							</Table.Body>
							<Table.Footer>
								<Table.Row>
									<Table.HeaderCell colSpan='5'>
										{this.pagination()}
									</Table.HeaderCell>
								</Table.Row>
							</Table.Footer>
					</Table>
				</Container>
			</div>
		];
	}
}

const mapStateToProps = ({ feedbackReducer }) => {
	const { feedback, feedbackCount } = feedbackReducer;
	return {
		feedback,
		feedbackCount,
	}
}

export default connect(mapStateToProps, { feedbackAction, })(FeedbackComponent);
