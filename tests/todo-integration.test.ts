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
    // Drop
    // TRUNCATE TABLE TodoModels
  });

  it('Should passed', async () => {
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
});
