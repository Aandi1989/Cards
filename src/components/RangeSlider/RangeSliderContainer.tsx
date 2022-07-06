import * as React from 'react';
// import {setCardsPacksCountFromRangeAC} from '../../../bll/packsReducer';
// import {useCallback} from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import {RangeSlider} from './RangeSlider';
// import { AppRootStateType } from '../../Store/store';



// export const RangeSliderContainer = React.memo(() => {
//     const dispatch = useDispatch()
//     const maxCardsCount = useSelector<AppRootStateType, number>(state => state.packs.maxCardsCount)
//     const minCardsCount = useSelector<AppRootStateType, number>(state => state.packs.minCardsCount)


//     const onChangeCommitted = useCallback((values: number[]) => {
//         dispatch(setCardsPacksCountFromRangeAC(values))
//     }, [dispatch])

//     return (<RangeSlider
//             onChangeCommitted={onChangeCommitted}
//             maxCardsCount={maxCardsCount}
//             minCardsCount={minCardsCount}
//         />
//     );
// })