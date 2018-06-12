import React, { Component } from 'react';
import ContentLayout from '../layout/ContentLayout';
import { connect } from 'react-redux';
import TextField from '../forms/FormField';
import { reduxForm, Field } from 'redux-form';
import './styles.css';
import * as actions from '../../actions';

class UserSettings extends Component {
  displayUserSettings = () => {
    const { auth, isFetching, errorMessage } = this.props.currentUser;
    if (!isFetching) {
      if (errorMessage.length > 0 && typeof auth === 'string') {
        return <div>{errorMessage}</div>;
      }
      if (typeof auth === 'object') {
        let placeholder = 'http://via.placeholder.com/220x220';
        let userAvatar = auth.avatar ?  auth.avatar.replace('sz=50', 'sz=220') : '';
        return (
          <div className="container">
            <div className="row mb-4 justify-content-between">
              <div className="col-md-4">
                <h2 className="text-center text-nowrap">Profile Settings</h2>
              </div>
            </div>
            <div className="row justify-content-between align-items-start">
              <div className="col-12 col-md-4">
                <img
                  src={userAvatar || placeholder}
                  className="rounded-circle border border-dark img-fluid d-block mx-auto mw-100 pt-1"
                  alt="avatar"
                  width="220px"
                  height="200px"
                />
                <div className="text-center">
                  <button>Update Photo</button>
                </div>
              </div>
              <div className="col-12 col-md-8">
                <form>
                  <Field
                    type="text"
                    name="displayName"
                    component={TextField}
                    label="Display Name"
                  />
                  <Field
                    type="text"
                    name="fullName"
                    component={TextField}
                    label="Name"
                  />
                  <Field
                    type="email"
                    name="email"
                    component={TextField}
                    label="Email"
                  />
                </form>
              </div>
            </div>
          </div>
        );
      }
    }
    return <div />;
  };
  render() {
    return <ContentLayout>{this.displayUserSettings()}</ContentLayout>;
  }
}
function mapStateToProps({ currentUser }) {
  return { currentUser };
}

export default reduxForm({ form: 'userSettingsForm' })(
  connect(
    mapStateToProps,
    actions
  )(UserSettings)
);
