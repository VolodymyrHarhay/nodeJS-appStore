import React, { Component } from 'react';
import styles from './login.module.scss';

export default class Login extends Component {
  handleChange = (e) => {
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  render() {
    return (
      <div className={styles.center}>
        <div className={styles.card}>
          <h1>Login</h1>
          <form>
            <input
                className={styles.form__item}
                placeholder="Username goes here..."
                name="username"
                type="text"
                onChange={this.handleChange}
            />
            <input
                className={styles.form__item}
                placeholder="Password goes here..."
                name="password"
                type="password"
                onChange={this.handleChange}
            />
            <input
                className={styles.form__submit}
                value="SUBMIT"
                type="submit"
            />
          </form>
        </div>
      </div>
    );
  }
}