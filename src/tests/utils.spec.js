import {formatDateAndTime} from "../helpers/utils";

describe('Utils', () => {

    it('Check formatDateAndTime', () => {
        const date = new Date("3/21/2020 10:00 AM");
        expect(formatDateAndTime(date)).toEqual("3/21/2020 10:00 AM");
    });

    it('Check formatDateAndTime invalid', () => {
        expect(formatDateAndTime("/")).toEqual("Invalid Date");
    });

});

