import LottoConfirmation from "../src/domain/LottoConfirmation.js";
import PrizeLotto from "../src/domain/PrizeLotto.js";
import Lotto from "../src/domain/Lotto.js";

describe("LottoConfirmation Class 테스트", () => {

    let lottos;

    beforeEach(() => {
        lottos = [[1, 2, 3, 4, 5, 6]];
    });

    it.each(
        [
            {rank: 1, prizeLotto: [1, 2, 3, 4, 5, 6], bonusNum: 30, totalPrize: 2000000000},
            {rank: 2, prizeLotto: [1, 2, 3, 4, 5, 7], bonusNum: 6, totalPrize: 30000000},
            {rank: 3, prizeLotto: [1, 2, 3, 4, 5, 7], bonusNum: 30, totalPrize: 1500000},
            {rank: 4, prizeLotto: [1, 2, 3, 5, 8, 9], bonusNum: 30, totalPrize: 50000},
            {rank: 5, prizeLotto: [1, 2, 3, 7, 8, 9], bonusNum: 30, totalPrize: 5000},
            {rank: 6, prizeLotto: [7, 8, 9, 10, 11, 12], bonusNum: 30, totalPrize: 0}
        ]
    )
    ("로또와 당첨숫자와 보너스 숫자를 입력받고 $rank등 일시 $totalPrize 원을 지급받는다.",
        ({prizeLotto, bonusNum, totalPrize}) => {
            const prizeLottos = new PrizeLotto(prizeLotto, bonusNum);
            const lottoConfirmation = new LottoConfirmation(lottos, prizeLottos);
            expect(lottoConfirmation.totalPrize).toEqual(totalPrize);
        }
    );

    it("로또 1장 구입 후 1등 당첨시에 수익률은 40000000이다", () => {
        const prizeLotto = new PrizeLotto([1, 2, 3, 4, 5, 6], 30);
        const lottoConfirmation = new LottoConfirmation(lottos, prizeLotto);
        expect(lottoConfirmation.calculateRateOfReturn(5000)).toEqual(40000000);
    });

    it("로또 1장 구입 후 1등 당첨시에 로또 결과를 검증한다.", () => {
        const prizeLotto = new PrizeLotto([1, 2, 3, 4, 5, 6], 30);
        const lottoConfirmation = new LottoConfirmation(lottos, prizeLotto);

        expect(lottoConfirmation.lottoResults.get(7)).toEqual(1);
    });

});