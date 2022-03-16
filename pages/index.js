import Router from 'next/router'

export default function Home() {
  return (
    <button onClick={() => Router.push('/quiz')}>Quiz</button>
  )
}
