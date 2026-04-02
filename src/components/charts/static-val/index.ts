export const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
export const monthyear = [
    "Jan 2015",
    "Jan 2016",
    "Jan 2017",
    "Jan 2018",
    "jan 2019",
    "Jan 2020",
    "jan 2026",
];
export const twovalues = [
    [-2, 4],
    [-1, 6],
    [3, 10],
    [8, 16],
    [13, 22],
    [18, 26],
    [21, 29],
    [21, 28],
    [17, 24],
    [11, 18],
    [6, 12],
    [1, 7],
];
export const values = [
    [6629.81, 6650.5, 6623.04, 6633.33],
    [6632.01, 6643.59, 6620, 6630.11],
    [6630.71, 6648.95, 6623.34, 6635.65],
    [6635.65, 6651, 6629.67, 6638.24],
    [6638.24, 6640, 6620, 6624.47],
    [6630.71, 6648.95, 6623.34, 6635.65],
    [6640.71, 6648.95, 6623.34, 665.65],
];
export const LanguagePercentages = [96, 2, 2];
export const Languages = ["TypeScript", "CSS", "HTML"];
export const Languageseries = LanguagePercentages.map((percent, index) => ({
    name: Languages[index],
    data: [percent],
}));
export const LanguageColors = ["#3178C6", "#264de4", "#E34F26"];