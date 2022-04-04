import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png'
import leftArrowImage from './assets/leftarrow.png'

import { Griditem } from './components/GridItem';

import { levels, calculateImc } from './helpers/imc';

const App = () => {
  const [heightField, setHeightField] = useState (0);
  const [weightField, setWeightField] = useState(0);
  const [toShow, setToShow] = useState(null);

  const handleCalculateButton = () => {
    if(heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    }else{
      alert('Digite todos os campos.');
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return(
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} width={150}></img>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC</h1>
          <p>IMC é a sigle para Índice de Massa Corpórea, parâmetro adotado pela Organizalção Mundial da Saúde para calcular o peso ideal de cada pessoa.</p>
          <input
            type='number'
            placeholder='Digite a sua altura. Ex: 1.5 (em metros)'
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false} >
          </input>
          <input
            type='number'
            placeholder='Digite o seu peso. Ex: 75.5 (em Kg)'
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false} >
          </input>

          <button onClick={handleCalculateButton} disabled={toShow ? true : false} >Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
          <div className={styles.grid}>
            {levels.map((item, key) => (
              <Griditem key={key} item={item} />
            ))}
          </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt="" width={25} />
              </div>
            <Griditem item={toShow} />
            </div>
          }
        </div>
      </div>

    </div>
  );
}

export default App;