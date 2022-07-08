export const changingDate=(date:string)=>{
    let changedDate= date.split('-')
    let year=changedDate[0].slice(0,4)
    let month=changedDate[1]
    let currentDate=changedDate[2].slice(0,2)

    return `${year}.${month}.${currentDate}`
}