import React from 'react';
import { connect } from 'react-redux';
import List from 'components/List/List';
import QuestionListItem from 'components/QuestionListItem/QuestionListItem';
import { getTest } from 'redux/selectors/test';

function QuestionList({ questions }) {
  return (
    <List vertical centered>
      {questions.length === 0 ? (
        <h3>Add the first question!</h3>
      ) : (
        questions.map((question, index) => (
          <QuestionListItem key={index} {...question} />
        ))
      )}
    </List>
  );
}

const mapStateToProps = (state) => ({
  questions: getTest(state).questions,
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
