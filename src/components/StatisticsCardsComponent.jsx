import React from 'react';
import CardComponent from './CardComponent';
import '../_css/StatisticsCardsComponent.css'

const StatisticsCardsComponent = (props) => {

    return (
        <div >
            <CardComponent statistics={props.statistics}/>
            <CardComponent statistics={props.statistics}/>
            <CardComponent statistics={props.statistics}/>
            <CardComponent statistics={props.statistics}/>
        </div>

    )
}

export default StatisticsCardsComponent;