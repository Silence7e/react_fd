/**********************************商业贷款金额计算部分********************************************/
/*
 综合计算
 */
/*
 yearPeriad:总期数(月)[商业贷款]
 money:本金[商业贷款 单位元]
 monthInterest:月利息[商业贷款 格式:x.xxxxxx 小数点后六位]
 money1:本金[公积金 单位元]
 monthInterest1:月利息[公积金 格式x.xxxxxx 小数点后六位]
 typeInterest:还息类型[0等额本金/1等额本息]
 typeCal:计算类型[0商业贷款/1公积金贷款/2组合贷款]
 */
export function CalLoan(yearPeriad, money, monthInterest, yearPeriad1, money1, monthInterest1, typeInterest, typeCal=2) {

    let HouseLoanObject = {};
    if (typeInterest === 0) {
        switch (typeCal) {
            case 0:
                HouseLoanObject = CalAverageCapitalComm(yearPeriad, money, monthInterest);
                break;
            case 1:
                HouseLoanObject = CalAverageCapitalComm(yearPeriad1, money1, monthInterest1);
                break;
            case 2:
                let HouseLoanObject1 = CalAverageCapitalComm(yearPeriad, money, monthInterest);
                let HouseLoanObject2 = CalAverageCapitalComm(yearPeriad1, money1, monthInterest1);
                HouseLoanObject.BusInterest = HouseLoanObject1.Result;
                HouseLoanObject.AccuInterest = HouseLoanObject2.Result;
                HouseLoanObject.Result = HouseLoanObject1.Result + HouseLoanObject2.Result;
                HouseLoanObject.ResultCount = HouseLoanObject1.ResultCount + HouseLoanObject2.ResultCount;
                HouseLoanObject.MaxPayment = HouseLoanObject1.MaxPayment + HouseLoanObject2.MaxPayment;
                HouseLoanObject.MaxInterest = HouseLoanObject1.MaxInterest + HouseLoanObject2.MaxInterest;

                let houseLoan = {};
                let houseLoanArray = new Array();
                let maxYearPeriad = Math.max(yearPeriad, yearPeriad1);
                for (let i = 1; i <= maxYearPeriad; i++) {
                    houseLoan =
                    {
                        ReplyPrincipalIntreest: (HouseLoanObject1.HouseLoan[i - 1]?HouseLoanObject1.HouseLoan[i - 1].ReplyPrincipalIntreest:0)+ (HouseLoanObject2.HouseLoan[i - 1]?HouseLoanObject2.HouseLoan[i - 1].ReplyPrincipalIntreest:0),
                        ReplyInterest: (HouseLoanObject1.HouseLoan[i - 1]?HouseLoanObject1.HouseLoan[i - 1].ReplyInterest:0) + (HouseLoanObject2.HouseLoan[i - 1]?HouseLoanObject2.HouseLoan[i - 1].ReplyInterest:0),
                        ReplyPrincipal: (HouseLoanObject1.HouseLoan[i - 1]?HouseLoanObject1.HouseLoan[i - 1].ReplyPrincipal:0) + (HouseLoanObject2.HouseLoan[i - 1]? HouseLoanObject2.HouseLoan[i - 1].ReplyPrincipal:0),
                        SurplusPrincipal: (HouseLoanObject1.HouseLoan[i - 1]?HouseLoanObject1.HouseLoan[i - 1].SurplusPrincipal:0) + (HouseLoanObject2.HouseLoan[i - 1]?HouseLoanObject2.HouseLoan[i - 1].SurplusPrincipal:0)
                    };
                    houseLoanArray.push(houseLoan);
                }
                HouseLoanObject.HouseLoan = houseLoanArray;
                HouseLoanObject.difference = (houseLoanArray[0].ReplyPrincipalIntreest - houseLoanArray[1].ReplyPrincipalIntreest).toFixed(2);
                break;
        }
    }
    else {
        switch (typeCal) {
            case 0:
                HouseLoanObject = CalAverageCapitalPlusInterestComm(yearPeriad, money, monthInterest);
                break;
            case 1:
                HouseLoanObject = CalAverageCapitalPlusInterestComm(yearPeriad, money1, monthInterest1);
                break;
            case 2:
                let HouseLoanObject1 = CalAverageCapitalPlusInterestComm(yearPeriad, money, monthInterest);
                let HouseLoanObject2 = CalAverageCapitalPlusInterestComm(yearPeriad1, money1, monthInterest1);
                HouseLoanObject.BusInterest = HouseLoanObject1.Result;
                HouseLoanObject.AccuInterest = HouseLoanObject2.Result;
                HouseLoanObject.Result = HouseLoanObject1.Result + HouseLoanObject2.Result;
                HouseLoanObject.ResultCount = HouseLoanObject1.ResultCount + HouseLoanObject2.ResultCount;
                HouseLoanObject.MonthPayment = HouseLoanObject1.MonthPayment + HouseLoanObject2.MonthPayment;
                HouseLoanObject.MaxPayment = HouseLoanObject1.MaxPayment + HouseLoanObject2.MaxPayment;
                HouseLoanObject.MaxInterest = HouseLoanObject1.MaxInterest + HouseLoanObject2.MaxInterest;

                let houseLoan = {};
                let houseLoanArray = new Array();

                for (let i = 1; i <= yearPeriad; i++) {
                    houseLoan =
                    {
                        ReplyPrincipalIntreest: (HouseLoanObject1.HouseLoan[i - 1]?HouseLoanObject1.HouseLoan[i - 1].ReplyPrincipalIntreest:0) + (HouseLoanObject2.HouseLoan[i - 1]?HouseLoanObject2.HouseLoan[i - 1].ReplyPrincipalIntreest:0),
                        ReplyInterest: (HouseLoanObject1.HouseLoan[i - 1]?HouseLoanObject1.HouseLoan[i - 1].ReplyInterest:0) + (HouseLoanObject2.HouseLoan[i - 1]?HouseLoanObject2.HouseLoan[i - 1].ReplyInterest:0),
                        ReplyPrincipal: (HouseLoanObject1.HouseLoan[i - 1]?HouseLoanObject1.HouseLoan[i - 1].ReplyPrincipal:0) + (HouseLoanObject2.HouseLoan[i - 1]?HouseLoanObject2.HouseLoan[i - 1].ReplyPrincipal:0),
                        SurplusPrincipal: (HouseLoanObject1.HouseLoan[i - 1]?HouseLoanObject1.HouseLoan[i - 1].SurplusPrincipal:0) + (HouseLoanObject2.HouseLoan[i - 1]?HouseLoanObject2.HouseLoan[i - 1].SurplusPrincipal:0)
                    };
                    houseLoanArray.push(houseLoan);
                }

                HouseLoanObject.HouseLoan = houseLoanArray;
                break;
        }
    }
    /*
     BusInterest:组合计算商业贷款利息总额
     AccuInterest：组合计算公积金贷款利息总额
     Result:利息总额
     ResultCount:累计还款总额
     MonthPayment:每月月供
     MaxPayment:最高月供
     MaxInterest:最高利息
     HouseLoan:累计偿还利息集合
     */
    return HouseLoanObject;
}

/*
 通用等额本金计算规则
 利息总额=(总期数+1)*本金*月利率/2
 累计还款总额=本金+利息总额
 最高月供=（本金/总期数）+（本金-0）*月利息
 最高月付利息=本金*月利息^1
 */
/*
 yearPeriad:总期数(月)
 money:本金[元]
 monthInterest:月利率
 */
export function CalAverageCapitalComm(yearPeriad, money, monthInterest) {
    /*商贷利息总额=（总期数(月)+1）* 本金 *(月利率)/2 */
    let result = (yearPeriad + 1) * money * monthInterest / 2;
    result = Math.abs(result.toFixed(2));

    /*累计还款总额=利息+本金*/
    let resultCount = parseFloat(result.toFixed(2)) + parseFloat(money);
    resultCount = Math.abs(resultCount);

    /*最高月供=(本金/总期数(月))+(本金-0)*月利息*/
    let maxPayment = (money / yearPeriad) + (money - 0) * monthInterest;
    maxPayment = Math.abs(maxPayment.toFixed(2));

    /*最高利息=本金*(年利率/12)^1*/
    let maxInterest = money * Math.pow(monthInterest, 1);
    maxInterest = Math.abs(maxInterest.toFixed(2));

    let houseLoan = {};
    let houseLoanArray = new Array();
    for (let i = 1; i <= yearPeriad; i++) {
        let replyPrincipalIntreest = (i !== 1 ? ((money - (money / yearPeriad) * (i - 1)) * monthInterest) + (money / yearPeriad) : maxPayment); //偿还本息
        let replyInterest = (i !== 1 ? ((money - (money / yearPeriad) * (i - 1)) * monthInterest) : maxInterest); //偿还利息
        let replyPrincipal = money / yearPeriad; //偿还本金
        let surplusPrincipal = money - (money / yearPeriad) * i; //剩余本金
        houseLoan = { ReplyPrincipalIntreest: replyPrincipalIntreest, ReplyInterest: replyInterest, ReplyPrincipal: replyPrincipal, SurplusPrincipal: surplusPrincipal };
        houseLoanArray.push(houseLoan);
    }
    let HouseLoanObject = {};
    HouseLoanObject.Result = result;
    HouseLoanObject.ResultCount = resultCount;
    HouseLoanObject.MaxPayment = maxPayment;
    HouseLoanObject.MaxInterest = maxInterest;
    HouseLoanObject.HouseLoan = houseLoanArray;
    HouseLoanObject.difference = (houseLoanArray[0].ReplyPrincipalIntreest - houseLoanArray[1].ReplyPrincipalIntreest).toFixed(2);
    return HouseLoanObject;
}

/*
 商业贷款等额本息计算通用方法
 偿还本息 = （本金*月利息）*(1+月利息)^贷款期限)/((1+月利息)^贷款期限-1）
 利息总额 = 偿还本息*总期数-本金
 累计还款总额 = 偿还本息 * 总期数
 每月月供=偿还本息
 最高月付利息=本金*月利息^1
 */
/*
 yearPeriad:总期数(月)
 money:本金
 monthInterest:月利率
 */
export function CalAverageCapitalPlusInterestComm(yearPeriad, money, monthInterest) {
    /*偿还本息=(（本金*月利息）*(1+月利息)^贷款期限)/((1+月利息)^贷款期限-1）*/
    let repleyInterest = (money * monthInterest * Math.pow(1 + monthInterest, yearPeriad)) / (Math.pow(1 + monthInterest, yearPeriad) - 1);

    /*利息总额=偿还本息*总期数 - 本金*/
    let result = repleyInterest * yearPeriad - money;
    result = Math.abs(result.toFixed(2));

    /*累计还款总额=偿还本息* 总期数*/
    let resultCount = repleyInterest * yearPeriad;
    resultCount = Math.abs(resultCount.toFixed(2));

    /*每月月供=偿还本息*/
    let monthPayment = Math.abs(repleyInterest.toFixed(2));


    /*最高付款利息= 本金 * 月息^期次*/
    let maxPayment = money * Math.pow(monthInterest, 1);
    maxPayment = Math.abs(maxPayment.toFixed(2));
    let houseLoan = {};
    let houseLoanArray = new Array();
    for (let i = 1; i <= yearPeriad; i++) {
        let surplusPrincipal1 = money * Math.pow(1 + monthInterest, i) - repleyInterest * (Math.pow(1 + monthInterest, i) - 1) / monthInterest; /*剩余本金*/
        let surplusPrincipal2 = money * Math.pow(1 + monthInterest, i - 1) - repleyInterest * (Math.pow(1 + monthInterest, i - 1) - 1) / monthInterest; /*取上一次的本金计算每月偿还利息*/
        let repeyInt = surplusPrincipal2 * monthInterest; /*每月偿还利息*/
        let repeyPrincipal1 = Math.abs((repleyInterest - repeyInt).toFixed(2)); /*每月偿还本金*/

        let replyPrincipalIntreest = monthPayment; //偿还本息
        let replyInterest = (i !== 1 ? repeyInt : maxPayment); //偿还利息
        let replyPrincipal = (i !== 1 ? repeyPrincipal1 : (repleyInterest - maxPayment)); //偿还本金
        let surplusPrincipal = (i !== 1 ? surplusPrincipal1 : (money - repleyInterest + maxPayment)); //剩余本金
        houseLoan = { ReplyPrincipalIntreest: replyPrincipalIntreest, ReplyInterest: replyInterest, ReplyPrincipal: replyPrincipal, SurplusPrincipal: surplusPrincipal };
        houseLoanArray.push(houseLoan);
    }
    let HouseLoanObject = {};
    HouseLoanObject.Result = result;
    HouseLoanObject.ResultCount = resultCount;
    HouseLoanObject.MonthPayment = monthPayment;
    HouseLoanObject.MaxPayment = maxPayment;
    HouseLoanObject.HouseLoan = houseLoanArray;
    HouseLoanObject.difference = houseLoanArray;
    return HouseLoanObject;
}

export default {
    CalLoan,
    CalAverageCapitalComm,
    CalAverageCapitalPlusInterestComm
}