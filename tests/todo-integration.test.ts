import {fixture} from './text-fixture';
import {UUIDGenerator} from '../src/shared/unique-id';
import request from 'supertest';
import {Timestamp} from '@/shared/timestamp';
import {Todo} from '@/todo/domain/todo';
import {expect} from 'chai';

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

    const todo = new Todo(
      UUIDGenerator.generateUUID(),
      'Test title',
      new Timestamp(),
      new Timestamp(),
      'Test description'
    );

    await fixture.executeQuery(
      `INSERT INTO TodoModels ('uniqueID', 'title', 'description',
'creationDate', 'lastUpdatedAt') VALUES (?, ?, ?, ?, ?)`,
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
      'SELECT * FROM TodoModels WHERE uniqueID = ?',
      {replacements: [id]}
    );

    expect(createdTodo[0]).to.be.an('array').to.have.lengthOf(1);
    expect(createdTodo[0][0]).to.haveOwnProperty('title', title);
    expect(createdTodo[0][0]).to.haveOwnProperty('description', description);
    expect(createdTodo[0][0]).to.haveOwnProperty('uniqueID', id);
  });
});
