import React from 'react';
import { connect } from 'react-redux';
import List from 'components/List/List';
import QuestionListItem from 'components/QuestionListItem/QuestionListItem';
import { getTest } from 'redux/selectors/test';
import { sendRequestToDeleteQuestion } from 'redux/actions/actionCreators';

function QuestionList({ questions, onDelete }) {
  return (
    <List vertical centered>
      {questions.length === 0 ? (
        <h3>Add the first question!</h3>
      ) : (
        questions.map((question, index) => (
          <QuestionListItem
            key={index}
            {...question}
            onDelete={onDelete.bind(this, question.id)}
          />
        ))
      )}
    </List>
  );
}

const mapStateToProps = (state) => ({
  testId: getTest(state).id,
  questions: getTest(state).questions,
});

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => dispatch(sendRequestToDeleteQuestion(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
