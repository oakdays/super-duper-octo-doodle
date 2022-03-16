import styles from '../styles/Quiz.module.css'

export default function Question(props) {
  function decodedString(str) {
    var elem = document.createElement('textarea');
    elem.innerHTML = str;
    return elem.value
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{`Question ${props.number}`}</h2>
      <p className={styles.description}>{decodedString(props.question)}</p>
      <div>
        <button className={styles.action} onClick={() => props.answerQuestion('✅')}>✅</button>
        <button className={styles.action} onClick={() => props.answerQuestion('❌')}>❌</button>
      </div>
    </div>
  )
}