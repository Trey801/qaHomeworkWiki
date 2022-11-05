var firstList: Array<number> = [12, 15]

let secondList: Array<string> =[
    "Elephant",
    "Lion",
    "Polar Bear",
    "Monkeys"
]

firstList.push(12345)
firstList.push(456788)
firstList.push(4534674668)

console.log("the first list is:", firstList)
console.log("The second list is:", secondList);

console.log("should be 12345", firstList[2]);
console.log("Should be Elephant", secondList[0]);
