import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Form, Button, Segment } from 'semantic-ui-react'
import TimePlanRow from './TimePlanRow';
import { updatePlan } from '../store/actions';
import { withRouter } from 'react-router';

class TimePlan extends Component {

  handleSubmit = () => {
    this.props.history.push('/profile')
    this.props.updatePlan(this.props.plan)
  }

  render() {
    return (
        <Segment className="planform">
          <Form onSubmit={this.handleSubmit} className="timeplantable">
            <Table selectable fixed basic='very' celled collapsing>
              <Table.Header>
                <Table.Row className="tablerow">
                  <Table.HeaderCell width={5}>Name</Table.HeaderCell>
                  <Table.HeaderCell width={5}>Description</Table.HeaderCell>
                  <Table.HeaderCell width={3}>Schedual</Table.HeaderCell>
                  <Table.HeaderCell width={3}>notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.planIns.map(plan => {
                  return <TimePlanRow tripId={this.props.tripId} plan_id={plan.id} place={plan.location} key={plan.id} id={plan.id} />
                })}
              </Table.Body>
            </Table>
            <Button type="submit" className="detailbtn" >Confirm my Plan</Button>
          </Form>
        </Segment>
    );
  }
}

function mapStateToProps(state) {
  return{
    schedualPlaces: state.placeReducer.schedualPlaces,
    places: state.placeReducer.places,
    plan: state.planReducer.plan,
    tripId: state.placeReducer.tripId,
    user: state.usersReducer.user,
    planIns: state.planReducer.planIns
  }
}

export default connect(mapStateToProps, { updatePlan })(withRouter(TimePlan))
