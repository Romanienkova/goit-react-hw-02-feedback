import React, { Component } from 'react';

import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';
import Section from './Section/Section';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback() {
    let total = Object.values(this.state).reduce((sum, elem) => {
      return sum + elem;
    }, 0);
    return total;
  }

  countPositiveFeedbackPercentage() {
    let total = this.countTotalFeedback();
    let positive = Math.round((this.state.good / total) * 100);
    return positive;
  }

  onLeaveFeedback = name => {
    this.setState(prevState => {
      return { [name]: prevState[name] + 1 };
    });
  };

  render() {
    const { good, neutral, bad } = this.state;

    let total = this.countTotalFeedback();

    return (
      <main>
        <Section title="Please Leave Feedback">
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>

        {total ? (
          <Section title="Statistics">
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={total}
              positivePercentage={this.countPositiveFeedbackPercentage() || 0}
            />
          </Section>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </main>
    );
  }
}
