import React, { Component } from 'react';
import styles from './login.module.scss';

export default class Login extends Component {
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className={styles.center}>
        <div className={styles.card}>
          <h1>Login</h1>
          <form>
            <input
              className={styles.form__item}
              placeholder="Email goes here..."
              name="email"
              type="email"
              onChange={this.handleChange}
            />
            <input
              className={styles.form__item}
              placeholder="Password goes here..."
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <button type='button' className={styles.form__submit}>
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    );
  }
}