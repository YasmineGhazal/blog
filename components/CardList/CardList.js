import React from 'react';
import styles from './cardList.module.css';
import Card from '../Card/Card';

const CardList = ({ posts }) => {
    return (
        <div className={styles.cards}>
            {(posts||[]).map((post => <Card key={post._id} cardInfo={post}></Card>))}
        </div>
    )
}

export default CardList;
