import {fixture} from './text-fixture';
import {UUIDGenerator} from '../src/shared/unique-id';
import request from 'supertest';
import {Timestamp} from '@/shared/timestamp';
import {Todo} from '@/todo/domain/todo';
import {expect} from 'chai';

const insertFakeTodo = async () => {
  const todo = new Todo(
    UUIDGenerator.generateUUID(),
    'Test title',
    new Timestamp(),
    new Timestamp(),
    'Test description'
  );

  await fixture.executeQuery(
    `INSERT INTO public."TodoModels"("uniqueID", "title", "description",
"creationDate", "lastUpdatedAt") VALUES (?, ?, ?, ?, ?);`,
    {
      replacements: [
        todo.id,
        todo.title,
        todo.description,
        todo.creationDate.toString(),
        todo.lastUpdated.toString(),
      ],
    }
  );

  // Ensure todo inserted to DB.
  const insertedTodo = await fixture.executeQuery(
    'SELECT "uniqueID" FROM public."TodoModels" WHERE "uniqueID" = ?',
    {
      replacements: [todo.id],
    }
  );
  expect(insertedTodo[0]).to.be.an('array').to.have.lengthOf(1);
  expect(insertedTodo[0][0]).to.haveOwnProperty('uniqueID', todo.id);

  return todo;
};

describe('CRUD operations tests for TODO', () => {
  before(async () => {
    await fixture.initialize();
  });

  beforeEach(async () => {
    //await fixture.executeQuery('TRUNCATE TABLE TodoModels;');
  });

  it('Get /todo should return all todos', async () => {
    // Arrange
    const {app} = fixture;

    const todo = await insertFakeTodo();

    // Act
    await request(app)
      .get('/todo')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(response => {
        const content = response.body.todos;

        // Assert
        expect(content).to.be.an('array');
        expect(content).to.have.length(1);
        expect(content[0]).to.haveOwnProperty('id', todo.id);
        expect(content[0]).to.haveOwnProperty('title', todo.title);
        expect(content[0]).to.haveOwnProperty('description', todo.description);
        expect(content[0]).to.haveOwnProperty(
          'creationDate',
          todo.creationDate.toString()
        );
        expect(content[0]).to.haveOwnProperty(
          'lastUpdated',
          todo.lastUpdated.toString()
        );
      });
  });
  it('POST /todo should create corresponding todo', async () => {
    // Arrange
    const {app} = fixture;
    const title = 'My Todo Title';
    const description = 'My Todo Description';

    // FIX: We may should not test multiple situations

    // Act
    const response = await request(app)
      .post('/todo')
      .send({title, description})
      .expect('Content-Type', /json/)
      .expect(201);

    // Assert
    const content = response.body.created;
    const id = content.id;

    expect(content.title).to.be.equal(title);
    expect(content.description).to.be.equal(description);

    const createdTodo = await fixture.executeQuery(
      'SELECT * FROM public."TodoModels" WHERE "uniqueID" = ?',
      {replacements: [id]}
    );

    expect(createdTodo[0]).to.be.an('array').to.have.lengthOf(1);
    expect(createdTodo[0][0]).to.haveOwnProperty('title', title);
    expect(createdTodo[0][0]).to.haveOwnProperty('description', description);
    expect(createdTodo[0][0]).to.haveOwnProperty('uniqueID', id);
  });
  it('DELETE /todo should delete corresponding todo', async () => {
    // Arrange
    const {app} = fixture;

    const fakeTodo = await insertFakeTodo();

    // FIX: We may should not test multiple situations

    // Act
    const response = await request(app)
      .delete('/todo')
      .send({id: fakeTodo.id})
      .expect('Content-Type', /json/)
      .expect(200);

    // Assert
    const {deletedTodo} = response.body;

    expect(deletedTodo).to.haveOwnProperty('id', fakeTodo.id);
    expect(deletedTodo).to.haveOwnProperty('title', fakeTodo.title);
    expect(deletedTodo).to.haveOwnProperty('description', fakeTodo.description);

    const queryResult = await fixture.executeQuery(
      'SELECT * FROM public."TodoModels" WHERE "uniqueID" = ?',
      {replacements: [fakeTodo.id]}
    );

    expect(queryResult[0]).to.be.an('array').to.have.lengthOf(0);
  });
  // TODO: DELETE /todo should return not found if Todo not exists

  it('PUT /todo should update todo', async () => {
    // Arrange
    const {app} = fixture;

    const fakeTodo = await insertFakeTodo();

    const updatedTitle = fakeTodo.title + ' updated the title.';
    const updatedDescription = fakeTodo.title + ' updated the description.';

    // Act
    const response = await request(app)
      .put('/todo')
      .send({
        id: fakeTodo.id,
        title: updatedTitle,
        description: updatedDescription,
      })
      .expect('Content-Type', /json/)
      .expect(200);

    const {updatedTodo} = response.body;

    // Assert
    expect(updatedTodo).to.haveOwnProperty('id', fakeTodo.id);
    expect(updatedTodo).to.haveOwnProperty('title', updatedTitle);
    expect(updatedTodo).to.haveOwnProperty('description', updatedDescription);

    // FIX: We may should not test multiple situations

    const queryResult = await fixture.executeQuery(
      'SELECT * FROM public."TodoModels" WHERE "uniqueID" = ?',
      {replacements: [fakeTodo.id]}
    );

    expect(queryResult[0]).to.be.an('array').to.have.lengthOf(1);
    expect(queryResult[0][0]).to.haveOwnProperty('title', updatedTitle);
    expect(queryResult[0][0]).to.haveOwnProperty(
      'description',
      updatedDescription
    );
  });
});
