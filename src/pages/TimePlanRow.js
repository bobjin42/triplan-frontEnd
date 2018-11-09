import React, { Component } from 'react';
import { Table, TextArea, Input, Header, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { planDetail, pushPlanDetail } from '../store/actions';

class TimePlanRow extends Component {

  state = {
    start: "",
    end: "",
    notes: "",
    id: "",
    name: ""
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      name: this.props.place.name,
    })
  }

  updatePlan = () => {
    if (this.props.plan.find(plan => plan.id == this.state.id)){
      this.props.planDetail(this.state)
    } else {
      this.props.pushPlanDetail(this.state)
    }
  }

  handleChange = (e, data) => {
    this.setState({
      [data.name]: data.value
    }, this.updatePlan)
  }

  render() {
    console.log(this.state);
    return (
      <Table.Row>
        <Table.Cell>
          <Header as='h4' image>
            <Image src={this.props.place.thumbnail_url}/>
            <Header.Content className="tableimg">
              {this.props.place.name}
            </Header.Content>
          </Header>
        </Table.Cell>
        <Table.Cell>{this.props.place.perex}</Table.Cell>
        <Table.Cell>
          <Input name='start' value={this.state.start} onChange={this.handleChange} icon='clock outline' iconPosition='left' placeholder='Enter your start time...' />
          <Input name='end' value={this.state.end} onChange={this.handleChange} icon='clock' iconPosition='left' placeholder='Enter your end time...' />
        </Table.Cell>
        <Table.Cell><TextArea name='notes' value={this.state.notes} onChange={this.handleChange} autoHeight placeholder='Try adding multiple lines' /></Table.Cell>
      </Table.Row>
    );
  }
}

function mapStateToProps(state) {
  console.log("state.planReducer:",state.planReducer)
  return {
    plan: state.planReducer.plan
  }
}

export default connect(mapStateToProps, { planDetail, pushPlanDetail })(TimePlanRow)
