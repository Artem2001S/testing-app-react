import { schema, normalize, denormalize } from 'normalizr';

const answerSchema = new schema.Entity('answers', {});

const questionSchema = new schema.Entity('questions', {
  answers: [answerSchema],
});

const testSchema = new schema.Entity('tests', {
  questions: [questionSchema],
});

export function normalizeTests(tests) {
  return normalize(tests, [testSchema]);
}

export function normalizeTest(test) {
  return normalize(test, testSchema);
}

export function denormalizeTest(normalizedTest) {
  return denormalize(
    normalizedTest.result,
    testSchema,
    normalizedTest.entities
  );
}

export function denormalizeTests(normalizedTests) {
  return denormalize(
    normalizedTests.result,
    [testSchema],
    normalizedTests.entities
  );
}
