import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Card, Grid } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'
import TravelPlan from './TravelPlan';
import { img } from '../icon/profile.jpeg';
import { addTravelPlan } from '../store/actions'

class Profile extends Component {

  componentDidMount() {
    fetch(`http://localhost:3001/api/v1/users/${this.props.id}`)
    .then(res => res.json())
    .then(data => this.props.addTravelPlan(data.trips.filter(travelPlan => {
        return(travelPlan.plans.length !== 0 && travelPlan.plans[0].end_time)
      })))
  }

  render() {
    const { name, email_address, usertravelPlan } = this.props
    return (
      <Grid columns={2} padded='vertically'>
        <Grid.Column width={6}>
          <div className="trip_Plan">
            <TravelPlan travelPlan={usertravelPlan} startDate={this.props.startDate} endDate={this.props.endDate} targetPlace={this.props.targetPlace}/>
          </div>
        </Grid.Column>
        <Grid.Column width={10}>
          <div className="opcailty">
            <div className="profile_card">
              <Card className="profile">
                <Card.Content>
                  <Card.Header>{name}</Card.Header>
                  <Card.Description>{email_address}</Card.Description>
                </Card.Content>
              </Card>
            </div>
          </div>
        </Grid.Column>
      </Grid>
    );
  }

}

function mapStateToProps(state) {
  return{
    username: state.usersReducer.user.username,
    name: state.usersReducer.user.name,
    email_address: state.usersReducer.user.email_address,
    id: state.usersReducer.user.id,
    usertravelPlan: state.usersReducer.usertravelPlan,
    startDate: state.tripReducer.startDate,
    endDate: state.tripReducer.endDate,
    targetPlace: state.tripReducer.targetPlace
  }
}



export default withAuth(connect(mapStateToProps, {addTravelPlan})(Profile))
