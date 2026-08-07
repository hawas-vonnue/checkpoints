# Task manager

## Design patterns used

### Store

- Store is used as a state manager and an observer.
- When the state of store is changed using dispatch we call all the listeners attached to the store.
- Used store because this is a SPA application and to track changes across components using global varibales or calling rendering functions from every event handler is needed so the better approach is to use a store to manage the state and to call listeners according to the change in state of Store.

## What to improve given more time

- Design of the whole page
- Include more test cases
- Work on accessibility more
- to include more details on Loading and error state

## How to run test

- install jest using `npm i jest`
- run `npx jest .`
