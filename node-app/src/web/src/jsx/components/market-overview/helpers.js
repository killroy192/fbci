const marketHelpers = {
    getAdvice(indexes) {
        let indexOfMax;
        let indexOfMin;
        const keys = Object.keys(indexes);
        keys.forEach((key) => {
            const index = indexes[key];
            if (indexOfMax && index.change > indexes[indexOfMax]) {
                indexOfMax = key;
            } else if (index.change > 0) {
                indexOfMax = key;
            }

            if (indexOfMin && index.change < indexes[indexOfMin]) {
                indexOfMin = key;
            } else if (index.change < 0) {
                indexOfMin = key;
            }
        });

        if (indexOfMax) {
            return {
                msg: `Buy ${indexes[indexOfMax].name}`,
                value: 1,
            };
        } else if (indexOfMin) {
            return {
                msg: `Avoid ${indexes[indexOfMin].name}`,
                value: 2,
            };
        }

        return {
            msg: 'Buy and Avoid as you wish',
            value: 0,
        };
    },
};

export default marketHelpers;
