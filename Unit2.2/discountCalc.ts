import { boolean } from "yargs";

function discountCalc(senior: boolean, vetOrRes: boolean, members: boolean){
    if (senior && vetOrRes && members) return 0.25;
    if ((senior && members) || (vetOrRes && members)) return 0.15
    if (senior || vetOrRes || members) return 0.10
    return 0
}
    console.log("all three discounts work", discountCalc(true, true, true))
    console.log("senior and member") , discountCalc(true, false, true)
    console.log("VetOrRes works") , discountCalc(false, false, true)