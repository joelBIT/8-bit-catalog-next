import { addAllOption, adjustTextLength, ALL_OPTION_VALUE, getMonthText } from "@/app/_utils/utils";

test('should convert numbers to corresponding months', () => {
    expect(getMonthText(0)).toBe("January");
    expect(getMonthText(1)).toBe("February");
    expect(getMonthText(2)).toBe("March");
    expect(getMonthText(3)).toBe("April");
    expect(getMonthText(4)).toBe("May");
    expect(getMonthText(5)).toBe("June");
    expect(getMonthText(6)).toBe("July");
    expect(getMonthText(7)).toBe("August");
    expect(getMonthText(8)).toBe("September");
    expect(getMonthText(9)).toBe("October");
    expect(getMonthText(10)).toBe("November");
    expect(getMonthText(11)).toBe("December");
    expect(getMonthText(12)).toBe("");
});

test('should add the All option to the supplied list if not already in the list', () => {
    expect(addAllOption(["Action, Adventure"])).toContain(ALL_OPTION_VALUE);
    expect(addAllOption(["Action, Adventure", ALL_OPTION_VALUE])).toStrictEqual(["Action, Adventure", ALL_OPTION_VALUE]);
});

test('should shorten text to supplied number of characters and add three dots in the end if text is longer', () => {
    expect(adjustTextLength("Testing if text is shortened with three dots added.", 7)).toStrictEqual("Testing...");
    expect(adjustTextLength("Testing if text is without three dots added.", 70)).toStrictEqual("Testing if text is without three dots added.");
})