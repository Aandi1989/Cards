import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {styled} from '@mui/material/styles';
// import {setCardsPacksCountFromRangeAC} from '../../../bll/packsReducer';
import s from './RangeSlider.module.css'
import {useCallback, useEffect, useState} from 'react';
import {Dispatch} from 'redux';
import {useSelector} from 'react-redux';
// import {RootStateType} from '../../../bll/store';

export type RangeSliderType = {
    // dispatch: Dispatch
    maxCardsCount: number 
    minCardsCount: number 
    onChangeCommitted: (values: number[]) => void
}
const CustomSlider = styled(Slider)({
    color: '#21268F',
    height: 5,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 16,
        width: 16,
        backgroundColor: '#FFFFFF',
        border: '4px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        // padding: 0,
        width: 32,
        height: 24,
        borderRadius: 3,
        // backgroundColor: '#21268F',
        backgroundColor: '#21268F',
        '&:before': {display: 'none'},
    },
});

export const RangeSlider = React.memo((props: RangeSliderType) => {

    // const cardsValuesFromRange = useSelector<RootStateType, number[]>(state => state.packs.cardsValuesFromRange)
    // console.log("RangeSlider")
    const [values, setValues] = useState<number[]>([props.minCardsCount, props.maxCardsCount])
    // console.log("values " + values)
    // console.log("props " + props.minCardsCount, props.maxCardsCount)
    const handleChange = (event: Event, newValue: number | number[]) => {
        if (props.maxCardsCount > 0) {
            setValues(newValue as number[])
        }
    }
    const onChangeCommitted = () => {
        if (props.maxCardsCount > 0) {
            props.onChangeCommitted(values)
        }
    }

    useEffect(() => {
        setValues([props.minCardsCount, props.maxCardsCount])
    }, [props.minCardsCount, props.maxCardsCount])

    return (<div className={s.range}>
            {/*<Box sx={{width: 200}}>*/}

            {/* <div className={s.rangeTitle}><b>Number of cards</b></div> */}
            {/*<div style={{width: "90%"}}>*/}
            <CustomSlider
                getAriaLabel={() => 'Number of cards'}
                value={values}
                onChange={handleChange}
                onChangeCommitted={onChangeCommitted}
                valueLabelDisplay="on"
                min={props.minCardsCount}//цифры
                // max={20}
                max={props.maxCardsCount}
            />
            {/*</div>*/}
            {/*</Box>*/}
        </div>

    );
})