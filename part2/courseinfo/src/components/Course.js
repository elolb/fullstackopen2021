import React from 'react'


const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((sum, parts) => sum + parts.exercises, 0)
  return (
    <strong>Number of exercises {sum}</strong>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

export default Course