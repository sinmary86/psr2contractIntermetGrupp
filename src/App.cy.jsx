import React from 'react'
import App from '../../src/App';

describe('App Component', () => {
  it('renders without crashing', () => {
    cy.mountWithProvider(<App />);
  });
});